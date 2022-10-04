import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import { getDateInRange } from "../../utils/tools";
import "./reservation.css";

const Reservation = ({ setOpenModal, hotel }) => {
  const { loading, data } = useFetch(`/hotels/room/${hotel}`);
  console.log(data);
  //Using of my Search Context to access the dates selected by the user
  const { dates } = useContext(SearchContext);
  //State for the selected rooms
  const [selectedRooms, setSelectedRooms] = useState([]);
  //When the user click on checkbox to select a room
  const handleSelect = (event) => {
    const checked = event.target.checked;
    const value = event.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value] //If the room is checked add it to the previous table
        : selectedRooms.filter(
            (item) => item !== value //If not remove it from the array
          )
    );
  };
  //Get the range dates of staying in timestamp format
  const allRequestDates = getDateInRange(
    dates[0]?.startDate,
    dates[0]?.endDate
  );

  //Verify if the rooms are available
  const ifRoomAvailable = (roomNumber) => {
   // if (roomNumber.unavailableDates.length === 0) return true;
    console.log("REQ DATE :",allRequestDates)
    const isFound = roomNumber?.unavailableDates.some((date) => {
      //For each date in unavailableDates we will check if  it in allRequestDates user
      //Don't forget to convert the date in timestamp
      console.log("DB DATE",new Date(date).getTime())
      return allRequestDates.includes(new Date(date).getTime());
    });
    //isFound is true : The room is not available false Available
    //So we return the opposite
    console.log("IS_FOUN",isFound);
    return !isFound;
    
  };
  //Make the reservation for the user
  const handleClick = async () => {
    console.log(allRequestDates);
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: allRequestDates,
          });
          return res.data;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  console.log("DATES", dates);
  return (
    <div className="modalContainer">
      <div className="modalContent">
        <FontAwesomeIcon
          className="closeModalBtn"
          icon={faClose}
          onClick={() => setOpenModal(false)}
        />
        {loading ? (
          "Please wait..."
        ) : (
          <>
            <span className="modalTitle">Select your rooms : </span>
            {data.map((item, i) => (
              <div className="modalItem" key={i}>
                <div className="itemInfo">
                  <div className="title">{item.title}</div>
                  <div className="desc">{item.desc}</div>
                  <div className="maxPepole">
                    Max people : <b>{item.maxPeople}</b>
                  </div>
                  <div className="rprice">${item.price}</div>
                </div>
                <div className="rContainer">
                  {item.roomNumbers.map((roomNumber, i) => (
                    <div className="room" key={i}>
                      <label>{roomNumber.number}</label>
                      <input
                        className="mCheck"
                        type="checkbox"
                        value={roomNumber._id}
                        onChange={handleSelect}
                        disabled={!ifRoomAvailable(roomNumber)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button className="rButton" onClick={handleClick}>
              Reserve Now!
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Reservation;
