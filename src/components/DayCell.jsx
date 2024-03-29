import React from "react";

export const DayCell = ({ day, currentDate, onDoubleClick, eventData }) => {
  const fullDate = `${currentDate.getFullYear()}-${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}-${String(day).padStart(2, "0")}`; // format: YYYY-MM-DD
  const dayEvent = eventData.find((event) => event.fullDate === fullDate);
  
  return (
    <td
      className="border p-1 w-16 h-16 sm:w-10 sm:h-20 md:w-20 md:h-20 lg:w-32 lg:h-32 xl:w-40 xl:h-40 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300"
      onDoubleClick={() => onDoubleClick(day)}
    >
      <div className="flex flex-col h-full mx-auto w-full overflow-hidden">
        <div className="top h-1/4 w-full">
          {currentDate.getDate() === day ? (
            <div className="rounded-full bg-red-300">{day}</div>
          ) : (
            <div className="rounded-full text-blue-600">{day}</div>
          )}
        </div>

        <div className="bottom flex-grow h-3/4 py-1 w-full cursor-pointer">
          {dayEvent && (
            <div className="rounded-full bg-indigo-300 ">
              <strong>{dayEvent.eventname}</strong>
              <p>{dayEvent.description}</p>
              <small>
                {dayEvent.from} - {dayEvent.to}
              </small>
            </div>
          )}
        </div>
      </div>
    </td>
  );
};
