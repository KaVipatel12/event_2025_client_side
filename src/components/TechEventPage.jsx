import React, { useEffect, useState } from "react";
import HomeTexts from "./HomeTexts";
import Video from "./Video";
import Navbar from "./Navbar";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/Auth";
import Loading from "./Loading";

function TechEventPage() {
  const { technicalevent } = useParams();
  const [eventItem, setEventItem] = useState([]);
  const [expand, setExpand] = useState(false);
  const [user, setUser] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false); // Track login status
  const [loading, setLoader] = useState(true);
  const { User, purchaseEventsFromMainPage } = useAuth();

  const fetchEvent = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/event/technicalevents/${technicalevent}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setEventItem(data.msg);
        setLoader(false);
      } else {
        toast.error(data.msg || "Failed to fetch event details.", {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
        });
        setLoader(false);
      }
    } catch (error) {
      toast.error("There is some error in the server, Please try again later", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  useEffect(() => {
    if (User && User.purchaseProduct) {
      setUser(User.purchaseProduct);
      setLoggedIn(true); // Set loggedIn based on user data presence
    } else {
      setLoggedIn(false); // No user data means not logged in
    }
  }, [User]);

  const fetchPurchaseEvent = async () => {
    purchaseEventsFromMainPage(eventItem.tech_event_name, "technical");
  };

  const toggleExpand = () => {
    setExpand(!expand);
  };
  useEffect(() => {
    document.title =
      `Eminance 2025 - ${technicalevent.split("_").join(" ")}` ||
      "Eminance 2025";
  }, []);
  return (
    <>
      <Navbar />
      <center>{loading && <Loading />}</center>

      <div className="container">
        <Video />
      </div>
      <div>
        <HomeTexts
          heading={
            eventItem.tech_event_name?.split("_").join(" ") || "Event Title"
          }
          para={eventItem.tech_event_description || "Event Description"}
        />

        <div className="background" />
        <div className="container my-2 rules-container">
          <div className="text-container">
            <h1>
              Event Rules <br />
              <p className="my-2">
                {eventItem.tech_event_rules
                  ? expand
                    ? eventItem.tech_event_rules
                    : `${eventItem.tech_event_rules.slice(0, 100)}...`
                  : "No rules provided"}
                {eventItem.tech_event_rules && (
                  <span
                    onClick={toggleExpand}
                    id="myBtn"
                    style={{ color: "white", background: "purple" }}
                  >
                    {expand ? "Read Less" : "Read More"}
                  </span>
                )}
              </p>
            </h1>
          </div>
        </div>
      </div>
      {loggedIn &&
        (user.length === 0 ||
          user.every(
            (element) => element.product !== eventItem.tech_event_name
          )) && (
          <>
            <div className="fixed-bottom my-3">
              <div className="container money-main-container">
                <div className="card footer-wrapper">
                  <div className="card-body left-card">
                    <h5 className="card-title purchase-footer flex-card flex-card-title">
                      You haven't participated yet:
                    </h5>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    ₹100
                    </button>
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
                      ₹100
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

export default TechEventPage;
