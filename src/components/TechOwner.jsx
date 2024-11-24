import React, { useEffect, useState } from 'react';
import {toast} from 'react-toastify'


const API_URL = process.env.REACT_APP_API_URL;

const TechOwner = () => {
    const token = localStorage.getItem("token");
    const [formData, setFormData] = useState({
        tech_event_name: '',
        tech_event_description: '',
        tech_event_rules: '',
        tech_event_image: null
    });

    // Update form state for text fields
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle file input separately
    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            tech_event_image: e.target.files[0] // Store the file itself in state
        });
    };

    // Submit form data to the backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('tech_event_name', formData.tech_event_name);
        data.append('tech_event_description', formData.tech_event_description);
        data.append('tech_event_rules', formData.tech_event_rules);
        data.append('tech_event_image', formData.tech_event_image);

        try {
            const response = await fetch(`${API_URL}/api/admin/addtecheventpanel`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: data
            });

            const result = await response.json();
            if (response.ok) {
                setFormData({
                    tech_event_name: '',
                    tech_event_description: '',
                    tech_event_rules: '',
                    tech_event_image: null
                })
                toast.success(result.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    theme: "light",
                  })
            } else {
                toast.error(result.msg, {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
        });
            }
            
        } catch (error) {
            toast.error('Error uploading form data', {
                position: "top-right",
                autoClose: 5000,
                theme: "light",
              });
        }
    };
    
    useEffect(() => {
        document.title = 'Eminance 2025 - Technical Events Panel';
      }, []);

    return (
        <div className="container my-3" style={{ color: "white" }}>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Event Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="tech_event_name"
                        value={formData.tech_event_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Tech Event Description</label>
                    <input
                        type="text"
                        className="form-control"
                        name="tech_event_description"
                        value={formData.tech_event_description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Tech Event Rules</label>
                    <input
                        type="text"
                        className="form-control"
                        name="tech_event_rules"
                        value={formData.tech_event_rules}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Input Image</label>
                    <input
                        type="file"
                        className="form-control"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-warning">Submit</button>
            </form>
        </div>
    );
};

export default TechOwner;
