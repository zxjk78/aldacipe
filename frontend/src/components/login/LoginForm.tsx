import { stringify } from 'querystring';
import { useState, FormEvent, ChangeEvent } from 'react';

import { emailRegExp, passwordRegExp } from '../../util/regexp';
// css
import classes from './LoginForm.module.scss';
const LoginForm: React.FC<{}> = () => {
  const [loginInfo, setLoginInfo] = useState<{
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
    setLoginInfo({ ...loginInfo, email: tmp });
    if (tmp.length > 0 && emailRegExp.test(tmp)) {
      setEmailValid(() => true);
    } else {
      setEmailValid(() => false);
    }
  };
  const passwordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const tmp = event.target.value;
    setLoginInfo({ ...loginInfo, password: tmp });
    if (tmp.length > 0 && passwordRegExp.test(tmp)) {
      setPasswordValid(() => true);
    } else {
      setPasswordValid(() => false);
    }
  };
  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    // api 로 통신 - accessToken은 메모리: header에 저장, 유저 아이디 정보는 받아와서 리덕스에 저장
  };
  return (
    <>
      <div className={classes.header}>로그인</div>
      <form className={classes.loginForm} onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">이메일</label>
          <input type="email" id="email" onChange={emailHandler} />
          <p className={classes.errorMsg}>
            {loginInfo.email.length > 0 &&
              !emailValid &&
              '이메일을 정확히 입력해 주세요'}
          </p>
        </div>
        <div>
          <label htmlFor="pw">비밀번호</label>
          <input type="password" id="pw" onChange={passwordHandler} />
          <p className={classes.errorMsg}>
            {loginInfo.password.length > 0 &&
              !passwordValid &&
              '비밀번호를 정확히 입력해 주세요'}
          </p>
        </div>

        <button>로그인</button>
        <div className={classes.other}>
          회원이 아니신가요? <span>회원가입</span>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
