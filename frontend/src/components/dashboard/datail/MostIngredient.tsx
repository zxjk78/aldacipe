// react core
import { useState, useEffect } from 'react';

// API
import { fetchIngredientNutrition } from '../../../api/dashboard';
// external module
import PieChart from './PieChart';

// external component
import Modal from '@mui/material/Modal';
import { Backdrop } from '@mui/material';
import styled from '@emotion/styled';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// custom component
import NutritionInfo from '../../UI/NutritionInfo';

// css, interface(type)
import classes from './MostIngredient.module.scss';
import { Ingredient, Nutrient } from '../../../util/interface';
// etc
import { ingredientCategoryDictionary } from '../../../util/data';
import imageArr from '../../../assets/ingredients';

const CustomBackdrop = styled(Backdrop)`
  background-color: transparent;
`;

export default function MostIngredient(props: { ingredients: Ingredient[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mostIngredientDetail, setMostIngredientDetail] =
    useState<null | Nutrient>(null);

  useEffect(() => {
    (async () => {
      const data = await fetchIngredientNutrition(props.ingredients[0].id);
      setMostIngredientDetail(data);
    })();
  }, []);

  const handleOpen = async () => {
    setIsModalOpen(true);
  };
  const handleClose = () => setIsModalOpen(false);
  // 가능한지 보기
  const handler = () => {};
  return (
    <>
      <div>
        {mostIngredientDetail && (
          <Modal
            open={isModalOpen}
            onClose={handleClose}
            components={{ Backdrop: CustomBackdrop }}
          >
            <div className={classes.modal}>
              <div className={classes.modalHeader}>가장 많이 먹은 재료</div>
              <div className={classes.modalContent}>
                <div>
                  <div className={classes.most} key={props.ingredients[0].id}>
                    <div>1</div>
                    <div>
                      <img
                        src={
                          imageArr[
                            ingredientCategoryDictionary[
                              props.ingredients[0].smallCategory
                            ]
                          ]
                        }
                        alt="재료"
                      />
                      {props.ingredients[0].name}
                    </div>
                    <div className={classes.ingredientNutInfo}>
                      <div>영양성분</div>
                      <div>
                        열량{' '}
                        <span>
                          {mostIngredientDetail!.kcal.toFixed(0)} Kcal
                        </span>
                      </div>
                      <div>
                        탄수화물{' '}
                        <span>
                          {mostIngredientDetail!.carbohydrate.toFixed(1)} g
                        </span>
                      </div>
                      <div>
                        단백질{' '}
                        <span>
                          {mostIngredientDetail!.protein.toFixed(0)} g
                        </span>
                      </div>
                      <div>
                        지방{' '}
                        <span>{mostIngredientDetail!.fat.toFixed(0)} g</span>
                      </div>
                      <div className={classes.vitaMineralInfo}>
                        <div>
                          <div>비타민</div>
                          <div>
                            비타민 C{' '}
                            <span>
                              {mostIngredientDetail!.vitaminC.toFixed(0)} mg
                            </span>
                          </div>
                          <div>
                            비타민 B6{' '}
                            <span>
                              {mostIngredientDetail!.vitaminB6.toFixed(0)} mg
                            </span>
                          </div>
                        </div>
                        <div>
                          <div>무기질</div>
                          <div>
                            칼슘{' '}
                            <span>
                              {mostIngredientDetail!.calcium.toFixed(0)} mg
                            </span>
                          </div>
                          <div>
                            마그네슘{' '}
                            <span>
                              {mostIngredientDetail!.magnesium.toFixed(0)} mg
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={classes.other}>
                  {props.ingredients.slice(1).map((item, index) => {
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
          <div className={classes.header}>{`가장 많이 먹은 재료`}</div>
          <div className={classes.main}>
            {props.ingredients.length === 0 ? (
              <>
                <div>기록없음</div>
                {/* <div onClick={handler}>식사 추가하기</div> */}
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
