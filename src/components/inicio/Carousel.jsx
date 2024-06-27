import React from 'react';
import image3 from '../../img/menu3.jpg';
import image2 from '../../img/menu2.webp';
import image4 from '../../img/menu4.jpg';
import image5 from '../../img/menu5.jpg';
import image6 from '../../img/menu6.jpg';
import "../../SASS/style.css";
const Carousel = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        id="default-carousel"
        className="relative w-full h-full overflow-hidden"
        data-carousel="slide"
      >
        <div className="relative h-full overflow-hidden rounded-lg" id='secImg'>
          <div className="blur-md hidden duration-700 ease-in-out" data-carousel-item >
            <img
              src={image2}
              className="absolute block w-full h-full object-cover "
              alt="..."
            />
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center">
                <h2 className="font-bold">Buffet</h2>
                <p className="text-lg">Tenemos los precios más baratos</p>
              </div>
            </div>
          </div>

          <div className="hidden duration-700 ease-in-out" data-carousel-item id='secImg'>
            <img
              src={image3}
              className="absolute block w-full h-full object-cover blur-lg"
              alt="..."
            />
            <div className="absolute inset-0 flex items-center justify-center text-white" >
              <div className="text-center">
                <h2 className="font-bold">Buffet</h2>
                <p className="text-lg">Tenemos los precios más baratos</p>
              </div>
            </div>
          </div>

          <div className="hidden duration-700 ease-in-out" data-carousel-item id='secImg'>
            <img
              src={image4}
              className="absolute block w-full h-full object-cover blur-lg"
              alt="..."
            />
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center">
                <h2 className="font-bold">Buffet</h2>
                <p className="text-lg">Tenemos los precios más baratos</p>
              </div>
            </div>
          </div>

          <div className="hidden duration-700 ease-in-out" data-carousel-item id='secImg'>
            <img
              src={image5}
              className="absolute block w-full h-full object-cover blur-lg"
              alt="..."
            />
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center">
                <h2 className="font-bold">Buffet</h2>
                <p className="text-lg">Tenemos los precios más baratos</p>
              </div>
            </div>
          </div>

          <div className="hidden duration-700 ease-in-out" data-carousel-item id='secImg'>
            <img
              src={image6}
              className="absolute block w-full h-full object-cover blur-lg"
              alt="..."
            />
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center">
                <h2 className="font-bold">Buffet</h2>
                <p className="text-lg">Tenemos los precios más baratos</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
          <button
            type="button"
            className="w-3 h-3 rounded-full"
            aria-current="true"
            aria-label="Slide 1"
            data-carousel-slide-to="0"
          ></button>
          <button
            type="button"
            className="w-3 h-3 rounded-full"
            aria-current="false"
            aria-label="Slide 2"
            data-carousel-slide-to="1"
          ></button>
          <button
            type="button"
            className="w-3 h-3 rounded-full"
            aria-current="false"
            aria-label="Slide 3"
            data-carousel-slide-to="2"
          ></button>
          <button
            type="button"
            className="w-3 h-3 rounded-full"
            aria-current="false"
            aria-label="Slide 4"
            data-carousel-slide-to="3"
          ></button>
          <button
            type="button"
            className="w-3 h-3 rounded-full"
            aria-current="false"
            aria-label="Slide 5"
            data-carousel-slide-to="4"
          ></button>
        </div>

        <button
          type="button"
          className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
