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
import useFetchStoreData from "@/hooks/useDataFetcher";

const WidgetIndex = () => {
  const router = useRouter();
  const { data, loading, error, refetchData } = useFetchStoreData(
    "/api/store/countdown-widget"
  );
  console.log(data, "data");
  return (
    <>
      <Page title="Widget">
        <Layout sectioned>
          <BlockStack gap={300} align="start">
            <InlineGrid columns={2}>
              {data && (
                <Box
                  shadow="300"
                  background="bg-surface-secondary"
                  borderStartStartRadius={200}
                  borderEndStartRadius={200}
                  padding={600}
                >
                  <BlockStack gap={300} align="start">
                    <Box>Countdown Timer</Box>
                    <CountdownTimerComponent {...data} />
                  </BlockStack>
                </Box>
              )}
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
