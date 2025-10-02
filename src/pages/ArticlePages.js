"use client"

import { useEffect, useState, useContext } from "react"
import { useParams, useLocation, useNavigate, Link } from "react-router-dom"
import { supabase } from "./supabaseClient"
import "../styles/blogs/blog.css"
import Footer from "../components/footer"
import Backic from "../iconSvg/backic"
import { LenisContext } from "../App"

const handleShare = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: document.title,
        text: 'Cek halaman ini!',
        url: window.location.href
      });
      console.log('Berhasil dibagikan');
    } catch (error) {
      console.error('Gagal membagikan', error);
    }
  } else {
    alert('Fitur share tidak didukung di browser ini.');
  }
};

export default function ArticlePage() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const lenisRef = useContext(LenisContext)

  // Reset scroll position saat halaman article dibuka
  useEffect(() => {
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }
  }, [lenisRef])

  useEffect(() => {
    // Try to get article from navigation state first
    if (location.state?.article) {
      setArticle(location.state.article)
      setIsLoading(false)
    } else if (id) {
      // If no state, fetch from database
      fetchArticle(id)
    } else {
      setError("No article ID provided")
      setIsLoading(false)
    }
  }, [id, location.state])

  async function fetchArticle(articleId) {
    try {
      const { data, error } = await supabase.from("blog").select("*").eq("id", articleId).single()

      if (error) {
        console.error("Failed to fetch article:", error)
        setError("Failed to load article: " + error.message)
      } else if (data) {
        setArticle(data)
      } else {
        setError("Article not found")
      }
    } catch (err) {
      console.error("Error fetching article:", err)
      setError("Error loading article: " + (err.message || String(err)))
    } finally {
      setIsLoading(false)
    }
  }

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("id-ID", options)
  }

  function handleGoBack() {
    // Reset Lenis scroll dengan force
    if (lenisRef?.current) {
      lenisRef.current.stop();
      lenisRef.current.scrollTo(0, {
        immediate: true,
        force: true,
        lock: true
      });

      // Tunggu sebentar sebelum navigasi
      setTimeout(() => {
        navigate('/blog', {
          replace: true,
          state: {
            refreshBlog: true,
            timestamp: Date.now(),
            restoreScroll: true
          }
        });
      }, 50);
    } else {
      // Fallback tanpa Lenis
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0

      navigate('/blog', {
        replace: true,
        state: {
          refreshBlog: true,
          timestamp: Date.now(),
          restoreScroll: true
        }
      });
    }
  }

  if (isLoading) {
    return (
      <div className="body-blog">
        <div className="loading-state">
          <p>Loading Article...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="body-blog">
        <div className="error-state">
          <p>{error}</p>
          <button className="try-again-blog" onClick={handleGoBack}>
            Go Back
          </button>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="body-blog">
        <div className="error-state">
          <p>Article not found</p>
          <button className="try-again-blog" onClick={handleGoBack}>
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="body-blog">
      <div className="article-modal-overlay" style={{ background: "transparent" }}>
        <div className="article-modal" style={{ border: "none" }}>
          <div className="article-modal-content">
            <aside className="asside-article">
              <div className="asside-main">
                <button
                  onClick={handleGoBack}
                  className="close-article-btn"
                  style={{ cursor: 'pointer' }}
                >
                  <Backic />
                </button>
                <h1 className="article-modal-title">{article.title_blog || "Judul tidak tersedia"}</h1>
                <div className="con-user-uploader">
                  <div className="author-photo"></div>
                  <div className="article-modal-author">
                    <div className="author-info">
                      <p className="author-name">{article.author || "Firdhan Abivandya"}</p>
                      <p className="publish-date">
                        {article.created_at ? formatDate(article.created_at) : "Tanggal tidak tersedia"}
                      </p>
                      <button className="sharePage" onClick={handleShare} ><i className="fi fi-rs-share"></i><p> Share</p></button>
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

              <div className="article-modal-text">
                <div className="article-modal-meta">
                  {article.category && (
                    <div className="article-modal-category">
                      <span>{article.category}</span>
                    </div>
                  )}
                </div>

                <div className="article-modal-body">
                  <p
                    className="rendered-html"
                    dangerouslySetInnerHTML={{ __html: article.text_blog || "Konten tidak tersedia" }}
                  ></p>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}