import {useState, useEffect } from 'react';
import fetchWithAuth from "../api/fetchWithAuth";

const apiUrl = process.env.REACT_APP_API_URL;

const useFetchBookings = (currentMonth) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const url = `${apiUrl}/bookings/${currentMonth}`;
      const abortCont = new AbortController();
  
      const load = async () => {
        try {
          const result = await fetchWithAuth(url, { signal: abortCont.signal });

          const result_json = await result.json();

          setData(result_json);
          setError(null);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.error("Erreur useFetchBookings:", err);
            setError(err.message);
          }
        }
      };
  
      load();
  
      return () => abortCont.abort();
    }, [currentMonth]);
  
    return { data, error };
};
  
export default useFetchBookings;

/*  

const useFetchBookings = (currentMonth) => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect( () => {

        const url = `${apiUrl}/bookings/${currentMonth}`;
        
        const abortCont2 = new AbortController();
        
        fetch(url, {
                signal: abortCont2.signal,
                headers: {"Authorization": `Bearer ${token}`,"Content-Type":"application/json;charset=utf-8"}
            })
            .then(response => {
                        
                if (!response.ok) {
                    throw Error("Could not fetch bookings");
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                setError(null);
            })
            .catch(err => {
                console.error("erreur: " + err);
                setError(err.message);
            })
        return () => abortCont2.abort();    
    }, [currentMonth]);

    return {data, error};
}

export default useFetchBookings;
*/