// react core
import { useState } from 'react';
import { Link } from 'react-router-dom';
// API
import { API_URL } from '../../../api/config/http-config';
// external module

// external component
import Modal from '@mui/material/Modal';
import { Backdrop } from '@mui/material';
import styled from '@emotion/styled';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// custom component
import RecipeImgContainer from '../../UI/RecipeImgContainer';
// css, interface(type)
import classes from './MostRecipe.module.scss';
import { Recipe } from '../../../util/interface';

const CustomBackdrop = styled(Backdrop)`
  background-color: transparent;
`;
// 부모 : detail.tsx
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
                      <Link to={`/detail/${props.recipe[0].id}`}>
                        <RecipeImgContainer
                          src={`${API_URL}image?path=${props.recipe[0].image}`}
                          width={'50px'}
                          height={'50px'}
                          alt="요리"
                        />
                        {props.recipe[0].name}
                      </Link>
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
                        <Link to={`/detail/${item.id}`}>
                          <RecipeImgContainer
                            src={`${API_URL}image?path=${item.image}`}
                            width={'30px'}
                            height={'30px'}
                            alt="요리"
                          />
                          <div className={classes.otherName}>{item.name}</div>
                        </Link>
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
                <Link to={`/detail/${props.recipe[0].id}`}>
                  <RecipeImgContainer
                    src={`${API_URL}image?path=${props.recipe[0].image}`}
                    width={'30px'}
                    height={'30px'}
                    alt="음식이미지"
                  />
                  <div>{props.recipe[0].name}</div>
                </Link>
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
