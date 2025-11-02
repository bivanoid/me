"use client"

import { useEffect, useRef, useState, useContext, useCallback } from "react"
import { supabase } from "./supabaseClient"
import "../styles/blogs/blog.css"
import Footer from "../components/footer"
import Alert from "../iconSvg/alertIc"
import Logo from "../components/logo"
import { useNavigate, useLocation } from "react-router-dom"
import Backic from "../iconSvg/backic"
import Menus from '../iconSvg/menus'
import Close from '../iconSvg/close'
import { Link } from 'react-router-dom'
import { LenisContext } from "../App"
import mammoth from "mammoth"

const ITEMS_PER_PAGE = 3 // Jumlah artikel per load

export default function Blog() {
  const [blogs, setBlogs] = useState([])
  const [displayedBlogs, setDisplayedBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [filter, setFilter] = useState("latest")
  const [error, setError] = useState(null)
  const [docxContents, setDocxContents] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchInput, setSearchInput] = useState("")
  const [filteredBlogs, setFilteredBlogs] = useState([])

  const navigate = useNavigate()
  const location = useLocation()
  const scrollPosition = useRef(0)
  const lenisRef = useContext(LenisContext)
  const observerTarget = useRef(null)

  const handleGoBack = () => {
    navigate(-1)
  }

  // Fungsi pencarian
  // Fungsi pencarian - dijalankan hanya saat tombol ditekan
  const handleSearch = useCallback(() => {
    const query = searchInput.trim()
    setSearchQuery(query)

    if (!query) {
      setFilteredBlogs(blogs)
      const initialBlogs = blogs.slice(0, ITEMS_PER_PAGE)
      setDisplayedBlogs(initialBlogs)
      setCurrentPage(1)
      setHasMore(blogs.length > ITEMS_PER_PAGE)
      return
    }

    const searchLower = query.toLowerCase()
    const filtered = blogs.filter(blog => {
      const titleMatch = blog.title_blog?.toLowerCase().includes(searchLower)
      const subtitleMatch = blog.sub_title?.toLowerCase().includes(searchLower)
      const categoryMatch = blog.category?.toLowerCase().includes(searchLower)

      // Search dalam content HTML
      let contentMatch = false
      if (blog.content_html) {
        const tempDiv = document.createElement('div')
        tempDiv.innerHTML = blog.content_html
        const textContent = tempDiv.textContent || tempDiv.innerText || ""
        contentMatch = textContent.toLowerCase().includes(searchLower)
      }

      return titleMatch || subtitleMatch || categoryMatch || contentMatch
    })

    setFilteredBlogs(filtered)
    const initialFiltered = filtered.slice(0, ITEMS_PER_PAGE)
    setDisplayedBlogs(initialFiltered)
    setCurrentPage(1)
    setHasMore(filtered.length > ITEMS_PER_PAGE)

    // Load content untuk hasil pencarian
    initialFiltered.forEach(blog => loadDocxContent(blog))
  }, [blogs, searchInput])


  // Update effect untuk filter
  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery)
    }
  }, [blogs, searchQuery, handleSearch])

  // Reset scroll position ketika pertama kali masuk atau kembali dari article
  useEffect(() => {
    if (location.state?.restoreScroll) {
      const savedPosition = sessionStorage.getItem('blogScrollPosition')
      if (savedPosition && lenisRef?.current) {
        setTimeout(() => {
          lenisRef.current.scrollTo(parseInt(savedPosition), {
            immediate: true,
            force: true
          })
          sessionStorage.removeItem('blogScrollPosition')
        }, 150)
      } else if (savedPosition) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedPosition))
          sessionStorage.removeItem('blogScrollPosition')
        }, 150)
      }
    } else {
      if (lenisRef?.current) {
        lenisRef.current.scrollTo(0, { immediate: true })
      } else {
        window.scrollTo(0, 0)
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      }
    }
  }, [location.state, lenisRef])

  useEffect(() => {
    async function testConnection() {
      try {
        const { data, error } = await supabase.from("blog").select("count")
        if (error) {
          console.error("Connection test failed:", error)
        } else {
          console.log("Connection test successful:", data)
        }
      } catch (err) {
        console.error("Connection test error:", err)
      }
    }

    testConnection()
    fetchBlogs(filter)
  }, [filter])

  // Fungsi untuk mengkonversi DOCX ke HTML dengan styling yang lebih baik
  async function convertDocxToHtml(docxUrl) {
    try {
      const response = await fetch(docxUrl)
      const arrayBuffer = await response.arrayBuffer()

      const options = {
        styleMap: [
          "p[style-name='Heading 1'] => h1:fresh",
          "p[style-name='Heading 2'] => h2:fresh",
          "p[style-name='Heading 3'] => h3:fresh",
          "p[style-name='Heading 4'] => h4:fresh",
          "p[style-name='Title'] => h1.title:fresh",
          "p[style-name='Subtitle'] => p.subtitle:fresh",
          "p[style-name='List Paragraph'] => ol > li:fresh",
          "r[style-name='Strong'] => strong",
          "r[style-name='Emphasis'] => em",
        ],
        convertImage: mammoth.images.imgElement(function (image) {
          return image.read("base64").then(function (imageBuffer) {
            return {
              src: "data:" + image.contentType + ";base64," + imageBuffer
            }
          })
        })
      }

      const result = await mammoth.convertToHtml({ arrayBuffer }, options)

      // Post-process HTML untuk memperbaiki formatting
      let html = result.value

      // Tambahkan class untuk list items
      html = html.replace(/<li>/g, '<li class="doc-list-item">')

      // Bersihkan multiple line breaks
      html = html.replace(/(<br\s*\/?>){3,}/g, '<br><br>')

      // Wrap numbered items
      html = html.replace(/(\d+\.\s+)([^<\n]+)/g, '<p class="numbered-item"><span class="number">$1</span>$2</p>')

      return html
    } catch (error) {
      console.error("Error converting DOCX to HTML:", error)
      return null
    }
  }

  // Konversi DOCX secara lazy (hanya untuk artikel yang ditampilkan)
  async function loadDocxContent(blog) {
    // Prioritaskan content_html dari TinyMCE (spb1)
    if (blog.content_html) {
      setDocxContents(prev => ({
        ...prev,
        [blog.id]: blog.content_html
      }))
    }
    // Fallback ke docx_url jika tidak ada content_html
    else if (blog.docx_url && !docxContents[blog.id]) {
      const htmlContent = await convertDocxToHtml(blog.docx_url)
      if (htmlContent) {
        setDocxContents(prev => ({
          ...prev,
          [blog.id]: htmlContent
        }))
      }
    }
  }

  async function fetchBlogs(filterType) {
    setIsLoading(true)
    setError(null)
    setCurrentPage(1)

    try {
      console.log("Fetching blogs with filter:", filterType)

      let query = supabase.from("blog").select("*")

      if (filterType === "latest") {
        query = query.order("created_at", { ascending: false })
      } else if (filterType === "oldest") {
        query = query.order("created_at", { ascending: true })
      }

      const { data, error } = await query

      console.log("Supabase response:", { data, error })

      if (error) {
        console.error("Failed to fetch data:", error)
        setError("Oh noo! " + error.message)
      } else if (!data || data.length === 0) {
        console.log("No blog data found")
        setBlogs([])
        setDisplayedBlogs([])
        setFilteredBlogs([])
        setHasMore(false)
      } else {
        console.log("Blog data fetched successfully:", data)
        setBlogs(data)
        setFilteredBlogs(data)

        // Tampilkan hanya artikel pertama sesuai ITEMS_PER_PAGE
        const initialBlogs = data.slice(0, ITEMS_PER_PAGE)
        setDisplayedBlogs(initialBlogs)
        setHasMore(data.length > ITEMS_PER_PAGE)

        // Load content untuk artikel pertama
        for (const blog of initialBlogs) {
          await loadDocxContent(blog)
        }
      }
    } catch (err) {
      console.error("Error fetching blogs:", err)
      setError("Terjadi kesalahan saat mengambil data: " + (err.message || String(err)))
    } finally {
      setIsLoading(false)
    }
  }

  // Load more articles saat scroll
  const loadMoreBlogs = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);

    const gimmickDelay = new Promise(resolve => setTimeout(resolve, 1500));
    const nextPage = currentPage + 1;
    const startIndex = currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    // Gunakan filteredBlogs jika ada pencarian, jika tidak gunakan blogs
    const sourceBlogs = searchQuery ? filteredBlogs : blogs
    const newBlogs = sourceBlogs.slice(startIndex, endIndex);

    if (newBlogs.length === 0) {
      setHasMore(false);
      setIsLoadingMore(false);
      return;
    }

    try {
      await Promise.all([
        gimmickDelay,
        ...newBlogs.map(blog => loadDocxContent(blog))
      ]);

      setDisplayedBlogs(prev => [...prev, ...newBlogs]);
      setCurrentPage(nextPage);
      setHasMore(endIndex < sourceBlogs.length);
    } catch (err) {
      console.error("Error loading more blogs:", err);
    } finally {
      setIsLoadingMore(false);
    }
  }, [currentPage, blogs, filteredBlogs, searchQuery, hasMore, isLoadingMore]);

  // Intersection Observer untuk infinite scroll
  useEffect(() => {
    if (displayedBlogs.length === 0 || !observerTarget.current) {
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          console.log('Intersection triggered - loading more blogs')
          loadMoreBlogs()
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    )

    const currentTarget = observerTarget.current
    observer.observe(currentTarget)

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [displayedBlogs.length, hasMore, isLoadingMore, loadMoreBlogs])

  function handleFilterChange(newFilter) {
    setFilter(newFilter)
    setDocxContents({})
    setSearchQuery("") // Reset pencarian saat ganti filter
  }

  function openBlog() {
    ["menuShow", "closeBlog", "conArticle", "footerBlog", "backMenuIcon", "menuBlogIcon", "logoBlogIcon"].forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        element.classList.toggle("open-menu-blog")
      }
    })
  }

  function openArticle(article) {
    if (lenisRef?.current) {
      const currentScroll = lenisRef.current.scroll
      sessionStorage.setItem('blogScrollPosition', currentScroll.toString())
    } else {
      sessionStorage.setItem('blogScrollPosition', window.pageYOffset.toString())
    }

    // Kirim artikel beserta HTML content yang sudah dikonversi
    const articleWithContent = {
      ...article,
      htmlContent: docxContents[article.id]
    }

    navigate(`/article/${article.id}`, { state: { article: articleWithContent } })
  }

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("id-ID", options)
  }

  function truncateHtml(html, maxLength = 250) {
    if (!html) return "Konten tidak tersedia"

    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = html
    const textContent = tempDiv.textContent || tempDiv.innerText || ""

    if (textContent.length <= maxLength) return html

    const truncated = textContent.substring(0, maxLength)
    return truncated + "... <span class='seeMore' style='opacity: 1 !important;'>see more</span>"
  }

  return (
    <div className="body-blog" id="theblog">
      <div className="con-blog">
        <main>
          <div className="navigation-blog">
            <Link to='/' className="clstgr back-to-home-from-blog" id="backMenuIcon">
              <Backic />
            </Link>
            <div className="logoBlog" id="logoBlogIcon">
              <Logo />
            </div>

            <div className="menu-button-blog" id="menuBlogIcon" onClick={openBlog}>
              <Menus />
            </div>
          </div>

          <div className="con-article" id="conArticle">
            {/* Search Bar */}
            <div className="search-bar-container">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="search-input"
                />
                <button
                  className="search-button"
                  onClick={handleSearch}
                >
                  Search
                </button>
                {searchQuery && (
                  <button
                    className="clear-search"
                    onClick={() => {
                      setSearchInput("")
                      setSearchQuery("")
                      handleSearch("") // reset hasil
                    }}
                    aria-label="Clear search"
                  >
                    × <span>Clear</span> 
                  </button>
                )}

              </div>
            </div>

            {isLoading ? (
              <div className="loading-state">
                <p>Loading</p>
              </div>
            ) : error ? (
              <div className="error-state">
                <Alert />
                <p>{error}</p>
                <button className="try-again-blog" onClick={() => fetchBlogs(filter)}>
                  Load Again
                </button>
              </div>
            ) : displayedBlogs.length === 0 ? (
              <div className="empty-state">
                <p>{searchQuery ? `No articles found for "${searchQuery}"` : "No Article Here :("}</p>
              </div>
            ) : (
              <>
                <div className="info-blog" id="info-blog">
                  <div className="debug-info">
                    <p>Showing: {displayedBlogs.length} of {searchQuery ? filteredBlogs.length : blogs.length}</p>
                    <p>Filter: {filter}</p>
                    
                  </div>
                </div>

                {displayedBlogs.map((blog, index) => {
                  const htmlContent = docxContents[blog.id]

                  return (
                    <div
                      className="article"
                      onClick={() => openArticle(blog)}
                      style={{ cursor: "pointer" }}
                      key={blog.id || index}
                    >
                      <div className="con-image-article">
                        {blog.image_url ? (
                          <img
                            src={blog.image_url || "/placeholder.svg"}
                            className="image-article"
                            alt={`Gambar untuk ${blog.title_blog || "Artikel"}`}
                            loading="lazy"
                            onError={(e) => {
                              e.target.onerror = null
                              e.target.src = "https://via.placeholder.com/300x200?text=No+Image"
                            }}
                          />
                        ) : (
                          <div className="placeholder-image">No Image Available</div>
                        )}
                      </div>

                      <div className="column-article">
                        <div className="text-article">
                          <h1 className="title-article">{blog.title_blog || "Judul tidak tersedia"}</h1>

                          {blog.sub_title && (
                            <p className="subtitle-article">{blog.sub_title}</p>
                          )}

                          <p id="date-post">
                            {blog.created_at ? formatDate(blog.created_at) : "Tanggal tidak tersedia"}
                          </p>
                        </div>
                        {blog.category && (
                          <div className="blog-category">
                            <span>{blog.category}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}

                {/* Infinite Scroll Trigger */}
                {hasMore && (
                  <div
                    ref={observerTarget}
                    className="con-loading-more"
                  >
                    {isLoadingMore ? (
                      <div className="loading-more">
                        <p>Loading...</p>
                      </div>
                    ) : (
                      <div style={{ opacity: 0.4, fontSize: '14px' }}>
                        <p>Scroll to load more</p>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </main>

        <div className="close-blog" id="closeBlog" onClick={openBlog}>
          <div className="menu-button-close-blog">
            <Close />
          </div>
        </div>

        <div className="con-blog-sticky" id="menuShow">
          <div className="main-sticky-blog">
            <h1>
              /Options<span className="dot-introduction"></span>
            </h1>
            <div className="filter-by">
              <h2>Filter By</h2>
              <ul>
                <li className={filter === "latest" ? "active" : ""} onClick={() => handleFilterChange("latest")}>
                  Latest
                </li>
                <li className={filter === "oldest" ? "active" : ""} onClick={() => handleFilterChange("oldest")}>
                  Oldest
                </li>
              </ul>
              <button
                className="try-again-blog try-again-blog2"
                onClick={() => {
                  fetchBlogs(filter)
                  openBlog()
                }}
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="footerBlog">
        <Footer />
      </div>
    </div>
  )
}