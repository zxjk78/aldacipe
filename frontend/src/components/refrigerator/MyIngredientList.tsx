import React, { useEffect, useState } from 'react';
import { ingredient } from './interface';

import classes from './MyIngredientList.module.scss';

export default function MyIngredientList(props: {
  item: ingredient;
  // removeItem: () => void;
}) {
  // const [ingredient, setIngredient] = useState([])
  // useEffect(() => {
  //   (async () => {
  //     const data = await getRefrigerator();
  //     setIngredient(data)
  //     console.log(data)
  //   })();
  // }, [])
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  
  return (
    <div className={classes.wrapper}>
      <div>
        {props.item.name}
      </div>
      {/* {props.item.largeCategory} */}
      <div>
        {props.item.expirationDate}
      </div>
      <div>
        {props.item.weight}g
      </div>
    </div>
  );
}
