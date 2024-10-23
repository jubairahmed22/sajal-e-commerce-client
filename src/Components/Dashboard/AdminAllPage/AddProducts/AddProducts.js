import { useState, useEffect } from 'react';
import axios from 'axios';
import AddProductCategory from './AddProductCategory';
import AddProductCompany from './AddProductCompany';

const AddProductPage = () => {
  const [title, setTitle] = useState('');
  const [buyingPrice, setBuyingPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]); // For multiple images
  const [singleImage, setSingleImage] = useState(null); // For single image
  const [video, setVideo] = useState(null);
  const [model, setModel] = useState(''); // For model field
  const [categories, setCategories] = useState([]); // To store categories from API
  const [companies, setCompanies] = useState([]); // To store companies from API
  const [selectedCategory, setSelectedCategory] = useState(''); // To store selected category
  const [selectedCompany, setSelectedCompany] = useState(''); // To store selected company

  // Fetch categories and companies on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/category');
        setCategories(response.data); // Assuming the data is an array of categories
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:8000/company');
        setCompanies(response.data); // Assuming the data is an array of companies
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCategories();
    fetchCompanies();
  }, []);

  // Handle image selection
  const handleImageChange = (e) => {
    setImages([...e.target.files]); // Multiple images
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('buyingPrice', buyingPrice);
    formData.append('sellingPrice', sellingPrice);
    formData.append('quantity', quantity);
    formData.append('description', description);
    formData.append('model', model); // Append model to form data
    formData.append('category', selectedCategory); // Append selected category
    formData.append('company', selectedCompany); // Append selected company

    // Append each image to the formData
    images.forEach((image) => {
      formData.append('images', image);
    });

    if (singleImage) {
      formData.append('singleImage', singleImage);
    }
    if (video) {
      formData.append('video', video); // Append video to form data
    }

    try {
      // Post the data to your backend
      const response = await axios.post('http://localhost:8000/upload-products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Product added successfully:', response.data);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="flex justify-center">
      <h1>Add New </h1>
      <AddProductCategory></AddProductCategory>
      <AddProductCompany></AddProductCompany>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Buying Price</label>
          <input
            type="number"
            value={buyingPrice}
            onChange={(e) => setBuyingPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Selling Price</label>
          <input
            type="number"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Model</label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
        </div>

        {/* Category select */}
        <div>
          <label>Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.category}>
                {category.category}
              </option>
            ))}
          </select>
        </div>

        {/* Company select */}
        <div>
          <label>Company</label>
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            required
          >
            <option value="">Select a company</option>
            {companies.map((company) => (
              <option key={company.id} value={company.company}>
                {company.company}
              </option>
            ))}
          </select>
        </div>

        {/* Multiple image upload */}
        <div>
          <label>Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            required
            name="images"
          />
        </div>

        {/* Single image upload */}
        <div>
          <label>Upload Single Image</label>
          <input
            type="file"
            onChange={(e) => setSingleImage(e.target.files[0])}
            required
          />
        </div>

        {/* Video upload */}
        <div>
          <label>Upload Video</label>
          <input
            type="file"
            onChange={(e) => setVideo(e.target.files[0])}
            required
          />
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductPage;
