import { useState } from "react";
import { DateRange } from "react-date-range";
import { useLocation } from "react-router-dom";
import Header from "../../Components/header/Header";
import { Navbar } from "../../Components/navbar/Navbar";
import { format } from "date-fns";
import "./list.css";
import SearchItem from "../../Components/searchItem/SearchItem";
import MailingList from "../../Components/mailingList/MailingList";
import Footer from "../../Components/footer/Footer";
export const List = () => {
  const location = useLocation(); //This hook allows us to receive data from other pages
  console.log(location);
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState(location.state.date);
  const [destination, setDestination] = useState(location.state.destination);
  const [options, setOptions] = useState(location.state.options);
  return (
    <>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listContent">
          <div className="searchForm">
            <h1 className="formTitle">Search</h1>
            <div className="searchInput">
              <label>Destination</label>
              <input type="text" placeholder={destination} />
            </div>
            <div className="searchInput">
              <label>Check-in date</label>
              <label
                onClick={() => setOpenDate(!openDate)}
                className="dateLabel"
              >{`${format(date[0].startDate, "dd-MM-yyyy")}  to ${format(
                date[0].endDate,
                "dd-MM-yyyy"
              )}`}</label>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  ranges={date}
                  minDate={new Date()}
                />
              )}
            </div>
            <div className="searchInput">
              <label>Options</label>
              <div className="optionsList">
                <div className="optionItem">
                  <label>
                    Min price <small>(per night)</small>
                  </label>
                  <input type="number" min="1" />
                </div>
                <div className="optionItem">
                  <label>
                    Max price <small>(per night)</small>
                  </label>
                  <input type="number" min="1" />
                </div>
                <div className="optionItem">
                  <label>Adult</label>
                  <input type="number" placeholder={options.adult} min="1" />
                </div>
                <div className="optionItem">
                  <label>Children</label>
                  <input type="number" placeholder={options.children} min="1" />
                </div>
                <div className="optionItem">
                  <label>Room</label>
                  <input type="number" placeholder={options.room} min="1" />
                </div>
              </div>
            </div>
            <button className="searchButton">Search</button>
          </div>
          <div className="searchResult">
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
          </div>
        </div>
        <MailingList/>
      <Footer/>
      </div>
      
    </>
  );
};
