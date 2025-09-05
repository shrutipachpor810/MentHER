import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Landing = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-back'
    });
  }, []);

  return (
    <div className="font-sans text-[#42383B] scroll-smooth">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-[#F4ACB7] flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#4B2E38]">MentHER</h1>
        </div>
        
        <nav className="hidden md:flex space-x-8 text-[#42383B] font-medium">
          <a href="#about" className="hover:text-[#85586F] transition-colors">About</a>
          <Link to="/login" className="hover:text-[#85586F] transition-colors">Login</Link>
          <Link to="/signup" className="bg-[#F4ACB7] text-white px-5 py-2 rounded-full font-medium hover:bg-[#FFB5C5] transition-colors">Sign Up</Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <button className="md:hidden text-[#42383B] focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </header>

      {/* Hero Section with Parallax */}
      <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
        {/* Background with Parallax Effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('/hero.png')" }}
        ></div>
        
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 py-20 max-w-4xl mx-auto">
          <div 
            className="bg-white/90 backdrop-blur-sm px-10 py-12 shadow-xl rounded-2xl"
            data-aos="fade-up"
            data-aos-easing="ease-out-back"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-[#4B2E38]">
              Empowering Women in Tech
            </h1>
            <p className="text-lg text-[#85586F] mb-8 max-w-2xl mx-auto">
              MentHER connects women with industry leaders to foster growth, learning, and meaningful connections in the tech world.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/signup"
                className="bg-[#F4ACB7] text-white font-semibold py-3 px-8 rounded-full shadow-md hover:bg-[#FFB5C5] transition-colors"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                Find a Mentor
              </Link>
              <Link
                to="/signup?mentor=true"
                className="bg-white text-[#F4ACB7] border-2 border-[#F4ACB7] font-semibold py-3 px-8 rounded-full shadow-md hover:bg-[#FFE5D9] transition-colors"
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                Become a Mentor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div 
              className="p-6 transform transition-all duration-500 hover:scale-105"
              data-aos="fade-up"
              data-aos-easing="ease-out-back"
              data-aos-delay="100"
            >
              <div className="text-4xl font-bold text-[#F4ACB7] mb-2">5,000+</div>
              <div className="text-[#85586F]">Women Mentored</div>
            </div>
            <div 
              className="p-6 transform transition-all duration-500 hover:scale-105"
              data-aos="fade-up"
              data-aos-easing="ease-out-back"
              data-aos-delay="200"
            >
              <div className="text-4xl font-bold text-[#F4ACB7] mb-2">500+</div>
              <div className="text-[#85586F]">Expert Mentors</div>
            </div>
            <div 
              className="p-6 transform transition-all duration-500 hover:scale-105"
              data-aos="fade-up"
              data-aos-easing="ease-out-back"
              data-aos-delay="300"
            >
              <div className="text-4xl font-bold text-[#F4ACB7] mb-2">92%</div>
              <div className="text-[#85586F]">Career Growth Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-[#FFE5D9]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className="text-3xl font-bold mb-6 text-[#4B2E38]"
            data-aos="fade-up"
            data-aos-easing="ease-out-back"
          >What is MentHER?</h2>
          <p 
            className="text-lg text-[#85586F] mb-12 max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-easing="ease-out-back"
            data-aos-delay="100"
          >
            MentHER is a dedicated mentorship platform connecting women in tech with experienced industry leaders. 
            We provide a supportive community for skill development, career guidance, and professional growth.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div 
              className="bg-white p-8 rounded-xl shadow-md transform transition-all duration-500 hover:scale-105 hover:shadow-xl"
              data-aos="fade-up"
              data-aos-easing="ease-out-back"
              data-aos-delay="200"
            >
              <div className="w-16 h-16 rounded-full bg-[#F4ACB7]/20 flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-[#F4ACB7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#4B2E38]">Personalized Matching</h3>
              <p className="text-[#85586F]">Our algorithm matches mentees with mentors based on skills, goals, and compatibility.</p>
            </div>
            
            <div 
              className="bg-white p-8 rounded-xl shadow-md transform transition-all duration-500 hover:scale-105 hover:shadow-xl"
              data-aos="fade-up"
              data-aos-easing="ease-out-back"
              data-aos-delay="300"
            >
              <div className="w-16 h-16 rounded-full bg-[#F4ACB7]/20 flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-[#F4ACB7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#4B2E38]">Safe & Supportive</h3>
              <p className="text-[#85586F]">A secure, inclusive environment where women can openly share challenges and aspirations.</p>
            </div>
            
            <div 
              className="bg-white p-8 rounded-xl shadow-md transform transition-all duration-500 hover:scale-105 hover:shadow-xl"
              data-aos="fade-up"
              data-aos-easing="ease-out-back"
              data-aos-delay="400"
            >
              <div className="w-16 h-16 rounded-full bg-[#F4ACB7]/20 flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-[#F4ACB7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#4B2E38]">Career Acceleration</h3>
              <p className="text-[#85586F]">Resources and opportunities designed to accelerate your tech career journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-[#4B2E38] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className="text-3xl font-bold mb-6"
            data-aos="fade-up"
            data-aos-easing="ease-out-back"
          >Ready to Transform Your Career?</h2>
          <p 
            className="text-lg mb-10 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-easing="ease-out-back"
            data-aos-delay="100"
          >
            Join thousands of women who have advanced their careers through mentorship.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/signup"
              className="bg-[#F4ACB7] text-[#4B2E38] px-8 py-3 rounded-full font-bold hover:bg-[#FFB5C5] transition-colors"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              Join as Mentee
            </Link>
            <Link
              to="/signup?mentor=true"
              className="bg-transparent text-white border-2 border-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              Become a Mentor
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#42383B] text-[#FFE5D9]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#F4ACB7] flex items-center justify-center">
                  <span className="text-[#4B2E38] font-bold">M</span>
                </div>
                <h3 className="text-xl font-bold text-white">MentHER</h3>
              </div>
              <p>Empowering women in tech through mentorship.</p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
          
          <div className="border-t border-[#4B2E38] mt-8 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} MentHER. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;