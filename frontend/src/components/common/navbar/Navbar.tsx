import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// redux
import { useDispatch } from 'react-redux';
import { loginActions } from '../../../redux/slice/login';
import { useSelector } from 'react-redux/es/exports';
// custom component
import NavbarSearchInput from './NavbarSearchInput';
// external component
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// api
import { logout } from '../../../api/auth';
// css
import classes from './Navbar.module.scss';

export default function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const username = useSelector((state: any) => state.login.userInfo.name);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const showMenuHandler = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutHandler = async () => {
    const isLogout = await logout();
    if (isLogout) {
      // 리덕스 persist에 user명 삭제
      dispatch(loginActions.setUserInfo(null));
      window.location.reload();
    }
  };
  return (
    <>
      <div className={classes.wrapper}>
        <Link to={`/main`}>
          <div className={classes.title}>
            <img
              width="80px"
              src={process.env.PUBLIC_URL + '/aldacipe_main_logo.png'}
              alt="로고이미지"
            />
            {/* <h1>알다시피</h1> */}
          </div>
        </Link>

        <div className={classes.menu}>
          <Link
            to={`/main`}
            className={location.pathname === '/main' ? classes.isActive : ''}
          >
            <div>레시피</div>
          </Link>
          <Link
            to={`/myrefrigerator`}
            className={
              location.pathname === '/myrefrigerator' ? classes.isActive : ''
            }
          >
            <div>내 냉장고</div>
          </Link>
          <Link
            to={`/dashboard`}
            className={
              location.pathname === '/dashboard' ? classes.isActive : ''
            }
          >
            <div>영양관리</div>
          </Link>
        </div>
        <div className={classes.search}>
          <NavbarSearchInput placeholder="요리 이름 검색" />
        </div>

        <div className={classes.userInfo} onClick={showMenuHandler}>
          {username}
        </div>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>
            <Link to={`/mypage`}>내 정보</Link>
          </MenuItem>
          <MenuItem onClick={logoutHandler}>로그아웃</MenuItem>
        </Menu>
      </div>
    </>
  );
}
