// custom component
import LoginForm from '../components/login/LoginForm';
import loginImg from '../assets/loginImg.jpg';
// external
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// css
import classes from './LoginPage.module.scss';

const LoginPage: React.FC<{}> = () => {
  const notify = () =>
    toast.error(
      <div className={classes.errorMsg}>
        아이디 또는 비밀번호가 <br />
        일치하지 않습니다.
      </div>
    );
  const loginFailHandler = () => {
    notify();
  };
  return (
    <>
      <div className={classes.backdrop}>
        <ToastContainer autoClose={3000} closeOnClick />

        <div className={classes.wrapper}>
          <div>
            <img
              src={loginImg}
              className={classes.loginImg}
              alt="음식 이미지"
            />
          </div>
          <div>
            <LoginForm loginFail={loginFailHandler} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
