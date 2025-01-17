import { Select } from "@shopify/polaris";
import React, { useEffect, useState } from "react";

export function FontStyleSelector({ value, handleChange }) {
  const [selected, setSelected] = useState(value); // Default font style is 'normal'

  useEffect(() => {
    if (value !== selected) {
      handleChange(selected);
    }
  }, [selected, value]);

  // Expanded options with more font styles
  const options = [
    { label: "Normal", value: "normal" },
    { label: "Italic", value: "italic" },
    { label: "Oblique", value: "oblique" },
    { label: "Initial", value: "initial" },
    { label: "Inherit", value: "inherit" },
  ];

  return (
    <Select
      label="Choose font style"
      options={options}
      onChange={(value) => setSelected(value)}
      value={selected}
    />
  );
}
