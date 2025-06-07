import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import FadeContent from './FadeContent';
import '../styles/feedback.css';
import AnimatedContent from './AnimatedContent';
import { Link } from 'react-router-dom';

const supabaseUrl = 'https://gyzebdhodmnzpdufivol.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5emViZGhvZG1uenBkdWZpdm9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5OTE4ODcsImV4cCI6MjA2MTU2Nzg4N30.1XYTKLxTMHocFRM5QfCTPiRQYyE8hhZMAtFrKib8dqc';
const supabase = createClient(supabaseUrl, supabaseKey);

// Fungsi untuk mengonversi rating ke emoji
function getEmojiFromRating(rating) {
  switch (rating) {
    case 1:
      return '😡'; // Marah
    case 2:
      return '😔'; // Sedih
    case 3:
      return '😐'; // Netral
    case 4:
      return '😊'; // Senang
    case 5:
      return '🤩'; // Sangat senang
    default:
      return '❓'; // Tidak diketahui
  }
}

function Feedback() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadLatestUsers() {
      
      const smallscreen = window.innerWidth < 700;
      const { data, error } = await supabase
        .from('users')
        .select('*') // Pastikan kolom 'rating' ada di tabel
        .order('created_at', { ascending: false })
        .limit(smallscreen ? 4 : 6);

      if (error) {
        console.error('Error loading users:', error);
        setError(error);
      } else {
        setUsers(data);
      }
      setLoading(false);
    }

    loadLatestUsers();
  }, []);

  return (
    <div className='feedback'>
      <AnimatedContent
        distance={30}
        direction="vertical"
        reverse={false}
        config={{ tension: 80, friction: 20 }}
        initialOpacity={0.2}
        threshold={1}
      >
        <h1 className='title-feedback'>— What They Say</h1>
      </AnimatedContent>

      <AnimatedContent
        distance={10}
        direction="vertical"
        reverse={false}
        config={{ tension: 80, friction: 20 }}
        initialOpacity={1}
        threshold={1}
      >
        <p className='subtitle-feedback'>their opinion of me. </p>
      </AnimatedContent>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {!loading && users.length === 0 && <p>No feedback yet.</p>}

      <FadeContent blur={false} duration={1500} easing="ease-out" initialOpacity={0}>
        <ul className='con-user-feedback'>
          {users.map((user) => {
            const date = user.created_at
              ? new Date(user.created_at).toISOString().split('T')[0]
              : 'Unknown date';

            const emoji = getEmojiFromRating(user.rating);

            return (
              <li className='user-feedback' key={user.id}>
                <div className='feedback-quote'><i className="fi fi-rs-quote-right"></i></div>
                <div className='con-userfeedback'>
                  <p className='con-username'>
                    <p className='fromuser'>from</p>
                    <p className='username'>{user.name}</p>
                  </p>
                  <div className='con-usertext'>
                    <p className='usertext'>"{user.email}"</p>
                  </div>
                </div>
                <div className='con-feedback-btm'>
                  <p className='userrating'>{emoji}</p>
                  <p className='userdate'>{date}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </FadeContent>

      <Link className='link-to-addfeedback' to="/add-feedback">
        <div className='link-to-addfeedback-title1'><i className="fi fi-rs-plus"></i> Add Feedback</div>
      </Link>
    </div>
  );
}

export default Feedback;
