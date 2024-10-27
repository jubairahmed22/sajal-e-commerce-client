import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const ElectricalAllProducts = () => {
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
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState([]);

  // Fetch products based on page and search parameters
  useEffect(() => {
    const page = searchParams.get("page") || 1;
    setCurrentPage(parseInt(page));
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/visitor/products",
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
  }, [
    page,
    searchTitle,
    searchProductId,
    searchCategory,
    searchCompany,
    searchParams,
  ]);

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

  useEffect(() => {
    // Load cart from localStorage when component mounts
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = existingCart.findIndex(
      (item) => item._id === product._id
    );

    let updatedCart;
    if (productIndex > -1) {
      // If product already exists in cart, increment the quantity
      updatedCart = existingCart.map((item, index) =>
        index === productIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      // Otherwise, add the product with a quantity of 1
      updatedCart = [...existingCart, { ...product, quantity: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save updated cart in localStorage
    setCart(updatedCart); // Update cart state
    alert(`${product.title} has been added to the cart!`);
  };

  // Handle page navigation
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      navigate(`/products?page=${nextPage}`); // Navigate to the next page
      setSearchParams({ page: nextPage });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      navigate(`/products?page=${prevPage}`); // Navigate to the previous page
      setSearchParams({ page: prevPage });
    }
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

  return (
    <div className="bg-gray-50 max-w-screen-xl mx-auto">
      <div className="p-5">
        {/* Search Form */}
        <form className="grid grid-cols-4 gap-5 mt-10" onSubmit={handleSearch}>
          <div className="flex flex-col gap-2 ">
            <label className="text-lg font-roboto  text-gray-900">Title</label>
            <input
              type="text"
              placeholder="Search by Title"
              className="w-full h-10 border rounded border-black font-roboto px-4"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-roboto  text-gray-900">Title</label>
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
            <label className="text-lg font-roboto  text-gray-900">
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
            <label className="text-lg font-roboto  text-gray-900">
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

        <div class="grid grid-cols-4 gap-5 mt-10 h-[600px] overflow-auto">
          {products.map((product) => (
            <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <Link to={`/product-details/${product._id}`}>
                  <img
                    class="p-8 rounded-t-lg"
                    src={product.singleImage}
                    alt="product image"
                  />
                </Link>
              </a>
              <div class="px-5 pb-5">
                <a href="#">
                  <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {product.title}
                  </h5>
                </a>

                <div class="flex items-center justify-between mt-5">
                  <span class="text-3xl font-bold text-gray-900 dark:text-white">
                    ৳ {product.sellingPrice}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    href="#"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElectricalAllProducts;
