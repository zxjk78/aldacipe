import React, { useEffect, useState } from 'react';
import { Ingredient } from './interface';
import Checkbox from '@mui/material/Checkbox';


import classes from './RefrigeratorListItem.module.scss';


export default function RefrigeratorListItem(props:{
  item:Ingredient
}) {
  const [checked, setChecked] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  return (
    <div className={classes.wrapper}>
      <div className={classes.listItem}>
        {props.item.name}
        <Checkbox
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </div>
    </div>
  );
}
