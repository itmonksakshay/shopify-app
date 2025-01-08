import React, { useEffect, useState } from "react";
import { Text, InlineStack, Box, Button } from "@shopify/polaris";

const ToggleSwitch = ({ label, checked, onToggle }) => {
  const [isActive, setActive] = useState(checked);

  const handleToggle = () => {
    setActive((value) => !value);
  };

  useEffect(() => {
    onToggle(isActive);
  }, [isActive]);

  const buttonContent = isActive ? "Disable" : "Activate";
  const badgeContent = isActive ? "active" : "disabled";

  return (
    <Box width="100%">
      <InlineStack
        gap="1200"
        align="space-between"
        blockAlign="start"
        wrap={false}
      >
        <label htmlFor={"toggle"}>
          <Text variant="headingMd" as="h6">
            {label}
          </Text>
        </label>
        <Box minWidth="fit-content">
          <InlineStack align="end">
            {" "}
            <Button
              role="switch"
              id={"toggle"}
              ariaChecked={isActive ? "true" : "false"}
              onClick={handleToggle}
              size="slim"
              variant={!isActive ? "primary" : "secondary"}
            >
              {buttonContent}
            </Button>
          </InlineStack>
        </Box>
      </InlineStack>
    </Box>
  );
};

export default ToggleSwitch;
