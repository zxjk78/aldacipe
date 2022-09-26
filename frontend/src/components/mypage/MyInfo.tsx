// react core
import { useState, useEffect, useRef, FormEvent } from 'react';
// API
import { fetchMyInfo, modifyMyInfo } from '../../api/myInfo';
// external module
import moment from 'moment';
// external component
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
// custom component

// css, interface
import classes from './MyInfo.module.scss';
import { MyInfomation } from './interface';
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
  const [myInfoLoading, setMyInfoLoading] = useState(true);
  const [myInfo, setMyInfo] = useState<MyInfomation | null>(null);
  const weightRef = useRef<HTMLInputElement | null>(null);
  const heightRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    setMyInfoLoading(true);
    (async () => {
      const data: MyInfomation = await fetchMyInfo();
      setMyInfo(data);
    })();

    setMyInfoLoading(false);
  }, []);

  const modifyModalHandler = () => {
    setModalOpen(() => true);
  };
  const handleClose = () => {
    setModalOpen(() => false);
  };
  const modifyUserInfo = async (event: FormEvent) => {
    event.preventDefault();
    const newWeight = +weightRef.current!.value;
    const newHeight = +heightRef.current!.value;
    const data = await modifyMyInfo({
      height: newHeight,
      weight: newWeight,
    });
    if (data.success) {
      setMyInfo((prevState) => {
        return { ...prevState!, height: newHeight, weight: newWeight };
      });
      handleClose();
    }
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
            <form onSubmit={modifyUserInfo}>
              <div className={classes.modalContainer}>
                <div>
                  키{' '}
                  <span>
                    <input
                      type="number"
                      ref={heightRef}
                      defaultValue={myInfo?.height}
                    />
                  </span>{' '}
                  cm
                </div>
                <div>
                  몸무게{' '}
                  <span>
                    <input
                      type="number"
                      ref={weightRef}
                      defaultValue={myInfo?.weight}
                    />
                  </span>{' '}
                  kg
                </div>
              </div>
              <button>수정하기</button>
            </form>
          </Typography>
        </MyBox>
      </Modal>{' '}
      <div>
        {!myInfoLoading && (
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
                성별{' '}
                <span>{myInfo?.gender === 'FEMALE' ? '여성' : '남성'}</span>
              </div>
              <div>
                나이 만{' '}
                <span>{moment().year() - moment(myInfo?.birthDay).year()}</span>
                세
              </div>
              <div>
                키 <span>{myInfo?.height}</span>cm
              </div>
              <div>
                몸무게 <span>{myInfo?.weight}</span>Kg
              </div>
            </div>
            <div className={classes.footer}></div>
          </div>
        )}
      </div>
    </>
  );
}
