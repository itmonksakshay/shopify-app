import React from "react";
import { Select } from "@shopify/polaris";

const FontWeightDropdown = ({ value, label, onChange }) => {
  const fontWeightOptions = [
    { label: "Thin", value: "100" },
    { label: "Extra light", value: "200" },
    { label: "Light", value: "300" },
    { label: "Regular", value: "400" },
    { label: "Medium", value: "500" },
    { label: "Semi bold", value: "600" },
    { label: "Bold", value: "700" },
    { label: "Extra bold", value: "800" },
    { label: "Black", value: "900" },
  ];
  return (
    <Select
      label={label}
      options={fontWeightOptions}
      onChange={onChange}
      value={value}
    />
  );
};

export default FontWeightDropdown;
