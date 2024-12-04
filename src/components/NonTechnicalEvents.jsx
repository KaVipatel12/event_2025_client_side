import React, { useCallback, useEffect, useState } from 'react';
import Navbar from './Navbar';
import SearchBar from './SearchBar';
import Cart from './Cart';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Loading from './Loading';
import CardManipulate from './CardManipulate';
import { useAuth } from '../store/Auth';

const API_URL = "process.env.REACT_APP_API_URL";

function NonnontechnicalEvents() {
  const {User} = useAuth()
  const [events, setEvent] = useState([]);
  const [loading, setLoading] = useState(true); // Start with loading as true
  const [user, setUser] = useState(true); // Start with loading as true
  const navigate = useNavigate();
  
  const fetchEvents = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/event/nontechnicalevents`, {
        method: "GET",
        headers: {
          "Content-Type": 'application/json',
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setLoading(false); // Data is loaded, so set loading to false
        setEvent(Array.isArray(data.events) ? data.events : []); // Adjusted data structure
      } else {
        setLoading(true); // Error occurred, so stop loading
        toast.error("There is some error in the server, Please try again later", {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
        });
        setTimeout(() => {
          navigate(-1);
        }, 5000);
      }
    } catch (error) {
      setLoading(false); // Error occurred, so stop loading
      toast.error("There is some error in the server, Please try again later", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
      setTimeout(() => {
        navigate(-1);
      }, 5000);
    }
  }, [navigate]);
 
  useEffect(() => {
    if(User){
     setUser(User); 
    }
   }, [User]);

  useEffect(() => {
    fetchEvents();
      document.title = `Eminance 2025 - NonTechnical Events`;
  }, [fetchEvents]);
  
  useEffect(() => {
      document.title = `Eminance 2025 - NonTechnical Events`;
  }, []);

  return (
    <>
      <Navbar />
      <div className="container my-2">
        <SearchBar />
        {/* Loader is shown only when loading is true */}
        {loading ? (
          <center>
            <div className="loading-container">
              <Loading />
            </div>
          </center>
        ) : (
          <div className="cardEvents card-event" id="cardsContainer">
            {events.map((event, index) => (
              <div className="card my-3 mx-3" key={event._id} data-event-name={event.nontech_event_name}>
                {/* Adjusted image path to match the backend response */}
                <img 
                  src={`${API_URL}/uploads/${event.nontech_event_image}`} 
                  style={{ height: 200, objectFit: 'cover', width: "300px"}} 
                  className="card-img" 
                  alt={event.nontech_event_image} 
                  loading="lazy"
                />

               {user.controll && 
               <CardManipulate eventId={event._id} fetchEvents={fetchEvents}  />
               }

                <div className="card-body" style={{ width: "300px" }}>
                  <h5 className="card-title">{event.nontech_event_name.split('_').join(' ')}</h5>
                  <form className="cartForm" id={`eventForm${index}`} action="/cartAdd" method="post">
                    <input type="hidden" name="eventId" defaultValue={event._id} />
                    <input type="hidden" name="eventName" defaultValue={event.nontech_event_name} />
                    <input type="hidden" name="userId" defaultValue="user_id_placeholder" /> {/* Replace with actual user ID */}
                  </form>
                  <div className="card-bottom crd-btm">
                    <Link to={`/nontechnicalEvents/${event.nontech_event_name}`} className="btn" style={{ backgroundColor: 'goldenrod', color: 'white' }}>
                      Browse
                    </Link>
                    <Cart formId={event.nontech_event_name} category={"non-technical"} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default NonnontechnicalEvents;
