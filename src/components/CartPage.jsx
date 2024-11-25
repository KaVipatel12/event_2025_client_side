import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import DeleteCart from './DeleteCart';
import { useAuth } from '../store/Auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from './Loading';
import EventPrice from './EventPrice';  // Import the new EventPrice component

const API_URL = process.env.REACT_APP_API_URL;

function CartPage() {
  const { User } = useAuth();
  const [loggedIn, setLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCost, setTotalCost] = useState(0);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (User) {
      setLoggedIn(true);
    }
  }, [User]);

  // Function to check if there's any technical event in the cart
const hasTechnicalEvent = (cartItems) => {
  return cartItems.some(item => item.category === 'technical');
};

// Calculate the total cost
// Calculate the total cost
const fetchCart = async () => {
  try {
    const response = await fetch(`${API_URL}/api/event/cart`, {
      method: "GET",
      headers: {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${token}`,
      }
    });

    const data = await response.json();

    if (response.ok) {
      setLoading(false);
      const cartData = data.msg && Array.isArray(data.msg) ? data.msg : [];
      setCart(cartData);

      // Check if there are any technical events in the cart
      const isTechnicalAdded = hasTechnicalEvent(cartData);

      // Calculate the total cost based on whether a technical event is added
      let total = 0;
      let freeNonTechUsed = false; // Track if we've given one free non-tech event

      cartData.forEach(item => {
        if (item.category === 'technical') {
          total += 100; // ₹100 for each technical event
        } else if (item.category === 'non-technical' && isTechnicalAdded && !freeNonTechUsed) {
          total += 0; // First non-technical game is free
          freeNonTechUsed = true; // Set that the first non-tech game is free
        } else {
          total += 100; // ₹100 for other non-technical events
        }
      });

      setTotalCost(total); // Set total cost for all events
    } else {
      setLoading(false);
      toast.error(data.msg || "Error fetching cart items.", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
    }
  } catch (err) {
    setLoading(false);
    toast.error("There is some error in the server. Please try again later.", {
      position: "top-right",
      autoClose: 5000,
      theme: "light",
    });
    setTimeout(() => {
      navigate(-1);
    }, 2000);
  }
};

  useEffect(() => {
    fetchCart();
    document.title = 'Eminance 2025- Cart Page'; // Update the title
  }, []);
  
  const fetchPurchaseEvent = async () => {
    if (cart && cart.length > 0) {
      const requestData = { events: cart };
  
      try {
        const response = await fetch(`${API_URL}/api/event/purchaseevent`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(requestData)
        });
  
        if (response.ok) {
          const blob = await response.blob(); // Get the PDF as a Blob
          const url = window.URL.createObjectURL(blob);
          
          // Create a link to download the PDF
          const a = document.createElement('a');
          a.href = url;
          a.download = 'purchased_events.pdf'; // Set the file name
          document.body.appendChild(a);
          a.click(); // Trigger download
          window.URL.revokeObjectURL(url);
          a.remove();
          
          toast.success("Purchase successful! PDF downloaded.");
          navigate("/home")
        } else {
          const data = await response.json();
          toast.error(data.msg || "Purchase failed.");
        }
      } catch (error) {
        toast.error("Server error, please try again later.");
      }
    } else {
      toast.error("Please add an event to proceed further.");
    }
  };


  return (
    <>
      <Navbar />
      <center>
        {!loggedIn ? (
          <div className="null-cart my-3">
            <div className="col-md-4 cart-item">
              <div className="card mb-4" style={{ backgroundColor: 'white' }}>
                <div className="card-body">
                  <h5 className="card-title" style={{ color: 'purple' }}>
                    Add your favourite events to the cart
                  </h5>
                </div>
              </div>
            </div>
          </div>
        ) : (
          loading ? (
            <Loading />
          ) : cart.length === 0 ? (
            <div className="col-md-4 cart-item my-4">
              <div className="card mb-4" style={{ backgroundColor: 'white' }}>
                <div className="card-body">
                  <h5 className="card-title" style={{ color: 'purple' }}>
                    Cart is empty
                  </h5>
                  <p className="card-text" style={{ color: 'darkblue' }}>
                    Add your favourite events to the cart
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="container">
              <div className="row my-3">
                {cart.map((item, index) => (
                  <div className="col-md-4 cart-item" key={index} data-event={item}>
                    <div className="card mb-4" style={{ backgroundColor: 'white' }}>
                      <div className="card-body">
                        <h5 className="card-title" style={{ color: 'purple' }}>
                          Event {index + 1}
                        </h5>
                        <p className="card-text" style={{ color: 'darkblue' }}>
                          {item.eventName.split("_").join(" ")}
                        </p>
                        <p className="card-text" style={{ color: 'darkblue' }}>
                          Category: {item.category}
                        </p>
                        <div className="card-bottom">
                          <EventPrice category={item.category} isTechnicalAdded={hasTechnicalEvent(cart)} />
                          <DeleteCart eventName={item.eventName} fetchCart={fetchCart} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="fixed-bottom my-3">
                <div className="container">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title purchase-footer">
                        Participation Fees: ₹{totalCost}
                        <a href="#" id="totalAmountButton" className="btn btn-success" onClick={fetchPurchaseEvent}>
                          Checkout
                        </a>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </center>
    </>
  );
}

export default CartPage;
