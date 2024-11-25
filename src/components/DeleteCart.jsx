// DeleteButton.js
import React from 'react';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL;

function DeleteCart({ eventName, fetchCart }) {
  const token = localStorage.getItem("token");
 
  const handleDelete = async() => {
    try {
      const response = await fetch(`${API_URL}/api/event/deleteitem/${eventName}`, {
        method: "DELETE",
        headers: {
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${token}`,
        },
      });

      const deleteData = await response.json();

      if (response.ok) {
        toast.success(deleteData.msg); 
        fetchCart(); // Refresh the cart after successful deletion
      } else {
        toast.warning(deleteData.msg, {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
        });
      }
    } catch (error) {
      toast.warning("There is some error in server please try again later", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
    }
  };

  return (
    <i
      className="ri-delete-bin-6-line delete-icon"
      onClick={handleDelete}
    />
  );
}

export default DeleteCart;
