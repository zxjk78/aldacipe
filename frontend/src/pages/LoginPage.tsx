// custom component
import LoginForm from '../components/login/LoginForm';

// css
import classes from './LoginPage.module.scss';
const LoginPage: React.FC<{}> = () => {
  return (
    <>
      <div className={classes.backdrop}>
        <div className={classes.wrapper}>
          <div>
            <img src="" alt="음식 이미지" />
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
