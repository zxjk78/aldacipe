import React, { useEffect, useState } from 'react';
import { ingredient } from './interface';
import MyIngredientListItem from './MyIngredientListItem';

import classes from './MyIngredientList.module.scss';
// 대분류 재료 리스트, 부모: RefrigeratorBox
export default function MyIngredientList(props: {
  itemList: ingredient[];
  name: string;
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
      <div className={classes.header}>
        <div>{props.name}</div>
        <div>총 {props.itemList.length}개</div>
      </div>
      <div className={classes.main}>
        {props.itemList.map((item) => (
          <MyIngredientListItem ingredient={item} />
        ))}
      </div>
    </div>
  );
}
