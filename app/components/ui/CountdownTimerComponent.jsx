"use client";
import React, { useState, useEffect } from "react";

const CountdownTimerComponent = ({
  containerStyle = {},
  titleStyle = {},
  dateSubtitleLayout = {},
  dateStyle = {},
  timerTextStyle = {},
  timeLeftStyle = {},
  globalSettings = {},
}) => {
  // Set the target date for the countdown (e.g., December 13, 2024)
  let targetDate = "";

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
  useEffect(() => {
    targetDate = new Date().toLocaleDateString();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer); // Cleanup interval on unmount
  }, []);

  return (
    <div style={containerStyle}>
      {globalSettings.isTitleActive && (
        <div style={titleStyle}>{globalSettings.title}</div>
      )}
      <div style={dateSubtitleLayout}>
        {globalSettings.isSubtitleActive && (
          <div>{globalSettings.subtitle}</div>
        )}
        <div style={dateStyle}>{targetDate}</div>
      </div>
      <div>
        <h6>Time Left to Order</h6>
        <h5 style={timerTextStyle}>{timeLeft.hours || "0"} hours</h5>
        <h5 style={timerTextStyle}>{timeLeft.minutes || "0"} minutes</h5>
        <h5 style={timerTextStyle}>{timeLeft.seconds || "0"} seconds</h5>
      </div>
    </div>
  );
};

export default CountdownTimerComponent;
