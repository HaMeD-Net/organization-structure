import React from "react";
import DatePicker, {
  DayValue,
  DayRange,
  Day,
} from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";

const FormDatePicker = () => {
  // const [dayRange, setDayRange] = React.useState<DayRange>({
  //   from: null,
  //   to: null,
  // });
  // const [days, setDays] = React.useState<Day[]>([]);
  const [day, setDay] = React.useState<DayValue>(null);
  console.log(day)

  return (
    <>
      <DatePicker value={day} onChange={setDay} locale="fa"/>
      {/* <DatePicker value={dayRange} onChange={setDayRange} />
      <DatePicker value={days} onChange={setDays} /> */}
    </>
  );
};

export default FormDatePicker;
