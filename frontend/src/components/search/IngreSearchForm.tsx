import React, { useState, useEffect, useRef } from 'react';
import { debounce } from 'lodash';
// external component
import ChipsArray from './ChipsArray';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
// custom component
import SearchResultList from './SearchResultList';
// api
import { searchIngredient } from '../../api/search';
// css, interface
import classes from './IngreSearchForm.module.scss';
import { Ingredient } from '../../util/interface';
export default function IngreSearchForm(props: {
  searchKeyword: string | null;
  addItem: (newIngredient: Ingredient) => void;
}) {
  const [selectedIngreArr, setSelectedIngreArr] = useState<Ingredient[]>([]);
  const [searchResult, setSearchResult] = useState<Ingredient[] | null>(null);
  const [searchListVisible, setSearchListVisible] = useState(false);
  const ingreSearchRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    ingreSearchRef.current!.value = '';
    setSearchResult([]);
  }, [props.searchKeyword]);

  // lodash의 debounce는 선언은 처음에하고 나중에 사용하는 형식
  const searchDebounce = debounce(async (keyword) => {
    const data = await searchIngredient(keyword);
    setSearchResult(data);
    setSearchListVisible(true);
    return data;
  }, 500);
  const searchIngreHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    const ingredient = event.target.value;
    if (ingredient.trim().length === 0) {
      setSearchListVisible(false);
      return;
    }

    searchDebounce(event.target.value);
  };
  const addIngreHandler = (ingreId: number) => {
    const newItem = searchResult!.filter((item) => +item.id === ingreId)[0];
    ingreSearchRef.current!.value = '';
    props.addItem(newItem);
  };
  const removeIngredient = (ingreId: number) => {
    setSelectedIngreArr((prev) => prev.filter((item) => +item.id !== ingreId));
  };
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <div className={classes.title}>재료 상세 검색</div>
          <div className={classes.searchInput}>
            <SearchIcon />
            <input
              type="text"
              // className={classes.searchInput}
              placeholder="재료를 검색하세요"
              onChange={searchIngreHandler}
              ref={ingreSearchRef}
            />
          </div>
        </div>
        {searchResult && searchResult.length > 0 ? (
          <div className={classes.searchResult}>
            <SearchResultList
              ingreList={searchResult}
              addItem={addIngreHandler}
            />
          </div>
        ) : (
          <div className={`${classes.searchResult} ${classes.notFound}`}>
            <span>
              <SearchOffIcon />
            </span>
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </>
  );
}
