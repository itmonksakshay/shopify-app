"use client";
import {
  Box,
  Button,
  ColorPicker,
  Popover,
  Text,
  Tooltip,
  TextField,
} from "@shopify/polaris";
import { useState, useEffect } from "react";

// Function to convert HSL to HEX
const hslToHex = (h, s, l) => {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r, g, b;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  const rHex = Math.round((r + m) * 255)
    .toString(16)
    .padStart(2, "0");
  const gHex = Math.round((g + m) * 255)
    .toString(16)
    .padStart(2, "0");
  const bHex = Math.round((b + m) * 255)
    .toString(16)
    .padStart(2, "0");

  return `#${rHex}${gHex}${bHex}`;
};

const CustomColorPicker = ({
  defaultColor = "#00ff00",
  setDefaultColor,
  label,
}) => {
  const [color, setColor] = useState(defaultColor); // Start with a HEX color
  const [active, setActive] = useState(false);
  const [inputColor, setInputColor] = useState(defaultColor);

  console.log(defaultColor);

  useEffect(() => {
    setDefaultColor(color);
  }, [color]);

  // Convert HEX to HSL for the ColorPicker component
  const hexToHsl = (hex) => {
    // Remove the hash at the start if it's there
    hex = hex.replace("#", "");

    let r = parseInt(hex.substr(0, 2), 16) / 255;
    let g = parseInt(hex.substr(2, 2), 16) / 255;
    let b = parseInt(hex.substr(4, 2), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;

    let h = 0;
    let s = 0;
    let l = (max + min) / 2;

    if (diff !== 0) {
      s = diff / (1 - Math.abs(2 * l - 1));
      switch (max) {
        case r:
          h = (g - b) / diff + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / diff + 2;
          break;
        case b:
          h = (r - g) / diff + 4;
          break;
        default:
          break;
      }
      h *= 60;
    }

    return {
      hue: h,
      saturation: s,
      brightness: l,
    };
  };

  const handleColorChange = (newColor) => {
    const { hue, saturation, brightness } = newColor;
    const newHex = hslToHex(hue, saturation * 100, brightness * 100);
    setColor(newHex);
    setInputColor(newHex.replace("#", ""));
  };

  const handleInputChange = (value) => {
    if (value.length === 6) setColor("#".concat(value));
    setInputColor(value);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "var(--p-space-300)",
        alignItems: "center",
      }}
    >
      {/* Color Swatch */}
      <Popover
        active={active}
        activator={
          <div
            style={{ borderRadius: "100%" }}
            onClick={() => setActive((value) => !value)}
          >
            <div
              style={{
                borderRadius: "100%",
                background:
                  "repeating-conic-gradient(var(--p-color-bg-surface) 0 25%, var(--p-color-bg-surface-secondary) 0 50%) 50% / var(--p-space-200) var(--p-space-200)",
                boxShadow: "rgba(0, 0, 0, 0.19) 0px 0px 0px 0.0625rem inset",
                width: "2rem",
                height: "2rem",
              }}
            >
              <div
                style={{
                  background: color, // Dynamic color
                  borderRadius: "inherit",
                  boxShadow: "inherit",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          </div>
        }
        preferredPosition="below"
        preferredAlignment="left"
        autofocusTarget="first-node"
        onClose={() => setActive((value) => !value)}
      >
        <Box
          style={{
            "--pc-box-background": "var(--p-color-bg-surface)",
            "--pc-box-min-height": "100%",
            "--pc-box-overflow-x": "clip",
            "--pc-box-overflow-y": "clip",
            "--pc-box-padding-block-start-xs": "var(--p-space-200)",
            "--pc-box-padding-block-end-xs": "var(--p-space-200)",
            "--pc-box-padding-inline-start-xs": "var(--p-space-200)",
            "--pc-box-padding-inline-end-xs": "var(--p-space-200)",
            background: "var(--pc-box-background)", // Apply the CSS variable to the background
            minHeight: "var(--pc-box-min-height)",
            overflowX: "var(--pc-box-overflow-x)",
            overflowY: "var(--pc-box-overflow-y)",
            paddingBlockStart: "var(--pc-box-padding-block-start-xs)",
            paddingBlockEnd: "var(--pc-box-padding-block-end-xs)",
            paddingInlineStart: "var(--pc-box-padding-inline-start-xs)",
            paddingInlineEnd: "var(--pc-box-padding-inline-end-xs)",
          }}
        >
          <ColorPicker onChange={handleColorChange} color={hexToHsl(color)} />
          <div
            style={{
              marginTop: "var(--p-space-200)", // Space variable
              width: "12rem", // Fixed width
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "var(--p-space-200)", // Apply the custom space variable for the gap
              }}
            >
              <div
                style={{
                  width: "2.25rem",
                  height: "2.25rem",
                  borderRadius: "var(--p-border-radius-200)", // Use Polaris border-radius variable
                  backgroundColor: color, // Background color
                  boxShadow: "rgba(0, 0, 0, 0.19) 0px 0px 0px 1px inset", // Box shadow with inset
                }}
              />
              <TextField
                type="text"
                value={inputColor}
                onChange={handleInputChange}
                prefix="#"
                autoComplete="off"
              />
            </div>
            <div style={{ marginTop: "var(--p-space-200)" }}>
              {/* Text for 'Currently used' */}
              <Text variant="bodySm" color="subdued" as="p">
                Currently used
              </Text>

              {/* Container for the color swatches */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "var(--p-space-100)",
                  marginTop: "var(--p-space-200)",
                }}
              >
                {/* Color Swatches */}
                <div
                  style={{
                    width: "1.75rem",
                    height: "1.75rem",
                    cursor: "pointer",
                    borderRadius: "var(--p-border-radius-100)",
                    backgroundColor: defaultColor,
                    boxShadow: "rgba(0, 0, 0, 0.19) 0px 0px 0px 1px inset",
                  }}
                  onClick={() => setColor(defaultColor)}
                />
              </div>
            </div>
          </div>
        </Box>
      </Popover>

      {/* Color Label and HEX */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Text variant="bodySm" fontWeight="bold">
          {label}
        </Text>
        <Text variant="bodySm">{color}</Text>
      </div>
    </div>
  );

  //   <ColorPicker onChange={handleColorChange} color={hexToHsl(color)} />;
};

export default CustomColorPicker;
