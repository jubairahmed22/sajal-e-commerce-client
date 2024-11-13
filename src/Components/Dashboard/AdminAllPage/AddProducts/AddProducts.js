import { useState, useEffect } from "react";
import axios from "axios";
import AddProductCategory from "./AddProductCategory";
import AddProductCompany from "./AddProductCompany";
import toast from "react-hot-toast";
import SpinnerTailwind from "../../../Spinner/SpinnerTailwind";

const AddProductPage = () => {
  const [title, setTitle] = useState("");
  const [buyingPrice, setBuyingPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]); // For multiple images
  const [singleImage, setSingleImage] = useState(null); // For single image
  const [video, setVideo] = useState(null);
  const [model, setModel] = useState(""); // For model field
  const [categories, setCategories] = useState([]); // To store categories from API
  const [companies, setCompanies] = useState([]); // To store companies from API
  const [selectedCategory, setSelectedCategory] = useState(""); // To store selected category
  const [selectedCompany, setSelectedCompany] = useState(""); // To store selected company
  const [loading, setLoading] = useState(true);

  // Fetch categories and companies on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://server-kappa-one-30.vercel.app/category");
        setCategories(response.data); // Assuming the data is an array of categories
        setLoading(false)
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchCompanies = async () => {
      try {
        const response = await axios.get("https://server-kappa-one-30.vercel.app/company");
        setCompanies(response.data); // Assuming the data is an array of companies
        setLoading(false)

      } catch (error) {
        console.error("Error fetching companies:", error);
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
    formData.append("title", title);
    formData.append("buyingPrice", buyingPrice);
    formData.append("sellingPrice", sellingPrice);
    formData.append("quantity", quantity);
    formData.append("description", description);
    formData.append("model", model); // Append model to form data
    formData.append("category", selectedCategory); // Append selected category
    formData.append("company", selectedCompany); // Append selected company

    // Append each image to the formData
    images.forEach((image) => {
      formData.append("images", image);
    });

    if (singleImage) {
      formData.append("singleImage", singleImage);
    }
    if (video) {
      formData.append("video", video); // Append video to form data
    }

    try {
      // Post the data to your backend
      const response = await axios.post(
        "https://server-kappa-one-30.vercel.app/upload-products",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Product added successfully:", response.data);
      toast.success("Product Upload Successfully");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  if (loading) {
    return <SpinnerTailwind></SpinnerTailwind>; // Replace with your loader component or animation
  }
  return (
    <div className="lg:mt-0 sm:mt-[80px]">
      <div className="py-6 px-5 w-full bg-white border-b-2 hidden-on">
        <h1 className="text-xl font-roboto text-black font-bold">
          Add New Product
        </h1>
        <p className="text-md font-roboto text-gray-700 ">
          Add your product and necessary information from here
        </p>
      </div>
      <div className="p-5 hidden-on">
        <div className="flex flex-col gap-8">
          <AddProductCategory></AddProductCategory>
          <AddProductCompany></AddProductCompany>
        </div>
        <form
          className="grid grid-cols-2 gap-5 mt-10"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="flex flex-col">
            <label className="text-xl text-black font-roboto">Title</label>
            <input
              type="text"
              value={title}
              className="border border-gray-700 bg-white h-10 w-full rounded  mt-2 p-2"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xl text-black font-roboto">
              Buying Price
            </label>
            <input
              className="border border-gray-700 bg-white h-10 w-full rounded  mt-2 p-2"
              type="number"
              value={buyingPrice}
              onChange={(e) => setBuyingPrice(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xl text-black font-roboto">
              Selling Price
            </label>
            <input
              className="border border-gray-700 bg-white h-10 w-full rounded  mt-2 p-2"
              type="number"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xl text-black font-roboto">Quantity</label>
            <input
              className="border border-gray-700 bg-white h-10 w-full rounded  mt-2 p-2"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xl text-black font-roboto">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-700 bg-white h-20 w-full rounded  mt-2 p-2"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xl text-black font-roboto">Model</label>
            <input
              className="border border-gray-700 bg-white h-10 w-full rounded  mt-2 p-2"
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
            />
          </div>

          {/* Category select */}
          <div className="flex flex-col">
            <label className="text-xl text-black font-roboto">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-700 bg-white h-10 w-full rounded  mt-2 p-2"
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
          <div className="flex flex-col">
            <label className="text-xl text-black font-roboto">Company</label>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="border border-gray-700 bg-white h-10 w-full rounded  mt-2 p-2"
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
          <div className="flex flex-col">
            <label className="text-xl text-black font-roboto">Images</label>
            <input
              type="file"
              className="mt-2"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              name="images"
            />
          </div>

          {/* Single image upload */}
          <div className="flex flex-col">
            <label className="text-xl text-black font-roboto">
              Upload Single Image
            </label>
            <input
              type="file"
              className="mt-2"
              onChange={(e) => setSingleImage(e.target.files[0])}
              required
            />
          </div>

          {/* Video upload */}
          <div className="flex flex-col">
            <label className="text-xl text-black font-roboto">
              Upload Video
            </label>
            <input
              type="file"
              className="mt-2"
              onChange={(e) => setVideo(e.target.files[0])}
            />
          </div>
          <div className="w-full flex justify-start">
            <button
              className="bg-gray-700 px-8 py-1 rounded text-xl font-roboto text-white "
              type="submit"
            >
              Upload Product
            </button>
          </div>
        </form>
      </div>
      <div className="lg:hidden px-4">
        <h1 className="text-sm font-bold text-gray-900 font-roboto  pt-4">
          Add Products
        </h1>
        <div className="flex flex-col gap-8 mt-5">
          <AddProductCategory></AddProductCategory>
          <AddProductCompany></AddProductCompany>
        </div>
        <form
          className="grid grid-cols-1 gap-4 mt-5"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="flex flex-col">
            <label className="lg:text-xl text-black font-roboto sm:text-sm">Title</label>
            <input
              type="text"
              value={title}
              className="border border-gray-700 bg-white h-10 w-full rounded  mt-2 p-2"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="lg:text-xl text-black font-roboto sm:text-sm">
              Buying Price
            </label>
            <input
              className="border border-gray-700 bg-white h-10 w-full rounded  mt-2 p-2"
              type="number"
              value={buyingPrice}
              onChange={(e) => setBuyingPrice(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="lg:text-xl text-black font-roboto sm:text-sm">
              Selling Price
            </label>
            <input
              className="border border-gray-700 bg-white h-10 w-full rounded  mt-2 p-2"
              type="number"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="lg:text-xl text-black font-roboto sm:text-sm">Quantity</label>
            <input
              className="border border-gray-700 bg-white h-10 w-full rounded  mt-2 p-2"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="lg:text-xl text-black font-roboto sm:text-sm">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-700 bg-white h-20 w-full rounded  mt-2 p-2"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="lg:text-xl text-black font-roboto sm:text-sm">Model</label>
            <input
              className="border border-gray-700 bg-white h-10 w-full rounded  mt-2 p-2"
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
            />
          </div>

          {/* Category select */}
          <div className="flex flex-col">
            <label className="lg:text-xl text-black font-roboto sm:text-sm">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-700 bg-white h-10 w-full rounded  mt-2 p-2"
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
          <div className="flex flex-col">
            <label className="lg:text-xl text-black font-roboto sm:text-sm">Company</label>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="border border-gray-700 bg-white h-10 w-full rounded  mt-2 p-2"
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
          <div className="flex flex-col">
            <label className="lg:text-xl text-black font-roboto sm:text-sm">Images</label>
            <input
              type="file"
              className="mt-2"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              name="images"
            />
          </div>

          {/* Single image upload */}
          <div className="flex flex-col">
            <label className="lg:text-xl text-black font-roboto sm:text-sm">
              Upload Single Image
            </label>
            <input
              type="file"
              className="mt-2"
              onChange={(e) => setSingleImage(e.target.files[0])}
              required
            />
          </div>

          {/* Video upload */}
          <div className="flex flex-col">
            <label className="lg:text-xl text-black font-roboto sm:text-sm">
              Upload Video
            </label>
            <input
              type="file"
              className="mt-2"
              onChange={(e) => setVideo(e.target.files[0])}
            />
          </div>
          <div className="w-full flex justify-start mb-5">
            <button
              className="bg-blue-600 px-8 py-1 rounded text-md mb-10 font-roboto text-white "
              type="submit"
            >
              Upload Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
