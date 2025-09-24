import flatpickr from "flatpickr";
import { French } from "flatpickr/dist/l10n/fr.js";
import fetchBookedDays from "../api/fetchBookedDays";

let fpInstance = null;

const handleSwalOpen = (start, end, id) => {

    const forcedEnd = (!end || start === end) ? start : end;

    fpInstance = flatpickr('#event-start-end', {
        //dateFormat: "d/m/Y",
        mode: "range",
        enableTime: false,
        locale: French,
        defaultDate: [start, forcedEnd],
        onMonthChange:  (selectedDates, dateStr, instance) => handleFlatPickrChange(selectedDates, dateStr, instance, id),
        onYearChange:  (selectedDates, dateStr, instance) => handleFlatPickrChange(selectedDates, dateStr, instance, id),
        onChange: (selectedDates, dateStr, instance) => {
            if (selectedDates.length === 2) {
                const [localStart, localEnd] = selectedDates;
        
                // Convertir vers UTC en ISO
                const toUTCISOString = (date) => new Date(
                    Date.UTC(
                        date.getFullYear(),
                        date.getMonth(),
                        date.getDate()
                    )
                ).toISOString();
        
                document.getElementById("event-start").value = toUTCISOString(localStart);
                document.getElementById("event-end").value = toUTCISOString(localEnd);
            }
        }
    });

    const initialPeriod = new Date();
    const currentPeriod = `${initialPeriod.getFullYear()}-${String(initialPeriod.getMonth() + 1).padStart(2, '0')}`;
    fetchAndDisableDates(currentPeriod, id);
}

const handleFlatPickrChange = (selectedDates, dateStr, instance, id) => {
    const currentMonth = String((instance.currentMonth + 1))
    const currentYear = String(instance.currentYear);

    const currentPeriod = `${currentYear}-${currentMonth.padStart(2, "0")}`;

    fetchAndDisableDates(currentPeriod, id);
}

const fetchAndDisableDates = (period, excludeId) => {
    fetchBookedDays(period, excludeId).then(data => {
        const bookedRanges = data.map((event) => ({
            from: event.from.substring(0, 10),
            to: event.to.substring(0, 10)
        }));

        if (fpInstance) {
            fpInstance.set("disable", bookedRanges);
        }
    });
};

export default handleSwalOpen;