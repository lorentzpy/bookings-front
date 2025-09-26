import Swal from "sweetalert2";
import '@sweetalert2/theme-bulma/bulma.css';
import EventFormHtml from "../pages/eventForm";
import handleSwalOpen from "./handleSwalOpen";

const showEventPopup = (eventInfos, commitBooking, calendarRef, refreshBlocked) => {
       
    var suppr = true;
    if (eventInfos.action === "create") {
        eventInfos.end.setDate(eventInfos.end.getDate() - 1); // ajuster la date si besoin
        suppr = false;
    }

    Swal.fire({
        title: eventInfos.title,
        text: `${eventInfos.start} to ${eventInfos.end}`,
        showCloseButton: true,
        showCancelButton: true,
        showDenyButton: suppr,
        denyButtonText: "Supprimer",
        customClass: {
            confirmButton: "order-1",
            cancelButton: "order-2",
            denyButton: "order-3"
        },
        draggable: true,
        html: EventFormHtml({...eventInfos }),
        didOpen: () => {
            handleSwalOpen(eventInfos.start, eventInfos.end, eventInfos.id, eventInfos.billable);
        },
        preConfirm: () => {
            const comment = document.getElementById("event-title")?.value;

            const startDateAsStr = document.getElementById("event-start")?.value;
           
            const endDateAsStr = document.getElementById("event-end")?.value;
           
            const startDate = new Date(startDateAsStr);
            const endDate = new Date(endDateAsStr);
            
            const status = document.getElementById("event-status")?.value;

            const billable = document.getElementById("event-billable").checked;

            return { comment, startDate, endDate, status, billable };
        }
    }).then((result) => {
        if (result.isConfirmed) {

            const { comment, startDate, endDate, status, billable } = result.value;

            const payload = {
                from: startDate.toISOString(),
                to: endDate.toISOString(),
                status: status,
                comment: comment,
                billable: billable
            }

            if (eventInfos.action === "edit" || eventInfos.action === "create") {
                commitBooking(eventInfos.action, payload, eventInfos.id).then( () => {
                    refreshBlocked();
                    calendarRef.current.getApi().refetchEvents();
                });
            }
        }

        if (result.isDenied) {
            commitBooking("delete", {}, eventInfos.id).then( () => {
                refreshBlocked();
                calendarRef.current.getApi().refetchEvents();
            });
        }
    });
};

export default showEventPopup;