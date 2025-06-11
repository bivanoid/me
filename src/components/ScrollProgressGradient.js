import { useEffect, useState } from "react";

// Scroll Progress Gradient Component
function ScrollProgressGradient({
    className = "",
    colors = ["#3b82f6", "#8b5cf6", "#ef4444"],
    height = "4px",
    container = null
}) {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const updateScrollProgress = () => {
            const element = container || document.documentElement;
            const scrollTop = container ? element.scrollTop : window.scrollY;
            const scrollHeight = container ? element.scrollHeight - element.clientHeight : element.scrollHeight - window.innerHeight;
            const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
            setScrollProgress(Math.min(Math.max(progress, 0), 100));
        };

        const targetElement = container || window;
        targetElement.addEventListener("scroll", updateScrollProgress);
        updateScrollProgress(); // Initial calculation

        return () => targetElement.removeEventListener("scroll", updateScrollProgress);
    }, [container]);

    const gradientColors = colors.join(", ");

    return (
        <div
            className={`scroll-progress-gradient ${className}`}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                height: height,
                background: `linear-gradient(to right, ${gradientColors})`,
                transformOrigin: "left",
                transform: `scaleX(${scrollProgress / 100})`,
                transition: "transform 0.1s ease-out",
                zIndex: 9999,
                borderRadius: "0 2px 2px 0"
            }}
        />
    );
}

