import {
  faLocationDot,
  faArrowLeft,
  faArrowRight,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Footer from "../../Components/footer/Footer";
import Header from "../../Components/header/Header";
import MailingList from "../../Components/mailingList/MailingList";
import { Navbar } from "../../Components/navbar/Navbar";
import "./hotel.css";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import { daysBetweenDates } from "../../utils/tools";
import { UserContext } from "../../context/UserContext";
import Reservation from "../../Components/reservation/Reservation";

const Hotel = () => {
  const location = useLocation(); //This hook allows us to receive data from other pages
  //console.log(location.pathname.split("/")[2]);
  const hotelId = location.pathname.split("/")[2];
  const { loading, data } = useFetch(`/hotels/find/${hotelId}`);
  //console.log(data);
  //We gonna use our State Management
  const { dates, options } = useContext(SearchContext); //We use STATE NAME to get the current state from our custom state
  console.log("CUSTOM STATE : ", dates, options);
  const { user } = useContext(UserContext);
  console.log(user);

  let nbNights = daysBetweenDates(
    dates[0]?.endDate || new Date(),
    dates[0]?.startDate || new Date()
  );
  nbNights = nbNights === 0 ? 1 : nbNights;
  // const gallery = [
  //   "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/53864941.jpg?k=6ddc54284072a2328ef2440782cc5765ffb36273809daed8f33bbf866cc03bd0&o=&hp=1",
  //   "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/53864408.jpg?k=55db539bed456de8f8043667e146e527f2617a1c043dae5a42cc8d96b423318f&o=&hp=1",
  //   "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/219954503.jpg?k=c01a02fb456efd6cde538786492bbf3f0bbd42d2e97a063f35577a5ed80b52d9&o=&hp=1",
  //   "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/53864464.jpg?k=0da2fcfaa6e3a771a7549ee6eda46982680120214cfffa89b0d0e5f654709b25&o=&hp=1",
  //   "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/53864491.jpg?k=3d4080efb65d4f1f530bf22a0291d8f2b8d5c335de6e00f330279eeaa1565804&o=&hp=1",
  //   "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/219954487.jpg?k=391532a21f1f8c1c4912d2c217396b8a0da0e07553afabf739dffbf4c507556a&o=&hp=1",
  //   "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/219954499.jpg?k=a4e35e43dd4d563792342bb0fec21e9a21594cdb6becdab5e6a67cd03728746d&o=&hp=1",
  //   "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/49790138.jpg?k=cd895f61da2a1f0fb8c09e5bb168ed4e286df98863575137d8197e20a0dd8817&o=&hp=1",
  //   "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/94776988.jpg?k=cbe1e6e7218b1d20f252e4a8d023393a435fda69dbfafc480ec815ad63069a9a&o=&hp=1",
  // ];

  const [openSlider, setOpenSlider] = useState(false);
  const [slide, setSlide] = useState(0);

  const handleOpenSlider = (index) => {
    setSlide(index);
    setOpenSlider(true);
  };

  const handleMove = (direction) => {
    let newSlide;
    let totalIndex = data.photos.length - 1;
    if (direction === "l") {
      newSlide = slide === 0 ? totalIndex : slide - 1;
    } else {
      newSlide = slide === totalIndex ? 0 : slide + 1;
    }
    setSlide(newSlide);
  };

  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    setOpenModal(!openModal);
  };
  return (
    <>
      <Navbar />
      <Header type="list" />

      <div className="mainContainer">
        {openSlider && (
          <div className="sliderContainer">
            <FontAwesomeIcon
              icon={faClose}
              className="btnClose"
              onClick={() => setOpenSlider(false)}
            />
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="slides">
              <img src={data.photos[slide]} alt="" className="sImage" />
            </div>
            <FontAwesomeIcon
              icon={faArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}

        {openModal && <Reservation setOpenModal={setOpenModal}  hotel={hotelId} />}

        {loading ? (
          "Loading..."
        ) : (
          <div className="content">
            <div className="textArea">
              <h1 className="tile">{data.name}</h1>
              <div className="addresse">
                <FontAwesomeIcon icon={faLocationDot} />{" "}
                <span>{data.address}</span>{" "}
              </div>
              <div className="distance">Great location -500m from center</div>
              <div className="price">
                Book a stay over {data.minPrice}$ at this property and get a
                free airport taxi
              </div>
            </div>
            <div className="images">
              {data.photos?.map((item, index) => (
                <img
                  src={item}
                  key={index}
                  onClick={() => handleOpenSlider(index)}
                  alt=""
                  className="image"
                />
              ))}
            </div>
            <button className="bookBtn" onClick={handleClick}>
              Reserve or Book Now!
            </button>
            <div className="descAndPrice">
              <div className="description">
                <h1 className="pTitle">{data.title}</h1>
                {data.desc}
              </div>
              <div className="priceBox">
                <span className="pTitle">
                  Perfect for a {nbNights}-night stay!
                </span>
                <span className="plocation">
                  Located in the real heart of Port-au-Prince,this property has
                  an excellent location score of 8.6!
                </span>
                <div className="pPrice">
                  <span>
                    <b>${nbNights * data?.minPrice * options.room}</b>
                  </span>
                  <span>({nbNights} nights)</span>
                </div>
                <button className="bookBtn2" onClick={handleClick}>
                  Reserve or Book Now!
                </button>
              </div>
            </div>
          </div>
        )}
        <MailingList />
        <Footer />
      </div>
    </>
  );
};

export default Hotel;
