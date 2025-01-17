"use client";
import CollapsibleContainer from "@/components/molecules/CollapsibleContainer";
import CustomColorPicker from "@/components/molecules/ColorPicker";
import DateFormateDropdown from "@/components/molecules/DateFormatDropdown";
import FontWeightDropdown from "@/components/molecules/FontWeightDropdown";
import ToggleSwitch from "@/components/molecules/ToggleSwitch";
import { Box, Divider, RangeSlider, Select, TextField } from "@shopify/polaris";
import { useEffect, useState } from "react";

const TimerSetting = ({
  layout,
  setlayout,
  globalSettings,
  setGlobalSettings,
  timerTextStyle,
  setTimerTextStyle,
  timerTitleStyle,
  setTimerTitleStyle,
}) => {
  const handleSelectChange = (value) => {
    setlayout((values) => ({ ...values, alignItems: value }));
  };

  const handleTimerTitleToggle = (value) => {
    setGlobalSettings((values) => ({ ...values, isTimerTitleActive: value }));
  };

  const handleTimerTitleChange = (value) => {
    setGlobalSettings((values) => ({ ...values, timerTitle: value }));
  };

  const handleTimerHoursTitleChange = (value) => {
    setGlobalSettings((values) => ({ ...values, hoursTitle: value }));
  };

  const handleTimerMinutesTitleChange = (value) => {
    setGlobalSettings((values) => ({ ...values, minutesTitle: value }));
  };

  const handleTimerSecondsTitleChange = (value) => {
    setGlobalSettings((values) => ({ ...values, secondsTitle: value }));
  };

  const handleTitleSpacing = (value) => {
    setlayout((values) => ({
      ...values,
      paddingTop: value.toString().concat("px"),
      paddingBottom: value.toString().concat("px"),
    }));
  };

  const handleGapSpacing = (value) => {
    setlayout((values) => ({
      ...values,
      gap: value.toString().concat("px"),
    }));
  };

  const handleTimerTitleFontSize = (value) => {
    setTimerTitleStyle((values) => ({
      ...values,
      fontSize: value.toString().concat("px"),
    }));
  };
  const handleTimerTitleFontWeightChange = (value) => {
    setTimerTitleStyle((values) => ({ ...values, fontWeight: value }));
  };
  const handleTimerTitleFontFamilyChange = (value) => {
    setTimerTitleStyle((values) => ({ ...values, fontFamily: value }));
  };

  const handleTimerTitleColorChange = (newColor) => {
    setTimerTitleStyle((value) => ({ ...value, color: newColor }));
  };

  const handleTimerTextColorChange = (newColor) => {
    setTimerTextStyle((value) => ({ ...value, color: newColor }));
  };

  const handleTimerTextFontSize = (value) => {
    setTimerTextStyle((values) => ({
      ...values,
      fontSize: value.toString().concat("px"),
    }));
  };

  const handleTimerTextFontWeightChange = (value) => {
    setTimerTextStyle((values) => ({ ...values, fontWeight: value }));
  };
  const handleTimerTextFontFamilyChange = (value) => {
    setTimerTextStyle((values) => ({ ...values, fontFamily: value }));
  };

  return (
    <CollapsibleContainer title="Timer Settings">
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <RangeSlider
          output
          label="Spacing"
          min={0}
          max={20}
          step={1}
          value={Number(layout.paddingTop.replace("px", ""))}
          onChange={handleTitleSpacing}
        />
        <Select
          label="Position"
          options={[
            { label: "start", value: "flex-start" },
            { label: "center", value: "center" },
            { label: "end", value: "flex-end" },
          ]}
          onChange={handleSelectChange}
          value={layout.alignItems}
        />
        <RangeSlider
          output
          label="Gap"
          min={0}
          max={20}
          step={1}
          value={Number(layout.gap.replace("px", ""))}
          onChange={handleGapSpacing}
        />
        <Divider />
        <ToggleSwitch
          label={"Toggle Timer Title Visibilty"}
          checked={globalSettings.isTimerTitleActive}
          onToggle={handleTimerTitleToggle}
        />
        {globalSettings.isTimerTitleActive && (
          <>
            <TextField
              value={globalSettings.timerTitle}
              onChange={handleTimerTitleChange}
              autoComplete="off"
            />
            <CustomColorPicker
              label={"Foreground"}
              defaultColor={timerTitleStyle.color}
              setDefaultColor={handleTimerTitleColorChange}
            />
            <TextField
              label={"Font Family"}
              value={timerTitleStyle.fontFamily}
              onChange={handleTimerTitleFontFamilyChange}
              autoComplete="off"
            />
            <RangeSlider
              output
              label="Font Size"
              min={6}
              max={32}
              step={1}
              value={Number(timerTitleStyle.fontSize.replace("px", ""))}
              onChange={handleTimerTitleFontSize}
            />
            <FontWeightDropdown
              value={timerTitleStyle.fontWeight}
              label={"Font Weight"}
              onChange={handleTimerTitleFontWeightChange}
            />
            <Divider />
          </>
        )}
        <TextField
          label={"Hours Title"}
          value={globalSettings.hoursTitle}
          onChange={handleTimerHoursTitleChange}
          autoComplete="off"
        />
        <TextField
          label={"Minutes Title"}
          value={globalSettings.minutesTitle}
          onChange={handleTimerMinutesTitleChange}
          autoComplete="off"
        />
        <TextField
          label={"Seconds Title"}
          value={globalSettings.secondsTitle}
          onChange={handleTimerSecondsTitleChange}
          autoComplete="off"
        />
        <TextField
          label={"Font Family"}
          value={timerTitleStyle.fontFamily}
          onChange={handleTimerTextFontFamilyChange}
          autoComplete="off"
        />
        <CustomColorPicker
          label={"Foreground"}
          defaultColor={timerTitleStyle.color}
          setDefaultColor={handleTimerTextColorChange}
        />
        <RangeSlider
          output
          label="Font Size"
          min={6}
          max={32}
          step={1}
          value={Number(timerTextStyle.fontSize.replace("px", ""))}
          onChange={handleTimerTextFontSize}
        />
        <FontWeightDropdown
          value={timerTextStyle.fontWeight}
          label={"Font Weight"}
          onChange={handleTimerTextFontWeightChange}
        />
        <Divider />
      </Box>
    </CollapsibleContainer>
  );
};

export default TimerSetting;
