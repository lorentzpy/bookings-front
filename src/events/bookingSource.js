import fetchWithAuth from "../api/fetchWithAuth";

const bookingsSource = ( currentMonth ) => {

    return {
        events: async (info, successCallback, failureCallback) => {

        try {

            const apiUrl = process.env.REACT_APP_API_URL;

            const bookingsBaseUrl = `${apiUrl}/bookings/${currentMonth}`;

            //const url = `${apiUrl}/bookings/${currentMonth}?start=${info.startStr}&end=${info.endStr}&timeZone=UTC`;
            const url = `${bookingsBaseUrl}?start=${info.startStr}&end=${info.endStr}&timeZone=UTC`;
    
            const data = await fetchWithAuth(url);

            const data_json = await data.json();

            const transformed = data_json.map((event) => {
            const rawEnd = new Date(event.to);
            const end = new Date(rawEnd);
            end.setUTCDate(end.getUTCDate() + 1);
    
            return {
                id: event._id,
                title: event.comment,
                start: new Date(event.from),
                end,
                status: event.status,
                created: event.created,
                createdBy: event.createdBy,
                modified: event.modified,
                modifiedBy: event.modifiedBy,
                className:
                event.status === "pending"
                    ? "reservation-event-temp"
                    : "reservation-event",
                editable: false,
                clickable: true,
            };
            });
    
            successCallback(transformed);
        } catch (err) {
            console.error("Erreur bookingsSource:", err);
            failureCallback(err);
        }
        }
    }
  };

  export default bookingsSource;
