import React from 'react';
import styled, { keyframes } from 'styled-components';
import NavigationBar from './NavigationBar'; // Import the navigation bar component

// Gradient Animation Keyframes
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Main Container
const AboutUsContainer = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: row; /* Default to row layout for larger screens */

  /* Media Query for Mobile */
  @media (max-width: 768px) {
    flex-direction: column; /* Stack sections vertically on smaller screens */
  }
`;

// Left Section with Gradient Background and Animation
const LeftSection = styled.div`
  flex: 1;
  background: linear-gradient(270deg, #003366, #ffcc00);  /* Blue to Yellow Gradient */
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  padding: 20px;
`;

// Moving Text Animation for School Name
const SchoolName = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

// Right Section for Content, Navigation, and Google Maps
const RightSection = styled.div`
  flex: 1;
  position: relative;
  padding: 40px;
  background-color: #f1f5ff; /* Light blue background */
  color: #333;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  /* Media Query for Mobile */
  @media (max-width: 768px) {
    padding: 20px; /* Adjust padding for smaller screens */
  }
`;

// Title and Text Styles
const SectionTitle = styled.h2`
  font-size: 40px;
  font-weight: bold;
  font-style: italic;
  color: transparent;
  -webkit-text-stroke: 1px #003366;  /* Add outline stroke in blue color */
  margin-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.6); /* White background with 60% transparency */
  padding: 10px; /* Optional: Add padding for better text visibility */
  border-radius: 15px; /* Adjust the value for the roundness */
`;

const TextBlock = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const HighlightText = styled.span`
  color: #ff6600; /* Orange */
  font-weight: bold;
`;

// Contact Information Styling
const ContactDetails = styled.div`
  margin-bottom: 20px;
`;

const ContactItem = styled.p`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

// Google Maps iframe styling
const MapIframe = styled.iframe`
  border: none;
  width: 100%;
  height: 300px;
  margin-top: 20px;
`;

const AboutUs = () => {
  return (
    <AboutUsContainer>
      {/* Left Section with Gradient */}
      <LeftSection>
        <SectionTitle>About Us</SectionTitle>
        <SchoolName>Specialist Mathematics Classes</SchoolName>
      </LeftSection>

      {/* Right Section with Content, Navbar, and Google Maps */}
      <RightSection>
        {/* Navigation Bar */}
        <NavigationBar /> {/* Use the navigation bar component */}

        <div>
          <TextBlock>
            We provide a nurturing environment for students from
            <HighlightText> 11th </HighlightText> to
            <HighlightText> 12th grade</HighlightText>,
            located in <HighlightText> Raj Kumar Nagar, Godda </HighlightText>.
          </TextBlock>
          <TextBlock>
            <HighlightText>Principal: Mr. Mukesh Kapri</HighlightText> leads our institution with a vision for academic excellence.
          </TextBlock>

          <ContactDetails>
            <ContactItem>📞 Contact Numbers: +91 70048 74159 /+91 91356 59957 </ContactItem>
            <ContactItem>📧 Email: mukeshkapri11@gmail.com</ContactItem>
          </ContactDetails>
        </div>

        {/* Google Maps iframe */}





        <MapIframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.4710822202287!2d87.2083000761082!3d24.813558647131213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f0f5e44c16513d%3A0x3b138a9170a5c39a!2sS.M.C%20GODDA%7BMATHEMATIC%20CLASSES%7D!5e0!3m2!1sen!2sin!4v1729702663795!5m2!1sen!2sin"
          allowFullScreen
          loading="lazy"
        ></MapIframe>
      </RightSection>
    </AboutUsContainer>
  );
};

export default AboutUs;
