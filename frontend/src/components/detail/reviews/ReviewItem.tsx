// core
import moment from 'moment';
// components

// external
import { Rating } from '@mui/material';
// css
import classes from './ReviewItem.module.scss';
// type
import { Review } from '../../../util/interface';
const ReviewItem = (props: { review: Review }) => {
  const review = props.review;
  return (
    <>
      <div className={classes.header}>
        <div>{review.userName}</div>
        {/*  이부분 별로 바꾸기 */}
        <Rating
          name="read-only"
          value={review.score}
          readOnly
          precision={0.5}
        />
      </div>
    </>
  );
};

export default ReviewItem;
