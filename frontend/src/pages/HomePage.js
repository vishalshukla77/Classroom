import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import Footer from '../components/Footer';
import AlertPopup from '../components/AlertPopup'; // Import the AlertPopup component

const HomePage = () => {
  return (
    <>
      <Header />
      <Navbar />
      <Slider />
      <AlertPopup /> {/* Include the AlertPopup component */}
      <div className="container my-5">
        <h2>Welcome to the Classroom Management</h2>
        <p>This is the homepage where users are Principal,Teachers and Students</p>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
