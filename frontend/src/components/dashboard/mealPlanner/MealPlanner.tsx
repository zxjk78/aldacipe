// react core

// API
import { fetchUserIntake } from '../../../api/dashboard';
// external module
import moment from 'moment';
// external component
import Modal from '@mui/material/Modal';
import { Backdrop } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import styled from '@emotion/styled';
// custom component
import { useEffect, useState } from 'react';
import MealPlannerSearchInput from './MealPlannerSearchInput';

import MealListItem from './MealListItem';
// css, interface(type)
import classes from './MealPlanner.module.scss';
import { Intake } from '../../../util/interface';

const CustomBackdrop = styled(Backdrop)`
  background-color: transparent;
`;

export default function MealPlanner(props: {}) {
  const [isLoading, setIsLoading] = useState(true);
  const [mealList, setMealList] = useState<Intake[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    setIsLoading(true);

    fetchUserIntake(moment(new Date()).format('YYYY-MM-DD'), setMealList);

    setIsLoading(false);
  }, []);
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    console.log('모달 닫기');
    setModalOpen(false);
  };
  return (
    <>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        components={{ Backdrop: CustomBackdrop }}
      >
        <div className={classes.modal}>
          <div>
            <div>모달창</div>
            <div>X</div>

            <MealPlannerSearchInput placeholder="음식 검색" />
          </div>
        </div>
      </Modal>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}>
            <div>오늘 먹은 음식</div>
            <div className={classes.addMeal} onClick={handleModalOpen}>
              <div>
                <AddCircleOutlineIcon fontSize="small" />
              </div>
              <div>식사 추가하기</div>
            </div>
          </div>
          <div className={classes.main}>
            {mealList.length === 0 ? (
              <div>음식 추가해주세요</div>
            ) : (
              mealList.map((item) => (
                <MealListItem key={item.id} intake={item} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
