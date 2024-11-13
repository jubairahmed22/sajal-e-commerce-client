import React, { useState } from 'react';
import axios from 'axios';

const AddProductCategory = () => {
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://server-kappa-one-30.vercel.app/category', { category });
            setMessage(response.data.message);
            setCategory(''); // Clear input after successful submission
        } catch (error) {
            setMessage('Error: Could not add category');
            console.error(error);
        }
    };

    return (
        <div className='flex flex-col'>
            <h1 className='lg:text-md sm:text-sm font-roboto text-black'>Add a New Category</h1>
            <form className='sm:flex sm:flex-row' onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={category} 
                    className='bg-white border-2 border-black rounded w-56 sm:border-gray-500 h-10 px-2 mt-2 sm:text-sm font-roboto'
                    onChange={(e) => setCategory(e.target.value)} 
                    placeholder="Enter category" 
                    required 
                />
                <button className='bg-gray-700 sm:text-sm font-roboto rounded text-white lg:py-2 sm:py-1 lg:px-4 sm:px-2 lg:ml-4 sm:ml-2' type="submit">Add Category</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddProductCategory;
