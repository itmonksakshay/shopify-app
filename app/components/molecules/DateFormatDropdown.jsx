import React from "react";
import { Select } from "@shopify/polaris";

const DateFormateDropdown = ({ value, label, onChange }) => {
  const dateFormatOptions = [
    { label: "DD/MM/YYYY", value: "DD/MM/YYYY" },
    { label: "MMMM D, YYYY", value: "MMMM D, YYYY" },
    { label: "YYYY-MM-DD", value: "YYYY-MM-DD" },
    { label: "dddd, MMMM D, YYYY", value: "dddd, MMMM D, YYYY" },
    { label: "ddd, MMM D, YYYY", value: "ddd, MMM D, YYYY" },
    { label: "D MMM, YYYY", value: "D MMM, YYYY" },
    { label: "YYYY/MM/DD", value: "YYYY/MM/DD" },
    { label: "MM/DD/YYYY", value: "MM/DD/YYYY" },
  ];

  return (
    <Select
      label={label}
      options={dateFormatOptions}
      onChange={onChange}
      value={value}
    />
  );
};

export default DateFormateDropdown;
