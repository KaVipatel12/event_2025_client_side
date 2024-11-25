import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL;

const TechOwner = () => {
    const token = localStorage.getItem("token");
    const [formData, setFormData] = useState({
        nontech_event_name: '',
        nontech_event_description: '',
        nontech_event_rules: '',
        nontech_event_image: null
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
            nontech_event_image: e.target.files[0] // Store the file itself in state
        });
    };

    // Submit form data to the backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('nontech_event_name', formData.nontech_event_name);
        data.append('nontech_event_description', formData.nontech_event_description);
        data.append('nontech_event_rules', formData.nontech_event_rules);
        data.append('nontech_event_image', formData.nontech_event_image);

        try {
            const response = await fetch(`${API_URL}/api/admin/addnontecheventpanel`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: data
            });

            const result = await response.json();
            if (response.ok) {
                setFormData({
                    nontech_event_name: '',
                    nontech_event_description: '',
                    nontech_event_rules: '',
                    nontech_event_image: null
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
                  })
            }
            
        } catch (error) {
            toast.error('Error uploading form data', {
                position: "top-right",
                autoClose: 5000,
                theme: "light",
              })
        }
    };
    
    useEffect(() => {
        document.title = `Eminance 2025 - Nontechnial Event panel`;
         }, []);

    return (
        <div className="container my-3" style={{ color: "white" }}>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Event Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nontech_event_name"
                        value={formData.nontech_event_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Tech Event Description</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nontech_event_description"
                        value={formData.nontech_event_description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Tech Event Rules</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nontech_event_rules"
                        value={formData.nontech_event_rules}
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
