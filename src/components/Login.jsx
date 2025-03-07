import React, { useEffect, useRef, useState } from "react";
import "../Auth.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/Auth";
import ReCAPTCHA from "react-google-recaptcha"

const API_URL = process.env.REACT_APP_API_URL;
const SITE_KEY = process.env.REACT_APP_CAPTCHA_KEY; 

function Login() {
  // State for managing form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recaptcha, setRecaptcha] = useState("");
  const [loader, setLoading] = useState(false);
  const captchaRef = useRef()
  const navigate = useNavigate();
  const { storeTokenLocalStorage } = useAuth();
  const userData = {
    email,
    password,
    recaptcha
  };

  const handelLoginSubmit = async (e) => {
    e.preventDefault();

    captchaRef.current.reset(); 
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token;
        storeTokenLocalStorage(token);
        toast.success("Login Successful", {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
        });
        setLoading(false);
        navigate(-1);
      } else {
        setLoading(false);
        toast.error(data.msg, {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error sending data to backend", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
    }
  };
  useEffect(() => {
    document.title = 'Eminance 2025 - Login';
     }, []);
  return (
    <>
      <div className="main-login">
        <div className="wrapper">
          <div className="title">Login Form</div>
          <form onSubmit={handelLoginSubmit}>
            {/* Email field */}
            <div className="field">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Email Address</label>
            </div>

            {/* Password field */}
            <div className="field">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label>Password</label>
            </div>
            
            <div className="form-group mt-2">
              <ReCAPTCHA 
               sitekey={SITE_KEY }
               onChange={(value) => {setRecaptcha(value)}}
               ref={captchaRef}
              />
            </div>
            <div className="content">
              {/* Remember me checkbox */}
              <div className="checkbox">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember me</label>
              </div>

              <div className="pass-link">
                <a href="/verifyemail">Forgot password?</a>
              </div>
            </div>

            {/* If the submit button is clicked then the loading bar will come on the button */}
            {loader ? (
              <button class="btn btn-primary field" type="button" disabled>
                <span
                  class="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>
                <span role="status">Loading...</span>
              </button>
            ) : (
              <div className="field">
                <input type="submit" value="Login" />
              </div>
            )}

            <div className="signup-link">
              Not a member? <a href="register">Signup now</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
