// react core
import { useEffect, useState } from 'react';

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
import { Nutrient } from '../../../util/interface';
import { nutritionDictionary } from '../../../util/data';
const CustomBackdrop = styled(Backdrop)`
  background-color: transparent;
`;

export default function VitaMineral(props: {
  vitamin?: boolean;
  nutrient: Nutrient;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nutArray, setNutArray] = useState<any>([]);
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  // console.log(props.nutrient);
  useEffect(() => {
    if (props.vitamin) {
      const { vitaminB6, vitaminB12, vitaminC, vitaminD, vitaminE, vitaminK } =
        props.nutrient;

      setNutArray([
        { name: 'vitaminB6', value: vitaminB6 },
        { name: 'vitaminB12', value: vitaminB12 },
        { name: 'vitaminC', value: vitaminC },
        { name: 'vitaminD', value: vitaminD },
        { name: 'vitaminE', value: vitaminE },
        { name: 'vitaminK', value: vitaminK },
      ]);
    } else {
      const { calcium, iron, magnesium, sodium, zinc, selenium } =
        props.nutrient;

      setNutArray([
        { name: 'calcium', value: calcium },
        { name: 'iron', value: iron },
        { name: 'magnesium', value: magnesium },
        { name: 'sodium', value: sodium },
        { name: 'zinc', value: zinc },
        { name: 'selenium', value: selenium },
      ]);
    }
  }, []);

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
              {props.vitamin ? `섭취 비타민` : `섭취 무기질`}
            </div>
            <div className={classes.modalContent}>
              {nutArray.map(
                (item: { name: string; value: number }, index: number) => (
                  <div className={classes.detailItem} key={index}>
                    <div>{nutritionDictionary[item.name].name}</div>
                    <div>
                      {item.value.toFixed(2)}{' '}
                      {nutritionDictionary[item.name].scale}
                    </div>
                  </div>
                )
              )}
              {/* <div className={classes.detailItem}>
                <div>비타민 B6</div>
                <div>2000 IU</div>
              </div>
              <div className={classes.detailItem}>
                <div>비타민 C</div>
                <div>2000 IU</div>
              </div>
              <div className={classes.detailItem}>
                <div>비타민 D</div>
                <div>2000 IU</div>
              </div>
              <div className={classes.detailItem}>
                <div>비타민 E</div>
                <div>2000 IU</div>
              </div>
              <div className={classes.detailItem}>
                <div>비타민 K</div>
                <div>2000 IU</div>
              </div> */}
            </div>
          </div>
        </Modal>
      </div>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}>
            {props.vitamin ? `섭취 비타민` : `섭취 무기질`}
          </div>
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
