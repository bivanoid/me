import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import "../styles/addfeedback/addfeedback.css";
import { Link } from 'react-router-dom';
import Logo from '../components/logo';
// Supabase config
const supabaseUrl = 'https://gyzebdhodmnzpdufivol.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5emViZGhvZG1uenBkdWZpdm9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5OTE4ODcsImV4cCI6MjA2MTU2Nzg4N30.1XYTKLxTMHocFRM5QfCTPiRQYyE8hhZMAtFrKib8dqc';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AddFeedback() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [rating, setRating] = useState(null);

    // Add user
    const addUser = async (e) => {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !rating) {
            alert('Name, description, and rating are required.');
            return;
        }

        try {
            const { error } = await supabase.from('users').insert([{ name, email, rating }]);
            if (error) {
                alert(`❌ Failed to add user: ${error.message}`);
            } else {
                alert('✅ Comment added!');
                setName('');
                setEmail('');
                setRating(null);
            }
        } catch (err) {
            console.error('❌ Unexpected error:', err);
            alert(`Unexpected error: ${err.message}`);
        }
    };

    return (
        <div className='body-addfeedback'>
            <div className='con-addfeedback'>
                
                <h2><span className='logo-addfb'><Logo/></span>How’s the <span className='andText'>Mood Today?</span>
                </h2>
                <form onSubmit={addUser}>
                    <div className='con-input'>
                        <div className="rating-container">
                        {[1, 2, 3, 4, 5].map((num) => {
                            const emoji = {
                                1: '😠', // marah
                                2: '😞', // kecewa
                                3: '😐', // netral
                                4: '😊', // senang
                                5: '😍', // cinta banget
                            }[num];

                            return (
                                <div
                                    key={num}
                                    className={`rating-box ${rating === num ? 'selected' : ''}`}
                                    onClick={() => setRating(num)}
                                >
                                    <span className="emoji">{emoji}</span>
                                </div>
                            );
                        })}
                    </div>

                    <input className='input-textarea'
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <textarea className='textarea-addfeedback' placeholder="Type Out Something (Max 350 Character)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        maxLength={350}
                        required>

                    </textarea>
                    </div>
                    <button className='button-addfeedback' type="submit">Submit</button>
                    
                </form>
                <Link to='/' className='back-to-home-from-addfeedback'>Back</Link>
            </div>
        </div>
    );
}
