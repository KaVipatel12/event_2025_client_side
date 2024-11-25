import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

const API_URL = process.env.REACT_APP_API_URL;

function OtpAuth() {
    const [otp, setOtp] = useState(""); 
    const [loading, setLoader] = useState(false)
    const navigate = useNavigate(); 
    
    const fetchOtpAuth = async (e) => {
        e.preventDefault();
        setLoader(true)
        // Check if email is present before sending the request
        if (!otp) {
            toast.error("Otp cannot be empty!");
            return;
        }
        
        
        try {
            const response = await fetch(`${API_URL}/api/auth/otpverification`, {
                method: "POST",
                headers: {  
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({otp}),  // Ensure email is part of the JSON object
                credentials: 'include'

            });
            
            const result = await response.json();
            
            if (response.ok) {
                setLoader(false)
                localStorage.removeItem('email');
                navigate("/user/update/updatepassword");
                toast.success(result.msg);
            } else {
                setLoader(false)
                toast.error(result.msg);
            }
        } catch (err) {
            setLoader(false)
            toast.error("There is some problem in the server please try again later");
        }
    };
    useEffect(() => {
        document.title = `Eminance 2025 - OTP Verify`;
         }, []);
    return (
        <>
            <Navbar />
            <center>
            {loading && <Loading/> }
            </center>
            
            <div className="container" style={{ maxWidth: '500px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <form onSubmit={fetchOtpAuth}>
                    <div className="mb-3" style={{ marginBottom: '15px' }}>
                        <label htmlFor="exampleInputEmail1" className="form-label" style={{ fontWeight: 'bold', color: '#333', display: 'block', marginBottom: '5px', color : "white" }}>
                            Enter the Otp 
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)} 
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '1rem',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                outline: 'none',
                                boxSizing: 'border-box',
                            }}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '10px', fontSize: '1rem', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>
                        Submit
                    </button>
                </form>
            </div>
        </>
    )
}

export default OtpAuth;
