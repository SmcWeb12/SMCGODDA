import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeLoading from './components/loading/WelcomeLoading';
import LoadingLogin from './components/loading/LoadingLogin';
import NavBar from './/components/NavigationBar'; // Import the NavBar component
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Modal from './components/Modal';
import EventCalendar from './components/EventCalander';
import Slideshow from './components/SlideShow';
import Testimonials from './components/Testimonials';
import Popup from './components/Popup';
import 'animate.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';


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
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !message) {
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
      } catch (err) {
        console.error('Error fetching teachers:', err.message);
        setError('Failed to load teacher data');
      } finally {
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

  if (loadingLogin) return <LoadingLogin />;
  if (loading) return <WelcomeLoading />;
  if (loadingTeachers) return <div className="text-center text-gray-700">Loading teachers...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Popup />
      <NavBar handleLoginClick={handleLoginClick} /> {/* Use the NavBar component */}

      <header className="relative bg-cover bg-center animate__animated animate__fadeIn">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 bg-opacity-75"></div>
        <div className="relative z-10 text-white text-center py-20">
          <h1 className="text-5xl md:text-6xl font-bold animate__animated animate__bounce">Welcome to Specialist Mathematics Classes</h1>
          <p className="mt-4 text-lg md:text-xl animate__animated animate__fadeInUp">Nurturing young minds for a brighter future</p>
          <button onClick={handleLoginClick} className="mt-8 bg-yellow-500 hover:bg-yellow-400 text-white font-bold px-6 py-3 rounded-lg transition duration-300">
            Dashboard
          </button>
          <a href="https://akmxcommit.vercel.app" target="_blank" rel="noopener noreferrer">
            <button className="mt-8 ml-4 bg-white text-blue-500 font-bold px-6 py-3 rounded-lg shadow hover:bg-yellow-200 transition duration-300">
              Community
            </button>
          </a>
        </div>
      </header>

      <Slideshow />

      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-semibold mb-6 text-center">About Us</h2>
          <p className="text-lg leading-relaxed text-gray-700 text-center max-w-2xl mx-auto">
            At Specialist Mathematics Classes, we believe in fostering a holistic learning environment...
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-semibold mb-6 text-center">Meet Our Teachers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.map((teacher) => (
              <div key={teacher.id} className="bg-gray-100 shadow p-6 rounded-lg text-center transition-transform duration-300 transform hover:scale-105">
                <h3 className="text-xl font-semibold mb-2">{teacher.name}</h3>
                <p className="text-gray-600">{teacher.subject}</p>
                <button
                  onClick={() => handleContactClick(teacher)}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition duration-300"
                >
                  Contact
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {isModalOpen && (
        <Modal onClose={handleModalClose}>
          <h2 className="text-xl font-bold mb-4">Contact {selectedTeacher.name}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded py-2 px-3"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded py-2 px-3"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border rounded py-2 px-3"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition duration-300"
            >
              Send Message
            </button>
            {feedbackMessage && (
              <div className="mt-4 text-green-500">{feedbackMessage}</div>
            )}
          </form>
        </Modal>
      )}

      <EventCalendar />
      <Testimonials />
{isModalOpen && (
        <Modal onClose={handleModalClose}>
          <h2 className="text-xl font-bold mb-4">Contact {selectedTeacher.name}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded py-2 px-3"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded py-2 px-3"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border rounded py-2 px-3"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition duration-300"
            >
              Send Message
            </button>
            {feedbackMessage && (
              <div className="mt-4 text-green-500">{feedbackMessage}</div>
            )}
          </form>
        </Modal>
      )}

      <EventCalendar />


      <footer className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h4 className="font-semibold text-lg mb-4">About Us</h4>
              <p className="text-sm">
                Specialist Mathematics Classes is committed to providing high-quality education to empower young minds.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="hover:underline">Home</a></li>
                <li><a href="/about" className="hover:underline">About Us</a></li>
                <li><a href="/admissions" className="hover:underline">Admissions</a></li>
                <li><a href="/contact" className="hover:underline">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
              <p className="text-sm">
                Address: Raj Kumar Nagar, Godda, 814133, JH (India)
              </p>
              <p className="text-sm">
                Email: <a href="mailto:mukeshkapri11@gmail.com" className="hover:underline">mukeshkapri11@gmail.com</a>
              </p>
              <p className="text-sm">
                Phone: <a href="tel:+917004874159" className="hover:underline">+91 70048 74159</a>
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-center space-x-6">
            <a href="https://www.facebook.com" className="text-white hover:text-gray-300">
              <FaFacebookF />
            </a>
            <a href="https://www.twitter.com" className="text-white hover:text-gray-300">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com" className="text-white hover:text-gray-300">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com" className="text-white hover:text-gray-300">
              <FaLinkedinIn />
            </a>
          </div>
    <div className="mt-8 border-t border-gray-300 pt-4 text-center">
            <p className="text-sm">&copy; 2024 Specialist Mathematics Classes. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
