import React, { useEffect, useState } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { refrigeratorActions } from '../../redux/slice/refrigerator';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

// external component
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import KitchenIcon from '@mui/icons-material/Kitchen';
import RestaurantIcon from '@mui/icons-material/Restaurant';

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
  onAddItem: () => void;
}) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [expirationIngredient, setExpirationIngredient] = useState<any[]>([]);
  const [largeCategoryList, setLargeCategoryList] = useState<any>(null);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // 냉장고 모드체인지

  useEffect(() => {
    // 대분류 단위로 분배
    // const [
    //   grainList,
    //   meatList,
    //   seafoodList,
    //   dairyList,
    //   drinkList,
    //   seasoningList,
    //   otherList,
    // ]

    const tmp = sortByLargeCategory(props.item);
    setLargeCategoryList(tmp);
  }, [props.item]);

  const isCookToggle = useSelector((state: any) => state.refrigerator.isCook)
    ? 'cook'
    : 'default';

  const handleModeChange = () => {
    if (isCookToggle === 'cook') {
      dispatch(refrigeratorActions.emptyIngredients());
    }
    dispatch(refrigeratorActions.toggleIsCook());
  };
  const handleAddItem = () => {
    props.onAddItem();
  };

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
              <MyRefrigeSearchInput
                onAddItem={handleAddItem}
                placeholder={'재료명 검색'}
              />
              <Button className={classes.closebutton} onClick={handleClose}>
                나가기
              </Button>
            </Box>
          </Modal>
        </div>
      </div>
      {largeCategoryList && (
        <>
          <div className={classes.ingredientHeader}>
            <div>내 냉장고 속 재료</div>
            <ToggleButtonGroup
              color="success"
              value={isCookToggle}
              exclusive
              onChange={handleModeChange}
              aria-label="CookModeToggle"
            >
              <ToggleButton value="default">
                <KitchenIcon />
              </ToggleButton>
              <ToggleButton value="cook">
                <RestaurantIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div className={classes.ingredientListCategory}>
            {largeCategoryList[0].length > 0 && (
              <MyIngredientList
                key={0}
                itemList={largeCategoryList[0]}
                name={'곡류 및 채소'}
              />
            )}
            {largeCategoryList[1].length > 0 && (
              <MyIngredientList
                key={1}
                itemList={largeCategoryList[1]}
                name={'육류'}
              />
            )}
            {largeCategoryList[2].length > 0 && (
              <MyIngredientList
                key={2}
                itemList={largeCategoryList[2]}
                name={'수산물'}
              />
            )}
            {largeCategoryList[3].length > 0 && (
              <MyIngredientList
                key={3}
                itemList={largeCategoryList[3]}
                name={'유제품'}
              />
            )}
            {largeCategoryList[4].length > 0 && (
              <MyIngredientList
                key={4}
                itemList={largeCategoryList[4]}
                name={'음료'}
              />
            )}
            {largeCategoryList[5].length > 0 && (
              <MyIngredientList
                key={5}
                itemList={largeCategoryList[5]}
                name={'조미료 및 기름'}
              />
            )}
            {largeCategoryList[6].length > 0 && (
              <MyIngredientList
                key={6}
                itemList={largeCategoryList[6]}
                name={'기타'}
              />
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
        </>
      )}
    </div>
  );
}
