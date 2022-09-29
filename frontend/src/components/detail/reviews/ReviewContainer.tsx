import ReviewItem from './ReviewItem';
import { useOutletContext } from 'react-router-dom';
import { Review } from '../interface';
import classes from './ReviewContainer.module.scss';
import { useContext } from 'react';

const ReviewContainer = (props: {}) => {
  const reviewList: Review[] = [];
  const parentData = useOutletContext();
  console.log(parentData);

  return (
    <>
      {reviewList.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
      리뷰리뷰리뷰
    </>
  );
};

export default ReviewContainer;
