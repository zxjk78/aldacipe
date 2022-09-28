// react core

// API

// external module

// external component

// custom component

// css, interface(type)
import classes from './SearchResultListItem.module.scss';

const SearchResultListItem = (props: { ingredient: any }) => {
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}></div>
          <div className={classes.main}></div>
          <div className={classes.footer}></div>
        </div>
      </div>
    </>
  );
};
export default SearchResultListItem;
