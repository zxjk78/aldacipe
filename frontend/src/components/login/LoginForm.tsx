import { useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { loginActions } from '../../redux/slice/login';
import { Link, useNavigate } from 'react-router-dom';
// api
import { login } from '../../api/auth';
// css
import classes from './LoginForm.module.scss';
// etc
import { emailRegExp, passwordRegExp } from '../../util/regexp';

const LoginForm: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginUserInfo, setLoginUserInfo] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const emailHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const tmp = event.target.value;
    setLoginUserInfo({ ...loginUserInfo, email: tmp });
    if (tmp.length > 0 && emailRegExp.test(tmp)) {
      setEmailValid(() => true);
    } else {
      setEmailValid(() => false);
    }
  };
  const passwordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const tmp = event.target.value;
    setLoginUserInfo({ ...loginUserInfo, password: tmp });
    if (tmp.length > 0 && passwordRegExp.test(tmp)) {
      setPasswordValid(() => true);
    } else {
      setPasswordValid(() => false);
    }
  };
  const submitloginUserInfoHandler = async (event: FormEvent) => {
    event.preventDefault();
    const result: boolean | undefined = await login(loginUserInfo);
    if (result) {
      // 리덕스 persist에 user명 저장
      dispatch(loginActions.setUsername(loginUserInfo.email.split('@')[0]));
      // 새로고침 하면서 main으로 라우팅되도록 - 새로고침시 accessToken 증발: cookie에 담아서 증발 막음
      // navigate('/main', { replace: true });
      window.location.reload();
    }
    // accessToken은 axiosHeader에 저장, accessTokenExpireDate 는 localstorage에 문자열로 저장된 상황
  };
  return (
    <>
      <div className={classes.header}>로그인</div>
      <form className={classes.loginForm} onSubmit={submitloginUserInfoHandler}>
        <div>
          <label htmlFor="email">이메일</label>
          {/* <input type="email" id="email" onChange={emailHandler} /> */}
          <input type="text" id="email" onChange={emailHandler} />
          <p className={classes.errorMsg}>
            {loginUserInfo.email.length > 0 &&
              !emailValid &&
              '이메일을 정확히 입력해 주세요'}
          </p>
        </div>
        <div>
          <label htmlFor="pw">비밀번호</label>
          <input type="password" id="pw" onChange={passwordHandler} />
          <p className={classes.errorMsg}>
            {loginUserInfo.password.length > 0 &&
              !passwordValid &&
              '비밀번호를 정확히 입력해 주세요'}
          </p>
        </div>

        <button>로그인</button>
        <div className={classes.other}>
          회원이 아니신가요?{' '}
          <Link to="/signup">
            <span>회원가입</span>
          </Link>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
