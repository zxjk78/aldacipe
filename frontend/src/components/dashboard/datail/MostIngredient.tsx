// react core
import { useState } from 'react';

// API

// external module
import PieChart from './PieChart';

// external component
import Modal from '@mui/material/Modal';
import { Backdrop } from '@mui/material';
import styled from '@emotion/styled';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// custom component

// css, interface(type)
import classes from './MostIngredient.module.scss';
import { Ingredient } from '../../../util/interface';
// etc
import { ingredientCategoryDictionary } from '../../../util/data';
import imageArr from '../../../assets/ingredients';

const CustomBackdrop = styled(Backdrop)`
  background-color: transparent;
`;

export default function MostIngredient(props: { ingredients: Ingredient[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  // 가능한지 보기
  const handler = () => {};
  return (
    <>
      <div>
        <Modal
          open={isModalOpen}
          onClose={handleClose}
          components={{ Backdrop: CustomBackdrop }}
        >
          <div className={classes.vitaMineralModal}>
            <div className={classes.modalHeader}>가장 많이 먹은 재료</div>
            <div className={classes.modalContent}>
              {props.ingredients.map((item, index) => {
                if (index === 0) return <div key={item.id}>1등</div>;

                return <div key={item.id}>{item.name}</div>;
              })}
            </div>
          </div>
        </Modal>
      </div>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}>{`가장 많이 먹은 재료`}</div>
          <div className={classes.main}>
            {props.ingredients.length === 0 ? (
              <>
                <div>기록없음</div>
                <div onClick={handler}>식사 추가하기</div>
              </>
            ) : (
              <>
                <img
                  src={
                    imageArr[
                      ingredientCategoryDictionary[
                        props.ingredients[0].smallCategory
                      ]
                    ]
                  }
                  alt="재료이미지"
                />
                <div>{props.ingredients[0].name}</div>
              </>
            )}
          </div>
          <div className={classes.footer} onClick={handleOpen}>
            자세히 보기
            <ChevronRightIcon />
          </div>
        </div>
      </div>
    </>
  );
}
