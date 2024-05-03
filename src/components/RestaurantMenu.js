import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestrauntMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";
import {CDN_URL} from "../utils/constants.js";
import { AiFillStar } from "react-icons/ai";
const RestaurantMenu = () => {
  const { resId } = useParams();

  const dummy = "Dummy Data";

  const resInfo = useRestaurantMenu(resId);

  const [showIndex, setShowIndex] = useState(null);

  if (resInfo === null) return <Shimmer />;

  const { name, cuisines, costForTwoMessage , slaString , avgRating} =
    resInfo?.cards[2]?.card?.card?.info;

  const { itemCards } =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.["card"]?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );


  return (
   <>
    <div className="flex basis-full h-60 justify-evenly items-center p-8 bg-blue-950">
        <img
          className="w-[254px] h-[165px] mob:w-[130px] mob:[81px] rounded-lg object-cover"
          src={CDN_URL + resInfo?.cards[2]?.card?.card?.info?.cloudinaryImageId}

          alt={resInfo?.name}
        />

        <div className="flex flex-col basis-[540px] m-5 text-white">
          <h2 className="text-3xl max-w-[538px] font-semibold text-white">
            {name}
          </h2>
          <p className="overflow-hidden whitespace-nowrap text-[15px] max-w-[538px] text-white">
            {cuisines.join(", ")}
          </p>
          <div className="flex mt-5 justify-between items-center text-sm font-semibold pb-2.5 max-w-[342px] mob:text-xs mob:font-normal">
            <div className="flex items-center px-1 py-0 gap-1 ">
              <AiFillStar />
              <span >{avgRating}</span>
            </div>
            <div >|</div>
            <div >{costForTwoMessage}</div>
            <div >|</div>
          </div>
        </div>
      </div>


    <div className="text-center">
      {/* categories accordions */}
      {categories.map((category, index) => (
        // controlled component
        <RestaurantCategory
          key={category?.card?.card.title}
          data={category?.card?.card}
          showItems={index === showIndex ? true : false}
          setShowIndex={() => setShowIndex(index)}
          dummy={dummy}
        />
          
      ))}
    </div>
    </>
  );
};

export default RestaurantMenu;
