import {
  IndexTable,
  useIndexResourceState,
  Text,
  useBreakpoints,
} from "@shopify/polaris";
import { DeleteIcon } from "@shopify/polaris-icons";
import dayjs from "dayjs";
import React from "react";

const StoreHolidaysTable = ({ data, handleHolidayDelete }) => {
  const resourceName = {
    singular: "holiday",
    plural: "holidays",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(data);

  const deleteHandler = () => {
    handleHolidayDelete(selectedResources);
  };

  const rowMarkup = data.map(({ id, holidayName, date }, index) => (
    <IndexTable.Row
      id={id}
      key={id}
      selected={selectedResources.includes(id)}
      position={index}
    >
      <IndexTable.Cell>
        <Text variant="bodyMd" fontWeight="bold" as="span">
          {holidayName}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell>{dayjs(date).format("MMM, DD YYYY")}</IndexTable.Cell>
    </IndexTable.Row>
  ));

  const promotedBulkActions = [
    {
      icon: DeleteIcon,
      destructive: true,
      content: "Delete Selected",
      onAction: () => deleteHandler(),
    },
  ];
  return (
    <IndexTable
      condensed={useBreakpoints().smDown}
      resourceName={resourceName}
      itemCount={data.length}
      selectedItemsCount={
        allResourcesSelected ? "All" : selectedResources.length
      }
      onSelectionChange={handleSelectionChange}
      headings={[{ title: "Holiday Name" }, { title: "Date" }]}
      promotedBulkActions={promotedBulkActions}
    >
      {rowMarkup}
    </IndexTable>
  );
};

export default StoreHolidaysTable;
