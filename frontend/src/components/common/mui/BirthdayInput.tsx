import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const BirthdayInput: React.FC<{
  birthday: string;
  changeBirthday: (birthday: Dayjs | null) => void;
}> = (props) => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(props.birthday));

  const handleChange = (newBirthday: Dayjs | null) => {
    setValue(newBirthday);
    props.changeBirthday(newBirthday);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        inputFormat="YYYY/MM/DD"
        value={value}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default BirthdayInput;
