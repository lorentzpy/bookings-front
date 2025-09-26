import showEventPopup from "./showEventPopup";

const handleEventClick = (info, commitBooking, calendarRef, refreshBlocked, checkToken) => {

    if ( !checkToken() ) {
        return;
    }

    const extendedProps = info.event.extendedProps;
    
    const eventInfos = {
        start: info.event.start,
        end: info.event.end,
        comment: info.event.title,
        title: "Modifier une réservation",
        action: "edit",
        id: info.event._def.publicId || "",
        status: extendedProps.status,
        created: extendedProps.created,
        createdBy: extendedProps.createdBy,
        modified: extendedProps.modified,
        modifiedBy: extendedProps.modifiedBy,
        billable: extendedProps.billable
    }

    eventInfos.end.setUTCDate(eventInfos.end.getUTCDate() - 1);

    // check if the event is clickable
    if (info.event.extendedProps.clickable !== false) {
        //showEventPopup(start, end, comment, id, "Modifier une réservation", statut, "edit", commitBooking, calendarRef, refreshBlocked, created, createdBy);
        showEventPopup(eventInfos, commitBooking, calendarRef, refreshBlocked);
    }
}

export default handleEventClick;