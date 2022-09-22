import ReviewItem from './ReviewItem';
import { Review } from '../interface';
import classes from './ReviewContainer.module.scss';

const ReviewContainer = () => {
  const reviewList:Review[] = []
  return (
    <>
      {reviewList.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </>
  );
};

export default ReviewContainer;
