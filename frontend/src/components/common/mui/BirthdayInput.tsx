import React, { ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';

import Stack from '@mui/material/Stack';

export default function BirthdayInput(props: {
  birthday: string;
  changeBirthday: (birthday: string) => void;
}) {
  const birthdayChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    props.changeBirthday(event.target.value);
  };
  return (
    <Stack component="form" noValidate spacing={3}>
      <TextField
        id="date"
        type="date"
        defaultValue={props.birthday}
        sx={{ width: 160 }}
        onChange={birthdayChangeHandler}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Stack>
  );
}
