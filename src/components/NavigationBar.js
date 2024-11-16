import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NavBar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
  };

  return (
    <nav className="sticky top-0 bg-blue-500 p-4 shadow-md z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Specialist Mathematics Classes</div>
        
        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>

        {/* Full NavBar for Desktop */}
        <ul className="hidden lg:flex space-x-4">
          <li><Link to="/" className="text-white hover:text-yellow-300">Home</Link></li>
          <li><Link to="/about-us" className="text-white hover:text-yellow-300">About Us</Link></li>
          <li>
            <a
              href="https://smcmathquiz.vercel.app/home"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-yellow-300"
            >
              MathQuiz
            </a>
          </li>
          <li>
            <a
              href="https://smc-gk-gs-godda-izvcuorku-smcweb12s-projects.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-yellow-300"
            >
              GkGs
            </a>
          </li>
          <li><Link to="/courses" className="text-white hover:text-yellow-300">Courses</Link></li>
          <li>
            <button
              onClick={handleLoginClick}
              className="text-white hover:text-yellow-300"
            >
              Login
            </button>
          </li>
        </ul>
      </div>

      {/* Slide-Out Menu for Mobile */}
      {isMobileMenuOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={menuVariants}
          transition={{ type: 'tween', duration: 0.5 }}
          className="fixed top-0 right-0 w-3/4 h-full bg-blue-600 shadow-lg z-20 lg:hidden"
        >
          <div className="p-4 flex flex-col space-y-4 text-white">
            <button
              onClick={toggleMobileMenu}
              className="text-white self-end text-2xl focus:outline-none"
            >
              <i className="fas fa-times"></i>
            </button>
            <Link to="/" onClick={toggleMobileMenu} className="hover:text-yellow-300 text-lg">
              Home
            </Link>
            <Link to="/about-us" onClick={toggleMobileMenu} className="hover:text-yellow-300 text-lg">
              About Us
            </Link>
            <a
              href="https://smcmathquiz.vercel.app/home"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 text-lg"
            >
              MathQuiz
            </a>
            <a
              href="https://smc-gk-gs-godda.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 text-lg"
            >
              GkGs
            </a>
            <Link to="/courses" onClick={toggleMobileMenu} className="hover:text-yellow-300 text-lg">
              Courses
            </Link>
            <button
              onClick={() => {
                handleLoginClick();
                toggleMobileMenu();
              }}
              className="hover:text-yellow-300 text-lg"
            >
              Login
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default NavBar;
