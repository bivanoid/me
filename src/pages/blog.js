import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { Link } from 'react-router-dom';
import '../styles/blogs/blog.css';
import Footer from "../components/footer";
import Alert from "../assets/Alert.png";

export default function Blog() {

    window.addEventListener('scroll', function () {
        const element = document.getElementById('info-blog');
        const rect = element.getBoundingClientRect();

        // Cek jika elemen menyentuh bagian atas viewport
        if (rect.top <= 0 && !element.classList.contains('fixed')) {
            element.style.position = 'fixed';
            element.style.top = '0';
            element.classList.add('fixed');
        }

        // Cek jika kita scroll ke atas dan elemen kembali ke posisi aslinya
        const originalTop = element.offsetTop;
        if (window.scrollY < originalTop && element.classList.contains('fixed')) {
            element.style.position = 'relative';
            element.style.top = '';
            element.classList.remove('fixed');
        }
    });
      


    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('latest'); // default filter is latest
    const [error, setError] = useState(null);
    const [connectionTest, setConnectionTest] = useState(null);

    useEffect(() => {
        // Test connection to Supabase
        async function testConnection() {
            try {
                const { data, error } = await supabase.from('blog').select('count');
                if (error) {
                    console.error('Connection test failed:', error);
                    setConnectionTest(`Koneksi gagal: ${error.message}`);
                } else {
                    console.log('Connection test successful:', data);
                    setConnectionTest('Connected');
                }
            } catch (err) {
                console.error('Connection test error:', err);
                setConnectionTest(`Error: ${err.message || String(err)}`);
            }
        }

        testConnection();
        fetchBlogs(filter);
    }, [filter]);

    // Function to fetch blogs with filtering
    async function fetchBlogs(filterType) {
        setIsLoading(true);
        setError(null);

        try {
            console.log('Fetching blogs with filter:', filterType);

            // Buat query dasar
            let query = supabase.from('blog').select('*');

            // Apply ordering based on filter type
            if (filterType === 'latest') {
                query = query.order('created_at', { ascending: false });
            } else if (filterType === 'oldest') {
                query = query.order('created_at', { ascending: true });
            } 

            // Execute query
            const { data, error } = await query;

            // Log detail dari respons untuk debugging
            console.log('Supabase response:', { data, error });

            if (error) {
                console.error('Failed to fetch data:', error);
                setError("Oh noo! " + error.message);
            } else if (!data || data.length === 0) {
                console.log('No blog data found');
                setBlogs([]);
                // Tidak perlu set error di sini karena data kosong bukanlah error
            } else {
                console.log('Blog data fetched successfully:', data);
                console.log('First item:', data[0]);
                setBlogs(data);
            }
        } catch (err) {
            console.error('Error fetching blogs:', err);
            setError('Terjadi kesalahan saat mengambil data: ' + (err.message || String(err)));
        } finally {
            setIsLoading(false);
        }
    }

    // Function to handle filter change
    function handleFilterChange(newFilter) {
        setFilter(newFilter);
    }

    function openBlog() {
        ['menuShow', 'closeBlog', 'conArticle'].forEach(id => {
            document.getElementById(id)?.classList.toggle('open-menu-blog');
        });
    }

    // Function to format date nicely
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    }

    // Function to truncate text for preview
    function truncateText(text, maxLength = 150) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }

    return (
        <div className='body-blog'>
            <div className='con-blog'>
                <main>
                    <div className='navigation-blog'>
                        <Link to='/' className='back-to-home-from-blog'><i class="fi fi-rs-undo"></i></Link>
                        <div className='menu-button-blog' onClick={openBlog}><i className="fi fi-rs-expand-arrows"></i></div>
                    </div>

                    {/* Connection test info */}
                    

                    <div className='con-article' id='conArticle'>
                        {isLoading ? (
                            <div className="loading-state">
                                <p>Memuat artikel...</p>
                            </div>
                        ) : error ? (
                            <div className="error-state">
                                <img src={Alert}></img>
                                <p>{error}</p>
                                <button className='try-again-blog' onClick={() => fetchBlogs(filter)}>Load Again</button>
                            </div>
                        ) : blogs.length === 0 ? (
                            <div className="empty-state">
                                <p>Belum ada artikel yang tersedia</p>
                            </div>
                        ) : (
                            <>
                                            <div className='info-blog' id='info-blog'>
                                    <div className='status-conection-blog'>
                                        <p><strong></strong> {connectionTest || 'Checking Connection...'}</p>
                                    </div>
                                    <div className="debug-info">
                                        <p>All: {blogs.length}</p>
                                        <p>Filter: {filter}</p>
                                    </div>
                                </div>

                                {blogs.map((blog, index) => {
                                    console.log(`Rendering blog ${index}:`, blog);
                                    return (
                                        <div className='article' key={blog.id || index}>
                                            {blog.image_url ? (
                                                <img
                                                    src={blog.image_url}
                                                    className='image-article'
                                                    alt={`Gambar untuk ${blog.title_blog || 'Artikel'}`}
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                                                    }}
                                                />
                                            ) : (
                                                <div className="placeholder-image">No Image Available</div>
                                            )}

                                            <div className='column-article'>
                                                <div className='con-profile-blog'>
                                                    <div className='photoprofile-blog'></div>
                                                    <div className='name-and-date'>
                                                        <p>{blog.author || 'Firdhan Abivandya'}</p>
                                                        <p id='date-post'>{blog.created_at ? formatDate(blog.created_at) : 'Tanggal tidak tersedia'}</p>
                                                    </div>
                                                </div>
                                                <div className='text-article'>
                                                    <h1 className='title-article'>{blog.title_blog || 'Judul tidak tersedia'}</h1>
                                                    <p className='content-article'>{blog.text_blog ? truncateText(blog.text_blog) : 'Konten tidak tersedia'}</p>
                                                    {/* {blog.id && (
                                                        <Link to={`/blog/${blog.id}`} className="read-more-link">
                                                            Baca Selengkapnya
                                                        </Link>
                                                    )} */}
                                                </div>
                                                {blog.category && (
                                                    <div className="blog-category">
                                                        <span>{blog.category}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                        )}
                    </div>
                </main>

                <div className='close-blog' id='closeBlog' onClick={openBlog}>
                    <i className="fi fi-rs-down-left-and-up-right-to-center"></i>
                </div>

                <div className='con-blog-sticky' id='menuShow'>
                    <div className='main-sticky-blog'>
                        <h1>— My Blog<span className='dot-introduction'></span></h1>
                        <div className='filter-by'>
                            <h2>Filter By</h2>
                            <ul>
                                <li
                                    className={filter === 'latest' ? 'active' : ''}
                                    onClick={() => handleFilterChange('latest')}
                                >
                                    Latest
                                </li>
                                <li
                                    className={filter === 'oldest' ? 'active' : ''}
                                    onClick={() => handleFilterChange('oldest')}
                                >
                                    Oldest
                                </li>
               
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}