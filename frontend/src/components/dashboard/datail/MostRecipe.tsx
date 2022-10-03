// react core
import { useState } from 'react';

// API

// external module

// external component
import Modal from '@mui/material/Modal';
import { Backdrop } from '@mui/material';
import styled from '@emotion/styled';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// custom component

// css, interface(type)
import PieChart from './PieChart';
import classes from './MostRecipe.module.scss';
import { Recipe } from '../../../util/interface';
const CustomBackdrop = styled(Backdrop)`
  background-color: transparent;
`;

export default function MostRecipe(props: { recipe: Recipe[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  return (
    <>
      <div>
        <Modal
          open={isModalOpen}
          onClose={handleClose}
          components={{ Backdrop: CustomBackdrop }}
        >
          <div className={classes.vitaMineralModal}>
            <div className={classes.modalHeader}>가장 많이 먹은 레시피</div>
            <div className={classes.modalContent}>
              {props.recipe.map((item, index) => {
                if (index === 0) return <div key={item.id}>1등</div>;

                return <div key={item.id}>{item.name}</div>;
              })}
            </div>
          </div>
        </Modal>
      </div>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}>{`가장 많이 먹은 음식`}</div>
          <div className={classes.main}>
            <img src="" alt="재료이미지" />
            {props.recipe[0].name}
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
