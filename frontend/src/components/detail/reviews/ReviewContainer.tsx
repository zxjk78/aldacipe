import ReviewItem from './ReviewItem';
import { useOutletContext } from 'react-router-dom';

import { useContext } from 'react';
// css, interface
import classes from './ReviewContainer.module.scss';
import { RecipeDetail, Review } from '../../../util/interface';

const ReviewContainer = (props: {}) => {
  const reviewList: Review[] = [];
  const parentData: RecipeDetail = useOutletContext();
  const reviewData = parentData.evaluationList;
  const isEvaluate = parentData.userEvaluationInfo.didEvaluate;
  // 리뷰 안남기면 0임
  return (
    <>
      {reviewList.length === 0
        ? '등록된 리뷰가 없습니다.'
        : reviewList.map((review) => (
            <ReviewItem key={review.userId} review={review} />
          ))}
    </>
  );
};

export default ReviewContainer;
