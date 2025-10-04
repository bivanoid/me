import React, { useEffect, useState } from 'react';
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
  const [alertPopUp, setAlertPopUp] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  // function untuk menampilkan alert
  const showAlert = (msg) => {
    setAlertPopUp(msg);
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, 3000); // 2.5 detik sebelum animasi keluar

    setTimeout(() => {
      setAlertPopUp('');
    }, 3000); // 3 detik total, lalu hapus pesan
  };

  // Add user
  const addUser = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !rating) {
      showAlert('Please complete all required fields');
      return;
    }

    try {
      const { error } = await supabase
        .from('users')
        .insert([{ name, email, rating }]);

      if (error) {
        showAlert('Failed to submit feedback');
      } else {
        showAlert('Feedback submitted successfully!');
        setName('');
        setEmail('');
        setRating(null);
      }
    } catch (err) {
      console.error('❌ Unexpected error:', err);
      showAlert(`Unexpected error: ${err.message}`);
    }
  };

  const maxCharacters = 350;
  const remainingCharacters = maxCharacters - email.length;

  return (
    <div className="body-addfeedback">
      <div className="con-addfeedback">
        {alertPopUp && (
          <div className={`AlertPopUp ${isVisible ? "show" : "hide"}`}>
            <p><span className='red-alert'></span>{alertPopUp}</p>
          </div>
        )}

        <h2>
          <span className="logo-addfb"><Logo /></span>
          How’s the <span className="andText">Mood Today?</span>
        </h2>

        <form onSubmit={addUser}>
          <div className="con-input">
            <div className="rating-container">
              {[1, 2, 3, 4, 5].map((num) => {
                const emoji = {
                  1: '😠',
                  2: '😞',
                  3: '😐',
                  4: '😊',
                  5: '😍',
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

            <input
              className="input-textarea"
              type="text"
              placeholder="Your Name"
              value={name}
              maxLength={50}
              onChange={(e) => setName(e.target.value)}
              
            />
            <div className='conTextArea'>
              <textarea
                className="textarea-addfeedback"
                placeholder="Type Out Something (Max 350 Characters)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={maxCharacters}
              />
              <div className={`character-count 
                ${remainingCharacters <= 350 ? 'good' : ''} 
                ${remainingCharacters <= 250 ? 'ok' : ''} 
                ${remainingCharacters <= 150 ? 'warning' : ''} 
                ${remainingCharacters <= 50 ? 'stop' : ''}
                ${remainingCharacters <= 0 ? 'limit' : ''}`}>
                {remainingCharacters} / {maxCharacters}
              </div>
            </div>
            

          </div>

          <button className="button-addfeedback" type="submit">Submit</button>
        </form>

        <Link to="/" className="back-to-home-from-addfeedback">Back</Link>
      </div>
    </div>
  );
}
