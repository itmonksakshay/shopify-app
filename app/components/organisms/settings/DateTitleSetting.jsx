"use client";
import CollapsibleContainer from "@/components/molecules/CollapsibleContainer";
import CustomColorPicker from "@/components/molecules/ColorPicker";
import DateFormateDropdown from "@/components/molecules/DateFormatDropdown";
import FontWeightDropdown from "@/components/molecules/FontWeightDropdown";
import ToggleSwitch from "@/components/molecules/ToggleSwitch";
import {
  Box,
  Divider,
  RangeSlider,
  Select,
  TextField,
  Text,
} from "@shopify/polaris";
import { useEffect, useState } from "react";

const DateTitleSetting = ({
  layout,
  setlayout,
  globalSettings,
  setGlobalSettings,
}) => {
  const [containerLayout, setContainerLayout] = useState(layout);
  const [titleSettings, setTittleSettings] = useState(globalSettings);
  const [dateSettings, setDateSettings] = useState({
    dateFormat: "DD/MM/YYYY",
  });

  useEffect(() => {
    setlayout(containerLayout);
  }, [containerLayout]);

  useEffect(() => {
    setGlobalSettings(titleSettings);
  }, [titleSettings]);

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
    setTittleSettings((values) => ({ ...values, isSubtitleActive: value }));
  };

  const handleSubtitleChange = (value) => {
    setTittleSettings((values) => ({ ...values, subtitle: value }));
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

  const handleDateFormat = (value) => {
    setDateSettings((values) => ({ ...values, dateFormat: value }));
  };

  return (
    <CollapsibleContainer title="Date Subtitle Settings">
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <ToggleSwitch
          label={"Subtitle Setting"}
          checked={titleSettings.isSubtitleActive}
          onToggle={handleTitleToggle}
        />
        {titleSettings.isSubtitleActive && (
          <>
            <TextField
              value={titleSettings.subtitle}
              onChange={handleSubtitleChange}
              autoComplete="off"
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
            <RangeSlider
              output
              label="Gap"
              min={0}
              max={20}
              step={1}
              value={Number(containerLayout.paddingTop.replace("px", ""))}
              onChange={handleTitleSpacing}
            />
            <Divider />
          </>
        )}
        <Text as="h1" alignment="center" tone="success" variant="headingMd0">
          Date Settings
        </Text>
        <DateFormateDropdown
          label={"Date format"}
          value={dateSettings.dateFormat}
          onChange={handleDateFormat}
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
          value={Number(containerLayout.borderBottomWidth.replace("px", ""))}
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
      </Box>
    </CollapsibleContainer>
  );
};

export default DateTitleSetting;
