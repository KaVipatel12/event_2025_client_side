import React, { useEffect, useState } from 'react';
import useRef from 'react';
import "../Auth.css";
import { useAuth } from "../store/Auth";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha"

const API_URL = process.env.REACT_APP_API_URL;
const SITE_KEY = process.env.REACT_APP_CAPTCHA_KEY; 

function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [college_name, setCollege_name] = useState('');
  const [department, setDepartment] = useState('');
  const [mobile, setMobile] = useState('');
  const [enrollment, setEnrollment] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const { storeTokenLocalStorage } = useAuth();
  const [recaptcha, setRecaptcha] = useState("");
  const captchaRef = useRef()
  const [loading , setLoader] = useState(false); 
  const navigate = useNavigate();

  const userData = {
    email, password, username, college_name, department, mobile, enrollment, recaptcha
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();

    captchaRef.current.reset(); 
    setLoader(true)
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setLoader(false)
        const token = data.token;
        storeTokenLocalStorage(token);
        toast.success('Registration Successful', {
          position: "top-right",
          autoClose: 5000,
          theme: "light"
        });
        navigate("/home");
      } else {
        setLoader(false)
        toast.error(data.extraDetails ? data.extraDetails : data.message, {
          position: "top-right",
          autoClose: 5000,
          theme: "light"
        });
      }
    } catch (error) {
      setLoader(false)
      toast.error("Error sending data to backend", {
        position: "top-right",
        autoClose: 5000,
        theme: "light"
      });
    }
  };
  
  useEffect(() => {
    document.title = `Eminance 2025 - Registration`;
     }, []);

  return (
    <>
    <div className="main-login">
      <div className="wrapper">
        <div className="title">Registration Form</div>
        <form onSubmit={handleRegistrationSubmit}>
          <div className="field">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Username</label>
          </div>
          <div className="field">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email Address</label>
          </div>
          <div className="field">
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
            <label>Phone number</label>
          </div>
          <div className="field" style={{ position: 'relative' }}>
              <input
                type={showPassword ? ("password") : ("text")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%', 
                  paddingRight: '30px', // space for the icon on the right side
                }}
              />
            <i 
              className={showPassword ? "bx bx-show" : "bx bxs-hide"}
              onClick={() => setShowPassword(set => !set)} // Corrected toggle logic
              style={{
                position: 'absolute', 
                right: '10px', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                cursor: 'pointer'
              }}
            ></i>
              <label>Password</label>
            </div>

          <div className="field">
            <input
              type="text"
              value={college_name}
              onChange={(e) => setCollege_name(e.target.value)}
              required
            />
            <label>College Name</label>
          </div>
          <div className="field">
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
            <label>Department</label>
          </div>
          <div className="field">
            <input
              type="text"
              value={enrollment}
              onChange={(e) => setEnrollment(e.target.value)}
              required
            />
            <label>Enrollment number</label>
          </div>
            <div className="form-group mt-2">
              <ReCAPTCHA 
               sitekey={SITE_KEY }
               onChange={(value) => {setRecaptcha(value)}}
               ref={captchaRef}
              />
            </div>
          <div className="content">
            <div className="checkbox">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
          </div>


          {loading ? (
              <button class="btn btn-primary field" type="button" disabled>
                <span
                  class="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>
                <span role="status">Submitting...</span>
              </button>) :
           (   
          <div className="field">
            <input type="submit" value="Register" />
          </div>
           )}
          <div className="signup-link">
            Already have an Account? <a href="/login">Login now</a>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default Registration;
