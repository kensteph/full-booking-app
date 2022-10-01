import "./searchItem.css";

const SearchItem = () => {
  return (
    <div className="container">
      <div className="imageItem">
        <img
          src="https://t-cf.bstatic.com/xdata/images/hotel/square600/149488251.webp?k=446c4c88e5628d4cc2f2a45889ccf9e5b762c92fe1365234fdeaf82c675a9345&o=&s=1"
          alt=""
        />
      </div>
      <div className="description">
        <span className="itemTitle">Hotel Royal Oasis</span>
        <span className="itemDistance">500m from center</span>
        <span className="itemTransportation">Free airport taxi</span>
        <span className="itemApartment">Studio Apartment with Air conditioning</span>
        <span className="itemApartmentDetails">Entire studio . 1 bathroom . 21m<sup>2</sup> 1 full bed</span>
        <span className="itemCancelation">Free cancellation</span>
        <span className="itemCancelNote">You can cancel later, so lock in this great price today!</span>
      </div>
      <div className="details">
        <div className="rate">
            <span className="rateText">Excellent</span>
            <button>8.9</button>
        </div>
        <div className="price">
            <span className="priceText">$155</span>
            <span className="taxe">Includes taxes and fees</span>
            <button>See availability</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
