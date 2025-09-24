const publicHolidaySource=(currentYear) => {

    const url = `https://date.nager.at/api/v3/PublicHolidays/${currentYear}/FR`;

    return {
        events: (info, successCallback, failureCallback) => {
            fetch(url)
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

export default publicHolidaySource;