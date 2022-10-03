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
        {props.recipe.length > 0 && (
          <Modal
            open={isModalOpen}
            onClose={handleClose}
            components={{ Backdrop: CustomBackdrop }}
          >
            <div className={classes.modal}>
              <div className={classes.modalHeader}>가장 많이 먹은 레시피</div>

              <div className={classes.modalContent}>
                <div>
                  <div className={classes.most} key={props.recipe[0].id}>
                    <div className={classes.first}>1</div>
                    <div>
                      <img src={''} alt="요리" />
                      {props.recipe[0].name}
                    </div>
                  </div>
                </div>
                <div className={classes.other}>
                  {props.recipe.slice(1).map((item, index) => {
                    return (
                      <div key={item.id}>
                        <div
                          className={
                            index === 0
                              ? classes.second
                              : index === 1
                              ? classes.third
                              : classes.rest
                          }
                        >
                          {index + 2}
                        </div>
                        <img src="" alt="요리" />
                        <div className={classes.otherName}>{item.name}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}>{`가장 많이 먹은 음식`}</div>
          <div className={classes.main}>
            {props.recipe.length === 0 ? (
              <>
                <div>기록없음</div>
                {/* <div onClick={handler}>식사 추가하기</div> */}
              </>
            ) : (
              <>
                <img src={''} alt="재료이미지" />
                <div>{props.recipe[0].name}</div>
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
