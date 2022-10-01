import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  //DEFINE 3 STATES
  const [data, setData] = useState([]); /*State that will contain the data*/
  const [loading, setLoading]=useState(false); /*State to verify if we start fetching data*/
  const [error, setError] = useState(false); /*State that will contain error*/

  //WE WILL USE THIS HOOK : useEffect . ALLOWS US TO perform side effects (EX: FECTH DATA USING , UPDATING THE DOM,TIMER...) in our components
  //THIS HOOK TAKE 2 arguments the first is a function and the second is optional an works like the condition to run peice of code inside the function
  
  useEffect(() => {
    const fetchData = async () => {
      //START FETCHING THE DATA
      setLoading(true);
      try {
        const res = await axios.get(url);
        setData(res.data);
      } catch (error) {
        setError(error);
      }
      //FETCHING DONE
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const reFetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetchData };
};

export default useFetch;
