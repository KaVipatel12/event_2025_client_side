import React, { useEffect, useState } from 'react';
import Carousel from './Carousel';
import HomeTexts from './HomeTexts';
import Video from './Video';
import Navbar from './Navbar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../store/Auth';
import Loading from './Loading';

const API_URL = process.env.REACT_APP_API_URL;

function NonTechEventPage() {
  const { nontechnicalevent } = useParams();
  const [eventItem, setEventItem] = useState([]);
  const [expand, setExpand] = useState(false);
  const [user, setUser] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoader] = useState(true);
  const [nonTechFree, setNonTechPrice] = useState(true);
  const { User, purchaseEventsFromMainPage } = useAuth();
  const images = ["/Images/1.jpg", "/Images/2.jpg", "/Images/3.jpg"];

  const fetchEvent = async () => {
    try {
      const response = await fetch(`${API_URL}/api/event/nontechnicalevents/${nontechnicalevent}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        setLoader(false);
        setEventItem(data.msg);
      } else {
        setLoader(false);
        toast.error(data.msg || "Failed to fetch event details.", {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
        });
      }
    } catch (error) {
      setLoader(false);
      toast.error("There is some error in the server, Please try again later", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  useEffect(() => {
    if (User && User.purchaseProduct) {
      setUser(User.purchaseProduct);
      
      // Set nonTechFree to true only if the user has only technical events and no non-technical events
      const hasOnlyTechnical = User.purchaseProduct.some(item => item.category === "technical") &&
      !User.purchaseProduct.some(item => item.category === "non-technical");
      setNonTechPrice(hasOnlyTechnical);
      setLoggedIn(true)
    } else {
      setLoggedIn(false);
    }
  }, [User]);

  const fetchPurchaseEvent = async () => {
    purchaseEventsFromMainPage(eventItem.nontech_event_name, "non-technical");
  };

  const toggleExpand = () => {
    setExpand(!expand);
  };
  useEffect(() => {
    document.title = `Eminance 2025 - ${nontechnicalevent.split("_").join(" ")}` || "Eminance 2025";
     }, []);
  return (
    <>
      <Navbar />
      <center>{loading && <Loading />}</center>
      <div>
        <div className="container">
          <Video />
        </div>
        <HomeTexts heading={eventItem.nontech_event_name?.split("_").join(" ") || 'Event Title'} para={eventItem.nontech_event_description || 'Event Description'} />


        <div className="background" />
        <div className="container my-2 rules-container">
        <div className="text-container">
          <h1>
            Event Rules <br />
            <p className='my-2'>
            {eventItem.nontech_event_rules ? 
              (expand ? eventItem.nontech_event_rules : `${eventItem.nontech_event_rules.slice(0, 100)}...`) 
              : 'No rules provided'}
            {eventItem.nontech_event_rules && (
              <span onClick={toggleExpand} id="myBtn" style={{ color: "white", background: "purple" }}>
                {expand ? 'Read Less' : 'Read More'}
              </span>
            )}
            </p>
          </h1>    
        </div>
      </div>


      </div>
      {loggedIn && (user.length === 0 || user.every(element => element.product !== eventItem.nontech_event_name)) && (
        <>
         <div className="fixed-bottom my-3">
          <div className="container money-main-container">
            <div className="card footer-wrapper">
              <div className="card-body left-card">
                <h5 className="card-title purchase-footer flex-card flex-card-title">
                  You haven't participated yet: 
                </h5>
                  {nonTechFree ? (
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Free
                    </button>
                  ) : (
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    ₹100
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* pop out model  */}
        <div
              className="modal fade"
              id="exampleModal"
              tabIndex={-1}
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <p className="modal-title fs-5" id="exampleModalLabel">
                      Do you want to purchase this event? 
                    </p>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <Link
                      to="#"
                      id="totalAmountButton"
                      className="btn btn-success"
                      onClick={fetchPurchaseEvent}
                    >
                      Purchase Event
                    </Link>
                  </div>
                </div>
              </div>
            </div>
        </>
      )}
      
    </>
  );
}

export default NonTechEventPage;
