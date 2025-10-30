"use client"

import { useEffect, useRef, useState, useContext } from "react"
import { supabase } from "./supabaseClient"
import "../styles/blogs/blog.css"
import Footer from "../components/footer"
import Alert from "../iconSvg/alertIc"
import Logo from "../components/logo"
import { useNavigate, useLocation } from "react-router-dom"
import Backic from "../iconSvg/backic"
import Menus from '../iconSvg/menus';
import Close from '../iconSvg/close';
import { Link } from 'react-router-dom';
import { LenisContext } from "../App"
import mammoth from "mammoth"

export default function Blog() {
  const [blogs, setBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState("latest")
  const [error, setError] = useState(null)
  const [docxContents, setDocxContents] = useState({})
  const navigate = useNavigate()
  const location = useLocation()
  const scrollPosition = useRef(0)
  const lenisRef = useContext(LenisContext)

  const handleGoBack = () => {
    navigate(-1)
  }

  // Reset scroll position ketika pertama kali masuk atau kembali dari article
  useEffect(() => {
    if (location.state?.restoreScroll) {
      const savedPosition = sessionStorage.getItem('blogScrollPosition');
      if (savedPosition && lenisRef?.current) {
        setTimeout(() => {
          lenisRef.current.scrollTo(parseInt(savedPosition), {
            immediate: true,
            force: true
          });
          sessionStorage.removeItem('blogScrollPosition');
        }, 150);
      } else if (savedPosition) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedPosition));
          sessionStorage.removeItem('blogScrollPosition');
        }, 150);
      }
    } else {
      if (lenisRef?.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    }
  }, [location.state, lenisRef]);

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
          // 🔽 ubah bagian List Paragraph ke ordered list
          "p[style-name='List Paragraph'] => ol > li:fresh",
          "r[style-name='Strong'] => strong",
          "r[style-name='Emphasis'] => em",
        ],
        convertImage: mammoth.images.imgElement(function (image) {
          return image.read("base64").then(function (imageBuffer) {
            return {
              src: "data:" + image.contentType + ";base64," + imageBuffer
            };
          });
        })
      };

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

  async function fetchBlogs(filterType) {
    setIsLoading(true)
    setError(null)

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
      } else {
        console.log("Blog data fetched successfully:", data)
        setBlogs(data)

        // Konversi semua DOCX ke HTML
        const contents = {}
        for (const blog of data) {
          if (blog.docx_url) {
            const htmlContent = await convertDocxToHtml(blog.docx_url)
            if (htmlContent) {
              contents[blog.id] = htmlContent
            }
          }
        }
        setDocxContents(contents)
      }
    } catch (err) {
      console.error("Error fetching blogs:", err)
      setError("Terjadi kesalahan saat mengambil data: " + (err.message || String(err)))
    } finally {
      setIsLoading(false)
    }
  }

  function handleFilterChange(newFilter) {
    setFilter(newFilter)
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
      const currentScroll = lenisRef.current.scroll;
      sessionStorage.setItem('blogScrollPosition', currentScroll.toString());
    } else {
      sessionStorage.setItem('blogScrollPosition', window.pageYOffset.toString());
    }

    // Kirim artikel beserta HTML content yang sudah dikonversi
    const articleWithContent = {
      ...article,
      htmlContent: docxContents[article.id]
    }

    navigate(`/article/${article.id}`, { state: { article: articleWithContent } });
  }

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("id-ID", options)
  }

  function truncateHtml(html, maxLength = 250) {
    if (!html) return "Konten tidak tersedia"

    // Hapus tag HTML untuk menghitung karakter
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = html
    const textContent = tempDiv.textContent || tempDiv.innerText || ""

    if (textContent.length <= maxLength) return html

    // Truncate text content
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
            ) : blogs.length === 0 ? (
              <div className="empty-state">
                <p>No Article Here :(</p>
              </div>
            ) : (
              <>
                <div className="info-blog" id="info-blog">
                  <div className="debug-info">
                    <p>All: {blogs.length}</p>
                    <p>Filter: {filter}</p>
                  </div>
                </div>

                {blogs.map((blog, index) => {
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

                          {/* Tampilkan sub_title jika ada */}
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
                  fetchBlogs(filter);
                  openBlog();
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