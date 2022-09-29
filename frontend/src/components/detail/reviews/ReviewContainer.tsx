import { FormEvent, useState, useRef } from 'react';
import ReviewItem from './ReviewItem';
import { useOutletContext } from 'react-router-dom';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { useContext } from 'react';

// external component
import Modal from '@mui/material/Modal';
import { Backdrop } from '@mui/material';
import Rating from '@mui/material/Rating';
import CloseIcon from '@mui/icons-material/Close';
import styled from '@emotion/styled';

// css, interface
import classes from './ReviewContainer.module.scss';
import { RecipeDetail, Review } from '../../../util/interface';

const CustomBackdrop = styled(Backdrop)`
  background-color: transparent;
`;

const ReviewContainer = (props: {
  reviewList: Review[];
  userEval: { didEvaluate: boolean; score: number };
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState<number | null>(2);
  const textAreaRef = useRef<null | HTMLTextAreaElement>(null);
  const [textCnt, setTextCnt] = useState(0);
  const reviewList = props.reviewList;
  const { didEvaluate: isEvaluate, score: userScore } = props.userEval;
  // 리뷰 안남기면 0임
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const handleSubmitReview = (event: FormEvent) => {
    event.preventDefault();
  };
  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        components={{ Backdrop: CustomBackdrop }}
      >
        <div className={classes.reviewModal}>
          <div className={classes.modalHeader}>
            <div>리뷰 남기기</div>
            <div onClick={handleModalClose}>
              <CloseIcon />
            </div>
          </div>
          <div className={classes.modalContent}>
            <form onSubmit={handleSubmitReview}>
              <div className={classes.modalRatingContainer}>
                <div>
                  <Rating
                    name="recipe-rating"
                    value={rating}
                    precision={0.5}
                    size="large"
                    onChange={(event, newValue) => {
                      setRating(newValue);
                    }}
                  />
                </div>
              </div>
              <div className={classes.reviewContent}>
                <textarea
                  name="reviewText"
                  id="reviewText"
                  cols={30}
                  rows={5}
                  maxLength={200}
                  ref={textAreaRef}
                  onChange={() => setTextCnt(textAreaRef.current!.value.length)}
                ></textarea>
                <div className={classes.textCnt}>
                  {textCnt}
                  /200
                </div>
              </div>
              <div className={classes.btnContainer}>
                <button>리뷰 등록하기</button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      <div className={classes.wrapper}>
        <div className={classes.header}>리뷰</div>
        <div className={classes.main}>
          {reviewList.length === 0 ? (
            <div className={classes.noReview}>
              <RateReviewIcon fontSize="large" />
              <div>
                <div>등록된 리뷰가 없습니다.</div>
                <div className={classes.addReview} onClick={handleModalOpen}>
                  리뷰 등록하기
                </div>
              </div>
            </div>
          ) : (
            reviewList.map((review) => (
              <ReviewItem key={review.userId} review={review} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ReviewContainer;
