import { Button } from "@mui/material";

const DateRangePicker = () => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outlined">هفته</Button>
      <Button variant="contained" color="primary">
        ماه
      </Button>
      <Button variant="outlined">سه ماه</Button>
      <Button variant="outlined">سال</Button>
    </div>
  );
};

export default DateRangePicker;
