import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Landing = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="font-sans text-[#42383B] scroll-smooth">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-[#FFCADA] sticky top-0 z-50 shadow-sm">
        <h1 className="text-2xl font-bold tracking-wide">MentHER</h1>
        <nav className="space-x-6 text-[#42383B] font-medium">
          <a href="#about" className="hover:underline">About</a>
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/signup" className="hover:underline">Sign Up</Link>
        </nav>
      </header>

      {/* Hero Section with background and overlay */}
      <section
        className="min-h-screen bg-cover bg-center relative"
        style={{ backgroundImage: "url('/hero.png')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] z-0"></div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center px-4 min-h-screen">
          <div
            className="bg-white/85 backdrop-blur-sm px-10 py-10 shadow-lg rounded-xl max-w-xl w-full"
            data-aos="zoom-in"
          >
            {/* Typewriter Title */}
            <h2
              className="text-4xl md:text-5xl text-black font-bold mb-4 leading-snug"
              id="typewriter"
            >
              Empowering <br /> Women in Tech
            </h2>

            <p className="text-lg text-[#85586F] mb-6" data-aos="fade-up" data-aos-delay="200">
              MentHER is a mentorship platform to help women grow, learn, and connect through tech-focused guidance.
            </p>

            <Link
              to="/signup"
              className="bg-[#F4ACB7] text-black font-semibold py-3 px-6 rounded-full shadow hover:bg-[#FFB5C5] transition animate-bounce-slow"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              Join the Movement
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-[#FFE5D9] text-center">
        <h3 className="text-3xl font-semibold mb-4 text-[#4B2E38]" data-aos="fade-up">What is MentHER?</h3>
        <p className="max-w-3xl mx-auto text-[#85586F] text-lg leading-relaxed" data-aos="fade-up" data-aos-delay="200">
          MentHER is a women-first mentoring community where mentors and mentees collaborate, grow, and uplift each other.
          Whether you’re here to guide or to learn, you’ll find a space built just for you.
        </p>
      </section>
    </div>
  );
};

export default Landing;
