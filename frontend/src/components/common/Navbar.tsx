import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// redux
import { useDispatch } from 'react-redux';
import { loginActions } from '../../redux/slice/login';
// custom component
import { useSelector } from 'react-redux/es/exports';
import SearchInput from '../UI/SearchInput';
// external component
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// api
import { logout } from '../../api/auth';
// css
import classes from './Navbar.module.scss';

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state: any) => state.login.username);
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
      dispatch(loginActions.setUsername(''));
      window.location.reload();
    }
  };
  return (
    <>
      <div className={classes.wrapper}>
        <Link to={`/main`}>
          <div className={classes.title}>
            <img src="" alt="로고이미지" />
            <h1>알다시피</h1>
          </div>
        </Link>

        <div className={classes.menu}>
          <div>레시피</div>
          <div>내 냉장고</div>
          <div>영양관리</div>
        </div>
        <div className={classes.search}>
          <SearchInput isNavbar />
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
