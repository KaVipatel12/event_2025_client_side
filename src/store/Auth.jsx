import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
export const Authcontext = createContext();

const API_URL = process.env.REACT_APP_API_URL;

export const AuthProvider = ({ children }) => {
  
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [User, setUser] = useState("");
  const isLoggedIn = !!token
  const storeTokenLocalStorage = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
  };
  const LogoutUser = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
  };

  const userAuthentication = async () => {
    try {
      if (token) {
        const response = await fetch(`${API_URL}/api/auth/user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.msg);
        } else {
          console.log("User not found error");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userAuthentication();
  }, [token]);

  // event Payment code
 // Define this function in the same file or import it where needed
 const purchaseEventsFromMainPage = async (eventname, category) => {
  const token = localStorage.getItem("token");  // Ensure token is fetched here if needed
  const requestData = {
    events: [{
      eventName: eventname,
      category: category
    }]
  };

  console.log("Request data:", JSON.stringify(requestData));

  try {
    const response = await fetch(`${API_URL}/api/event/purchaseevent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(requestData)
    });

    if (response.ok) {
      // If the response is a PDF, handle it as a Blob
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/pdf")) {
        // PDF response: download it
        const blob = await response.blob(); // Get the PDF as a Blob
        const url = window.URL.createObjectURL(blob);
        
        // Create a link to download the PDF
        const a = document.createElement('a');
        a.href = url;
        a.download = 'purchased_events.pdf'; // Set the file name
        document.body.appendChild(a);
        a.click(); // Trigger download
        window.URL.revokeObjectURL(url);
        a.remove();
        
        toast.success("Purchase successful! PDF downloaded.");
      } else {
        // Handle case where the response is not a PDF
        const data = await response.json();  // This is the fallback for JSON response
        toast.success(data.msg || "Purchase successful.");
      }
    } else {
      const data = await response.json();  // Handle errors
      toast.error(data.msg || "Purchase failed.");
    }
  } catch (error) {
    console.error("Server error:", error);
    toast.error("There is some error in the server, please try again later");
  }
};


 return (
    <Authcontext.Provider
      value={{
        isLoggedIn,
        storeTokenLocalStorage,
        LogoutUser,
        User,
        purchaseEventsFromMainPage
      }}
    >
      {children}
    </Authcontext.Provider>
  );
};

export const useAuth = () => {
  const authcontextValue = useContext(Authcontext);
  if (!authcontextValue) {
    throw new Error("Auth context is not working properly");
  }
  return authcontextValue;
};
