import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props)=>{/* sometimes some cool developers instead of doing (props) they destructure on the fly ({resName,cuisine}) and it can be call simply by {resName} and {cuisine} in the jsx place*/ 
    /*console.log(props); */  /*props is a object here that contains properties that will be passed to the component when rendering the component */
    const {resData} = props;

    const {cloudinaryImageId,
        name,
        cuisines,
        avgRating,
        costForTwo
    } = resData?.info;
     const {slaString} = resData.info.sla;
    return (
        <div className="res-card" style={{backgroundColor:"#f0f0f0"}}> 
            <img 
            className="res-logo"
            alt="res-logo"
             src={CDN_URL+cloudinaryImageId}/>
         <h3>{name}</h3>
         <h4>{cuisines.join(", ")}</h4>
         <h4>{avgRating}</h4>
         <h4>{costForTwo}</h4>
         <h4>{slaString}</h4>
        </div>
    );
};

export default RestaurantCard;