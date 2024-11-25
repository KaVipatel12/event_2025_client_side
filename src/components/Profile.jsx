import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/Auth'; // Custom Auth hook
import Navbar from './Navbar';          // Navbar component
import jsPDF from 'jspdf';              // For PDF generation
import 'jspdf-autotable';               // For table formatting in PDF

function Profile() {
  const { User } = useAuth();           // Access user data from context or state
  const [email, setEmail] = useState("NA");
  const [username, setUsername] = useState("NA");
  const [college_name, setCollege_name] = useState("NA");
  const [department, setDepartment] = useState("NA");
  const [mobile, setMobile] = useState("NA");
  const [enrollment, setEnrollment] = useState("NA");
  const [loggedin, setLoggedin] = useState(false);
  const [purchasedEvents, setPurchasedEvents] = useState([]);

  useEffect(() => {
    if (User) {
      setEmail(User.email);
      setUsername(User.username);
      setCollege_name(User.college_name);
      setDepartment(User.department);
      setMobile(User.mobile);
      setEnrollment(User.enrollment);
      setPurchasedEvents(User.purchaseProduct || []);
      setLoggedin(true);
    }
  }, [User]);

  useEffect(() => {
    document.title = `Eminance 2025 - Profile`;
  }, []);

  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('User Profile and Purchased Events', 14, 20);

    // User details in the PDF
    doc.setFontSize(12);
    doc.text(`Username: ${username}`, 14, 30);
    doc.text(`Email: ${email}`, 14, 40);
    doc.text(`College: ${college_name}`, 14, 50);

    // Table for purchased events
    doc.autoTable({
      startY: 60,
      head: [['S.No', 'Event Name', 'Category', 'Purchase Date']],
      body: purchasedEvents.map((obj, index) => ([
        index + 1,
        obj.product ? obj.product.charAt(0).toUpperCase() + obj.product.slice(1) : 'N/A',
        obj.category ? obj.category.charAt(0).toUpperCase() + obj.category.slice(1) : 'N/A',
        obj.purchaseDate ? new Date(obj.purchaseDate).toLocaleDateString() : 'N/A'
      ])),
    });

    // Save the PDF
    doc.save('profile_events.pdf');
  };

  return (
    <>
      <Navbar />
      <div className='profile-main'>
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-0">
            <img className="mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" style={{ borderRadius: "20%" }} />
            <span className="font-weight-bold my-3" style={{ color: "white" }}>
              {loggedin ? email : "Unknown"}
            </span>
            <div>
              {!loggedin && (
                <>
                  <a href="/register" className="mx-2">
                    <button type="button" className="btn btn-warning my-2">Register</button>
                  </a>
                  <a href="/login">
                    <button type="button" className="btn btn-primary my-2">Login</button>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="col-md-5 border-right">
          <div className="p-3 py-3">
            <h4 className="text-center" style={{ color: "white" }}>Profile</h4>
            <div className="row mt-2" style={{ color: "white" }}>
              <div className="col-md-6">
                <label className="labels">Name</label>
                <input type="text" className="form-control" value={username} disabled />
              </div>
              <div className="col-md-12">
                <label className="labels">Email</label>
                <input type="text" className="form-control" value={email} disabled />
              </div>
              <div className="col-md-12">
                <label className="labels">Mobile Number</label>
                <input type="text" className="form-control" value={mobile} disabled />
              </div>
              <div className="col-md-12">
                <label className="labels">Institute</label>
                <input type="text" className="form-control" value={college_name} disabled />
              </div>
              <div className="col-md-12">
                <label className="labels">Department</label>
                <input type="text" className="form-control" value={department} disabled />
              </div>
              <div className="col-md-12">
                <label className="labels">Enrollment</label>
                <input type="text" className="form-control" value={enrollment} disabled />
              </div>
            </div>
          </div>
        </div>

        {/* Purchased Events Table */}
        <div className="table-container">
          <h2 className="event-title text-center">Event Status</h2>
          {loggedin && (
          <div className="text-center my-4">
            <button onClick={generatePDF} className="btn btn-success">
              Download PDF
            </button>
          </div>
        )}
          <div className="table-responsive">
        {/* PDF Button */}
            <table className="table table-striped" style={{ backgroundColor: "white" }}>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Event Name</th>
                  <th>Category</th>
                  <th>Purchase Date</th>
                </tr>
              </thead>
              <tbody>
                {purchasedEvents.length > 0 ? (
                  purchasedEvents.map((obj, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{obj.product ? obj.product.charAt(0).toUpperCase() + obj.product.slice(1) : 'N/A'}</td>
                      <td>{obj.category ? obj.category.charAt(0).toUpperCase() + obj.category.slice(1) : 'N/A'}</td>
                      <td>{obj.purchaseDate ? new Date(obj.purchaseDate).toLocaleDateString() : 'N/A'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">No Events Purchased</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </>
  );
}

export default Profile;
