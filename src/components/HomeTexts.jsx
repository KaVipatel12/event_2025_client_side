import React from 'react';

function HomeTexts({heading, para}) {
  return (
    <>
      <div className="background"></div>
      <div className="container my-2">
        <div className="text-container">
          <h1> {heading} <br />
          <p className='my-3'> {para} </p> </h1>
        </div>
      </div>
    </>
  );
}

export default HomeTexts;
