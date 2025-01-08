"use client";
import { useEffect, useState } from "react";
import { Checkbox, BlockStack } from "@shopify/polaris";

const WeeklyOffDaysComponent = ({ weeklyOffDays, setWeeklyOffDays }) => {
  const [selectedDays, setSelectedDays] = useState(weeklyOffDays);

  // Handle checkbox state changes
  const handleChange = (day) => {
    setSelectedDays((prevSelected) =>
      prevSelected.includes(day)
        ? prevSelected.filter((selectedDay) => selectedDay !== day)
        : [...prevSelected, day]
    );
  };

  useEffect(() => {
    setWeeklyOffDays(selectedDays);
  }, [selectedDays]);

  // Days of the week for selection
  const daysOfWeek = [
    { label: "Sunday", value: 0 },
    { label: "Monday", value: 1 },
    { label: "Tuesday", value: 2 },
    { label: "Wednesday", value: 3 },
    { label: "Thursday", value: 4 },
    { label: "Friday", value: 5 },
    { label: "Saturday", value: 6 },
  ];

  return (
    <div>
      {daysOfWeek.map((day, key) => (
        <BlockStack gap="200" key={key}>
          <Checkbox
            key={day.value}
            label={day.label}
            checked={selectedDays.includes(day.value)}
            onChange={() => handleChange(day.value)}
          />
        </BlockStack>
      ))}
    </div>
  );
};

export default WeeklyOffDaysComponent;
