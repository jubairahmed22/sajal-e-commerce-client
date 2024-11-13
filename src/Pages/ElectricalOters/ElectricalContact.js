import React, { useEffect } from "react";

const ElectricalContact = () => {
    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to the top of the page when component mounts
      }, []); 
  return (
    <div>
      <section class="bg-white dark:bg-gray-900 h-screen">
        <div class="py-8 lg:py-16 flex justify-center items-center flex-col px-4 mx-auto max-w-screen-md">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Contact Me
          </h2>

          <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-10">
            
            <div class="flex flex-col items-center pb-10">
              <img
                class="w-24 h-24 object-cover mb-3 rounded-full shadow-lg mt-5"
                src="https://i.ibb.co.com/gzmmrcg/380237735-350126014106501-1760362929670800235-n.jpg"
                alt="Bonnie image"
              />
              <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                Ashraful Islam Sajal
              </h5>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                Phone: 01918744551
              </span>
              {/* <div class="flex mt-4 md:mt-6">
                <a
                  href="#"
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add friend
                </a>
                <a
                  href="#"
                  class="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Message
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ElectricalContact;
