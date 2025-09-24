import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import interactionPlugin from "@fullcalendar/interaction";
//import eventHandlers from "../eventHandlers";
import {handleDateChange, handleEventClick, handleEventCreate} from "../events/index";

import useCommitBooking from "../hooks/useCommitBooking";
import getSources from "../config/eventSources";
import useBlockedDates from "../hooks/useBlockedDates";

//import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import dayjs from "dayjs";
import { useAuth } from "../context/authContext";


const CalendarComponent = ( { selectedZones, publicHolidays } ) => {

  const { checkToken } = useAuth();

  const { commitBooking } = useCommitBooking();
  const calendarRef = useRef(null);

  //const [events, setEvents] = useState([]);
  const [schoolYear, setSchoolYear] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const { blockedDates, refreshBlocked } = useBlockedDates(currentMonth);


  // useEffect for reacting to the checkboxes (zones + public holidays)
  useEffect( () => {
    calendarRef.current?.getApi()?.refetchEvents();
  }, [selectedZones, publicHolidays]);

  return (
    <FullCalendar
      ref={calendarRef}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      dayMaxEventRows={true}
      eventSources={getSources(schoolYear, currentMonth, currentYear, selectedZones, publicHolidays)}
      locale="fr"
      timeZone='UTC'
      selectable={true}
      datesSet={(info) => handleDateChange(info, { setSchoolYear, setCurrentMonth, setCurrentYear, checkToken })}
      firstDay={1}
      editable={false}
      displayEventTime={false}
      today={true}
      fixedWeekCount={false}
      headerToolbar={{
        left: 'title',
        center: undefined,
        right: 'prev,next'
      }}
      eventTextColor={'black'}
      eventOrder={(a, b) => {
        const getClass = (event) => event.ui?.classNames?.[0] || "default";
      
        const priority = {
          "reservation-event": -1,
          "reservation-event-temp": -1,
          "zonea-event": 1,
          "zoneb-event": 2,
          "zonec-event": 3
        };
      
        return (priority[getClass(a)] || 99) - (priority[getClass(b)] || 99);
      }}

      eventClick={(info) => handleEventClick(info, commitBooking, calendarRef, refreshBlocked, checkToken)}
      select={(selectionInfo) => handleEventCreate(selectionInfo, commitBooking, calendarRef, refreshBlocked, checkToken)}
      selectAllow={(selectInfo) => {

        let current = dayjs(selectInfo.start);
        const end = dayjs(selectInfo.end);
        while (current.isBefore(end, 'day')) {
          if (blockedDates.includes(current.format('YYYY-MM-DD'))) {
            return false; // empêche la sélection si une date est bloquée
          }
          current = current.add(1, 'day');
        }
        return true;

      } }
    />
  );
};

export default CalendarComponent;


