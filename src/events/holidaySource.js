const holidaySource = (schoolYear, selectedZones) => {

    if (!selectedZones.length) return null;

    const zones = selectedZones.map(x => `zones="Zone ${x}"`).join(" or ");

    const holidayBaseUrl =`https://data.education.gouv.fr/api/explore/v2.0/catalog/datasets/fr-en-calendrier-scolaire/records`; 
    let holidayUrl = holidayBaseUrl + `?limit=100&offset=0&timezone=UTC&where=annee_scolaire="${schoolYear}"`;
    holidayUrl += ` and (${zones})`;

    holidayUrl += ` and not population ="Enseignants"`;
    holidayUrl += `&select=description, start_date, end_date, zones&group_by=description, start_date, end_date, zones`;

    return {
        events: (info, successCallback, failureCallback) => {
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

export default holidaySource;