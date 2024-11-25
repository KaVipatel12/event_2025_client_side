// CartIcon.js
import React from 'react';
import { toast } from 'react-toastify';
// import { useAuth } from '../store/Auth';
import {useNavigate} from "react-router-dom"; 

const API_URL = process.env.REACT_APP_API_URL;

function Cart({ formId, category }) {

  const token = localStorage.getItem("token")
  // const {User} = useAuth(); 
  const eventName = formId;
  const navigate = useNavigate(); 

  const cartClick = async () => {
    try{
      const response = await fetch(`${API_URL}/api/event/additem/cartadd`, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({eventName , category}),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success(data.msg); 
      } else {
        toast.warning(data.msg, {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
        });
      }
    }catch(error){
      toast.warning("There is some error in server please try again later", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
      setTimeout(() => {
       navigate(-1)
      }, 2000);
    }
  };

  return (
    <i
      className="action action-button ri-shopping-cart-2-fill cart-icon press-effect"
      onClick={cartClick}
    />
  );
}

export default Cart;
