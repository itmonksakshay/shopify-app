import TimePickerDropdownComponent from "@/components/molecules/TimePickerDropdownComponent";
import TimezoneDropdown from "@/components/molecules/TimeZoneComponent";
import StoreHolidaysTable from "@/components/organisms/tables/StoreHolidaysTable";
import WeeklyOffDaysComponent from "@/components/molecules/WeeklyDaysOffComponent";
import isInitialLoad from "@/utils/middleware/isInitialLoad";
import {
  BlockStack,
  Card,
  Layout,
  Page,
  Text,
  Divider,
  Spinner,
} from "@shopify/polaris";
import { useState, useEffect } from "react";
import StoreHolidayAddModal from "@/components/organisms/modals/StoreHolidayAddModal";
import { SaveBar, useAppBridge } from "@shopify/app-bridge-react";
import deepEqual from "deep-equal";
import useFetchStoreData from "@/hooks/useDataFetcher";

export async function getServerSideProps(context) {
  // DO NOT REMOVE THIS.
  return await isInitialLoad(context);
}

const HomePage = () => {
  const { data, loading, error, refetchData } = useFetchStoreData("/api/store"); // Use the hook to fetch data
  const [sameDayDeliverySettings, setSameDayDeliverySettings] = useState(null); // Fallback to initial values to avoid null access
  const [isDirty, setIsDirty] = useState(false); // Track changes
  const shopify = useAppBridge();

  useEffect(() => {
    if (data) {
      setSameDayDeliverySettings(data); // Set fetched data
    }
  }, [data]);

  useEffect(() => {
    // Check if there are changes compared to initial data
    if (data && sameDayDeliverySettings) {
      const hasChanges = !deepEqual(data, sameDayDeliverySettings);
      setIsDirty(hasChanges);

      if (hasChanges) {
        shopify.saveBar.show("my-save-bar");
      } else {
        shopify.saveBar.hide("my-save-bar");
      }
    }
  }, [sameDayDeliverySettings, data, shopify]);

  // Utility function to update settings
  const updateSettings = (key, value) => {
    setSameDayDeliverySettings((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }));
  };

  // Handlers for specific settings
  const setHoliday = (selectedDate) => {
    updateSettings("storeHolidays", [
      ...(sameDayDeliverySettings?.storeHolidays || []),
      selectedDate,
    ]);
  };

  const handleHolidayDelete = (selectedHolidays) => {
    const filteredHolidays = sameDayDeliverySettings?.storeHolidays?.filter(
      (item) => !selectedHolidays.includes(item.id)
    );
    updateSettings("storeHolidays", filteredHolidays);
  };

  const handleWeekdaysOff = (offDays) =>
    updateSettings("weeklyOffDays", offDays);
  const handleCutoffTime = (defaultCutoffTime) =>
    updateSettings("defaultCutoffTime", defaultCutoffTime);
  const handleTimezone = (storeTimezone) =>
    updateSettings("storeTimezone", storeTimezone);

  const handleSave = async () => {
    try {
      // Perform the POST request to save the settings
      const response = await fetch("/api/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sameDayDeliverySettings), // Send the state as the body
      });

      if (!response.ok) {
        alert("Error saving settings");
      } else {
        await refetchData();
        alert("Settings saved successfully!");
      }
    } catch (error) {
      alert("Error saving settings");
    }
  };

  const handleDiscard = () => {
    setSameDayDeliverySettings(data); // Reset to initial state
  };

  // Error or loading state UI
  if (loading) {
    return (
      <Page title="App Setup">
        <Text variant="bodyMd">Loading data...</Text>
        <Spinner size="large" />
      </Page>
    );
  }

  if (error) {
    return (
      <Page title="App Setup">
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <Text variant="bodyMd" color="red">
                Error loading store data: {error.message}
              </Text>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }

  // Only render this section if `sameDayDeliverySettings` is not null
  if (!sameDayDeliverySettings) {
    return (
      <Page title="App Setup">
        <Text variant="bodyMd">No settings available yet.</Text>
      </Page>
    );
  }

  return (
    <>
      {sameDayDeliverySettings && (
        <SaveBar id="my-save-bar">
          <button variant="primary" onClick={handleSave}>
            Save
          </button>
          <button onClick={handleDiscard}>Discard</button>
        </SaveBar>
      )}

      <Page title="App Setup">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  Same Day Delivery Setup
                </Text>
                <Text>
                  Select the timezone for the region you want to set up Same Day
                  Delivery option.
                </Text>
                <TimezoneDropdown
                  storeTimezone={sameDayDeliverySettings?.storeTimezone}
                  setStoreTimezone={handleTimezone}
                />

                <Text as="h2" variant="headingMd">
                  Default Cut Off Time
                </Text>
                <Text>
                  Store disables Same Day Delivery option after the default
                  cutoff time.
                </Text>
                <TimePickerDropdownComponent
                  cutoffTime={sameDayDeliverySettings?.defaultCutoffTime}
                  onCutoffTimeChange={handleCutoffTime}
                />
              </BlockStack>
            </Card>
          </Layout.Section>

          <Layout.Section>
            <Card>
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  Weekly Off Days
                </Text>
                <WeeklyOffDaysComponent
                  weeklyOffDays={sameDayDeliverySettings?.weeklyOffDays}
                  setWeeklyOffDays={handleWeekdaysOff}
                />
                <Divider />
                <Text as="h2" variant="headingMd">
                  Store Holidays
                </Text>
                <StoreHolidayAddModal
                  weeklyOffDays={sameDayDeliverySettings?.weeklyOffDays}
                  setHoliday={setHoliday}
                  holidays={sameDayDeliverySettings?.storeHolidays}
                />
                <StoreHolidaysTable
                  data={sameDayDeliverySettings?.storeHolidays}
                  handleHolidayDelete={handleHolidayDelete}
                />
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
};

export default HomePage;
