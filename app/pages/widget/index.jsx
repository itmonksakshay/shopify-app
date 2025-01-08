import {
  Button,
  Card,
  InlineStack,
  Layout,
  Page,
  Text,
  BlockStack,
  InlineGrid,
  Box,
} from "@shopify/polaris";
import { useRouter } from "next/router";

import CountdownTimerComponent from "@/components/ui/CountdownTimerComponent";

const WidgetIndex = () => {
  const router = useRouter();

  return (
    <>
      <Page title="Widget">
        <Layout sectioned>
          <BlockStack gap={300} align="start">
            <InlineGrid columns={2}>
              <Box
                shadow="300"
                background="bg-surface-secondary"
                borderStartStartRadius={200}
                borderEndStartRadius={200}
                padding={600}
              >
                <BlockStack gap={300} align="start">
                  <Box>Countdown Timer</Box>
                  <CountdownTimerComponent
                    containerStyle={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                      height: "300px",
                    }}
                  />
                </BlockStack>
              </Box>
              <Box
                shadow="300"
                background="bg-surface"
                borderStartEndRadius={200}
                borderEndEndRadius={200}
                padding={600}
              >
                <Text as="h2" variant="headingMd">
                  Countdown Timer
                </Text>
                <InlineStack wrap={false} align="end" blockAlign="end">
                  <Button
                    variant="primary"
                    onClick={() => {
                      router.push("/widget/countdown-timer");
                    }}
                  >
                    Countdown Timer Widget
                  </Button>
                </InlineStack>
              </Box>
            </InlineGrid>
            <Card>
              <Text as="h2" variant="headingMd">
                Data Fetching
              </Text>
              <Text>
                Send GET, POST and GraphQL queries to your app's backend.
              </Text>
              <InlineStack wrap={false} align="end">
                <Button
                  variant="primary"
                  onClick={() => {
                    router.push("/debug/data");
                  }}
                >
                  Explore
                </Button>
              </InlineStack>
            </Card>
          </BlockStack>
        </Layout>
      </Page>
    </>
  );
};

export default WidgetIndex;
