import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarComponent = ({ events }) => {
  // Custom event component: only show title
  const CustomEvent = ({ event }) => (
    <div
      style={{
        backgroundColor: "#3b82f6",
        color: "white",
        padding: "2px 4px",
        borderRadius: "4px",
        fontSize: "0.75rem",
        fontWeight: 600,
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
      }}
    >
      {event.title}
    </div>
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      {events.length === 0 ? (
        <p className="text-center text-gray-600 font-semibold">
          No sessions available
        </p>
      ) : (
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          views={["month", "week", "day"]}
          defaultView="week"
          components={{
            event: CustomEvent,
          }}
          eventPropGetter={() => ({
            style: {
              padding: 0,
            },
          })}
        />
      )}
    </div>
  );
};

export default CalendarComponent;
