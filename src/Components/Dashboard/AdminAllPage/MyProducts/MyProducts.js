import React, { useState, useEffect } from "react";
import axios from "axios";
import "./myProduct.css";

const PaginatedProducts = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [title, setTitle] = useState("");
  const [productId, setProductId] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [searchProductId, setSearchProductId] = useState("");
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchCompany, setSearchCompany] = useState("");
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalBuyingPrice, setTotalBuyingPrice] = useState(0);
  const [totalSellingPrice, setTotalSellingPrice] = useState(0);

  // Fetch products based on page and search parameters
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/admin/products",
          {
            params: {
              page,
              title: searchTitle,
              productId: searchProductId,
              category: searchCategory,
              company: searchCompany,
            },
          }
        );
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
        setTotalQuantity(response.data.totalQuantity);
        setTotalBuyingPrice(response.data.totalBuyingPrice);
        setTotalSellingPrice(response.data.totalSellingPrice);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [page, searchTitle, searchProductId, searchCategory, searchCompany]);

  // Fetch categories and companies on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:8000/company");
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCategories();
    fetchCompanies();
  }, []);

  // Handle page navigation
  const handleNextPage = () => {
    if (page < totalPages) setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSearchTitle(title);
    setSearchProductId(productId);
    setSearchCategory(selectedCategory);
    setSearchCompany(selectedCompany);
  };

  const handleCancel = () => {
    setTitle("");
    setProductId("");
    setSelectedCategory("");
    setSelectedCompany("");
    setSearchTitle("");
    setSearchProductId("");
    setSearchCategory("");
    setSearchCompany("");
    setPage(1);
  };

  // Handle delete product
  // Handle delete product with warning confirmation
  const handleDelete = async (productId) => {
    // Show a confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product? This action cannot be undone."
    );

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8000/deleteProduct/${productId}`);
        // Filter out the deleted product from the state
        setProducts(products.filter((product) => product._id !== productId));
        alert("Product deleted successfully.");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete the product. Please try again.");
      }
    }
  };

  return (
    <div className="">
      <div className="py-6 px-5 w-full hidden-o bg-white border-b-2">
        <h1 className="text-xl font-roboto text-black font-bold">
          My Products
        </h1>
      </div>
      <div className="hidden-on">
        {/* Search Form */}
        <form className="grid grid-cols-4 gap-5 mt-10" onSubmit={handleSearch}>
          <div className="flex flex-col gap-2 ">
            <label className="text-sm font-roboto  text-gray-900">Title</label>
            <input
              type="text"
              placeholder="Search by Title"
              className="w-full h-10 border rounded border-black font-roboto px-4"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-roboto  text-gray-900">Title</label>
            <input
              type="text"
              placeholder="Search by Product ID"
              className="w-full h-10 border rounded border-black font-roboto px-4"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
          </div>

          {/* Category select */}
          <div className="flex flex-col">
            <label className="text-sm font-roboto  text-gray-900">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-700 bg-white h-10 w-full rounded mt-2 p-2"
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
            <label className="text-sm font-roboto  text-gray-900">
              Company
            </label>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="border border-gray-700 bg-white h-10 w-full rounded mt-2 p-2"
            >
              <option value="">Select a company</option>
              {companies.map((company) => (
                <option key={company.id} value={company.company}>
                  {company.company}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-5">
            <button
              className="bg-gray-700 text-white px-4 py-1 rounded"
              type="submit"
            >
              Search
            </button>
            <button
              className="bg-gray-600 text-white px-4 py-1 rounded"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-white uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Image
                </th>
                <th scope="col" class="px-6 py-3">
                  Title
                </th>
                <th scope="col" class="px-6 py-3">
                  Category
                </th>
                <th scope="col" class="px-6 py-3">
                  Company
                </th>
                <th scope="col" class="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" class="px-6 py-3">
                  Buying Price
                </th>
                <th scope="col" class="px-6 py-3">
                  Selling Price
                </th>
                <th scope="col" class="px-6 py-3">
                  Model
                </th>
                <th scope="col" class="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            {products.map((product) => (
              <tbody>
                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div className="avatar">
                      <div className="w-20 rounded">
                        <img src={product.singleImage} alt="" />
                      </div>
                    </div>{" "}
                  </th>
                  <td class="px-6 py-4">{product.title}</td>
                  <td class="px-6 py-4">{product.category}</td>
                  <td class="px-6 py-4">{product.company}</td>
                  <td class="px-6 py-4">{product.quantity}</td>
                  <td class="px-6 py-4">{product.buyingPrice}</td>
                  <td class="px-6 py-4">{product.sellingPrice}</td>
                  <td class="px-6 py-4">{product.model}</td>
                  <td class="px-6 py-4">
                    <button
                      onClick={() => handleDelete(product._id)}
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3"></th>
                <th scope="col" class="px-6 py-3"></th>
                <th scope="col" class="px-6 py-3"></th>
                <th scope="col" class="px-6 py-3"></th>
                <th scope="col" class="px-6 py-3">
                  Total {totalQuantity}
                </th>
                <th scope="col" class="px-6 py-3">
                  Total {totalBuyingPrice}
                </th>
                <th scope="col" class="px-6 py-3">
                  Total {totalSellingPrice}
                </th>
                <th scope="col" class="px-6 py-3"></th>
                <th scope="col" class="px-6 py-3"></th>
              </tr>
            </thead>
          </table>
        </div>

        {/* Pagination Controls */}
        <div class="flex flex-row items-center  justify-end">
          <span class="text-sm text-gray-700 dark:text-gray-400 mr-4">
            <span class="font-semibold text-gray-900 dark:text-white">
              {" "}
              Page {page}{" "}
            </span>{" "}
            of{" "}
            <span class="font-semibold text-gray-900 dark:text-white">
              {totalPages}
            </span>
          </span>
          <div class="inline-flex mt-2 xs:mt-0">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Prev
            </button>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="lg:hidden px-4">
        <h1 className="text-sm font-bold text-gray-900 font-roboto  pt-4">
          My Products
        </h1>
        <form className="grid grid-cols-2 gap-3 mt-5" onSubmit={handleSearch}>
          <div className="flex flex-col gap-2 ">
            <label className="text-sm font-roboto  text-gray-900">Title</label>
            <input
              type="text"
              placeholder="Search by Title"
              className="w-full h-7 text-sm border rounded border-black font-roboto px-4"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-roboto  text-gray-900">Title</label>
            <input
              type="text"
              placeholder="Search by Product ID"
              className="w-full h-7 text-sm border rounded border-black font-roboto px-4"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
          </div>

          {/* Category select */}
          <div className="flex flex-col">
            <label className="text-sm font-roboto  text-gray-900">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-700 bg-white h-10 text-sm w-full rounded mt-2 p-2"
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
            <label className="text-sm font-roboto  text-gray-900">
              Company
            </label>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="border border-gray-700 text-black h-10 text-sm w-full rounded mt-2 p-2"
            >
              <option value="">Select a company</option>
              {companies.map((company) => (
                <option key={company.id} value={company.company}>
                  {company.company}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-5">
            <button
              className="bg-gray-700 text-white text-sm font-roboto px-4 py-1 rounded"
              type="submit"
            >
              Search
            </button>
            <button
              className="bg-gray-600 text-white text-sm font-roboto px-4 py-1 rounded"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
        <div className="mt-5 overflow-x-auto">
          <table>
            <tr className="bg-gray-700 text-white text-sm font-roboto font-light">
            <th >
                  Image
                </th>
                <th >
                  Title
                </th>
                <th >
                  Category
                </th>
                <th >
                  Company
                </th>
                <th >
                  Quantity
                </th>
                <th >
                  Buying Price
                </th>
                <th >
                  Selling Price
                </th>
                <th >
                  Model
                </th>
                <th >
                  Delete
                </th>
            </tr>
            {products.map((product) => (
               <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
               <th
                 scope="row"
                 class="px-4 py-2 text-sm font-roboto text-gray-900 whitespace-nowrap dark:text-white"
               >
                 <div className="avatar">
                   <div className="w-12 rounded">
                     <img src={product.singleImage} alt="" />
                   </div>
                 </div>{" "}
               </th>
               <td class="px-4 py-2">{product.title}</td>
               <td class="px-4 py-2">{product.category}</td>
               <td class="px-4 py-2">{product.company}</td>
               <td class="px-4 py-2">{product.quantity}</td>
               <td class="px-4 py-2">{product.buyingPrice}</td>
               <td class="px-4 py-2">{product.sellingPrice}</td>
               <td class="px-4 py-2">{product.model}</td>
               <td class="px-4 py-2">
                 <button
                   onClick={() => handleDelete(product._id)}
                   class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                 >
                   Delete
                 </button>
               </td>
             </tr>
             ))}
             <tr className="text-sm font-roboto bg-gray-200">
                <th scope="col" class="px-4 py-3"></th>
                <th scope="col" class="px-4 py-3"></th>
                <th scope="col" class="px-4 py-3"></th>
                <th scope="col" class="px-4 py-3"></th>
                <th scope="col" class="px-4 py-3">
                  {totalQuantity}
                </th>
                <th scope="col" class="px-4 py-3">
                  {totalBuyingPrice}
                </th>
                <th scope="col" class="px-4 py-3">
                  {totalSellingPrice}
                </th>
                <th scope="col" class="px-4 py-3"></th>
                <th scope="col" class="px-4 py-3"></th>
              </tr>
           
          </table>
          <div class="flex flex-row items-center  justify-start mb-5">
          <span class="text-sm text-gray-700 dark:text-gray-400 mr-4">
            <span class="font-semibold text-gray-900 dark:text-white">
              {" "}
              Page {page}{" "}
            </span>{" "}
            of{" "}
            <span class="font-semibold text-gray-900 dark:text-white">
              {totalPages}
            </span>
          </span>
          <div class="inline-flex mt-2 xs:mt-0">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Prev
            </button>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </button>
          </div>
        </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default PaginatedProducts;
