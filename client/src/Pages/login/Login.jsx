import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Login = () => {

  const [userInfo, setUserInfo] = useState({
    username: undefined,
    password: undefined,
  });
  const { user,dispatch, error, loading } = useContext(UserContext);
  const navigate = useNavigate();
  const handleChangeValue = (event) => {
    setUserInfo((prevState) => ({
      ...prevState, //Prevoius state
      [event.target.id]: event.target.value, //chage only the changed value
    }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "START_LOGING"});
    try {
      const res = await axios.post("/auth/login",userInfo);
      dispatch({ type: "LOGING_SUCCESS",payload:res.data});
      navigate("/");
    } catch (error) {
      dispatch({ type: "LOGING_FAILED",payload:error.response.data});
    }
  };

  console.log("USER INFO : ",user);
  return (
    <div className="login">
      <div className="logContainer">
        <input type="text" id="username" onChange={handleChangeValue} />
        <input type="password" id="password" onChange={handleChangeValue} />
        <button onClick={handleClick} disabled={loading}>Login</button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
