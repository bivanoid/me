"use client"

import { useEffect, useState, useContext, useRef } from "react"
import { useParams, useLocation, useNavigate, Link } from "react-router-dom"
import { supabase } from "./supabaseClient"
import "../styles/blogs/blog.css"
import Footer from "../components/footer"
import Backic from "../iconSvg/backic"
import { LenisContext } from "../App"

import Prism from "prismjs";
import "../styles/prism-custom.css";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-python";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-java";
import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-php";
import "prismjs/components/prism-php-extras";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-json";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard";
import "prismjs/plugins/toolbar/prism-toolbar.css";

const handleShare = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: document.title,
        text: "Cek halaman ini!",
        url: window.location.href,
      })
    } catch (error) {
      console.error("Gagal membagikan", error)
    }
  } else {
    alert("Fitur share tidak didukung di browser ini.")
  }
}

export default function ArticlePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const lenisRef = useContext(LenisContext)

  const [article, setArticle] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [imageLoaded, setImageLoaded] = useState(false)

  const mainRef = useRef(null)

  // Scroll ke atas saat load
  useEffect(() => {
    if (lenisRef?.current) lenisRef.current.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [lenisRef])

  // Ambil data dari Supabase
  useEffect(() => {
    async function fetchArticle() {
      if (!id) {
        setError("Tidak ada ID artikel")
        setIsLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from("blog")
          .select("*")
          .eq("id", id)
          .single()

        if (error) throw error
        if (!data) {
          setError("Artikel tidak ditemukan")
        } else {
          const parser = new DOMParser()
          const doc = parser.parseFromString(data.content_html || "", "text/html")
          doc.querySelectorAll("table").forEach((table) => {
            const wrapper = doc.createElement("div")
            wrapper.className = "con-table"
            table.parentNode.insertBefore(wrapper, table)
            wrapper.appendChild(table)
          })

          // Simpan hasil HTML yang sudah dimodifikasi
          data.content_html = doc.body.innerHTML

          setArticle(data)
          setTimeout(() => Prism.highlightAll(), 300)
        }
      } catch (err) {
        setError("Gagal memuat artikel: " + err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticle()
  }, [id])

  // Optimasi render highlight saat scroll (lazy highlight)
  useEffect(() => {
    if (!mainRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            Prism.highlightAllUnder(entry.target)
          }
        })
      },
      { rootMargin: "200px" }
    )

    observer.observe(mainRef.current)
    return () => observer.disconnect()
  }, [article])

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("id-ID", options)
  }

  function handleGoBack() {
    navigate(-1, { state: { restoreScroll: true } })
  }

  // ========================
  // 🌀 STATE LOADING
  // ========================
  if (isLoading)
    return (
      <div className="body-blog loading-state">
        <div className="loading-container">
          <div className="loading-text">Loading...</div>

          <div className="article-skeleton">
            <div className="skeleton-title"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line short"></div>
            <div className="skeleton-image"></div>
            <div className="skeleton-paragraph"></div>
            <div className="skeleton-paragraph"></div>
          </div>
        </div>
      </div>
    )

  if (error)
    return (
      <div className="body-blog">
        <div className="error-state">
          <p>{error}</p>
          <button className="try-again-blog" onClick={handleGoBack}>
            Kembali
          </button>
        </div>
      </div>
    )

  if (!article)
    return (
      <div className="body-blog">
        <p>Artikel tidak ditemukan</p>
        <button onClick={handleGoBack}>Kembali</button>
      </div>
    )

  return (
    <div className="body-blog">
      <div className="article-modal-overlay" style={{ background: "transparent" }}>
        <div className="article-modal" style={{ border: "none" }}>
          <div className="article-modal-content">
            <aside className="asside-article">
              <div className="asside-main">
                <Link to="/blog"
                  
                  className="close-article-btn"
                  style={{ cursor: 'pointer' }}
                >
                  <Backic />
                </Link>
                <h1 className="article-modal-title">{article.title_blog || "Judul tidak tersedia"}</h1>
                <div className="con-user-uploader">
                  <div className="author-photo"></div>
                  <div className="article-modal-author">
                    <div className="author-info">
                      <Link to="/" className="author-name">{article.author || "/Firdhan Abivandya"}</Link>
                      <p className="publish-date">
                        {article.created_at ? formatDate(article.created_at) : "Tanggal tidak tersedia"}
                      </p>

                      {/* IMPROVED SHARE BUTTON */}
                      <div className="share-menu-container" style={{ position: 'relative' }}>
                        <button className="sharePage" onClick={handleShare}>
                          <i className="fi fi-rs-share"></i>
                          <p> Share</p>
                        </button>

                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            <main className="main-article">
              {article.image_url && (
                <div className="article-modal-image">
                  <img
                    src={article.image_url || "/placeholder.svg"}
                    alt={article.title_blog || "Artikel"}
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = "https://via.placeholder.com/800x400?text=No+Image"
                    }}
                  />
                </div>
              )}

              <div className="article-modal-body">
                {article.content_html ? (
                  <div
                    className="rendered-html"
                    dangerouslySetInnerHTML={{ __html: article.content_html }}
                  />
                ) : article.text_blog ? (
                  <div
                    className="rendered-html"
                    dangerouslySetInnerHTML={{ __html: article.text_blog }}
                  />
                ) : (
                  <p>Konten tidak tersedia</p>
                )}
              </div>

            </main>
          </div>
        </div>
      </div>
      <Footer />

      
    </div>
  )
}