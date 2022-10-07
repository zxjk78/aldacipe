import React, { useEffect, useState } from 'react';
import { IoAddCircleOutline } from "react-icons/io5";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import classes from './RefrigeratorBox.module.scss';
import MyRefrigeSearchInput from './MyRefrigeSearchInput';
import ExpirationList from './ExpirationList';
import { getRefrigerator } from '../../api/myrefrigerator';
import MyIngredientList from './MyIngredientList';
import { ingredient } from './interface';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function RefrigeratorBox(props:{
  item:ingredient[]; addIngredient: (data:ingredient) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [expirationIngredient, setExpirationIngredient] = useState<any[]>([])
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const today:any = new Date();
    const tmp:any[] = []
    props.item.map((item:any) => {
      const dday:any = new Date(`${item.expirationDate} 00:00:00`);
      const gapNum = dday - today;
      const expirationDate = Math.ceil(gapNum / (1000 * 60 * 60 * 24));
      if (expirationDate < 4) {
        item.Dday = expirationDate
        tmp.push(item)
      }
    })
    setExpirationIngredient(tmp)
  }, [props.item])

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <h2 className={classes.header}>식재료 등록</h2>
        <div className={classes.button}>
          <IoAddCircleOutline onClick={handleOpen}/>
          <Modal
            hideBackdrop
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ ...style, width: 500 }}>
              <h2 id="child-modal-title">냉장고에 재료 추가하기</h2>
              <MyRefrigeSearchInput addIngredient={props.addIngredient}/>
              <Button className={classes.closebutton} onClick={handleClose}>나가기</Button>
            </Box>
          </Modal>
        </div>
      </div>
      <div className={classes.ingredientList}>
        <h3 className={classes.ingredinetHeader}>재료</h3>
        {props.item.map((item) => (
          <MyIngredientList
            key={item.id}
            item={item}
            // removeItem={removeItem}
          />
        ))}
      </div>
      <div className={classes.expirationList}>
        <h3 className={classes.expirationHeader}>유통기한 임박 재료</h3>
        {expirationIngredient.map((item) => (
          <ExpirationList
            key={item.id}
            item={item}
            // removeItem={removeItem}
          />
        ))}
      </div>
    </div>
  );
}
