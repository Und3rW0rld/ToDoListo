import React from "react";
import "./calendario.css";

const Calendario = () => {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const getFirstDayOfWeek = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderCalendar = (year) => {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const calendar = [];

    for (let month = 0; month < 12; month++) {
      const monthName = months[month];
      const monthDays = daysInMonth(month, year);
      const firstDayOfWeek = getFirstDayOfWeek(year, month);

      const monthData = (
        <div key={month} className="month">
          <h2>{monthName}</h2>
          <div className="weekdays">
            <div>D</div>
            <div>L</div>
            <div>M</div>
            <div>M</div>
            <div>J</div>
            <div>V</div>
            <div>S</div>
          </div>
          <div className="days">
            {Array.from({ length: firstDayOfWeek }, (_, index) => (
              <div key={`empty-${index}`} className="empty"></div>
            ))}
            {Array.from({ length: monthDays }, (_, index) => {
              const day = index + 1;
              const isCurrentDay =
                day === currentDay &&
                month === currentMonth &&
                year === currentYear;

              return (
                <div
                  key={day}
                  className={`day ${isCurrentDay ? "current-day" : ""}`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      );

      calendar.push(monthData);
    }

    return calendar;
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="calendar">
      <h1>Calendario {currentYear}</h1>
      <div className="calendar-container">{renderCalendar(currentYear)}</div>
    </div>
  );
};

export default Calendario;
