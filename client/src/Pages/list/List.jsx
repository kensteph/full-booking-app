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
import useFetch from "../../hooks/useFetch";
export const List = () => {
  const location = useLocation(); //This hook allows us to receive data from other pages
  //console.log(location);
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState(location.state.date);
  const [destination, setDestination] = useState(location.state.destination);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(1000);

  const { loading, data,reFetchData } = useFetch(
    `/hotels?city=${destination}&min=${min}&max=${max}`
  );
  //console.log(data);

  const hancleClick =()=>{
    reFetchData();
  }

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
              <input type="text" placeholder={destination} onChange={(e)=>setDestination(e.target.value)} />
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
                  <input type="number" min="1" onChange={e=>setMin(e.target.value)} />
                </div>
                <div className="optionItem">
                  <label>
                    Max price <small>(per night)</small>
                  </label>
                  <input type="number" min="1" onChange={e=>setMax(e.target.value)} />
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
            <button className="searchButton" onClick={hancleClick}>Search</button>
          </div>

          {loading ? (
           <div> Loading...</div>
          ) : (
            <div className="searchResult">
              {data &&
                data.map((item, i) => <SearchItem hotel={item} key={i} />)}
            </div>
          )}
        </div>
        <MailingList />
        <Footer />
      </div>
    </>
  );
};
