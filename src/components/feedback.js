"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import FadeContent from "./FadeContent"
import AnimatedContent from "./AnimatedContent"
import { Link } from "react-router-dom"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "../styles/feedback.css"

const supabaseUrl = "https://gyzebdhodmnzpdufivol.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5emViZGhvZG1uenBkdWZpdm9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5OTE4ODcsImV4cCI6MjA2MTU2Nzg4N30.1XYTKLxTMHocFRM5QfCTPiRQYyE8hhZMAtFrKib8dqc"
const supabase = createClient(supabaseUrl, supabaseKey)

// Fungsi untuk mengonversi rating ke emoji
function getEmojiFromRating(rating) {
  switch (rating) {
    case 1:
      return "😡" // Marah
    case 2:
      return "😔" // Sedih
    case 3:
      return "😐" // Netral
    case 4:
      return "😊" // Senang
    case 5:
      return "🤩" // Sangat senang
    default:
      return "❓" // Tidak diketahui
  }
}

function Feedback() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadLatestUsers() {
      // Load more items for carousel
      const { data, error } = await supabase
        .from("users")
        .select("*") // Pastikan kolom 'rating' ada di tabel
        .order("created_at", { ascending: false })
        .limit(10) // Increased limit for better carousel experience

      if (error) {
        console.error("Error loading users:", error)
        setError(error)
      } else {
        setUsers(data)
      }
      setLoading(false)
    }

    loadLatestUsers()
  }, [])

  return (
    <div className="feedback" id="sc4">
      <div className='title-swiper'>
        <AnimatedContent
          distance={50}
          direction="vertical"
          reverse={false}
          config={{ tension: 100, friction: 30 }}
          initialOpacity={0}
          animateOpacity
          threshold={1}
          delay={500}
        >
          <h1 className="title-feedback">Their <span>Feedback</span> </h1>
        </AnimatedContent>

        <AnimatedContent
          distance={50}
          direction="vertical"
          reverse={false}
          config={{ tension: 100, friction: 30 }}
          initialOpacity={0}
          animateOpacity
          threshold={0}
          delay={1000}
        >
          <p className="subtitle-feedback">their opinion of me. </p>
        </AnimatedContent>
      </div>


      {loading && <p className="loading-feedback">Loading...</p>}
      {error && (
        <p className="error-title">
          Error! <br />
          {error.message}
        </p>
      )}
      {!loading && users.length === 0 && <p className="error-fetch">No feedback yet.</p>}

      <FadeContent blur={false} duration={1500} delay={1000} easing="ease-out" initialOpacity={0}>
        <div className="swiper-container">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={{
              nextEl: ".next-fb",
              prevEl: ".prev-fb",
            }}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 0,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 0,
              },
            }}
            loop={users.length > 3}
            className="feedback-swiper"
          >
            {users.map((user) => {
              const date = user.created_at ? new Date(user.created_at).toISOString().split("T")[0] : "Unknown date"

              const emoji = getEmojiFromRating(user.rating)

              return (
                <SwiperSlide key={user.id}>
                  <div className="user-feedback swiper-slide-content">
                    <div className="feedback-quote">
                      <i className="fi fi-rs-quote-right"></i>
                    </div>
                    <div className="con-userfeedback">
                      <div className="con-usertext">
                        <p className="usertext">"{user.email}"</p>
                      </div>
                    </div>
                    <div className="con-btm-fd">
                      <p className="con-username">
                        <p className="fromuser">from</p>
                        <p className="username">{user.name}</p>
                      </p>
                      <div className="con-feedback-btm">
                        <p className="userrating">{emoji}</p>
                        <p className="userdate">{date}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className='con-swiper-button-fb'>
            <div className='prev prev-fb'>Swipe Left</div>
            {/* Custom Pagination */}
            {/* <div className="swiper-pagination-custom"></div> */}
            <div className='next next-fb'>Swipe Right</div>
          </div>


        </div>
      </FadeContent>

      <Link className="link-to-addfeedback" to="/add-feedback">
        <div className="link-to-addfeedback-title1">
          <i className="fi fi-rs-plus"></i> Add Feedback
        </div>
      </Link>
    </div>
  )
}

export default Feedback
