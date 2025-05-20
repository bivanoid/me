import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import FadeContent from './FadeContent';
import '../styles/feedback.css';
import { Link } from 'react-router-dom';
const supabaseUrl = 'https://gyzebdhodmnzpdufivol.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5emViZGhvZG1uenBkdWZpdm9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5OTE4ODcsImV4cCI6MjA2MTU2Nzg4N30.1XYTKLxTMHocFRM5QfCTPiRQYyE8hhZMAtFrKib8dqc';
const supabase = createClient(supabaseUrl, supabaseKey);

function Feedback() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      async function loadLatestUsers() {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(4);
  
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
    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
      <div className='feedback'>
        <h2 >— What They Say</h2>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
        {!loading && users.length === 0 && <p>No feedback yet.</p>}
        <ul className='con-user-feedback'>
          {users.map((user) => {
            const date = user.created_at
              ? new Date(user.created_at).toISOString().split('T')[0]
              : 'Unknown date';
            return (
              <li className='user-feedback' key={user.id}>
                <p className='username'><p className='fromuser'>from</p>{user.name}</p><p className='usertext'> "{user.email}"</p><p className='userdate'>{date}</p>
              </li>
            );
          })}
        </ul>
        <Link className='link-to-addfeedback' to="/add-feedback">
          <div className='link-to-addfeedback-title1'><i class="fi fi-rs-plus"></i>Add Feedback</div>
          <div className='link-to-addfeedback-title2'><i class="fi fi-rs-arrow-right"></i></div>
        </Link>
      </div>
    </FadeContent>
    
  );
}

export default Feedback;
