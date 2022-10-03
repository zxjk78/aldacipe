import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchSearchRecipe } from '../api/search';
// external component
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
// custom component
import CarouselPopular from '../components/mainpage/CarouselPopular';
import ChipsArray from '../components/search/ChipsArray';
import IngreSearchForm from '../components/search/IngreSearchForm';
// css
import classes from './SearchPage.module.scss';
/* 검색 페이지들어온다음에추가 검색이 안되는 상황 고쳐야 한다: useEffect로 고침 

주소창을 통한 추가 검색시에는 keyword의 변경이 selectedIngreArr을 초기화시킨다. */

import { Ingredient } from '../util/interface';
export default function SearchPage(props: {}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [recipeLoading, setRecipeLoading] = useState(false);
  const [searchList, setSearchList] = useState<[]>([]);
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedIngreArr, setSelectedIngreArr] = useState<Ingredient[]>([]);
  const [ingreKeyword, setIngreKeyword] = useState('');

  const searchKeyword = searchParams.get('keyword');

  const ingreSearchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      setSelectedIngreArr([]);
      setIngreKeyword((prev) => '');
      const data = await fetchSearchRecipe(searchKeyword!, '');
      // console.log(data);

      setSearchList(data);
    })();

    setIsLoading(false);
  }, [searchKeyword]);

  useEffect(() => {
    setRecipeLoading(true);
    (async () => {
      const ingredient =
        selectedIngreArr.length === 0
          ? ''
          : selectedIngreArr.map((item) => item.id).join('-');
      const data = await fetchSearchRecipe(searchKeyword!, ingredient);
      // console.log(data);

      setSearchList(data);
    })();

    setRecipeLoading(false);
  }, [selectedIngreArr]);

  const toggleDetailSearch = () => {
    setDetailVisible((prev) => {
      if (prev) {
        ingreSearchRef.current!.classList.add(classes.notVisible);
      } else {
        ingreSearchRef.current!.classList.remove(classes.notVisible);
      }
      return !prev;
    });
  };
  const addIngredient = (newIngredient: Ingredient) => {
    setSelectedIngreArr((prev) => {
      if (prev.filter((item) => item.id === newIngredient.id).length > 0) {
        return prev;
      } else {
        return [...prev, newIngredient];
      }
    });
  };
  const ingreKeywordChange = (keyword: string) => {
    setIngreKeyword(keyword);
  };
  const removeIngredient = (ingreId: number) => {
    setSelectedIngreArr((prev) => prev.filter((item) => +item.id !== ingreId));
  };
  return (
    <>
      {!isLoading && (
        <div className={classes.wrapper}>
          <div>
            <button
              className={classes.ingredientBtn}
              onClick={toggleDetailSearch}
            >
              재료 상세 검색
              {detailVisible ? (
                <span className={classes.detailText}>
                  <ArrowCircleUpIcon />
                </span>
              ) : (
                <span className={classes.detailText}>
                  <ArrowCircleDownIcon />
                </span>
              )}
            </button>
          </div>
          {/* ${classes.detailContainer} */}
          <div
            className={`${classes.searchContainer} ${
              detailVisible
                ? `${classes['slide-fade-in-dropdown']}`
                : `${classes.notVisible}`
            }`}
            ref={ingreSearchRef}
          >
            <div>
              <IngreSearchForm
                searchKeyword={searchKeyword}
                addItem={addIngredient}
              />
            </div>
          </div>
          <div className={classes.title}>요리 검색 결과</div>
          <div>
            <ChipsArray
              ingredients={selectedIngreArr}
              deleteIngre={removeIngredient}
            />
          </div>
          <CarouselPopular cardList={searchList!} />
        </div>
      )}
    </>
  );
}
