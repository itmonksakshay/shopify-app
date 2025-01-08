"use client";
import React, { useState, useEffect } from "react";
import { Select } from "@shopify/polaris";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // Import the UTC plugin
import timezone from "dayjs/plugin/timezone"; // Import the Timezone plugin
import { timezones } from "@/utils/constatns/timezones";
dayjs.extend(utc);
dayjs.extend(timezone);

const TimezoneDropdown = ({ setStoreTimezone, storeTimezone }) => {
  const [timezoneOptions, setTimezoneOptions] = useState([]);
  useEffect(() => {
    setTimezoneOptions(timezones);
  }, []);

  return (
    <Select
      label="Select Timezone"
      options={timezoneOptions}
      onChange={setStoreTimezone}
      value={storeTimezone}
    />
  );
};

export default TimezoneDropdown;
