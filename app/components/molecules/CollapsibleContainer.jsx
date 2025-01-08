"use client";

import { Text, Collapsible, Icon, Box } from "@shopify/polaris";

import { ChevronUpIcon, ChevronDownIcon } from "@shopify/polaris-icons";
import { useState } from "react";

const CollapsibleContainer = ({ children, title }) => {
  const [active, setActive] = useState(false); // State to control the collapsible visibility

  const toggleActive = () => {
    setActive(!active);
  };

  return (
    <Box
      style={{
        "--pc-box-background": "var(--p-color-bg-surface)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "var(--p-space-400)",
          cursor: "pointer",
          borderBottom: "1px solid #e1e4e8",
        }}
        onClick={() => toggleActive()}
      >
        <Text as="h3">{title}</Text>
        <Box>
          <Icon source={active ? ChevronUpIcon : ChevronDownIcon} />
        </Box>
      </div>
      <Collapsible open={active}>
        <div
          style={{
            padding: "20px",
          }}
        >
          {children}
        </div>
      </Collapsible>
    </Box>
  );
};

export default CollapsibleContainer;
