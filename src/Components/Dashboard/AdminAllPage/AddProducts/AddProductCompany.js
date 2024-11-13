import React, { useState } from 'react';
import axios from 'axios';

const AddProductCompany = () => {
    const [company, setCompany] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://server-kappa-one-30.vercel.app/company', { company });
            setMessage(response.data.message);
            setCompany(''); // Clear input after successful submission
        } catch (error) {
            setMessage('Error: Could not add company');
            console.error(error);
        }
    };

    return (
        <div className='flex flex-col'>
            <h1 className='lg:text-md font-roboto sm:text-sm text-black'>Add a New company</h1>
            <form className='sm:flex sm:flex-row' onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={company} 
                    className='bg-white border-2 sm:text-sm lg:border-black sm:border-gray-500 rounded w-56 h-10 px-2 mt-2 font-roboto'
                    onChange={(e) => setCompany(e.target.value)} 
                    placeholder="Enter company" 
                    required 
                />
                <button 
               className='bg-gray-700 sm:text-sm font-roboto rounded text-white lg:py-2 sm:py-1 lg:px-4 sm:px-2 lg:ml-4 sm:ml-2'
                type="submit">Add Company</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddProductCompany;
