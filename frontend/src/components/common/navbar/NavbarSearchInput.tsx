// react core
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// API
import { searchRecipeByKeyword, searchIngredient } from '../../../api/search';

// external module

// external component
import SearchIcon from '@mui/icons-material/Search';

import styled from '@emotion/styled';

// custom component
import RecipeListItem from '../../UI/RecipeListItem';

// css, interface(type)
import classes from './NavbarSearchInput.module.scss';
import { Recipe_carousel } from '../../../util/interface';

const MySearchIcon = styled(SearchIcon)`
  color: #5d5d5d;
`;

const NavbarSearchInput = (props: { placeholder: string }) => {
  const [briefVisible, setBriefVisible] = useState(false);
  const [recipeSearchResult, setRecipeSearchResult] = useState<
    Recipe_carousel[]
  >([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    // console.log('검색', isNavbar, props.isMypage, props.isSearch);

    if (searchRef.current?.value) {
      navigate(
        {
          pathname: 'search',
          search: `?keyword=${searchRef.current!.value}&ingredient=""`,
        },
        { replace: true }
      );
      setBriefVisible(false);
    }
    return;
  };

  const keywordChangeHandler = async () => {
    const keyword = searchRef.current!.value;
    // keyward 이용해서 search 받아서 navBar에 올림
    if (keyword.length === 0) {
      setBriefVisible(false);
      return;
    }
    // 인풋의 키워드 변화가 네비게이션 바의 검색에서면
    const data = await searchRecipeByKeyword(keyword);
    setRecipeSearchResult((prev) => data);
    setBriefVisible(true);
  };
  // 클릭한 레시피명으로 이동시키는 함수
  const moveToRecipeDetailHandler = (recipeId: number) => {
    navigate(`detail/${recipeId}`);
    setBriefVisible(false);
  };

  return (
    <>
      <div className="wrapper">
        <form onSubmit={submitHandler}>
          <div className={classes.searchContainer}>
            <span onClick={submitHandler}>
              <MySearchIcon />
            </span>

            <input
              type="text"
              placeholder={props?.placeholder || '요리 이름 검색'}
              onChange={keywordChangeHandler}
              ref={searchRef}
            />
          </div>
          {briefVisible ? (
            <div className={classes.searchBriefResult}>
              <div className={classes.recipe}>
                <div className={`${classes.category} ${classes.recipe}`}>
                  요리
                </div>
                <div className={classes.searchResult}>
                  {recipeSearchResult.slice(0, 5).map((item) => (
                    <RecipeListItem
                      key={item.id}
                      recipe={item}
                      moveToDetail={moveToRecipeDetailHandler}
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
export default NavbarSearchInput;
