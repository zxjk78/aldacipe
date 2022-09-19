import ReviewItem from './ReviewItem';
import { Review } from '../interface';
import classes from './ReviewContainer.module.scss';

const ReviewContainer = (props: { reviewList: Review[] }) => {
  return (
    <>
      {props.reviewList.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </>
  );
};

export default ReviewContainer;
