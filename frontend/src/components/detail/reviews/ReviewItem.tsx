// core
import moment from 'moment';
// components

// external
import { Rating } from '@mui/material';
// css
import classes from './ReviewItem.module.scss';
// type
import { Review } from '../interface';
const ReviewItem = (props: { review: Review }) => {
  const review = props.review;
  return (
    <>
      <div className={classes.header}>
        <div>{review.author}</div>
        {/* 이부분 format 잘쓰려면 moment 써야될듯 */}
        <div>{moment(review.createdDate).format('YYYY-MM-DD')}</div>
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
