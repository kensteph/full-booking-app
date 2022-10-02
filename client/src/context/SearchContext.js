import { createContext, useReducer } from "react";

//We gonna use Context API as State Management
const INITIAL_STATE = {
  city: undefined,
  dates: [],
  options: {
    adult: 1,
    children: 0,
    room: 1,
  },
};

//CREATE AND Export the Context in order to use it in other components

export const SearchContext = createContext(INITIAL_STATE);

//Mamage the actions using REDUCER
const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

//CREATE our provider
export const SearchContextProvider = ({ children }) => {
  //{children} represents any component using this provider to access the data
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
