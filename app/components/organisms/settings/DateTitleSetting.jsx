"use client";
import CollapsibleContainer from "@/components/molecules/CollapsibleContainer";
import CustomColorPicker from "@/components/molecules/ColorPicker";
import DateFormateDropdown from "@/components/molecules/DateFormatDropdown";
import FontWeightDropdown from "@/components/molecules/FontWeightDropdown";
import ToggleSwitch from "@/components/molecules/ToggleSwitch";
import { Box, Divider, RangeSlider, Select, TextField } from "@shopify/polaris";
import { useEffect, useState } from "react";

const DateTitleSetting = ({
  layout,
  setlayout,
  globalSettings,
  setGlobalSettings,
  subtitleStyle,
  setSubtitleSettings,
  dateStyle,
  setDateSettings,
}) => {
  const handleSubtitleColorChange = (newColor) => {
    setSubtitleSettings((value) => ({ ...value, color: newColor }));
  };
  const handleDateColorChange = (newColor) => {
    setDateSettings((value) => ({ ...value, color: newColor }));
  };
  const handleOuterBorderWidthHandler = (value) => {
    setlayout((values) => ({
      ...values,
      borderBottomWidth: value.toString().concat("px"),
    }));
  };

  const outerBorderColorHandler = (newColor) => {
    setlayout((value) => ({ ...value, borderBottomColor: newColor }));
  };

  const handleSelectChange = (value) => {
    setlayout((values) => ({ ...values, alignItems: value }));
  };

  const handleTitleToggle = (value) => {
    setGlobalSettings((values) => ({ ...values, isSubtitleActive: value }));
  };
  const handleDateTitleToggle = (value) => {
    setGlobalSettings((values) => ({ ...values, isDateSubtitleActive: value }));
  };

  const handleCurrentDateToggle = (value) => {
    setGlobalSettings((values) => ({ ...values, isCurrentDateActive: value }));
  };

  const handleSubtitleChange = (value) => {
    setGlobalSettings((values) => ({ ...values, subtitle: value }));
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

  const handleSubtitleFontSize = (value) => {
    setSubtitleSettings((values) => ({
      ...values,
      fontSize: value.toString().concat("px"),
    }));
  };
  const handleDateFontSize = (value) => {
    setDateSettings((values) => ({
      ...values,
      fontSize: value.toString().concat("px"),
    }));
  };

  const handleSubtitleFontWeightChange = (value) => {
    setSubtitleSettings((values) => ({ ...values, fontWeight: value }));
  };
  const handleDateFontWeightChange = (value) => {
    setDateSettings((values) => ({ ...values, fontWeight: value }));
  };

  const handleSubtitleFontFamilyChange = (value) => {
    setSubtitleSettings((values) => ({ ...values, fontFamily: value }));
  };

  const handleDateFontFamilyChange = (value) => {
    setDateSettings((values) => ({ ...values, fontFamily: value }));
  };

  const handleDateFormat = (value) => {
    setGlobalSettings((values) => ({ ...values, dateFormat: value }));
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
          label={"Toggle Date Subtitle Visbilty"}
          checked={globalSettings.isDateSubtitleActive}
          onToggle={handleDateTitleToggle}
        />
        {globalSettings.isDateSubtitleActive && (
          <>
            <RangeSlider
              output
              label="Spacing"
              min={0}
              max={20}
              step={1}
              value={Number(layout.paddingTop.replace("px", ""))}
              onChange={handleTitleSpacing}
            />
            <RangeSlider
              output
              label="Bottom Border"
              min={0}
              max={10}
              step={1}
              value={Number(layout.borderBottomWidth.replace("px", ""))}
              onChange={handleOuterBorderWidthHandler}
            />
            <CustomColorPicker
              label={"Bottom Border Color"}
              defaultColor={layout.borderBottomColor}
              setDefaultColor={outerBorderColorHandler}
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
              label={" Toggle Subtitle Visibilty"}
              checked={globalSettings.isSubtitleActive}
              onToggle={handleTitleToggle}
            />
            {globalSettings.isSubtitleActive && (
              <>
                <TextField
                  value={globalSettings.subtitle}
                  onChange={handleSubtitleChange}
                  autoComplete="off"
                />
                <CustomColorPicker
                  label={"Foreground"}
                  defaultColor={subtitleStyle.color}
                  setDefaultColor={handleSubtitleColorChange}
                />
                <TextField
                  label={"Font Family"}
                  value={subtitleStyle.fontFamily}
                  onChange={handleSubtitleFontFamilyChange}
                  autoComplete="off"
                />
                <RangeSlider
                  output
                  label="Font Size"
                  min={6}
                  max={32}
                  step={1}
                  value={Number(subtitleStyle.fontSize.replace("px", ""))}
                  onChange={handleSubtitleFontSize}
                />
                <FontWeightDropdown
                  value={subtitleStyle.fontWeight}
                  label={"Font Weight"}
                  onChange={handleSubtitleFontWeightChange}
                />
                <Divider />
              </>
            )}
            <ToggleSwitch
              label={" Toggle Current Date Visibilty"}
              checked={globalSettings.isCurrentDateActive}
              onToggle={handleCurrentDateToggle}
            />
            {globalSettings.isCurrentDateActive && (
              <>
                <DateFormateDropdown
                  label={"Date format"}
                  value={globalSettings.dateFormat}
                  onChange={handleDateFormat}
                />
                <CustomColorPicker
                  label={"Foreground"}
                  defaultColor={dateStyle.color}
                  setDefaultColor={handleDateColorChange}
                />
                <TextField
                  label={"Font Family"}
                  value={dateStyle.fontFamily}
                  onChange={handleDateFontFamilyChange}
                  autoComplete="off"
                />
                <RangeSlider
                  output
                  label="Font Size"
                  min={6}
                  max={32}
                  step={1}
                  value={Number(dateStyle.fontSize.replace("px", ""))}
                  onChange={handleDateFontSize}
                />
                <FontWeightDropdown
                  value={dateStyle.fontWeight}
                  label={"Font Weight"}
                  onChange={handleDateFontWeightChange}
                />
                <Divider />
              </>
            )}
          </>
        )}
      </Box>
    </CollapsibleContainer>
  );
};

export default DateTitleSetting;
