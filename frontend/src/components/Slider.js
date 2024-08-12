import React from 'react';

const Slider = () => {
  const imageStyle = {
    width: '100%',  // Ensures the image takes full width of the container
    height: '400px', // Adjust the height to fit the slider container
    objectFit: 'cover' // Ensures the image covers the container without stretching
  };

  return (
    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="/images/p4.jpg" className="d-block" style={imageStyle} alt="Classroom" />
        </div>
       
       
      </div>
  
    </div>
  );
};

export default Slider;
