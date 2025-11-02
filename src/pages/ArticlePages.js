"use client"

import { useEffect, useState, useContext } from "react"
import { useParams, useLocation, useNavigate, Link } from "react-router-dom"
import { supabase } from "./supabaseClient"
import "../styles/blogs/blog.css"
import Footer from "../components/footer"
import Backic from "../iconSvg/backic"
import { LenisContext } from "../App"
import mammoth from "mammoth"

import Prism from "prismjs";
import "../styles/prism-custom.css"; // bisa diganti misal prism-okaidia.css
/* dependensi utama */
import "prismjs/components/prism-clike";
import "prismjs/components/prism-markup"; // HTML dasar

/* bahasa umum */
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-python";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-java";

/* untuk PHP */
import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-php";
import "prismjs/components/prism-php-extras";

/* SQL dan JSON */
import "prismjs/components/prism-sql";
import "prismjs/components/prism-json";



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
  const [htmlContent, setHtmlContent] = useState(null)
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

  // Fungsi untuk mengkonversi DOCX ke HTML
  async function convertDocxToHtml(docxUrl) {
    try {
      const response = await fetch(docxUrl)
      const arrayBuffer = await response.arrayBuffer()

      const result = await mammoth.convertToHtml({ arrayBuffer })
      return result.value // HTML string
    } catch (error) {
      console.error("Error converting DOCX to HTML:", error)
      return null
    }
  }

  useEffect(() => {
    // Try to get article from navigation state first
    if (location.state?.article) {
      const articleData = location.state.article
      setArticle(articleData)

      // Jika sudah ada htmlContent dari blog page, langsung gunakan
      if (articleData.htmlContent) {
        setHtmlContent(articleData.htmlContent)
        setIsLoading(false)
        setTimeout(() => Prism.highlightAll(), 100)
      }
      else if (id) {
        fetchArticle(id) // Pastikan ini dipanggil
      } else {
        setIsLoading(false)
      }
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
      const { data, error } = await supabase
        .from("blog")
        .select("*")
        .eq("id", articleId)
        .single()

      if (error) {
        console.error("Failed to fetch article:", error)
        setError("Failed to load article: " + error.message)
        setIsLoading(false)
      } else if (data) {
        setArticle(data)

        // Konversi DOCX ke HTML jika ada
        if (data.docx_url) {
          const html = await convertDocxToHtml(data.docx_url)
          setHtmlContent(html)
        }

        setIsLoading(false)
      } else {
        setError("Article not found")
        setIsLoading(false)
      }
    } catch (err) {
      console.error("Error fetching article:", err)
      setError("Error loading article: " + (err.message || String(err)))
      setIsLoading(false)
    }
  }

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("id-ID", options)
  }

  function handleGoBack() {
    // Gunakan navigate(-1) untuk kembali ke history sebelumnya
    // Dengan state untuk restore scroll position
    navigate(-1, {
      state: { restoreScroll: true }
    })
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
                      <Link to="/" className="author-name">{article.author || "/Firdhan Abivandya"}</Link>
                      <p className="publish-date">
                        {article.created_at ? formatDate(article.created_at) : "Tanggal tidak tersedia"}
                      </p>
                      <button className="sharePage" onClick={handleShare}>
                        <i className="fi fi-rs-share"></i>
                        <p> Share</p>
                      </button>
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
                  {htmlContent ? (
                    <div
                      className="rendered-html"
                      dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                  ) : (
                    <p
                      className="rendered-html"
                      dangerouslySetInnerHTML={{
                        __html: article.text_blog || "Konten tidak tersedia"
                      }}
                    />
                  )}
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