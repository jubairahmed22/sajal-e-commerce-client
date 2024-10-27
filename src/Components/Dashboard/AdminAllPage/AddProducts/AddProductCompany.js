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
        <div className='flex flex-col'>
            <h1 className='text-md font-roboto text-black'>Add a New company</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={company} 
                    className='bg-white border-2 border-black rounded w-56 h-10 px-2 mt-2 font-roboto'
                    onChange={(e) => setCompany(e.target.value)} 
                    placeholder="Enter company" 
                    required 
                />
                <button 
                className='bg-gray-700 rounded text-white py-2 px-4 ml-4'
                type="submit">Add company</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddProductCompany;
