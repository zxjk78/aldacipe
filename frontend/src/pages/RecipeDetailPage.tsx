import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import IngredientContainer from '../components/detail/ingredient/IngredientContainer';
import CuisineContainer from '../components/detail/cuisine/CuisineContainer';
import ReviewContainer from '../components/detail/reviews/ReviewContainer';
import Nutrients from '../components/detail/nutrients/Nutrients';
// css
import classes from './RecipeDetailPage.module.scss';
// 더미데이터
import { dummyReview } from '../components/detail/interface';
export default function RecipeDetailPage(props: {}) {
  const location = useLocation();
  // const [isTrue, setIsTrue] = useState<boolean>(true);

  // useEffect(() => {

  // }, [ location ])
  return (
    <>
      <div className={classes.backdrop}>
        <div className={classes.wrapper}>
          <IngredientContainer recipe={{}} />
          <div className={classes.menus}>
            <NavLink 
            to="/detail/1"
            className={() => location.pathname === "/detail/1" ? classes.selected : classes.notselected}
            >요리 방법</NavLink>
            <NavLink 
            to="/detail/1/nutrients"
            className={({ isActive }) => isActive ? classes.selected : classes.notselected}
            >영양소</NavLink>
            <NavLink 
            to="/detail/1/review"
            className={({ isActive }) => isActive ? classes.selected : classes.notselected}
            >댓글 및 평점</NavLink>
          </div>
          <Outlet/>
        </div>
      </div>
    </>
  );
}
