import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchSearchRecipe } from '../api/search';
// custom component
import CarouselPopular from '../components/mainpage/CarouselPopular';
import IngreBasedSearchForm from '../components/search/IngreSearchForm';
// css
import classes from './SearchPage.module.scss';
/* 검색 페이지들어온다음에추가 검색이 안되는 상황 고쳐야 한다. */

export default function SearchPage(props: {}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [searchList, setSearchList] = useState<[]>([]);
  const [detailVisible, setDetailVisible] = useState(false);
  const searchKeyword = searchParams.get('keyword');
  const ingreSearchRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const data = await fetchSearchRecipe(searchKeyword!);
      console.log(data);

      setSearchList(data);
    })();

    setIsLoading(false);
  }, [searchKeyword]);
  const toggleDetailSearch = () => {
    setDetailVisible((prev) => {
      if (prev) {
        setTimeout(() => {
          ingreSearchRef.current!.classList.add(classes.notVisible);
        }, 300);
      }
      return !prev;
    });
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
              재료 상세 검색 {detailVisible ? '닫기' : `열기`}
            </button>
          </div>
          {/* ${classes.detailContainer} */}
          <div
            className={`${classes.visible} ${
              detailVisible
                ? classes['slide-fade-in-dropdown']
                : classes['slide-fade-out-dropdown']
            }`}
            ref={ingreSearchRef}
          >
            <div className={classes.title}>재료 상세 검색</div>
            <div>
              <IngreBasedSearchForm />
            </div>
          </div>
          <div className={classes.title}>요리 검색 결과</div>
          <CarouselPopular cardList={searchList!} />
        </div>
      )}
    </>
  );
}
