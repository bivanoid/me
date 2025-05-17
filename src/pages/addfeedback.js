import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import "../styles/addfeedback/addfeedback.css";
import { Link } from 'react-router-dom';

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
            alert('Name, email, and rating are required.');
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
            <svg width="100" height="100" viewBox="0 0 120 121" fill="none" xmlns="http://www.w3.org/2000/svg" class="plus-particle" background="red"><path d="M64.5 55H120V64H64.5V120.5H55.5V64H0V55H55.5V0.5H64.5V55Z" fill="#D9D9D9"></path></svg>
            <svg className='con-star con-star1' width="100" height="100" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <path class="star star1" d="M107.729 40.5811C112.721 66.7848 133.215 87.2792 159.419 92.2705L200 100L159.419 107.729C133.215 112.721 112.721 133.215 107.729 159.419L100 200L92.2705 159.419C87.2792 133.215 66.7848 112.721 40.5811 107.729L0 100L40.5811 92.2705C66.7848 87.2792 87.2792 66.7848 92.2705 40.5811L100 0L107.729 40.5811Z" fill="#D9D9D9"></path>
            </svg>
            <svg className='con-star con-star2' width="100" height="100" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <path class="star star2" d="M107.729 40.5811C112.721 66.7848 133.215 87.2792 159.419 92.2705L200 100L159.419 107.729C133.215 112.721 112.721 133.215 107.729 159.419L100 200L92.2705 159.419C87.2792 133.215 66.7848 112.721 40.5811 107.729L0 100L40.5811 92.2705C66.7848 87.2792 87.2792 66.7848 92.2705 40.5811L100 0L107.729 40.5811Z" fill="#D9D9D9"></path>
            </svg>
            <svg className='con-star con-star3' width="100" height="100" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <path class="star star3" d="M107.729 40.5811C112.721 66.7848 133.215 87.2792 159.419 92.2705L200 100L159.419 107.729C133.215 112.721 112.721 133.215 107.729 159.419L100 200L92.2705 159.419C87.2792 133.215 66.7848 112.721 40.5811 107.729L0 100L40.5811 92.2705C66.7848 87.2792 87.2792 66.7848 92.2705 40.5811L100 0L107.729 40.5811Z" fill="#D9D9D9"></path>
            </svg>
            <div className='con-addfeedback'>
                <Link to='/' className='back-to-home-from-addfeedback'><p>Back</p></Link>
                <h2>— How Do I Make You Feel?
                </h2>
                <form onSubmit={addUser}>
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
                    <textarea className='textarea-addfeedback' placeholder="Type Out Something"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required>


                    </textarea>
                    <button className='button-addfeedback' type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}
