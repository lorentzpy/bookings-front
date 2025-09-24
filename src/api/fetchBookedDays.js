import fetchWithAuth from "./fetchWithAuth";

const apiUrl = process.env.REACT_APP_API_URL;

const fetchBookedDays = async (currentMonth, excludeId = "") => {

    const url = `${apiUrl}/bookings/${currentMonth}?exclude=${excludeId}`;
    //const token = localStorage.getItem('token');

    try {
        const data = await fetchWithAuth(url);
        
        const data_json = await data.json();

        return data_json;
    } catch (error) {
        console.error("Error fechting booked days");
    }
 
}

export default fetchBookedDays;