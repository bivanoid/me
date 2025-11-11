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



export default function ArticlePage() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [htmlContent, setHtmlContent] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const lenisRef = useContext(LenisContext)

  // Reset scroll position
  useEffect(() => {
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }
  }, [lenisRef])

  // Konversi DOCX ke HTML
  async function convertDocxToHtml(docxUrl) {
    try {
      const response = await fetch(docxUrl)
      const arrayBuffer = await response.arrayBuffer()
      const result = await mammoth.convertToHtml({ arrayBuffer })
      return result.value
    } catch (error) {
      console.error("Error converting DOCX to HTML:", error)
      return null
    }
  }

  useEffect(() => {
    // Tunggu Prism siap
    if (typeof window !== "undefined") {
      const prism = window.Prism || Prism;
      if (prism) {
        // beri jeda sedikit biar DOM updated dulu
        const timeout = setTimeout(() => prism.highlightAll(), 50);
        return () => clearTimeout(timeout);
      }
    }
  }, [htmlContent]);


  // FIXED: Single unified fetch
  useEffect(() => {
    const loadArticle = async () => {
      try {
        setIsLoading(true)

        // Cek apakah ada data dari navigation state
        if (location.state?.article) {
          const articleData = location.state.article
          setArticle(articleData)

          // Jika sudah ada htmlContent, langsung gunakan
          if (articleData.htmlContent) {
            setHtmlContent(articleData.htmlContent)
          } else if (articleData.docx_url) {
            const html = await convertDocxToHtml(articleData.docx_url)
            setHtmlContent(html)
          }

          setIsLoading(false)
          return
        }

        // Jika tidak ada state, fetch dari database
        if (!id) {
          setError("No article ID provided")
          setIsLoading(false)
          return
        }

        console.log('Fetching article with ID:', id)

        // FIXED: Gunakan tabel 'blog' (sesuai dengan fetchArticle asli)
        const { data, error: fetchError } = await supabase
          .from('blog')
          .select('*')
          .eq('id', id)
          .single()

        console.log('Supabase response:', { data, error: fetchError })

        if (fetchError) {
          console.error('Error fetching:', fetchError)
          setError("Failed to load article: " + fetchError.message)
          setIsLoading(false)
          return
        }

        if (!data) {
          setError("Article not found")
          setIsLoading(false)
          return
        }

        setArticle(data)

        // Konversi DOCX ke HTML jika ada
        if (data.docx_url) {
          const html = await convertDocxToHtml(data.docx_url)
          setHtmlContent(html)
        }

        setIsLoading(false)

      } catch (err) {
        console.error("Error loading article:", err)
        setError("Error loading article: " + (err.message || String(err)))
        setIsLoading(false)
      }
    }

    loadArticle()
  }, [id, location.state])

  useEffect(() => {
    // Tunggu PrismJS global dari window
    if (window.Prism) {
      window.Prism.highlightAll();
    }
  }, [htmlContent]);

  // Advanced Share Handler
  const handleShare = async () => {
    const shareData = {
      title: article?.title_blog || document.title,
      text: `Baca artikel: ${article?.title_blog || 'Artikel Menarik'}`,
      url: window.location.href
    }

    // Cek apakah browser support native share (mobile/modern browser)
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData)
        console.log('Berhasil dibagikan via native share')
      } catch (error) {
        // User cancelled atau error
        if (error.name !== 'AbortError') {
          console.error('Error sharing:', error)
          // Fallback ke custom menu
          setShowShareMenu(true)
        }
      }
    } else {
      // Desktop atau browser tanpa native share - tampilkan menu custom
      setShowShareMenu(true)
    }
  }

  // Share ke platform sosial media
  const shareToSocial = (platform) => {
    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent(article?.title_blog || 'Artikel Menarik')

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${title}%20${url}`,
      telegram: `https://t.me/share/url?url=${url}&text=${title}`
    }

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400')
      setShowShareMenu(false)
    }
  }

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("id-ID", options)
  }

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showShareMenu && !e.target.closest('.share-menu-container')) {
        setShowShareMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showShareMenu])

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
          <Link className="try-again-blog" to='/'>
            Go Back
          </Link>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="body-blog">
        <div className="error-state">
          <p>Article not found</p>
          <Link className="try-again-blog" to='/'>
            Go Back
          </Link>
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

                        {/* Custom Share Menu */}
                        {showShareMenu && (
                          <div className="share-dropdown">
                        

                            <div className="share-divider"></div>

                            <button onClick={() => shareToSocial('whatsapp')} className="share-option">
                              <i className="fi fi-brands-whatsapp"></i>
                              <span>WhatsApp</span>
                            </button>

                            <button onClick={() => shareToSocial('twitter')} className="share-option">
                              <i className="fi fi-brands-twitter"></i>
                              <span>Twitter</span>
                            </button>

                            <button onClick={() => shareToSocial('facebook')} className="share-option">
                              <i className="fi fi-brands-facebook"></i>
                              <span>Facebook</span>
                            </button>

                            <button onClick={() => shareToSocial('linkedin')} className="share-option">
                              <i className="fi fi-brands-linkedin"></i>
                              <span>LinkedIn</span>
                            </button>

                            <button onClick={() => shareToSocial('telegram')} className="share-option">
                              <i className="fi fi-brands-telegram"></i>
                              <span>Telegram</span>
                            </button>
                          </div>
                        )}
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