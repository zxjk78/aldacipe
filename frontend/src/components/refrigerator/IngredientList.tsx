// react core
// css, interface(type)
import classes from './IngredientList.module.scss';
import { Ingredient } from '../../util/interface';
import { ingredient } from './interface';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Modal from '@mui/material/Modal';
import { useState } from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface State {
  expirationDate: string;
  weight: string;
}

const IngredientList = (props: {
  ingredient: Ingredient;
  addRefrigeList: (data:ingredient) => void;
  addIngredient: (data:any) => void;
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange =
  (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // 날짜
  const current = new Date();
  const today = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`
  const [values, setValues] = useState<State>({
    expirationDate: today,
    weight: '0',
  });
  const [value, setValue] = useState<Dayjs | null>(
    dayjs(today),
  );

  const handleChange2 = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  const addRefrigeList = () => {
    const data = {
      id: +props.ingredient.id,
      largeCategory: props.ingredient.largeCategory,
      name: props.ingredient.name,
      smallCategory: props.ingredient.smallCategory,
      expirationDate: value?.format('YYYY-MM-DD'),
      weight: values.weight
    }
    props.addRefrigeList!(data);
    props.addIngredient!(data)
    console.log(data)
    handleClose()
  };
  return (
    <>
      <div className={classes.container}>
        <div className={classes.main}>
          <div>
            <div>{props.ingredient.name}</div>
          </div>
          <div className={classes.button} onClick={handleOpen}>추가</div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                유통기한
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={1}>
                  <DesktopDatePicker
                    label="Date desktop"
                    inputFormat="MM/DD/YYYY"
                    value={value}
                    onChange={handleChange2}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                무게
              </Typography>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  value={values.weight}
                  onChange={handleChange('weight')}
                  endAdornment={<InputAdornment position="end">g</InputAdornment>}
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
                <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText>
                <button onClick={addRefrigeList}>추가하기</button>
                <button onClick={handleClose}>취소</button>
              </FormControl>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  );
};
export default IngredientList;
