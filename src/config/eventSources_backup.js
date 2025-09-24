import fetchWithAuth from "../api/fetchWithAuth";

const getSources = (schoolYear, currentMonth, currentYear, selectedZones, publicHolidays) => {

    const apiUrl = process.env.REACT_APP_API_URL;
    
    const zones = selectedZones.map(x => `zones="Zone ${x}"`).join(" or ");

    const holidayBaseUrl =`https://data.education.gouv.fr/api/explore/v2.0/catalog/datasets/fr-en-calendrier-scolaire/records`; 
    let holidayUrl = holidayBaseUrl + `?limit=100&offset=0&timezone=UTC&where=annee_scolaire="${schoolYear}"`;
    holidayUrl += ` and (${zones})`;

    holidayUrl += ` and not population ="Enseignants"`;
    holidayUrl += `&select=description, start_date, end_date, zones&group_by=description, start_date, end_date, zones`;

    const publicHolidaysUrl = `https://date.nager.at/api/v3/PublicHolidays/${currentYear}/FR`;
    const bookingsBaseUrl = `${apiUrl}/bookings/${currentMonth}`;

    const eventSources = [];

    const holidaySource = {

        // holidays avec fonction personnalisée
        events: (info, successCallback, failureCallback) => {
          if (selectedZones.length > 0) {
            fetch(holidayUrl)
              .then((res) => res.json())
              .then((data) => {
                
                const holidays = data.records.map((event) => ({
                  title: `${event.record.fields.description} ${event.record.fields.zones}`,
                  start: event.record.fields.start_date,
                  end: new Date(event.record.fields.end_date).setHours(0, 0, 0, 0),
                  className: `${event.record.fields.zones.replace(" ", "").toLowerCase()}-event`,
                  clickable: false
                }));
                successCallback(holidays);
              })
              .catch(failureCallback);
          }
        }      
    }

    const publicHolidaysSource = {
        events: (info, successCallback, failureCallback) => {
            if (publicHolidays) {
              fetch(publicHolidaysUrl)
                .then((res) => res.json())
                .then((data) => {
                  const publicHolidays = data.map((event) => ({
                      title: event.localName,
                      start: new Date(event.date),
                      end: new Date(new Date(event.date).getTime() + 24 * 60 * 60 * 1000),
                      className: "public-holiday",
                      editable: false,
                      clickable: false
                  }));
                  successCallback(publicHolidays);
                })
                .catch(failureCallback);
              }
            }
    }

    const bookingsSource = {
      events: async (info, successCallback, failureCallback) => {
        try {
          //const url = `${apiUrl}/bookings/${currentMonth}?start=${info.startStr}&end=${info.endStr}&timeZone=UTC`;
          const url = `${bookingsBaseUrl}?start=${info.startStr}&end=${info.endStr}&timeZone=UTC`;
    
          const data = await fetchWithAuth(url);
    
          const transformed = data.map((event) => {
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
      },
    };

    /*
    const bookingsSource = {
        url: bookingsBaseUrl,
        method: "GET",
        eventDataTransform: (event) => {

          const rawEnd = new Date(event.to);
          const end = new Date(rawEnd);
          end.setUTCDate(end.getUTCDate() + 1);

          const transformed = {
            id: event._id,
            title: event.comment,
            start: new Date(event.from),
            end: end,
            status: event.status,
            created: event.created,
            createdBy: event.createdBy,
            modified: event.modified,
            modifiedBy: event.modifiedBy,
            className: event.status==='pending'?'reservation-event-temp':'reservation-event',
            editable: false,
            clickable: true
          };

          return transformed;
        } 
    }*/

    if (selectedZones.length > 0) {
      eventSources.push(holidaySource);
    };
    eventSources.push(bookingsSource);
    if (publicHolidays) {
      eventSources.push(publicHolidaysSource);
    }


    return eventSources;
}

export default getSources;