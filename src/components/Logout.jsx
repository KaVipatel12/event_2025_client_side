import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../store/Auth'

function Logout() {
    const {LogoutUser} = useAuth(); 
    const navigate = useNavigate(); 

    useEffect(() => {
      LogoutUser(); 
      navigate("/home")
      toast.success("Logged out successfully")
    }, { LogoutUser })
    
    useEffect(() => {
      document.title = 'Eminance 2025 - Logout';
       }, []);

  return null
}

export default Logout
