// EventPrice.js
import React from 'react';

const EventPrice = ({ category, isTechnicalAdded }) => {
  const calculateCost = (category, isTechnicalAdded) => {
    if (category === 'technical') {
      return 100; // ₹100 for each technical event
    }
    // Non-technical events are free if a technical event exists
    return isTechnicalAdded ? 0 : 100; // ₹100 unless technical event exists
  };

  return (
    <p className="card-text" style={{ color: 'green' }}>
      Rate: ₹{calculateCost(category, isTechnicalAdded)}
    </p>
  );
};

export default EventPrice;
