import {
  faBed,
  faCalendar,
  faCar,
  faGamepad,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import { UserContext } from "../../context/UserContext";

const Header = ({ type }) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [destination, setDestination] = useState("");
  const [openOption, setOpenOption] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const navigate = useNavigate(); //THIS hook allows to navigate through the pages

  const handleOption = (optionName, operation) => {
    setOptions((prev) => {
      //prev allows us to get the previous state object {adult:1,children:0,room:1}
      //we will return a new object contains the old object whith the new value for the relevant option
      return {
        ...prev, //We use the spread operator.The JavaScript spread operator (...) allows us to quickly copy all or part of an existing
        // array or object into another array or object.
        [optionName]:
          operation === "i" ? options[optionName]++ : options[optionName]--,
      };
    });
  };

  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  //We gonnan use our State Management
  const { dispatch } = useContext(SearchContext); //We use dispacth to update our custom state
  const { user } = useContext(UserContext);
  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };
  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="header-list">
          <div className="header-item active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="header-item">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="header-item">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="header-item">
            <FontAwesomeIcon icon={faGamepad} />
            <span>Attractions</span>
          </div>
          <div className="header-item">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>

        {type !== "list" && (
          // Display this block if the props(type) is equal to 'list's
          <>
            <h1 className="headerTitle">A lifetime of discount? it's Genius</h1>
            <p className="headerDesc">
              Get rewarded for your travels-unlock instant savings of 10% or
              more with a free Kajbooking account
            </p>
            {!user && (
              <button className="headerButton">Sign in / Register</button>
            )}

            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerSearchIcon" />
                <input
                  onChange={(e) => setDestination(e.target.value)}
                  type="text"
                  placeholder="Where are you going ?"
                  className="headerSearchInput"
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="headerSearchIcon"
                />
                <span
                  className="headerSearchText"
                  onClick={() => setOpenDatePicker(!openDatePicker)}
                >
                  {`${format(dates[0].startDate, "dd-MM-yyyy")}  to ${format(
                    dates[0].endDate,
                    "dd-MM-yyyy"
                  )}`}
                </span>
                {openDatePicker && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerSearchIcon" />
                <span
                  className="headerSearchText"
                  onClick={() => setOpenOption(!openOption)}
                >
                  {`${options.adult} Adult ${options.children} Children ${options.room} Room`}
                </span>
                {openOption && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="buttonsArea">
                        <button
                          className="optionButton"
                          disabled={options.adult <= 1}
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionText">{options.adult}</span>
                        <button
                          className="optionButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="buttonsArea">
                        <button
                          className="optionButton"
                          disabled={options.children === 0}
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionText">{options.children}</span>
                        <button
                          className="optionButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="buttonsArea">
                        <button
                          className="optionButton"
                          disabled={options.room === 1}
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionText">{options.room}</span>
                        <button
                          className="optionButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerButton" onClick={() => handleSearch()}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
