import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { CDN_URL } from "../utils/constants";

const ItemList = ({ items, dummy }) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    // Dispatch an action
    dispatch(addItem(item));
  };

  return (
    <div>
      {items.map((item) => (
        <div
          data-testid="foodItems"
          key={item.card.info.id}
          className="p-2 m-2 border-gray-200 border-b-2 text-left flex justify-between"
        >
          <div className="w-9/12">
            <div className="py-2 font-medium">
              <span>{item.card.info.name}</span>
              <span>
                - ₹
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </span>
            </div>
            <p className="text-xs text-opacity-25">{item.card.info.description}</p>
          </div>
          <div className="w-3/12 p-4 relative">
          <img src={CDN_URL + item.card.info.imageId} className="w-full rounded-lg" />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-2">
              <button
                className="p-1 shadow-lg w-8 rounded-xl bg-blue-500 hover:bg-blue-700 text-white font-bold border border-blue-700 
                "
                onClick={() => handleAddItem(item)}
              >
  
               Add+
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
