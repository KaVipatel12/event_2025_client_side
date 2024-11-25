import React, { useEffect, useState, useCallback } from "react";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import Cart from "./Cart";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import CardManipulate from "./CardManipulate";
import { useAuth } from "../store/Auth";

const API_URL = process.env.REACT_APP_API_URL;

function TechnicalEvents() {
  const { User } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);

  // Wrap fetchEvents in useCallback to ensure a stable reference
  const fetchEvents = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/event/technicalevents`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.ok) {
        setLoading(false);
        setEvents(Array.isArray(data.events) ? data.events : []);
      } else {
        toast.error(data.msg, {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error("There is some error in the server. Please try again later.", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
      setTimeout(() => {
        navigate(-1);
      }, 5000);
    }
  }, [navigate]); // Add dependencies if needed (like `navigate`)

  const cartSubmit = (event) => {
    // Add further logic to handle cart submission
  };

  useEffect(() => {
    if (User) {
      setUser(User);
    }
  }, [User]);

  useEffect(() => {
    fetchEvents();
    document.title = "Eminance 2025 - Technical Events";
  }, [fetchEvents]); // Add fetchEvents to the dependency array

  return (
    <>
      <Navbar />
      <div className="container my-2">
        <SearchBar />

        {/* Show loader only when loading is true */}
        {loading ? (
          <center>
            <div className="loading-container">
              <Loading />
            </div>
          </center>
        ) : (
          <div className="cardEvents" id="cardsContainer">
            {events.length > 0 ? (
              events.map((event, index) => (
                <div
                  className="card my-3 mx-3 card-events"
                  key={event._id}
                  data-event-name={event.tech_event_name}
                >
                  <img
                    src={`${API_URL}${event.tech_event_image}`}
                    alt={event.tech_event_name}
                    className="card-img-top img-fluid"
                    style={{ height: "200px", objectFit: "cover", width: "300px" }}
                  />
                  {user.controll === 2 && (
                    <CardManipulate eventId={event._id} fetchEvents={fetchEvents} />
                  )}
                  <div className="card-body" style={{ width: 300 }}>
                    <h5 className="card-title">
                      {event.tech_event_name
                        ? event.tech_event_name.split("_").join(" ")
                        : "No Name Available"}
                    </h5>
                    <p className="card-text">
                      {event.tech_event_description.slice(0, 50) + "..."}
                    </p>
                    <form
                      className="cartForm"
                      id={`eventForm${index}`}
                      onClick={() => cartSubmit(event)}
                    >
                      <input
                        type="hidden"
                        name="eventId"
                        defaultValue={event._id}
                      />
                      <input
                        type="hidden"
                        name="eventName"
                        defaultValue={event.tech_event_name}
                      />
                      <input
                        type="hidden"
                        name="userId"
                        defaultValue="user_id_placeholder"
                      />
                    </form>
                    <div className="card-bottom crd-btm">
                      <Link
                        to={`/technicalEvents/${event.tech_event_name}`}
                        className="btn"
                        style={{ backgroundColor: "goldenrod", color: "white" }}
                      >
                        Browse
                      </Link>
                      <Cart formId={event.tech_event_name} category={"technical"} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No events available</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default TechnicalEvents;
