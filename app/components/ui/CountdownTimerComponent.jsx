"use client";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";

const CountdownTimerComponent = ({
  containerLayout = {},
  titleLayout = {},
  dateSubtitleLayout = {},
  dateStyle = {},
  timerTitleStyle = {},
  timerTextStyle = {},
  globalSettings = {},
  subtitleStyle = {},
  timerStyle = {},
}) => {
  // Set the target date for the countdown (e.g., December 13, 2024)
  let targetDate = dayjs().format(globalSettings?.dateFormat || "DD/MM/YYYY");

  const [timeLeft, setTimeLeft] = useState({});

  // Function to calculate the time remaining
  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      setTimeLeft({
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
      return;
    }

    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    setTimeLeft({ hours, minutes, seconds });
  };

  // Update the countdown every second
  // useEffect(() => {
  //   targetDate = new Date().toLocaleDateString();
  //   const timer = setInterval(calculateTimeLeft, 1000);
  //   return () => clearInterval(timer); // Cleanup interval on unmount
  // }, []);

  return (
    <div style={containerLayout}>
      {globalSettings.isTitleActive && (
        <div style={titleLayout}>{globalSettings.title}</div>
      )}
      {globalSettings.isDateSubtitleActive && (
        <div style={dateSubtitleLayout}>
          {globalSettings.isSubtitleActive && (
            <div style={subtitleStyle}>{globalSettings.subtitle}</div>
          )}
          {globalSettings.isCurrentDateActive && (
            <div style={dateStyle}>{targetDate}</div>
          )}
        </div>
      )}
      <div style={timerStyle}>
        {globalSettings.isTimerTitleActive && (
          <h6 style={timerTitleStyle}>{globalSettings.timerTitle}</h6>
        )}
        <h5 style={timerTextStyle}>
          {timeLeft.hours || "0"} {globalSettings.hoursTitle}
        </h5>
        <h5 style={timerTextStyle}>
          {timeLeft.minutes || "0"} {globalSettings.minutesTitle}
        </h5>
        <h5 style={timerTextStyle}>
          {timeLeft.seconds || "0"} {globalSettings.secondsTitle}
        </h5>
      </div>
    </div>
  );
};

export default CountdownTimerComponent;
