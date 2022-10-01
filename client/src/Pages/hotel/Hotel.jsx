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

const Hotel = () => {
  const gallery = [
    "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/53864941.jpg?k=6ddc54284072a2328ef2440782cc5765ffb36273809daed8f33bbf866cc03bd0&o=&hp=1",
    "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/53864408.jpg?k=55db539bed456de8f8043667e146e527f2617a1c043dae5a42cc8d96b423318f&o=&hp=1",
    "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/219954503.jpg?k=c01a02fb456efd6cde538786492bbf3f0bbd42d2e97a063f35577a5ed80b52d9&o=&hp=1",
    "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/53864464.jpg?k=0da2fcfaa6e3a771a7549ee6eda46982680120214cfffa89b0d0e5f654709b25&o=&hp=1",
    "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/53864491.jpg?k=3d4080efb65d4f1f530bf22a0291d8f2b8d5c335de6e00f330279eeaa1565804&o=&hp=1",
    "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/219954487.jpg?k=391532a21f1f8c1c4912d2c217396b8a0da0e07553afabf739dffbf4c507556a&o=&hp=1",
    "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/219954499.jpg?k=a4e35e43dd4d563792342bb0fec21e9a21594cdb6becdab5e6a67cd03728746d&o=&hp=1",
    "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/49790138.jpg?k=cd895f61da2a1f0fb8c09e5bb168ed4e286df98863575137d8197e20a0dd8817&o=&hp=1",
    "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/94776988.jpg?k=cbe1e6e7218b1d20f252e4a8d023393a435fda69dbfafc480ec815ad63069a9a&o=&hp=1",
  ];
  const [openSlider, setOpenSlider] = useState(false);
  const [slide, setSlide] = useState(0);

  const handleOpenSlider = (index) => {
    setSlide(index);
    setOpenSlider(true);
  };

  const handleMove = (direction) => {
    let newSlide;
    let totalIndex = gallery.length - 1;
    if (direction === "l") {
      newSlide = slide === 0 ? totalIndex : slide - 1;
    } else {
      newSlide = slide === totalIndex ? 0 : slide + 1;
    }
    setSlide(newSlide);
    console.log(
      "LEN GALL : ",
      totalIndex,
      "CURRENT SLIDE : ",
      slide,
      "NEW SLIDE : ",
      newSlide
    );
  };
  return (
    <>
      <Navbar />
      <Header type="list" />
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
              <img src={gallery[slide]} alt="" className="sImage" />
            </div>
            <FontAwesomeIcon
                icon={faArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
          </div>
        )}
      <div className="mainContainer">
        
        <div className="content">
          <div className="textArea">
            <h1 className="tile">Marriott Port-au-Prince Hotel</h1>
            <div className="addresse">
              <FontAwesomeIcon icon={faLocationDot} />{" "}
              <span>
                147, Avenue Jean Paul II, HT6113 Port-au-Prince, Haiti
              </span>{" "}
            </div>
            <div className="distance">Great location -500m from center</div>
            <div className="price">
              Book a stay over 200$ at this property and get a free airport taxi
            </div>
          </div>
          <div className="images">
            {gallery.map((item, index) => (
              <img
                src={item}
                key={index}
                onClick={() => handleOpenSlider(index)}
                alt=""
                className="image"
              />
            ))}
          </div>
          <button className="bookBtn">Reserve or Book Now!</button>
          <div className="descAndPrice">
            <div className="description">
              <h1>Stay near the center of Port-au-Prince</h1>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum
            </div>
            <div className="priceBox">
              <span className="pTitle">Perfect for a 9-night stay!</span>
              <span className="plocation">
                Located in the real heart of Port-au-Prince,this property has an
                excellent location score of 8.6!
              </span>
              <div className="pPrice">
                <span>$945</span>
                <span>(9 nights)</span>
              </div>
              <button className="bookBtn2">Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <MailingList />
        <Footer />
      </div>
    </>
  );
};

export default Hotel;
