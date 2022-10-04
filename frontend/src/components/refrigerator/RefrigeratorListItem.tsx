import React, { useEffect, useState } from 'react';
import { ingredient } from './interface';
import Checkbox from '@mui/material/Checkbox';


import classes from './RefrigeratorListItem.module.scss';



export default function RefrigeratorListItem(props:{
  item:ingredient;
  searchIngre: (data:number) => void;
  deleteIngre: (data:number) => void;
}) {
  const [checked, setChecked] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
      props.searchIngre(props.item.id)
    } else {
      props.deleteIngre(props.item.id)
    }
    
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
