const Carta = ({ nombre, desc, precio, img }) => {
    return (
      <div className="w-72 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-400 dark:border-gray-700">
        <a href="#">
          <img className="w-full h-32 object-cover rounded-t-lg" src={img} alt="product image" />
        </a>
        <div className="p-3">
          <a href="#">
            <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
              {nombre}
            </h5>
          </a>
          <p className="text-sm text-gray-700">{desc}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-base font-bold text-gray-900 dark:text-white">
              ${precio}
            </span>
  
            <a
              href="#"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add to cart
            </a>
          </div>
        </div>
      </div>
    );
  };
  
  export default Carta;
  