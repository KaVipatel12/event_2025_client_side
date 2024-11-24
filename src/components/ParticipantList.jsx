import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/Auth';
import { toast } from 'react-toastify';
import Navbar from './Navbar';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import autoTable plugin

const API_URL = process.env.REACT_APP_API_URL;

function ParticipantList() {
  const token = localStorage.getItem("token");
  const { User } = useAuth();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoader] = useState(true);
  const navigate = useNavigate();

  const fetchParticipantList = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/participantlist`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (response.status === 401) {
        toast.error("Unauthorized access. Redirecting to the home page.");
        navigate("/");
        return;
      }
      if (!response.ok) {
        setLoader(false);
        toast.error(result.msg);
        navigate("/");
      } else {
        setLoader(false);
        setData(result.participantsWithEvents);
        setFilteredData(result.participantsWithEvents);
      }
    } catch (error) {
      navigate(-1);
      setLoader(false);
      toast.error("There is some error in the server, please try again later");
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Participant List", 14, 15);

    const tableColumn = ["Sr.", "Name", "Email", "Events", "College"];
    const tableRows = [];

    filteredData.forEach((participant, index) => {
      const events = participant.purchasedEvents
        .map(event => event.product.split("_").join(" "))
        .join(", ");
      const participantData = [
        index + 1,
        participant.username,
        participant.email || 'NA',
        events || 'No Events',
        participant.college || 'NA'
      ];
      tableRows.push(participantData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("participant_list.pdf");
  };

  useEffect(() => {
    if (User) {
      fetchParticipantList();
    }
  }, [User]);

  useEffect(() => {
    document.title = `Eminance 2025 - Participant List`;
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="search-bar m-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or event"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="btn btn-primary mb-3" onClick={downloadPDF}>
          Download PDF
        </button>
        <center>{loading && <Loading />}</center>
        <div className="table-responsive" style={{ backgroundColor: "white" }}>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Sr.</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Events</th>
                <th scope="col">College Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((participant, index) => (
                  <tr key={participant.userId}>
                    <th scope="row">{index + 1}</th>
                    <td>{participant.username}</td>
                    <td>{participant.email || 'NA'}</td>
                    <td>
                      {participant.purchasedEvents.length > 0 ? (
                        <ul>
                          {participant.purchasedEvents.map((event, idx) => (
                            <li key={idx}>
                              <strong>{event.product?.split("_").join(" ")}</strong>
                              <br />
                              <small>Category: {event.category}</small>
                              <br />
                              <small>Purchased on: {new Date(event.purchaseDate).toLocaleString()}</small>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <li>No Events</li>
                      )}
                    </td>
                    <td>{participant.college || 'NA'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No participants found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ParticipantList;
