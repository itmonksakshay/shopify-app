"use client";
import CollapsibleContainer from "@/components/molecules/CollapsibleContainer";
import CustomColorPicker from "@/components/molecules/ColorPicker";
import FontWeightDropdown from "@/components/molecules/FontWeightDropdown";
import ToggleSwitch from "@/components/molecules/ToggleSwitch";
import { Box, RangeSlider, Select, TextField } from "@shopify/polaris";
import { useEffect, useState } from "react";

const CountdownTitleSetting = ({
  layout,
  setlayout,
  globalSettings,
  setGlobalSettings,
}) => {
  const [containerLayout, setContainerLayout] = useState(layout);
  const [titleSettings, setTittleSettings] = useState(globalSettings);

  useEffect(() => {
    setlayout(containerLayout);
  }, [containerLayout]);

  useEffect(() => {
    setGlobalSettings(titleSettings);
  }, [titleSettings]);

  const backgroundColorHandler = (newColor) => {
    setContainerLayout((value) => ({ ...value, backgroundColor: newColor }));
  };

  const foregroundColorHandler = (newColor) => {
    setContainerLayout((value) => ({ ...value, color: newColor }));
  };

  const handleOuterBorderWidthHandler = (value) => {
    setContainerLayout((values) => ({
      ...values,
      borderBottomWidth: value.toString().concat("px"),
    }));
  };

  const outerBorderColorHandler = (newColor) => {
    setContainerLayout((value) => ({ ...value, borderBottomColor: newColor }));
  };

  const handleSelectChange = (value) => {
    setContainerLayout((values) => ({ ...values, justifyContent: value }));
  };

  const handleTitleToggle = (value) => {
    setTittleSettings((values) => ({ ...values, isTitleActive: value }));
  };

  const handleTitleChange = (value) => {
    setTittleSettings((values) => ({ ...values, title: value }));
  };

  const handleTitleSpacing = (value) => {
    setContainerLayout((values) => ({
      ...values,
      paddingTop: value.toString().concat("px"),
      paddingBottom: value.toString().concat("px"),
    }));
  };

  const handleTitleFontSize = (value) => {
    setContainerLayout((values) => ({
      ...values,
      fontSize: value.toString().concat("px"),
    }));
  };

  const handFontWeightChange = (value) => {
    setContainerLayout((values) => ({ ...values, fontWeight: value }));
  };

  const handleFontFamilyChange = (value) => {
    setContainerLayout((values) => ({ ...values, fontFamily: value }));
  };

  return (
    <CollapsibleContainer title="Title Settings">
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <ToggleSwitch
          label="Enable Countdown Timer"
          checked={titleSettings.isTitleActive}
          onToggle={handleTitleToggle}
        />
        {titleSettings.isTitleActive && (
          <>
            <TextField
              value={titleSettings.title}
              onChange={handleTitleChange}
              autoComplete="off"
            />
            <CustomColorPicker
              label={"Background"}
              defaultColor={containerLayout.backgroundColor}
              setDefaultColor={backgroundColorHandler}
            />
            <RangeSlider
              output
              label="Spacing"
              min={0}
              max={20}
              step={1}
              value={Number(containerLayout.paddingTop.replace("px", ""))}
              onChange={handleTitleSpacing}
            />
            <RangeSlider
              output
              label="Bottom Border"
              min={0}
              max={10}
              step={1}
              value={Number(
                containerLayout.borderBottomWidth.replace("px", "")
              )}
              onChange={handleOuterBorderWidthHandler}
            />
            <CustomColorPicker
              label={"Bottom Border Color"}
              defaultColor={containerLayout.borderBottomColor}
              setDefaultColor={outerBorderColorHandler}
            />
            <CustomColorPicker
              label={"Foreground"}
              defaultColor={containerLayout.color}
              setDefaultColor={foregroundColorHandler}
            />
            <Select
              label="Position"
              options={[
                { label: "start", value: "flex-start" },
                { label: "center", value: "center" },
                { label: "end", value: "flex-end" },
              ]}
              onChange={handleSelectChange}
              value={containerLayout.justifyContent}
            />
            <TextField
              label={"Font Family"}
              value={containerLayout.fontFamily}
              onChange={handleFontFamilyChange}
              autoComplete="off"
            />
            <RangeSlider
              output
              label="Font Size"
              min={6}
              max={32}
              step={1}
              value={Number(containerLayout.fontSize.replace("px", ""))}
              onChange={handleTitleFontSize}
            />
            <FontWeightDropdown
              value={containerLayout.fontWeight}
              label={"Font Weight"}
              onChange={handFontWeightChange}
            />
          </>
        )}
      </Box>
    </CollapsibleContainer>
  );
};

export default CountdownTitleSetting;
