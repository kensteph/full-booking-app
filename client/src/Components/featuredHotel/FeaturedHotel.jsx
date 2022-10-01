import useFetch from "../../hooks/useFetch";
import "./featuredHotel.css";
const FeaturedHotel = () => {
  const { data, loading } = useFetch("/hotels?featured=true&limit=5");
  //console.log(data);
  return (
    <div className="featuredHotel">
      {loading ? (
        "Loading please wait..."
      ) : (
        <>
          {data &&
            data.map((item, i) => (
              <div className="featuredHotelItem" key={i}>
                <img src={item.photos[0]} alt="" className="featuredHotelImage" />
                <div className="featuredHotelTexts">
                  <span className="featuredHotelTextsHotelName">
                    {item.name}
                  </span>
                  <span className="featuredHotelTextsHotelCity">
                    {item.city}
                  </span>
                  <span className="featuredHotelTextsHotelPrice">
                    Starting from ${item.minPrice}
                  </span>
                 { item.rating!==0 && <div className="featuredHotelBoxRate">
                    <button className="featuredHotelTextsHotelRateNumber">
                      {item.rating}
                    </button>
                    <span className="featuredHotelTextsHotelRate">
                      Excellent
                    </span>
                  </div>}
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default FeaturedHotel;
