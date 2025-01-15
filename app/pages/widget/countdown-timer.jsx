import {
  Button,
  Card,
  InlineStack,
  Layout,
  Page,
  Text,
  BlockStack,
  InlineGrid,
  Collapsible,
  Icon,
  Box,
} from "@shopify/polaris";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ContainerLayoutSetting from "@/components/organisms/settings/ContainerLayoutSetting";
import CountdownTimerComponent from "@/components/ui/CountdownTimerComponent";
import CountdownTitleSetting from "@/components/organisms/settings/CountdownTitleSetting";
import DateTitleSetting from "@/components/organisms/settings/DateTitleSetting";
const CountdownTimer = () => {
  const router = useRouter();

  const [containerLayout, setContainerLayout] = useState({
    backgroundColor: "#00ff00",
    width: "100%",
    paddingTop: "10px",
    paddingBotom: "10px",
    borderWidth: "1px",
    borderRadius: "2px",
    borderStyle: "solid",
    borderColor: "#000000",
    overflow: "hidden",
  });

  const [titleLayout, setTitleLayout] = useState({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: "1px",
    borderBottomColor: "#000000",
    borderBottomStyle: "solid",
    backgroundColor: "#00ff00",
    color: "#000000",
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingRight: "20px",
    paddingLeft: "20px",
    fontSize: "12px",
    fontWeight: "400",
  });

  const [dateSubtitleLayout, setDateSubtitleLayout] = useState({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderBottomWidth: "1px",
    borderBottomColor: "#000000",
    borderBottomStyle: "solid",
    backgroundColor: "#00ff00",
    color: "#000000",
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingRight: "20px",
    paddingLeft: "20px",
    fontSize: "12px",
    fontWeight: "400",
  });

  const [globalSettings, setGlobalSettings] = useState({
    title: "Same Day Delivery",
    isTitleActive: true,
    isSubtitleActive: true,
    subtitle: "For Fast Delivery Today",
  });

  return (
    <Page
      title="Countdown Timer Widget"
      subtitle="Ensure your app is set to `public distribution` to use Billing API"
      backAction={{
        onAction: () => router.push("/widget"),
      }}
    >
      <Layout>
        <Layout.Section variant="oneThird">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--p-space-400)", // Adds spacing between items
            }}
          >
            <Box
              as="div"
              style={{
                "--pc-box-min-height": "100%",
                "--pc-box-overflow-x": "clip",
                "--pc-box-overflow-y": "clip",
                "--pc-box-padding-block-start-xs": "var(--p-space-0)",
                "--pc-box-padding-block-end-xs": "var(--p-space-0)",
                "--pc-box-padding-inline-start-xs": "var(--p-space-0)",
                "--pc-box-padding-inline-end-xs": "var(--p-space-0)",
                minHeight: "var(--pc-box-min-height)", // Set min-height
                overflowX: "var(--pc-box-overflow-x)", // Set overflow-x behavior
                overflowY: "var(--pc-box-overflow-y)", // Set overflow-y behavior
                paddingBlockStart: "var(--pc-box-padding-block-start-xs)", // Vertical padding start
                paddingBlockEnd: "var(--pc-box-padding-block-end-xs)", // Vertical padding end
                paddingInlineStart: "var(--pc-box-padding-inline-start-xs)", // Horizontal padding start
                paddingInlineEnd: "var(--pc-box-padding-inline-end-xs)", // Horizontal padding end
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--p-space-400)",
                }}
              >
                <div
                  className="Polaris-ShadowBevel"
                  style={{
                    "--pc-shadow-bevel-border-radius-xs":
                      "var(--p-border-radius-300)",
                  }}
                >
                  <ContainerLayoutSetting
                    layout={containerLayout}
                    setlayout={setContainerLayout}
                  />
                  <CountdownTitleSetting
                    layout={titleLayout}
                    setlayout={setTitleLayout}
                    globalSettings={globalSettings}
                    setGlobalSettings={setGlobalSettings}
                  />
                  <DateTitleSetting
                    layout={dateSubtitleLayout}
                    setlayout={setDateSubtitleLayout}
                    globalSettings={globalSettings}
                    setGlobalSettings={setGlobalSettings}
                  />
                </div>
              </div>
            </Box>
          </div>
        </Layout.Section>

        {/* Sticky Section for Countdown Timer */}
        <Layout.Section>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--p-space-400)",
              }}
            >
              <div
                style={{
                  padding: "var(--p-space-600)", // Padding from Polaris space system
                  display: "flex",
                  justifyContent: "center", // Center content horizontally
                  borderRadius: "var(--p-border-radius-400)", // Border radius from Polaris
                  background:
                    "repeating-conic-gradient(var(--p-color-bg-surface) 0 25%, var(--p-color-bg) 0 50%) 50% / var(--p-space-400) var(--p-space-400)",
                  position: "sticky", // Makes the Card sticky
                  top: "20px", // Distance from the top to make the section sticky
                  zIndex: 10, // Ensures the card is above other content if necessary
                  width: "100%", // Ensures the container takes full width
                  maxWidth: "1200px", // Optional: Set a max width for design consistency
                  margin: "0 auto", // Centers the sticky section horizontally
                }}
              >
                <CountdownTimerComponent
                  containerStyle={containerLayout}
                  titleStyle={titleLayout}
                  dateSubtitleLayout={dateSubtitleLayout}
                  globalSettings={globalSettings}
                />
              </div>
            </div>
          </div>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default CountdownTimer;
