import RestaurantCard  from  "./RestaurantCard";
//import resList  from  "../utils/mockData";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

const Body = ()=>{
    const [listofRestaurants,setListOfRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [searchText,setSearchText]=useState("");

    // whenever state variable updates react triggers the reconciliation cycle(re renders the component)
    console.log("Body Rendered");

    useEffect(()=>{
          getRestaurants();
    },[]);

       // async function getRestaurants to fetch Swiggy API data
     async function getRestaurants(){
        // handle the error using try catch 
        try{
        const response = await 
        fetch(
          "https://proxy.corsfix.com/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
            );
            
    /* fetch("https://proxy.corsfix.com/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.97210&lng=72.82460&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
*/





        const json = await response.json();
         // initialize checkJsonData() function to check Swiggy Restaurant data
         async function checkJsonData(jsonData) {
            for (let i = 0; i < jsonData?.data?.cards.length; i++) {

                // initialize checkData for Swiggy Restaurant data
                let checkData = json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      
                // if checkData is not undefined then return it
                if (checkData !== undefined) {
                  return checkData;
                }
              }
            }
             // call the checkJsonData() function which return Swiggy Restaurant data
      const resData = await checkJsonData(json);

      // update the state variable restaurants with Swiggy API data
      setListOfRestaurants(resData);
      setFilteredRestaurants(resData);
    } catch (error) {
      console.log(error);
    }
  };

  // conditional rendering 
  if(listofRestaurants.length===0){
    return  <Shimmer />
  }


    return (
        <div className="body"> 
        <div className="filter">
        <div className="search">
        <input 
        type="text" 
        className="serach-box" 
        value={searchText} 
        onChange={(e)=>{
          setSearchText(e.target.value);
        }}
        />
        <button 
        onClick={()=>{
          // filter the restaurants card and update the UI
          // search text
          console.log(searchText); 
          const filteredRestaurant = listofRestaurants.filter(
            (res)=>  res.info.name.toLowerCase().includes(searchText.toLowerCase()));
            setFilteredRestaurants(filteredRestaurant);
            
          }}
          >
          Search 
          </button>
          </div>

            <button className="filter-btn" 
            onClick={()=>{
                // Filter logic here 
                console.log("nm ");
                const filteredList = listofRestaurants.filter(
                    (res)=> res.info.avgRating > 4
                    );
                    setFilteredRestaurants(filteredList);
            }}>
            Top Rated Restaurants
            </button>
        </div>    
        <div className="res-container">
        {
            filteredRestaurants.map((restaurant)=>(
                <RestaurantCard key={restaurant?.info?.id} resData={restaurant} />
            )
            )
        }
        </div> 
        </div>
    );
};

export default Body;
