import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import "../styles/addfeedback/addfeedback.css";
// Supabase config
const supabaseUrl = 'https://gyzebdhodmnzpdufivol.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5emViZGhvZG1uenBkdWZpdm9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5OTE4ODcsImV4cCI6MjA2MTU2Nzg4N30.1XYTKLxTMHocFRM5QfCTPiRQYyE8hhZMAtFrKib8dqc';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AddFeedback() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [connected, setConnected] = useState(true);

    // Load users
    const loadUsers = async () => {
        try {
            const { data, error } = await supabase.from('users').select('*');
            if (error) {
                console.error('❌ Error loading users:', error);
                setUsers([]);
            } else {
                setUsers(data);
            }
        } catch (err) {
            console.error('❌ Unexpected error:', err);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    // Add user
    const addUser = async (e) => {
        e.preventDefault();
        if (!name.trim() || !email.trim()) {
            alert('Name and email are required.');
            return;
        }

        try {
            const { error } = await supabase.from('users').insert([{ name, email }]);
            if (error) {
                alert(`❌ Failed to add user: ${error.message}`);
            } else {
                alert('✅ User added!');
                setName('');
                setEmail('');
                loadUsers();
            }
        } catch (err) {
            console.error('❌ Unexpected error:', err);
            alert(`Unexpected error: ${err.message}`);
        }
    };

    // Delete user
    const deleteUser = async (id) => {
        try {
            const { error } = await supabase.from('users').delete().eq('id', id);
            if (error) {
                alert(`❌ Failed to delete user: ${error.message}`);
            } else {
                alert('✅ User deleted');
                loadUsers();
            }
        } catch (err) {
            console.error('❌ Unexpected error:', err);
            alert(`Unexpected error: ${err.message}`);
        }
    };

    // Check Supabase connection
    const checkConnection = async () => {
        try {
            const { error } = await supabase
                .from('users')
                .select('count', { count: 'exact', head: true });
            if (error) {
                console.error('❌ Supabase connection error:', error);
                setConnected(false);
            } else {
                setConnected(true);
            }
        } catch (err) {
            console.error('❌ Supabase connection failed:', err);
            setConnected(false);
        }
    };

    useEffect(() => {
        checkConnection().then((ok) => {
            if (ok) loadUsers();
        });
    }, []);

    return (
        <div className='con-addfeedback'>
            <h2>User Manager</h2>

            {!connected ? (
                <p style={{ color: 'red' }}>❌ Cannot connect to Supabase.</p>
            ) : loading ? (
                <p>Loading users...</p>
            ) : users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <div>
                    {users.map((user) => (
                        <div key={user.id} style={{ marginBottom: '10px' }}>
                            <span>
                                {user.name} ({user.email})
                            </span>
                            <button onClick={() => deleteUser(user.id)} style={{ marginLeft: '10px' }}>
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <hr />
            <h3>Add New User</h3>
            <form onSubmit={addUser}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />{' '}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />{' '}
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

