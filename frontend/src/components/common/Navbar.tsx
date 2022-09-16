// custom component
import SearchInput from '../UI/SearchInput';
// external component

// css
import classes from './Navbar.module.scss';

const Navbar: React.FC<{ username?: string }> = (props) => {
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.title}>
          <img src="" alt="로고이미지" />
          <h1>서비스명</h1>
        </div>
        <div className={classes.menu}>
          <div>레시피</div>
          <div>내 냉장고</div>
          <div>영양관리</div>
        </div>
        <div className={classes.search}>
          <SearchInput isNavbar />
        </div>

        <div className={classes.userInfo}>
          {props.username ? props.username : '로그인'}
        </div>
      </div>
    </>
  );
};

export default Navbar;
