import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const MiniCalendar = ({ events, showTrainer = false }) => {
  const CustomEvent = ({ event }) => (
    <div
      title={
        showTrainer && event.trainer
          ? `${event.title} — ${event.trainer}`
          : event.title
      }
      className="w-2 h-2 bg-[#1e6b3e] rounded-full mx-auto mt-1 cursor-pointer"
    />
  );

  return (
    <div className="bg-white rounded-xl p-2 sm:p-3">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["month"]}
        defaultView="month"
        toolbar={false}
        style={{ height: 230 }}
        components={{ event: CustomEvent }}
        eventPropGetter={() => ({
          style: { backgroundColor: "transparent", padding: 0 }
        })}
      />
    </div>
  );
};

export default MiniCalendar;
