"use client";
import { useState } from "react";

const AddProductHome = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null); // Add video state
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }
    if (video) {
      formData.append("video", video); // Append video to form data
    }

    try {
      const response = await fetch("http://localhost:8000/upload-products", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setMessage("News feed posted successfully!");
        setTitle("");
        setPrice("");
        setDescription("");
        setImage(null);
        setVideo(null); // Reset video
      } else {
        setMessage(data.message || "Failed to post news feed.");
      }
    } catch (error) {
      console.error("Error posting news feed:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-4xl text-center mb-5">Welcome To Home Page</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded">
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-medium">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-medium">
            Price:
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-lg font-medium">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-lg font-medium">
            Upload Image:
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="video" className="block text-lg font-medium">
            Upload Video:
          </label>
          <input
            type="file"
            id="video"
            onChange={(e) => setVideo(e.target.files[0])} // Handle video upload
            className="w-full mt-1 p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      {message && <p className="text-center mt-5 text-lg">{message}</p>}
    </div>
  );
};

export default AddProductHome;
