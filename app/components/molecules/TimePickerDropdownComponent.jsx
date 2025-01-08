import React, { useState } from "react";
import { Select, Card } from "@shopify/polaris";

// Function to generate time options in AM/PM format with 15-minute intervals
const generateTimeOptions = () => {
  const times = [];
  const formatAMPM = (hours, minutes) => {
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // 12:00 PM or 12:00 AM
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  };

  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      const timeLabel = formatAMPM(h, m);
      const timeValue = `${h < 10 ? "0" + h : h}:${m < 10 ? "0" + m : m}`;
      times.push({ label: timeLabel, value: timeValue });
    }
  }
  return times;
};

const TimePickerDropdownComponent = ({ cutoffTime, onCutoffTimeChange }) => {
  // Time options in AM/PM format with 15-minute intervals
  const timeOptions = generateTimeOptions();

  // Handle time change
  const handleTimeChange = (value) => {
    onCutoffTimeChange(value);
  };

  return (
    <Card sectioned>
      <Select
        label="Select Default Time"
        options={timeOptions}
        value={cutoffTime}
        onChange={handleTimeChange}
      />
    </Card>
  );
};

export default TimePickerDropdownComponent;
