// custom component
import { useSelector } from 'react-redux/es/exports';
import SearchInput from '../UI/SearchInput';
// external component

// css
import classes from './Navbar.module.scss';

export default function Navbar() {
  const username = useSelector((state: any) => state.login.username);
  console.log(username);

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

        <div className={classes.userInfo}>{username}</div>
      </div>
    </>
  );
}
