import React from 'react';
import Navbar from './Navbar';
import '../Nabvar.css'; // Import your CSS file for styling
import Carousel from './Carousel';
import HomeTexts from './HomeTexts';
import HomeImageCard from './HomeImageCard';
function Home() {
  const images = [
    '/Images/3.jpg',
    '/Images/1.png',
    '/Images/4.jpg'
  ];
  const text = [
    "Experience the thrill of competition in technical field as well as non-tech field. Join us in celebrating athleticism and sportsmanship as our college hosts an array of dynamic sports events for all to enjoy."
  ];

  const imageCard ={
    techImg : '/Images/tech.jpg', 
    techredirect : "/technicalevents",
    nontechImg : '/Images/nontech.jpg', 
    nontechredirect : "/nontechnicalevents" 
  }

  return (
    <>
      <Navbar />
      <div className="main">
        <Carousel images={images} />
        <HomeTexts heading={text}/>

          <div className="container mt-3" id="noneid">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <HomeImageCard imageCard={imageCard.techImg} redirectLink={imageCard.techredirect} />
              </div>
              <div className="col-md-6">
                <HomeImageCard imageCard={imageCard.nontechImg} redirectLink={imageCard.nontechredirect}/>                
              </div>
            </div>
          </div>

      </div>
    </>
  );
}

export default Home;
