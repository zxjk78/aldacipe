import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const BirthdayInput: React.FC<{
  changeBirthday: (birthday: Dayjs | null) => void;
}> = (props) => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2000-01-01'));

  const handleChange = (newBirthday: Dayjs | null) => {
    setValue(newBirthday);
    props.changeBirthday(newBirthday);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        label="BirthDay"
        inputFormat="YYYY/MM/DD"
        value={value}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default BirthdayInput;
