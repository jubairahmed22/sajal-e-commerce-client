import React, { useState } from 'react';
import axios from 'axios';

const AddProductCategory = () => {
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/category', { category });
            setMessage(response.data.message);
            setCategory(''); // Clear input after successful submission
        } catch (error) {
            setMessage('Error: Could not add category');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Add a New Category</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    placeholder="Enter category" 
                    required 
                />
                <button type="submit">Add Category</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddProductCategory;
