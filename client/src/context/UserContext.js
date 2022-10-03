import { createContext, useEffect, useReducer } from "react";

//INITIAL STATE
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("userInfo")) || null, //Look in the local storge if the user is already login else null
  loading: false,
  error: null,
};

//CREATE AND EXPORT OUR CONTEXT
export const UserContext = createContext(INITIAL_STATE);

//Next we'll use a reducer(a function that contents our logic) in order to customize our state management

const UserReducer = (state, action) => {
  //action : simple valie or an onject in this case {type:,payload}
  switch (action.type) {
    case "START_LOGING":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGING_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGING_FAILED":
      return {
        user: null,
        password: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return INITIAL_STATE;
    default:
      return state;
  }
};

//Next we'll use the Context Provider to wrap the tree of components that need the state Context

export const UserContextProvider = ({ children }) => {
  //children represents any component wraps by our provider
  //Inside our Provider component,we will use a reducer
  //The reducer function contains your custom state logic and the initialStatecan be a simple value but generally will contain an object.
  //The useReducer Hook returns the current stateand a dispatchmethod.
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE); //useReducer is an alternative to useState
  //We gonna use useEffect to save locally the user data once login. This to prevent to lose user data when we refresh the pasge
  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(state.user)); //We cannot save an object in local storage so we have to convert it to string
  }, [state.user]);
  return (
    <UserContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
