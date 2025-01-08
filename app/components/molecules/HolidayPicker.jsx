import { Box, DatePicker, Text } from "@shopify/polaris";
import { useState, useCallback } from "react";
import dayjs from "dayjs";

function HolidayPicker({
  setHolidays,
  holidays,
  weeklyOffDays,
  selectedDate,
  error,
}) {
  // Initialize with dayjs
  const [{ month, year }, setDate] = useState({
    month: dayjs().month(),
    year: dayjs().year(),
  });

  // Handle month and year change
  const handleMonthChange = useCallback(
    (month, year) => setDate({ month, year }),
    []
  );
  // Function to get all dates of weekends (Saturday and Sunday)
  const getWeekendDates = (month, year) => {
    const firstDayOfMonth = dayjs(new Date(year, month, 1));
    const daysInMonth = firstDayOfMonth.daysInMonth();
    const weekendDates = [];

    // Loop through all days of the month and check if it's Saturday or Sunday
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDay = firstDayOfMonth.date(day);
      const dayOfWeek = currentDay.day(); // 0 = Sunday, 6 = Saturday

      if (weeklyOffDays.includes(dayOfWeek)) {
        weekendDates.push(currentDay);
      }
    }
    return weekendDates;
  };

  // Get all weekend dates for the current month
  const disableWeekendDates = getWeekendDates(month, year);

  // Convert to native Date objects to pass to DatePicker
  const disableWeekendDatesNative = [
    ...disableWeekendDates.map((date) => date.toDate()),
    ...holidays.map((date) => dayjs(date).toDate()),
  ];

  return (
    <Box>
      <DatePicker
        month={month}
        year={year}
        selected={dayjs(selectedDate).toDate()}
        onChange={({ start }) => setHolidays(dayjs(start).format())}
        onMonthChange={handleMonthChange}
        disableSpecificDates={disableWeekendDatesNative}
      />
      {error && (
        <Text as="p" tone="critical">
          {error}
        </Text>
      )}
    </Box>
  );
}

export default HolidayPicker;
