import { CalendarIcon } from "@heroicons/react/20/solid";
import React from "react";
import DatePicker from "react-datepicker";
import SmallSpinner from "../Spinner/SmallSpinner";

const AddServiceForm = ({
  handleSubmit,
  arrivalDate,
  setArrivalDate,
  departureDate,
  setDepartureDate,
  loading,
  handleImageChange,
  preview,
  uploadButtonText,
}) => {
  return (
    <>
      <div className="flex justify-center mt-6">
        <div className="w-full max-w-md p-8 space-y-3 text-gray-800 rounded-xl bg-gray-50">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 ng-untouched ng-pristine ng-valid"
          >
            <div className="space-y-1 text-sm">
              <label htmlFor="projectName" className="block text-gray-600">
                Project Name
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500 rounded-md bg-green-50"
                name="projectName"
                id="projectName"
                type="text"
                placeholder="projectName"
                required
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="title" className="block text-gray-600">
                Title
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500 rounded-md bg-green-50"
                name="title"
                id="title"
                type="text"
                placeholder="Title"
                required
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="liveLink" className="block text-gray-600">
                live Link
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500 rounded-md bg-green-50"
                name="liveLink"
                id="liveLink"
                type="text"
                placeholder="live Link"
                required
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="githubFrontendLink" className="block text-gray-600">
                 Github Frontend Link
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500 rounded-md bg-green-50"
                name="githubFrontendLink"
                id="githubFrontendLink"
                type="text"
                placeholder="github Frontend Link"
                required
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="githubBackendLink" className="block text-gray-600">
                Github Backend Link
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500 rounded-md bg-green-50"
                name="githubBackendLink"
                id="githubBackendLink"
                type="text"
                placeholder="githubBackendLink"
                required
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="adminEmail" className="block text-gray-600">
                Admin Email
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500 rounded-md bg-green-50"
                name="adminEmail"
                id="adminEmail"
                type="text"
                placeholder="adminEmail"
                required
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="adminPass" className="block text-gray-600">
                Admin Password
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500 rounded-md bg-green-50"
                name="adminPass"
                id="adminPass"
                type="text"
                placeholder="adminPass"
                required
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="superAdminEmail" className="block text-gray-600">
                SuperAdmin Email
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500 rounded-md bg-green-50"
                name="superAdminEmail"
                id="superAdminEmail"
                type="text"
                placeholder="superAdminEmail"
                required
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="superAdminPass" className="block text-gray-600">
                SuperAdmin Password
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500 rounded-md bg-green-50"
                name="superAdminPass"
                id="superAdminPass"
                type="text"
                placeholder="superAdminPass"
                required
              />
            </div>

            <div className="flex justify-between ">
              <div className="shadow-md rounded-md my-2 p-3 flex justify-between items-center">
                <div>
                  <p className="block text-sm text-gray-500">From</p>
                  <DatePicker
                    selected={arrivalDate}
                    onChange={(date) => setArrivalDate(date)}
                    className="w-2/3"
                  />
                </div>

                <CalendarIcon className="h5 w-5" />
              </div>
              <div className="shadow-md rounded-md my-2 p-3 flex justify-between items-center">
                <div>
                  <p className="block text-sm text-gray-500">To</p>
                  <DatePicker
                    selected={departureDate}
                    onChange={(date) => setDepartureDate(date)}
                    className="w-2/3"
                  />
                </div>

                <CalendarIcon className="h5 w-5" />
              </div>
            </div>

            <div className="flex justify-between gap-2">
              {/* <div className='space-y-1 text-sm'>
                <label htmlFor='price' className='block text-gray-600'>
                  Price
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500 rounded-md bg-green-50'
                  name='price'
                  id='price'
                  type='number'
                  placeholder='Price'
                  required
                />
              </div> */}
              {/* 
              <div className='space-y-1 text-sm'>
                <label htmlFor='guest' className='block text-gray-600'>
                  Total guest
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500 rounded-md bg-green-50'
                  name='total_guest'
                  id='guest'
                  type='number'
                  placeholder='Total guest'
                  required
                />
              </div> */}
            </div>

            <div className="flex justify-between gap-2">
              {/* <div className='space-y-1 text-sm'>
                <label htmlFor='bedrooms' className='block text-gray-600'>
                  Bedrooms
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500 rounded-md bg-green-50'
                  name='bedrooms'
                  id='bedrooms'
                  type='number'
                  placeholder='Bedrooms'
                  required
                />
              </div> */}

              {/* <div className='space-y-1 text-sm'>
                <label htmlFor='bathrooms' className='block text-gray-600'>
                  Bathrooms
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500 rounded-md bg-green-50'
                  name='bathrooms'
                  id='bathrooms'
                  type='number'
                  placeholder='Bathrooms'
                  required
                />
              </div> */}
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="technology" className="block text-gray-600">
                Technology
              </label>

              <textarea
                id="technology"
                className="block rounded-md focus:green-300 w-full h-20 px-4 py-3 text-gray-800 bg-green-50 border border-green-300 focus:outline-green-500 "
                name="technology"
              ></textarea>
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>

              <textarea
                id="description"
                className="block rounded-md focus:green-300 w-full h-20 px-4 py-3 text-gray-800 bg-green-50 border border-green-300 focus:outline-green-500 "
                name="description"
              ></textarea>
            </div>

            <div>
              <label
                htmlFor="images"
                className="p-3 text-center rounded-md cursor-pointer text-gray-500 font-bold border border-green-600 hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-400 hover:border-white hover:text-white"
              >
                {uploadButtonText}
                <input
                  type="file"
                  onChange={handleImageChange}
                  name="images"
                  id="images"
                  accept="image/*"
                  multiple
                  hidden
                />
              </label>
              {preview.length > 0 && (
                <div className="flex space-x-2">
                  {preview.map((preview, index) => (
                    <img
                      key={index}
                      src={preview.url}
                      className="w-16 h-16"
                      alt={`preview_img_${index}`}
                    />
                  ))}
                </div>
              )}
            </div>
          <button
              type="submit"
              className="block w-full p-3 text-center font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-gradient-to-r from-emerald-500 to-lime-500 hover:bg-gray-200 hover:text-gray-700 focus:shadow-outline focus:outline-none"
            >
              {loading ? <SmallSpinner /> : "Save & Continue"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddServiceForm;
