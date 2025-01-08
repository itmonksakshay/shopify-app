import HolidayPicker from "@/components/molecules/HolidayPicker";
import { PlusCircleIcon } from "@shopify/polaris-icons";
import { useCallback, useState } from "react";

const {
  Popover,
  Button,
  TextField,
  Box,
  Form,
  FormLayout,
} = require("@shopify/polaris");

const StoreHolidayAddModal = ({ setHoliday, holidays, weeklyOffDays }) => {
  const [active, setActive] = useState(false);

  const [storeHoliday, setStoreHoliday] = useState({
    id: Date.now(),
    holidayName: "",
    date: "",
  });

  const [formErrors, setFormErrors] = useState({
    nameError: "",
    dateError: "",
  });

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const activator = (
    <Button onClick={toggleActive} icon={PlusCircleIcon} variant="primary">
      Add Holiday
    </Button>
  );

  const handleInputChange = useCallback((value) => {
    if (formErrors.nameError)
      setFormErrors((values) => ({ ...values, nameError: "" }));
    setStoreHoliday((values) => ({ ...values, holidayName: value }));
  });

  const handleDateChange = useCallback((value) => {
    if (formErrors.dateError)
      setFormErrors((values) => ({ ...values, dateError: "" }));
    setStoreHoliday((values) => ({ ...values, date: value }));
  });

  const handleSubmit = useCallback(() => {
    if (!storeHoliday.holidayName) {
      return setFormErrors((values) => ({
        ...values,
        nameError: "Holiday name is required",
      }));
    }
    if (!storeHoliday.date) {
      return setFormErrors((values) => ({
        ...values,
        dateError: "Holiday date is required",
      }));
    }

    setHoliday(storeHoliday);
    setStoreHoliday({
      id: Date.now(),
      holidayName: "",
      date: "",
    });
    toggleActive();
  }, [storeHoliday]);

  return (
    <Popover
      active={active}
      activator={activator}
      autofocusTarget="first-node"
      onClose={toggleActive}
    >
      <Box padding="400">
        <Form onSubmit={handleSubmit}>
          <FormLayout>
            <TextField
              value={storeHoliday.holidayName}
              onChange={handleInputChange}
              label="Holiday Name"
              type="text"
              autoComplete=""
              error={formErrors.nameError}
              helpText={<span>Holiday Name like :- Christmas</span>}
            />
            <HolidayPicker
              selectedDate={storeHoliday.date}
              weeklyOffDays={weeklyOffDays}
              holidays={holidays.map((item) => item.date)}
              setHolidays={handleDateChange}
              error={formErrors.dateError}
            />
            <Button submit>Submit</Button>
          </FormLayout>
        </Form>
      </Box>
    </Popover>
  );
};

export default StoreHolidayAddModal;
