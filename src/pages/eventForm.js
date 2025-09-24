import dayjs from "dayjs";

const EventFormHtml = ({...eventInfos}) => {

    let extraInfos = "";
    if (eventInfos.action === "edit") {
        extraInfos = `
            <div class="extra-infos">
            <p>Création le ${dayjs(eventInfos.created).format("YYYY-MM-DD / HH:mm")} par ${eventInfos.createdBy["username"]}<br>
            Dernière modification le ${dayjs(eventInfos.modified).format("YYYY-MM-DD / HH:mm")} par ${eventInfos.modifiedBy["username"]}</p>
            </div>
            `;
    }

    return `
    <p>
      <label for="event-title" class="swal2-popup">Commentaire:</label>
      <input
        type="text"
        id="event-title"
        class="swal2-input swal2-input-comment"
        placeholder="Entrez un commentaire"
        value="${eventInfos.comment}"
      />
    </p>
    <p>
      <label for="event-start-end" class="swal2-popup">Du</label>
      <input type="text" id="event-start-end" class="swal2-input" />
      <input type="hidden" id="event-start" value="${eventInfos.start}" />
      <input type="hidden" id="event-end" value="${eventInfos.end}" />
    </p>
    <p>
      <label for="event-status" class="swal2-popup">Statut</label>
      <select id="event-status">
        <option value="confirmed" ${eventInfos.status === "confirmed" ? "selected" : ""}>Confirmé</option>
        <option value="pending" ${eventInfos.status === "pending" ? "selected" : ""}>En attente</option>
      </select>
    </p>
    ${extraInfos}
  `;
            
}

export default EventFormHtml;
