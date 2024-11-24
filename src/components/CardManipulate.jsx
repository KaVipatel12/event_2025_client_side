// it contains the edit and delete button to manpulate the card

import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL;

function CardManipulate({ eventId, fetchEvents}) {
    
    const  token = localStorage.getItem("token") 
    const deleteCard = async (eventId) => {
        
        try{
            const response = await fetch(`${API_URL}/api/admin/deleteevent`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },   
                body : JSON.stringify({eventId})          
            }) 
            const data = await response.json(); 
            if(response.ok){
                toast.success(data.msg); 
                fetchEvents()
            } else{
                toast.error(data.msg); 
            }
        }catch(error){
            toast.error("There is some error in the server please try again later"); 
        }
    };
    
    return (
        <div className="card-manipulate d-flex">
            <div className="delete-card c-manipulate">
                <i 
                    className="ri-delete-bin-6-line" 
                    style={{ color: "red" }} 
                    onClick={() => deleteCard(eventId)} // Wrapped in an arrow function
                ></i>
            </div>
            <div className="update-card c-manipulate">
               <Link 
                    className="ri-pencil-fill" 
                    style={{ color: "green" }} 
                    to={`/event/updateinfo/${eventId}`}
                ></Link>
            </div>
        </div>
    );
}

export default CardManipulate;
