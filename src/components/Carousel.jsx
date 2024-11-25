import React from 'react';

function Carousel({ images }) {
  return (
    <div id="carouselExampleSlidesOnly" className="carousel slide my-0 w-100" data-bs-ride="carousel">
      <div className="carousel-inner w-100 h-100">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? 'active' : ''}`}
            data-bs-interval="2000"
          >
            <img src={image} className="d-block w-100 h-100" alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
