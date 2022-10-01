import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = (props) => {
  const hotel = props.hotel;
  //console.log("SERACH RESULT : ", props);
  return (
    <div className="container">
      <div className="imageItem">
        <img src={hotel.photo?.[0]} alt="" />
      </div>
      <div className="description">
        <span className="itemTitle">{hotel.name}</span>
        <span className="itemDistance">{hotel.distance}</span>
        <span className="itemTransportation">Free airport taxi</span>
        <span className="itemApartment">
          Studio Apartment with Air conditioning
        </span>
        <span className="itemApartmentDetails">
          Entire studio . 1 bathroom . 21m<sup>2</sup> 1 full bed
        </span>
        <span className="itemCancelation">Free cancellation</span>
        <span className="itemCancelNote">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="details">
        <div className="rate">
          <span className="rateText">Excellent</span>
          <button>8.9</button>
        </div>
        <div className="price">
          <span className="priceText">${hotel.minPrice}</span>
          <span className="taxe">Includes taxes and fees</span>
          <Link to={`/hotels/${hotel._id}`} >
            <button className="buttonAv">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
