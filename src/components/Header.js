
import foodtime from "../../assets/foodtime.png";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");

  const onlineStatus = useOnlineStatus();

  const { loggedInUser } = useContext(UserContext);
  //console.log(loggedInUser);

  // Subscribing to the store using a Selector
  const cartItems = useSelector((store) => store.cart.items);
  //console.log(cartItems);

  return (
    <div className="flex justify-between  shadow-lg">
      <div className="logo-container w-24 h-24 p-1 mx-2 ">
        <img className="w-56 rounded-lg  " src={foodtime} />
      </div>
      <div className="flex items-center">
        <ul className="flex p-2 m-2 gap-4">
           {/* sfsd     
             <a href="#_" class="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm">
Button Text
</a>
           */}

          
          <li className="px-4">
            <Link to="/"><button type="button" className="p-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm" >Home</button></Link>
          </li>
          <li className="px-4">
            <Link to="/about"><button type="button" className="p-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm" >About</button></Link>
          </li>
          <li className="px-4">
            <Link to="/contact"><button type="button" className="p-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm" >Contact</button></Link>
          </li>
          <li className="px-4">
            <Link to="/grocery"><button type="button" className="p-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm">Grocery</button></Link>
          </li>
          <li className="p-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm">
            <Link to="/cart">Cart {cartItems.length}</Link>
          </li>
          <button
            className="p-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm"
            onClick={() => {
              btnNameReact === "Login"
                ? setBtnNameReact("Logout")
                : setBtnNameReact("Login");
            }}
          >
            {btnNameReact}
          </button>

          {/* <li className="px-4 ">{loggedInUser}</li> */}
        </ul>
      </div>
    </div>
  );
};

export default Header;
