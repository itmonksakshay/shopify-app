"use client";
import CollapsibleContainer from "@/components/molecules/CollapsibleContainer";
import CustomColorPicker from "@/components/molecules/ColorPicker";
import { Box, RangeSlider } from "@shopify/polaris";
import { useEffect, useState } from "react";

const ContainerLayoutSetting = ({ layout, setlayout }) => {
  const [containerLayout, setContainerLayout] = useState(layout);

  useEffect(() => {
    setlayout(containerLayout);
  }, [containerLayout]);

  const backgroundColorHandler = (newColor) => {
    setContainerLayout((value) => ({ ...value, backgroundColor: newColor }));
  };

  const handleGapChange = (value) => {
    setContainerLayout((values) => ({
      ...values,
      paddingTop: value.toString().concat("px"),
      paddingBottom: value.toString().concat("px"),
    }));
  };

  const handleOuterBorderWidthHandler = (value) => {
    setContainerLayout((values) => ({
      ...values,
      borderWidth: value.toString().concat("px"),
    }));
  };

  const handleOuterBorderRadiusHandler = (value) => {
    setContainerLayout((values) => ({
      ...values,
      borderRadius: value.toString().concat("px"),
    }));
  };

  const outerBorderColorHandler = (newColor) => {
    setContainerLayout((value) => ({ ...value, borderColor: newColor }));
  };

  return (
    <CollapsibleContainer title="Container Settings">
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <CustomColorPicker
          label={"Background"}
          defaultColor={containerLayout.backgroundColor}
          setDefaultColor={backgroundColorHandler}
        />
        <RangeSlider
          output
          label="Gap"
          min={0}
          max={100}
          step={10}
          value={Number(containerLayout.paddingTop.replace("px", ""))}
          onChange={handleGapChange}
        />
        <RangeSlider
          output
          label="Outer Border"
          min={0}
          max={10}
          step={1}
          value={Number(containerLayout.borderWidth.replace("px", ""))}
          onChange={handleOuterBorderWidthHandler}
        />
        <RangeSlider
          output
          label="Outer Border Radius"
          min={0}
          max={50}
          step={1}
          value={Number(containerLayout.borderRadius.replace("px", ""))}
          onChange={handleOuterBorderRadiusHandler}
        />
        <CustomColorPicker
          label={"Outer Border Color"}
          defaultColor={containerLayout.borderColor}
          setDefaultColor={outerBorderColorHandler}
        />
      </Box>
    </CollapsibleContainer>
  );
};

export default ContainerLayoutSetting;
