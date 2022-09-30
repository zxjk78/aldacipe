import React, { useEffect, useState } from 'react';
import { IoAddCircleOutline } from "react-icons/io5";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import classes from './RefrigeratorBox.module.scss';
import MyRefrigeSearchInput from './MyRefrigeSearchInput';

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

export default function RefrigeratorBox() {

  // useEffect(() => {
  //   (async () => {
  //     const data = await getRefrigerator();
  //     setRefrigeList(data)
  //   })();
  // }, [])
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  
  return (
    <>
      <div className={classes.container}>
        <h2>냉장고 박스</h2>
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
              <MyRefrigeSearchInput />
              <Button className={classes.closebutton} onClick={handleClose}>나가기</Button>
            </Box>
          </Modal>
        </div>  
      </div>
    </>
  );
}
