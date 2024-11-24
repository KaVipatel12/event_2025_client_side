import React, { useEffect, useState } from "react";
import { useAuth } from "../store/Auth";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL;

function CardInfoEdit() {
  const { User } = useAuth();
  const [user, setUser] = useState([]);
  const [eventName, setEventName] = useState("")
  const [eventDescription, setDescription] = useState("")
  const [eventRules, setRules] = useState("")
  const navigate = useNavigate();
  const {eventId} = useParams(); 
  const token = localStorage.getItem("token")
  useEffect(() => {
    if (User) {
      setUser(User.controll);
    }
  }, [User]);
     
  useEffect(() => {
    document.title = "Eminance 2025 - Edit Card";
  }, []);

  const editData = {
    eventName, eventDescription, eventRules, eventId
  }

  const editEventInfo = async (e) => {
    e.preventDefault(); 
    
    try{
    const response = await fetch(`${API_URL}/api/admin/updateevent`, {
      method : "PUT", 
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },   
    body : JSON.stringify(editData)  
    })

    const result = await response.json(); 

    if(response.ok){
      toast.success(result.msg)
      navigate(-1)
    }else{
      toast.error(result.msg)
    }
  }catch(error){
    toast.error("There is some error in the server please try again later")
  }
  }
  return (
    <>
      {user === 2 ? (
        <>
          <div className="container mt-5">
            <div className="card shadow">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Edit Events</h5>
              </div>
              <div className="card-body">
                <form onSubmit={editEventInfo}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Event Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={eventName}
                      placeholder="Enter your name"
                      onChange={(e) => setEventName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Event Description
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      value={eventDescription}
                      rows={4}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter your message"
                      required
                      defaultValue={""}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                      Event Rules
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      value={eventRules}
                      rows={4}
                      onChange={(e) => setRules(e.target.value)}
                      placeholder="Enter your message"
                      required
                      defaultValue={""}
                    />
                  </div>
                  <button type="submit" className="btn btn-success w-100">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default CardInfoEdit;
