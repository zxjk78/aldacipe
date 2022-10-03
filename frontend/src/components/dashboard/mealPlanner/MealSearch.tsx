// react core
import React, { useRef, useState } from 'react';

// API
import { searchRecipeByKeyword2 } from '../../../api/search';

// external module
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from '@emotion/styled';

// external component

// custom component
import MealSearchListItem from './MealSearchListItem';

import MealPlannerSearchInput from './MealPlannerSearchInput';
// css, interface(type)
import classes from './MealSearch.module.scss';
import { Meal } from '../../../util/interface';

const MySearchIcon = styled(SearchIcon)`
  color: #5d5d5d;
`;

const MealSearch = (props: { onSearchClose: () => void }) => {
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

  const handleClose = () => {
    props.onSearchClose();
  };
  return (
    <>
      <div className={classes.wrapper}>
        <ToastContainer autoClose={2000} closeOnClick />

        <div className={classes.container}>
          <div className={classes.header}>
            <div>
              음식 검색
              <span onClick={handleClose}>
                <CloseIcon />
              </span>
            </div>
            <input
              type="text"
              placeholder="음식 이름을 입력하세요"
              onChange={keywordChangeHandler}
              ref={keywordRef}
            />
          </div>
          <div className={classes.main}>
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
          <div className={classes.footer}></div>
        </div>
      </div>
    </>
  );
};
export default MealSearch;
