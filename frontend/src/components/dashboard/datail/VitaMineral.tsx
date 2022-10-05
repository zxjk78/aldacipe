// react core
import { useEffect, useState } from 'react';

// API

// external module

// external component
import Modal from '@mui/material/Modal';
import { Backdrop } from '@mui/material';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// custom component

import BarChart from './BarChart';
import PieChart from './PieChart';
// css, interface(type)
import classes from './VitaMineral.module.scss';
import { Nutrient } from '../../../util/interface';
import { nutritionDictionary } from '../../../util/data';
import nutImgDict from '../../../assets/nutrients';
const CustomBackdrop = styled(Backdrop)`
  background-color: transparent;
`;

export default function VitaMineral(props: {
  vitamin?: boolean;
  nutrient: Nutrient;
  nutrientReco: Nutrient;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nutArray, setNutArray] = useState<any>([]);
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  // console.log(props.nutrient);

  const nutNames = [
    'vitaminB6',
    'vitaminB12',
    'vitaminC',
    'vitaminD',
    'vitaminE',
    'vitaminK',
  ];

  useEffect(() => {
    let tmpArr = [];
    let nutNames = [];
    if (props.vitamin) {
      nutNames = [
        'vitaminB6',
        'vitaminB12',
        'vitaminC',
        'vitaminD',
        'vitaminE',
        'vitaminK',
      ];
    } else {
      nutNames = ['calcium', 'iron', 'magnesium', 'sodium', 'zinc', 'selenium'];
    }
    for (const nut of nutNames) {
      let tmp = {
        name: nut,
        value1: props.nutrient[nut],
        value2: props.nutrientReco[nut],
      };
      tmpArr.push(tmp);
    }

    setNutArray(tmpArr);
  }, [props.nutrient, props.nutrientReco, props.vitamin]);

  return (
    <>
      <div>
        <Modal
          open={isModalOpen}
          onClose={handleClose}
          components={{ Backdrop: CustomBackdrop }}
        >
          <div className={classes.vitaMineralModal}>
            <div className={classes.modalHeader}>
              <div>
                {props.vitamin ? `섭취 비타민` : `섭취 무기질`}{' '}
                <span>섭취량 / 권장 섭취량</span>
              </div>
              <div onClick={handleClose}>
                <CloseIcon fontSize="large" />
              </div>
            </div>
            <div className={classes.modalContent}>
              {nutArray.map(
                (
                  item: { name: string; value1: number; value2: number },
                  index: number
                ) => (
                  <div className={classes.detailItem} key={index}>
                    <div className={classes.itemHeader}>
                      <img
                        src={nutImgDict[item.name]}
                        width={'30px'}
                        alt="영양소 이미지"
                      />
                      <div>{nutritionDictionary[item.name].name}</div>
                    </div>
                    <div>
                      {item.value1.toFixed(0)}
                      {' / '}
                      {item.value2.toFixed(0)}
                      {nutritionDictionary[item.name].scale}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </Modal>
      </div>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}>
            {props.vitamin ? `비타민` : `무기질`}
          </div>
          <div className={classes.main}>
            <BarChart
              nutrient={props.nutrient}
              nutrientReco={props.nutrientReco}
              vitamin={props.vitamin}
            />
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
