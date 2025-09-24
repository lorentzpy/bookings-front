import { useState, useEffect } from "react";

const useFetchHolidays = (schoolYear) => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect( () => {

        const url = `https://data.education.gouv.fr/api/explore/v2.0/catalog/datasets/fr-en-calendrier-scolaire/records?limit=100&offset=0&timezone=UTC&where=annee_scolaire="${schoolYear}" and (zones="Zone A" or zones="Zone B" or zones="Zone C") and not population ="Enseignants"&select=description, start_date, end_date, zones&group_by=description, start_date, end_date, zones`

        const abortCont = new AbortController();

        fetch(url, {signal: abortCont.signal})
            .then(response => {
                if (!response.ok) {
                    throw Error("Could not fetch data!");
                }                
                return response.json()
            })
            .then(data =>{
                setData(data);
                setError(null);
            })
            .catch(err => {
                setError(err.message);                
            })

        return () => abortCont.abort()
    }, [schoolYear]);

    return {data, error};

}

export default useFetchHolidays; 