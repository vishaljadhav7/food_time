import RestaurantCard, { withPromtedLabel } from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { API_URL } from "../utils/constants";
const Body = () => {

  const [listOfRestaurants, setListOfRestraunt] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState("");

  const RestaurantCardPromoted = withPromtedLabel(RestaurantCard);

  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {       
      try{
          const data = await fetch(API_URL);
    
        const json = await data?.json();
    
        // Optional Chaining
        setListOfRestraunt(
          json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
        );
        setFilteredRestaurant(
          json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
        );       
    

      }catch(error){
         console.error("error fetching res data (cors)")
      }
   

  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false)
    return (
      <h1>
        Looks like you're offline!! Please check your internet connection;
      </h1>
    );
  const { loggedInUser, setUserName } = useContext(UserContext);
     return listOfRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body ">
      <div className="  filter flex justify-center">
        <div className=" -ml-10 w-1/2 md:search m-4 p-4 flex gap-3 mr-7 md :-ml-0">
          <input
            type="text"
            data-testid="searchInput"
            className=" py-3 px-4 block  border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-slate-300 dark:border-gray-700 dark:text-black dark:focus:ring-gray-600 w-[300px]"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
         <button
            className=" ml-4 bg-emerald-400 p-3 rounded-lg text-white "
            onClick={() => {
              const filteredRestaurant = listOfRestaurants?.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );

              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <div className="search m-4 p-4 flex items-center">
          <button
            className=" "
            onClick={() => {
              const filteredList = listOfRestaurants?.filter(
                (res) => res.info.avgRating > 4
              );
              setFilteredRestaurant(filteredList);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
       </div>
       
      <div className="flex flex-wrap justify-center align-middle">
        {filteredRestaurant?.map((restaurant) => (
          <Link
            key={restaurant?.info?.id}
            to={"/restaurants/" + restaurant?.info?.id}
          >
            {restaurant?.info.promoted ? (
              <RestaurantCardPromoted resData={restaurant?.info} />
            ) : (
              <RestaurantCard resData={restaurant?.info} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
