const CartaMenu = ({ nombre, desc, precio, img }) => {
  return (
    <div>
      <div id="carta" class="w-60 h-80 bg-gray-50 p-3 flex flex-col gap-1 rounded-2xl overflow-hidden">
        <div class="h-48 bg-gray-700 rounded-xl"><img src={img} alt="" /></div>
        <div class="flex flex-col gap-4">
          <div class="flex flex-row justify-between">
            <div class="flex flex-col">
              <span class="text-xl font-bold">{nombre}</span>
              <p class="text-xs text-gray-700">{desc}</p>
            </div>
            <span class="font-bold  text-blue-600">{precio}</span>
          </div>
          <button class="hover:bg-sky-700 text-gray-50 bg-sky-800 py-2 rounded-md">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
export default CartaMenu;