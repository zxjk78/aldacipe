import { Rating } from '@mui/material';

import { Review } from '../interface';
import classes from './ReviewItem.module.scss';
const ReviewItem = (props: { review: Review }) => {
  const review = props.review;
  return (
    <>
      <div className={classes.header}>
        <div>{review.author}</div>
        <div>{review.createdDate.getTime()}</div>
        {/*  이부분 별로 바꾸기 */}
        <Rating
          name="read-only"
          value={review.score}
          readOnly
          precision={0.5}
        />
      </div>
      <div className={classes.main}>{review.content}</div>
    </>
  );
};

export default ReviewItem;
