import Featured from "../../Components/featured/Featured";
import FeaturedHotel from "../../Components/featuredHotel/FeaturedHotel";
import Footer from "../../Components/footer/Footer";
import Header from "../../Components/header/Header";
import MailingList from "../../Components/mailingList/MailingList";
import { Navbar } from "../../Components/navbar/Navbar";
import PropertyList from "../../Components/PropertyList/PropertyList";
import "./home.css";
export const Home = () => {
  return (
      <div>
        <Navbar />
        <Header/>
        <div className="homeContainer">
          <Featured/>
          <h1 className="homeTitle">Browse by property type</h1>
          <PropertyList/>
          <h1 className="homeTitle">Homes guests love</h1>
          <FeaturedHotel/>
          <MailingList/>
          <Footer/>
        </div>
        
      </div>
  );
};
