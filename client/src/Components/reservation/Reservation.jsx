import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import "./reservation.css";

const Reservation = ({ setOpenModal, hotel }) => {
  const { loading, data } = useFetch(`/hotels/room/${hotel}`);
  const {dates} = useContext(SearchContext);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const handleSelect = (event) => {
    const checked = event.target.checked;
    const value= event.target.value;
    setSelectedRooms( checked? [...selectedRooms,value]: selectedRooms.filter(item=>item !== value));
  };
  const handleClick=()=>{

  }
  console.log(dates);
  return (
    <div className="modalContainer">
      <div className="modalContent">
        <FontAwesomeIcon
          className="closeModalBtn"
          icon={faClose}
          onClick={() => setOpenModal(false)}
        />
        <span>Select your rooms : </span>
        {data.map((item, i) => (
          <div className="modalItem" key={i}>
            <div className="itemInfo">
              <div className="title">{item.title}</div>
              <div className="desc">{item.desc}</div>
              <div className="maxPepole">
                Max people : <b>{item.maxPeople}</b>
              </div>
              <div className="price">{item.price}</div>
            </div>

            {item.roomNumbers.map((roomNumber, i) => (
              <div className="room">
                <label>{roomNumber.number}</label>
                <input
                  type="checkbox"
                  value={roomNumber._id}
                  onChange={handleSelect}
                />
              </div>
            ))}
          </div>
        ))}
         <button className="rButton" onClick={handleClick}>Reserve Now!</button>
      </div>
    </div>
  );
};

export default Reservation;
