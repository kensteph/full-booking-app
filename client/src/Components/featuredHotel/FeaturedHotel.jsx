import useFetch from "../../hooks/useFetch";
import "./featuredHotel.css";
const FeaturedHotel = () => {
  const { data, loading } = useFetch("/hotels?featured=true&limit=5");
  console.log(data);
  const images = [
    "https://t-cf.bstatic.com/xdata/images/hotel/square200/24755460.webp?k=349402116780a18f7be0b8f1726840186b0d5cc6302a220c6093271e36c0f9da&o=",
    "https://t-cf.bstatic.com/xdata/images/hotel/square200/149488251.webp?k=742d0f65328c719fcb2519a1fd7c7227667d0974f92246c0a6544e56b38f3bf1&o=",
    "https://t-cf.bstatic.com/xdata/images/hotel/square200/298074025.webp?k=2e085b7d0135930e58023030915a02bc022d80bfd29b82507eba86ed84fcc2b3&o=",
    "https://t-cf.bstatic.com/xdata/images/hotel/square200/53864941.webp?k=b34b782dac502f54d74eaa50d945dfff82507baff3113f1f57b77a4235d91fc8&o=",
    "https://t-cf.bstatic.com/xdata/images/hotel/square200/149488251.webp?k=742d0f65328c719fcb2519a1fd7c7227667d0974f92246c0a6544e56b38f3bf1&o=",
  ];
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