// Demo Component dengan Article Modal yang sudah dimodifikasi
export default function BlogWithScrollProgress() {
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);

    // Sample blog data untuk demo
    const sampleArticle = {
        id: 1,
        title_blog: "Mengoptimalkan Performa Website dengan React dan Modern CSS",
        author: "Firdhan Abivandya",
        created_at: "2024-06-10T10:00:00Z",
        category: "Web Development",
        image_url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
        text_blog: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.

Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.

Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.

Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.`
    };

    function openArticle(article) {
        setSelectedArticle(article);
        setIsArticleModalOpen(true);
    }

    function closeArticle() {
        setSelectedArticle(null);
        setIsArticleModalOpen(false);
    }

    function formatDate(dateString) {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("id-ID", options);
    }

    useEffect(() => {
        function handleEscapeKey(event) {
            if (event.key === "Escape" && isArticleModalOpen) {
                closeArticle();
            }
        }

        document.addEventListener("keydown", handleEscapeKey);
        return () => document.removeEventListener("keydown", handleEscapeKey);
    }, [isArticleModalOpen]);

    return (
        <div style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
            {/* Global Scroll Progress untuk halaman utama */}
            <ScrollProgressGradient
                colors={["#3b82f6", "#8b5cf6", "#ef4444"]}
                height="4px"
            />

            {/* Demo Content */}
            <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
                <h1 style={{ marginBottom: "2rem", color: "#1f2937" }}>
                    Blog Demo dengan Scroll Progress Gradient
                </h1>

                <div
                    onClick={() => openArticle(sampleArticle)}
                    style={{
                        border: "1px solid #e5e7eb",
                        borderRadius: "12px",
                        padding: "1.5rem",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        backgroundColor: "#fff",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
                    }}
                >
                    <img
                        src={sampleArticle.image_url}
                        alt={sampleArticle.title_blog}
                        style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            marginBottom: "1rem"
                        }}
                    />
                    <h3 style={{ color: "#1f2937", marginBottom: "0.5rem" }}>
                        {sampleArticle.title_blog}
                    </h3>
                    <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
                        {sampleArticle.author} • {formatDate(sampleArticle.created_at)}
                    </p>
                    <p style={{
                        color: "#4b5563",
                        marginTop: "0.5rem",
                        fontSize: "0.9rem"
                    }}>
                        {sampleArticle.text_blog.substring(0, 150)}...
                    </p>
                    <span style={{
                        color: "#3b82f6",
                        fontSize: "0.9rem",
                        fontWeight: "500"
                    }}>
                        Klik untuk membaca selengkapnya →
                    </span>
                </div>
            </div>

            {/* Article Modal dengan Scroll Progress */}
            {isArticleModalOpen && selectedArticle && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        zIndex: 1000,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "2rem"
                    }}
                    onClick={closeArticle}
                >
                    <div
                        style={{
                            backgroundColor: "white",
                            borderRadius: "12px",
                            maxWidth: "900px",
                            width: "100%",
                            maxHeight: "90vh",
                            overflow: "hidden",
                            position: "relative",
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Scroll Progress untuk Modal */}
                        <ScrollProgressGradient
                            colors={["#10b981", "#3b82f6", "#8b5cf6"]}
                            height="3px"
                            container={document.querySelector('.article-modal-content')}
                        />

                        {/* Header */}
                        <div style={{
                            padding: "1rem 2rem",
                            borderBottom: "1px solid #e5e7eb",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor: "#f9fafb"
                        }}>
                            <h2 style={{
                                margin: 0,
                                color: "#1f2937",
                                fontSize: "1.25rem",
                                fontWeight: "600"
                            }}>
                                {selectedArticle.title_blog}
                            </h2>
                            <button
                                onClick={closeArticle}
                                style={{
                                    background: "none",
                                    border: "none",
                                    fontSize: "1.5rem",
                                    cursor: "pointer",
                                    color: "#6b7280",
                                    padding: "0.5rem",
                                    borderRadius: "6px",
                                    transition: "all 0.2s ease"
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = "#f3f4f6";
                                    e.target.style.color = "#374151";
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = "transparent";
                                    e.target.style.color = "#6b7280";
                                }}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Content */}
                        <div
                            className="article-modal-content"
                            style={{
                                height: "calc(90vh - 80px)",
                                overflowY: "auto",
                                padding: "0"
                            }}
                        >
                            {/* Author Info */}
                            <div style={{
                                padding: "2rem 2rem 1rem 2rem",
                                borderBottom: "1px solid #f3f4f6"
                            }}>
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1rem",
                                    marginBottom: "1rem"
                                }}>
                                    <div style={{
                                        width: "48px",
                                        height: "48px",
                                        borderRadius: "50%",
                                        backgroundColor: "#3b82f6",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "white",
                                        fontWeight: "600"
                                    }}>
                                        {selectedArticle.author?.[0] || "F"}
                                    </div>
                                    <div>
                                        <p style={{
                                            margin: 0,
                                            fontWeight: "600",
                                            color: "#1f2937"
                                        }}>
                                            {selectedArticle.author || "Firdhan Abivandya"}
                                        </p>
                                        <p style={{
                                            margin: 0,
                                            color: "#6b7280",
                                            fontSize: "0.9rem"
                                        }}>
                                            {selectedArticle.created_at ? formatDate(selectedArticle.created_at) : "Tanggal tidak tersedia"}
                                        </p>
                                    </div>
                                </div>

                                {selectedArticle.category && (
                                    <span style={{
                                        display: "inline-block",
                                        backgroundColor: "#eff6ff",
                                        color: "#1d4ed8",
                                        padding: "0.25rem 0.75rem",
                                        borderRadius: "9999px",
                                        fontSize: "0.8rem",
                                        fontWeight: "500"
                                    }}>
                                        {selectedArticle.category}
                                    </span>
                                )}
                            </div>

                            {/* Image */}
                            {selectedArticle.image_url && (
                                <div style={{ padding: "0 2rem" }}>
                                    <img
                                        src={selectedArticle.image_url}
                                        alt={selectedArticle.title_blog || "Artikel"}
                                        style={{
                                            width: "100%",
                                            height: "300px",
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                            marginBottom: "2rem"
                                        }}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://via.placeholder.com/800x300?text=No+Image";
                                        }}
                                    />
                                </div>
                            )}

                            {/* Article Content */}
                            <div style={{
                                padding: "0 2rem 2rem 2rem",
                                lineHeight: "1.7",
                                color: "#374151"
                            }}>
                                {selectedArticle.text_blog?.split('\n\n').map((paragraph, index) => (
                                    <p key={index} style={{
                                        marginBottom: "1.5rem",
                                        fontSize: "1.1rem"
                                    }}>
                                        {paragraph}
                                    </p>
                                )) || <p>Konten tidak tersedia</p>}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}