// react core
import React, { useRef, useState } from 'react';
// API
import { searchRecipeByKeyword2 } from '../../../api/search';

// external module

// external component
import SearchIcon from '@mui/icons-material/Search';
import styled from '@emotion/styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// custom component
import MealSearchListItem from './MealSearchListItem';
// css, interface(type)
import classes from './MealPlannerSearchInput.module.scss';
import { Meal } from '../../../util/interface';

const MySearchIcon = styled(SearchIcon)`
  color: #5d5d5d;
`;

const MealPlannerSearchInput = (props: {
  placeholder: string;
  onSearchClose: () => void;
}) => {
  const [briefVisible, setBriefVisible] = useState(false);
  const [intakeSearchResult, setIntakeSearchResult] = useState<Meal[]>([]);
  const keywordRef = useRef<null | HTMLInputElement>(null);
  const infoToastr = (message: string) =>
    toast.info(<div className={classes.errorMsg}>{message}</div>);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    return;
  };

  const keywordChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const keyword = event.target.value;
    // keyward 이용해서 search 받아서 navBar에 올림
    if (keyword.length === 0) {
      setBriefVisible(false);
      return;
    }

    const data = await searchRecipeByKeyword2(keyword);
    setIntakeSearchResult((prev) => data);
    setBriefVisible(true);
  };
  const handleMealSubmit = () => {
    keywordRef.current!.value = '';
    infoToastr('섭취한 음식을 기록하였습니다.');

    setBriefVisible(false);
    props.onSearchClose();
  };
  return (
    <>
      <div className="wrapper">
        <ToastContainer autoClose={2000} closeOnClick />

        <form onSubmit={submitHandler}>
          <div className={classes.searchContainer}>
            <span onClick={submitHandler}>
              <MySearchIcon />
            </span>

            <input
              type="text"
              placeholder={props?.placeholder || '요리 이름 검색'}
              onChange={keywordChangeHandler}
              ref={keywordRef}
            />
          </div>
          {briefVisible ? (
            <div className={classes.searchBriefResult}>
              <div className={classes.recipe}>
                <div className={`${classes.category} ${classes.recipe}`}>
                  요리
                </div>
                <div className={classes.searchResult}>
                  {intakeSearchResult.slice(0, 5).map((item) => (
                    <MealSearchListItem
                      key={item.id}
                      meal={item}
                      onDataSubmit={handleMealSubmit}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </form>
      </div>
    </>
  );
};
export default MealPlannerSearchInput;
