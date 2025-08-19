"use client"

import { useEffect, useState } from "react"
import { supabase } from "./supabaseClient"
import "../styles/blogs/blog.css"
import Footer from "../components/footer"
import Alert from "../assets/Alert.png"
import Logo from "../components/logo"
import { useNavigate } from "react-router-dom"

// Scroll Progress Component (kept for potential future use)
function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollContainer = document.querySelector(".article-modal")
      const contentContainer = document.querySelector(".article-modal-content")
      if (!scrollContainer || !contentContainer) return

      const scrollTop = scrollContainer.scrollTop
      const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight
      const scrollProgress = (scrollTop / scrollHeight) * 100

      setProgress(Math.min(scrollProgress, 100))
    }

    const scrollContainer = document.querySelector(".article-modal")
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", updateProgress)
      updateProgress()

      return () => {
        scrollContainer.removeEventListener("scroll", updateProgress)
      }
    }
  }, [])

  return (
    <div className="con-progress">
      <p>top</p>
      <div className="scroll-progress-container-vertical">
        <div className="scroll-progress-bar-vertical" style={{ height: `${progress}%` }} />
      </div>
      <p>Bottom</p>
    </div>
  )
}

export default function Blog() {
  const [blogs, setBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState("latest")
  const [error, setError] = useState(null)
  const [connectionTest, setConnectionTest] = useState(null)
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    async function testConnection() {
      try {
        const { data, error } = await supabase.from("blog").select("count")
        if (error) {
          console.error("Connection test failed:", error)
          setConnectionTest(`Koneksi gagal: ${error.message}`)
        } else {
          console.log("Connection test successful:", data)
          setConnectionTest("Connected")
        }
      } catch (err) {
        console.error("Connection test error:", err)
        setConnectionTest(`Error: ${err.message || String(err)}`)
      }
    }

    testConnection()
    fetchBlogs(filter)
  }, [filter])

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
        console.log("First item:", data[0])
        setBlogs(data)
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
    ;["menuShow", "closeBlog", "conArticle", "backMenuIcon", "menuBlogIcon", "logoBlogIcon"].forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        element.classList.toggle("open-menu-blog")
      }
    })
  }

  // Modified function to open article in new page
  function openArticle(article) {
    // Option 1: Navigate to a new route (recommended)
    navigate(`/article/${article.id}`, { state: { article } })

    // Option 2: Open in new tab/window
    // const articleUrl = `/article/${article.id}`;
    // window.open(articleUrl, '_blank');

    // Option 3: Open in new tab with article data as URL parameters (if data is small)
    // const articleParams = new URLSearchParams({
    //     id: article.id,
    //     title: article.title_blog,
    //     // Add other necessary parameters
    // });
    // window.open(`/article?${articleParams.toString()}`, '_blank');
  }

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("id-ID", options)
  }

  function truncateText(text, maxLength = 250) {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "<span style='color: white; opacity: 1;'> see more</span>"
  }

  return (
    <div className="body-blog">
      <div className="con-blog">
        <main>
          <div className="navigation-blog">
            <div className="clstgr back-to-home-from-blog" id="backMenuIcon" onClick={handleGoBack}>
              <i className="fi fi-rs-arrow-left"></i>
            </div>
            <div className="logoBlog" id="logoBlogIcon">
              <Logo />
            </div>

            <div className="menu-button-blog" id="menuBlogIcon" onClick={openBlog}>
              <i className="fi fi-rs-expand-arrows"></i>
            </div>
          </div>

          <div className="con-article" id="conArticle">
            {isLoading ? (
              <div className="loading-state">
                <p>Loading</p>
              </div>
            ) : error ? (
              <div className="error-state">
                <img src={Alert || "/placeholder.svg"} alt="Error" />
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
                  <div className="status-conection-blog">
                    <p>
                      <strong></strong> {connectionTest || "Checking Connection..."}
                    </p>
                  </div>
                  <div className="debug-info">
                    <p>All: {blogs.length}</p>
                    <p>Filter: {filter}</p>
                  </div>
                </div>

                {blogs.map((blog, index) => {
                  console.log(`Rendering blog ${index}:`, blog)
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
                        <div className="con-profile-blog">
                          <div className="photoprofile-blog"></div>
                          <div className="name-and-date">
                            <p>{blog.author || "Firdhan Abivandya"}</p>
                            <p id="date-post">
                              {blog.created_at ? formatDate(blog.created_at) : "Tanggal tidak tersedia"}
                            </p>
                          </div>
                        </div>
                        <div className="text-article">
                          <h1 className="title-article">{blog.title_blog || "Judul tidak tersedia"}</h1>
                          <p
                            className="content-article rendered-html"
                            dangerouslySetInnerHTML={{
                              __html: blog.text_blog ? truncateText(blog.text_blog, 250) : "Konten tidak tersedia",
                            }}
                          ></p>
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
          <i className="fi fi-rs-down-left-and-up-right-to-center"></i>
        </div>

        <div className="con-blog-sticky" id="menuShow">
          <div className="main-sticky-blog">
            <h1>
              My Blog<span className="dot-introduction"></span>
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
            </div>
            <svg
              className="con-star con-star-blog"
              width="100"
              height="100"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="star"
                d="M107.729 40.5811C112.721 66.7848 133.215 87.2792 159.419 92.2705L200 100L159.419 107.729C133.215 112.721 112.721 133.215 107.729 159.419L100 200L92.2705 159.419C87.2792 133.215 66.7848 112.721 40.5811 107.729L0 100L40.5811 92.2705C66.7848 87.2792 87.2792 66.7848 92.2705 40.5811L100 0L107.729 40.5811Z"
                fill="#D9D9D9"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
