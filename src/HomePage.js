import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaBars, FaTimes } from 'react-icons/fa'; 
import WelcomeLoading from './components/loading/WelcomeLoading';
import LoadingLogin from './components/loading/LoadingLogin';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Modal from './components/Modal';
import EventCalendar from './components/EventCalander';
import Slideshow from './components/SlideShow';
import 'animate.css';
import Testimonials from './components/Testimonials';
import Popup from './components/Popup';

const HomePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [loadingTeachers, setLoadingTeachers] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setFeedbackMessage('Please fill in all fields.');
      return;
    }
    setFeedbackMessage('Message sent successfully!');
    setName('');
    setEmail('');
    setMessage('');
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const teachersCollection = collection(db, 'teachers');
        const teachersSnapshot = await getDocs(teachersCollection);
        const teachersList = teachersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTeachers(teachersList);
        setLoadingTeachers(false);
      } catch (err) {
        console.error('Error fetching teachers:', err.message);
        setError('Failed to load teacher data');
        setLoadingTeachers(false);
      }
    };

    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    fetchTeachers();

    return () => clearTimeout(loadingTimeout);
  }, []);

  const handleLoginClick = () => {
    setLoadingLogin(true);
    setTimeout(() => {
      setLoadingLogin(false);
      navigate('/login');
    }, 3000);
  };

  const handleContactClick = useCallback((teacher) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTeacher(null);
  };

  if (loadingLogin) {
    return <LoadingLogin />;
  }

  if (loading) {
    return <WelcomeLoading />;
  }

  if (loadingTeachers) {
    return <div className="text-center text-gray-700">Loading teachers...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Popup />
      {/* NAVBAR */}
      <nav className="sticky top-0 bg-blue-500 p-4 shadow-md z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">Specialist Mathematics</div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <ul
            className={`${
              menuOpen ? 'block' : 'hidden'
            } md:flex space-y-4 md:space-y-0 md:space-x-4 absolute md:relative bg-blue-500 md:bg-transparent w-full md:w-auto top-16 md:top-0 left-0 md:left-auto p-4 md:p-0`}
          >
            <li>
              <Link to="/" className="text-white hover:text-yellow-300">Home</Link>
            </li>
            <li>
              <Link to="/about-us" className="text-white hover:text-yellow-300">About Us</Link>
            </li>
            <li>
              <a href="https://smcmathquiz.vercel.app/home" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-300">
                MathQuiz
              </a>
            </li>
            <li>
              <a href="https://smc-gk-gs-godda-izvcuorku-smcweb12s-projects.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-300">
                GkGs
              </a>
            </li>
            <li>
              <Link to="/courses" className="text-white hover:text-yellow-300">Courses</Link>
            </li>
            <li>
              <button onClick={handleLoginClick} className="text-white hover:text-yellow-300">Login</button>
            </li>
          </ul>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header
        className="relative bg-cover bg-center text-center text-white py-20"
        style={{ backgroundImage: `url('your-image.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-80"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold animate__animated animate__bounce">Welcome</h1>
          <p className="mt-4 text-lg md:text-xl animate__animated animate__fadeInUp">
            Nurturing young minds for a brighter future
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={handleLoginClick}
              className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold px-6 py-3 rounded-lg transition duration-300"
            >
              Dashboard
            </button>
            <a href="https://akmxcommit.vercel.app" target="_blank" rel="noopener noreferrer">
              <button className="bg-white text-blue-500 font-bold px-6 py-3 rounded-lg shadow hover:bg-yellow-200 transition duration-300">
                Community
              </button>
            </a>
          </div>
        </div>
      </header>
      
      {/* Additional Components */}
      <Slideshow />
      <Testimonials />
      <EventCalendar />
    </div>
  );
};

export default HomePage;
