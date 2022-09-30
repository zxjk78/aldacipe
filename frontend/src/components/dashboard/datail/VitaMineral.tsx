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
import classes from './VitaMineral.module.scss';

const CustomBackdrop = styled(Backdrop)`
  background-color: transparent;
`;

export default function VitaMineral(props: {}) {
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
            <div className={classes.modalHeader}>섭취 비타민</div>
            <div className={classes.modalContent}>
              <div className={classes.detailItem}>
                <div>비타민 A</div>
                <div>2000 IU</div>
              </div>
              <div className={classes.detailItem}>
                <div>비타민 A</div>
                <div>2000 IU</div>
              </div>
              <div className={classes.detailItem}>
                <div>비타민 A</div>
                <div>2000 IU</div>
              </div>
              <div className={classes.detailItem}>
                <div>비타민 A</div>
                <div>2000 IU</div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}>{`비타민`}</div>
          <div className={classes.main}>
            <PieChart />
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
