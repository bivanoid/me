"use client"

import { useEffect, useState } from "react"
import { supabase } from "./supabaseClient"
import { Link } from "react-router-dom"
import "../styles/blogs/blog.css"
import Footer from "../components/footer"
import Alert from "../assets/Alert.png"
import Logo from "../components/logo"

// Scroll Progress Component
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
            updateProgress() // Initial calculation

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
    const [selectedArticle, setSelectedArticle] = useState(null)
    const [isArticleModalOpen, setIsArticleModalOpen] = useState(false)


    window.addEventListener("scroll", () => {
        const element = document.getElementById("info-blog")
        if (!element) return

        const rect = element.getBoundingClientRect()

        if (rect.top <= 0 && !element.classList.contains("fixed")) {
            element.style.position = "fixed"
            element.style.top = "0"
            element.classList.add("fixed")
        }

        const originalTop = element.offsetTop
        if (window.scrollY < originalTop && element.classList.contains("fixed")) {
            element.style.position = "relative"
            element.style.top = ""
            element.classList.remove("fixed")
        }
    })

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
        ;["menuShow", "closeBlog", "conArticle"].forEach((id) => {
            const element = document.getElementById(id)
            if (element) {
                element.classList.toggle("open-menu-blog")
            }
        })
    }


    function openArticle(article) {
        setSelectedArticle(article)
        setIsArticleModalOpen(true)
        // document.body.style.overflow = "hidden"
    }

    function closeArticle() {
        setSelectedArticle(null)
        setIsArticleModalOpen(false)
        // document.body.style.overflow = "auto"
    }

    useEffect(() => {
        function handleEscapeKey(event) {
            if (event.key === "Escape" && isArticleModalOpen) {
                closeArticle()
            }
        }

        document.addEventListener("keydown", handleEscapeKey)
        return () => document.removeEventListener("keydown", handleEscapeKey)
    }, [isArticleModalOpen])

    function formatDate(dateString) {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString("id-ID", options)
    }

    function truncateText(text, maxLength = 200) {
        if (text.length <= maxLength) return text
        return text.substring(0, maxLength) + ("<span style='color: white; opacity: 1;'>see more</span>")
    }

    return (
        <div className="body-blog">
            <div className="con-blog">
                <main>
                    <div className="navigation-blog">
                        <Link to="/" className="back-to-home-from-blog">
                            <i class="fi fi-rs-turn-left"></i>
                        </Link>
                        <Logo/>
                        <div className="menu-button-blog" onClick={openBlog}>
                            <i className="fi fi-rs-expand-arrows"></i>
                        </div>
                    </div>

                    <div className="con-article" id="conArticle">
                        {isLoading ? (
                            <div className="loading-state">
                                <p>Memuat artikel...</p>
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
                                <p>Belum ada artikel yang tersedia</p>
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
                                                <div className="text-article"
                                                    >
                                                    
                                                    <h1 className="title-article">{blog.title_blog || "Judul tidak tersedia"}</h1>
                                                    <p className="content-article" dangerouslySetInnerHTML={{ __html: blog.text_blog ? truncateText(blog.text_blog) : "Konten tidak tersedia" }}>
                                                        
                                                    </p>
                                                </div>
                                                {blog.category && (
                                                    <div className="blog-category">
                                                        <span>{blog.category}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    //     <p
                                    //     className="rendered-html"
                                    //     dangerouslySetInnerHTML={{ __html: selectedArticle.text_blog || "Konten tidak tersedia" }}
                                    // ></p>
                                    )
                                })}
                            </>
                        )}
                    </div>
                </main>

                <div className="close-blog" id="closeBlog" onClick={openBlog}>
                    <i class="fi fi-rs-down-left-and-up-right-to-center"></i>
                </div>

                <div className="con-blog-sticky" id="menuShow">
                    <div className="main-sticky-blog">
                        <h1>
                            — My Blog<span className="dot-introduction"></span>
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
                    </div>
                </div>
            </div>

            {/* Article Modal */}
            {isArticleModalOpen && selectedArticle && (
                <div className="article-modal-overlay" onClick={closeArticle}>
                    <div className="article-modal" onClick={(e) => e.stopPropagation()}>

                        <div className="article-modal-content">
                            {/* Tambahkan ScrollProgress di sini */}
                            
                            <aside className="asside-article">
                                
                                <div className="asside-main">
                                    <button className="close-article-btn" onClick={closeArticle}>
                                        <i class="fi fi-rs-cross"></i>
                                    </button>
                                    <h1 className="article-modal-title">{selectedArticle.title_blog || "Judul tidak tersedia"}</h1>
                                    <div className="author-photo"></div>
                                    <div className="article-modal-author">
                                        <div className="author-info">
                                            <p className="author-name">{selectedArticle.author || "Firdhan Abivandya"}</p>
                                            <span> • </span>
                                            <p className="publish-date">
                                                {selectedArticle.created_at ? formatDate(selectedArticle.created_at) : "Tanggal tidak tersedia"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </aside>

                            <main className="main-article">
                                {selectedArticle.image_url && (
                                    <div className="article-modal-image">
                                        <img
                                            src={selectedArticle.image_url || "/placeholder.svg"}
                                            alt={selectedArticle.title_blog || "Artikel"}
                                            onError={(e) => {
                                                e.target.onerror = null
                                                e.target.src = "https://via.placeholder.com/800x400?text=No+Image"
                                            }}
                                        />
                                    </div>
                                )}

                                <div className="article-modal-text">
                                    <div className="article-modal-meta">
                                        {selectedArticle.category && (
                                            <div className="article-modal-category">
                                                <span>{selectedArticle.category}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="article-modal-body">
                                        <p
                                            className="rendered-html"
                                            dangerouslySetInnerHTML={{ __html: selectedArticle.text_blog || "Konten tidak tersedia" }}
                                        ></p>

                                       
                                    </div>
                                </div>
                            </main>

                            <ScrollProgress />
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    )
}
