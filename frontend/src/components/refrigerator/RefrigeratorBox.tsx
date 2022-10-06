import React, { useEffect, useState } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import classes from './RefrigeratorBox.module.scss';
import MyRefrigeSearchInput from './MyRefrigeSearchInput';
import ExpirationList from './ExpirationList';
import { getRefrigerator } from '../../api/myrefrigerator';
import MyIngredientList from './MyIngredientList';
import { ingredient } from './interface';
import { sortByLargeCategory } from '../../util/fuctions';
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

// 있는 재료 종류별로 분배하는 컴포넌트

export default function RefrigeratorBox(props: {
  item: ingredient[];
  addIngredient: (data: ingredient) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [expirationIngredient, setExpirationIngredient] = useState<any[]>([]);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // 대분류 단위로 분배
  const [
    grainList,
    meatList,
    seafoodList,
    dairyList,
    drinkList,
    seasoningList,
    otherList,
  ] = sortByLargeCategory(props.item);
  // console.log(grainList, meatList, seafoodList);

  // const largeCategoryList = sortByLargeCategory(props.item);

  useEffect(() => {
    const today: any = new Date();
    const tmp: any[] = [];
    props.item.map((item: any) => {
      const dday: any = new Date(`${item.expirationDate} 00:00:00`);
      const gapNum = dday - today;
      const expirationDate = Math.ceil(gapNum / (1000 * 60 * 60 * 24));
      if (expirationDate < 4) {
        item.Dday = expirationDate;
        tmp.push(item);
      }
    });
    setExpirationIngredient(tmp);
  }, [props.item]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <h2 className={classes.header} onClick={handleOpen}>
          식재료 등록{' '}
          <span>
            <IoAddCircleOutline />
          </span>
        </h2>
        <div className={classes.button}>
          <Modal
            hideBackdrop
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ ...style, width: 500 }}>
              <h2 id="child-modal-title">냉장고에 재료 추가하기</h2>
              <MyRefrigeSearchInput addIngredient={props.addIngredient} />
              <Button className={classes.closebutton} onClick={handleClose}>
                나가기
              </Button>
            </Box>
          </Modal>
        </div>
      </div>
      <h3 className={classes.ingredientHeader}>내 냉장고 속 재료</h3>
      <div className={classes.ingredientListCategory}>
        {grainList && (
          <MyIngredientList
            key={0}
            itemList={grainList}
            name={'곡류 및 채소'}
          />
        )}
        {meatList.length > 0 && (
          <MyIngredientList key={1} itemList={meatList} name={'육류'} />
        )}
        {seafoodList.length > 0 && (
          <MyIngredientList key={2} itemList={seafoodList} name={'수산물'} />
        )}
        {dairyList.length > 0 && (
          <MyIngredientList key={3} itemList={dairyList} name={'유제품'} />
        )}
        {drinkList.length > 0 && (
          <MyIngredientList key={4} itemList={drinkList} name={'음료'} />
        )}
        {seasoningList.length > 0 && (
          <MyIngredientList
            key={5}
            itemList={seasoningList}
            name={'조미료 및 기름'}
          />
        )}
        {otherList.length > 0 && (
          <MyIngredientList key={6} itemList={otherList} name={'기타'} />
        )}
      </div>
      <div className={classes.expirationList}>
        <div className={classes.expirationHeader}>유통기한 임박 재료</div>
        <div className={classes.expirationContainer}>
          <ExpirationList
            itemList={expirationIngredient}
            // removeItem={removeItem}
          />
        </div>
      </div>
    </div>
  );
}
