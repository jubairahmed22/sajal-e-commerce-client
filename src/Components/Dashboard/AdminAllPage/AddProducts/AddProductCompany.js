import React, { useState } from 'react';
import axios from 'axios';

const AddProductCompany = () => {
    const [company, setCompany] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/company', { company });
            setMessage(response.data.message);
            setCompany(''); // Clear input after successful submission
        } catch (error) {
            setMessage('Error: Could not add company');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Add a New company</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={company} 
                    onChange={(e) => setCompany(e.target.value)} 
                    placeholder="Enter company" 
                    required 
                />
                <button type="submit">Add company</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddProductCompany;
