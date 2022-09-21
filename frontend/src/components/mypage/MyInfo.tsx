// react core
import { useState } from 'react';
// API

// external module

// external component
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
// custom component

// css
import classes from './MyInfo.module.scss';

const MyBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: #fff;
  border: 2px solid #000;
  border-radius: 10px;
  padding: 10px;
`;

export default function MyInfo(props: {}) {
  const [modalOpen, setModalOpen] = useState(false);

  const modifyModalHandler = () => {
    setModalOpen(() => true);
  };
  const handleClose = () => {
    setModalOpen(() => false);
  };
  return (
    <>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MyBox>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mt: 2, ml: 2 }}
          >
            회원정보 수정
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className={classes.modalContainer}>
              <div>
                키{' '}
                <span>
                  <input type="number" />
                </span>{' '}
                cm
              </div>
              <div>
                몸무게{' '}
                <span>
                  <input type="number" />
                </span>{' '}
                kg
              </div>
            </div>
          </Typography>
        </MyBox>
      </Modal>{' '}
      <div>
        <div className={classes.container}>
          <div className={classes.header}>
            <div>
              <div className={classes.title}>회원정보</div>
              <div className={classes.modify} onClick={modifyModalHandler}>
                회원정보 수정
              </div>
            </div>
          </div>
          <div className={classes.main}>
            <div>
              성별 <span>{'남'}</span>
            </div>
            <div>
              나이 만 <span>{'26'}</span>세
            </div>
            <div>
              키 <span>{'123.7'}</span>cm
            </div>
            <div>
              몸무게 <span>{'123'}</span>Kg
            </div>
          </div>
          <div className={classes.footer}></div>
        </div>
      </div>
    </>
  );
}
