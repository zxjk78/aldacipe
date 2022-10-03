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
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <div>{review.user.name ? review.user.name : '익명의 사용자'}</div>
        </div>
        <div className={classes.content}>
          <div>{review.contents}</div>
        </div>
      </div>
    </>
  );
};

export default ReviewItem;
