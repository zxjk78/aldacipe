import { FormEvent, useState, useRef, useEffect } from 'react';
// api
import { fetchReview, createReview } from '../../../api/detail';
// external component
import RateReviewIcon from '@mui/icons-material/RateReview';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '@mui/material/Modal';
import { Backdrop } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import styled from '@emotion/styled';
// custom component
import ReviewItem from './ReviewItem';
// css, interface
import classes from './ReviewContainer.module.scss';
import { RecipeDetail, Review } from '../../../util/interface';

const CustomBackdrop = styled(Backdrop)`
  background-color: transparent;
`;

const ReviewContainer = (props: {
  recipeId: number;
  evaluationList: any[];
  userEval: { didEvaluate: boolean; score: number };
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const textAreaRef = useRef<null | HTMLTextAreaElement>(null);
  const [textCnt, setTextCnt] = useState(0);
  const [reviewList, setReviewList] = useState<null | Review[]>(null);
  const { didEvaluate: isEvaluate, score: userScore } = props.userEval;
  const successToastr = (message: string) =>
    toast.success(<div className={classes.errorMsg}>{message}</div>);
  // 리뷰 안남기면 0임

  const fetchReviewFnc = async (recipeId: number) => {
    const data = await fetchReview(recipeId);
    setReviewList(data);
  };

  useEffect(() => {
    fetchReviewFnc(props.recipeId);
  }, [props.recipeId]);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const handleSubmitReview = async (event: FormEvent) => {
    event.preventDefault();
    const success = await createReview(
      props.recipeId,
      textAreaRef.current!.value
    );
    if (success) {
      successToastr('리뷰를 등록하였습니다.');
      fetchReviewFnc(props.recipeId);
    }
  };

  return (
    <>
      <div style={{ position: 'absolute' }}>
        <ToastContainer autoClose={2000} closeOnClick />
      </div>

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
        <div className={classes.header}>
          <div>리뷰</div>
          <div className={classes.addReview} onClick={handleModalOpen}>
            <span>
              <AddCircleOutlineIcon />
            </span>
            리뷰 남기기
          </div>
        </div>
        {reviewList && (
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
                <ReviewItem key={review.id} review={review} />
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ReviewContainer;
