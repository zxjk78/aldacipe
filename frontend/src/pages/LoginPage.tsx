// custom component
import LoginForm from '../components/login/LoginForm';
import loginImg from '../assets/loginImg.jpg';

// css
import classes from './LoginPage.module.scss';
const LoginPage: React.FC<{}> = () => {
  return (
    <>
      <div className={classes.backdrop}>
        <div className={classes.wrapper}>
          <div>
            <img
              src={loginImg}
              className={classes.loginImg}
              alt="음식 이미지"
            />
          </div>
          <div>
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
