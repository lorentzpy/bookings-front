import showEventPopup from "./showEventPopup";

const handleEventCreate = (selectionInfo, commitBooking, calendarRef, refreshBlocked, checkToken) => {
    
    // token has become invalid, redirect to login
    if (!checkToken()) {
        return;
    }

    const eventInfos = {
        start: selectionInfo.start,
        end: selectionInfo.end,
        comment: "",
        title: "Créer une réservation",
        action: "create",
        id: "",
        status: "pending",
        created: "",
        createdBy: ""
    }
    
    showEventPopup(eventInfos, commitBooking, calendarRef, refreshBlocked);
}

export default handleEventCreate;