// react core

// API

// external module

// external component

// custom component

// css
import classes from './MyInfo.module.scss';

export default function MyInfo(props: {}) {
  const modifyUserInfoHandler = () => {};
  return (
    <>
      <div>
        <div className={classes.container}>
          <div className={classes.header}>
            <div className={classes.title}>회원정보</div>
            <div className={classes.modify} onClick={modifyUserInfoHandler}>
              회원정보 수정
            </div>
          </div>
          <div className={classes.main}>
            <div>
              성별 <span>{'남'}</span>
            </div>
            <div>
              나이 만 <span>{'26'}</span>세
            </div>
            <div>
              키 <span>{'123.7'}</span>cm
            </div>
            <div>
              몸무게 <span>{'123'}</span>Kg
            </div>
          </div>
          <div className={classes.footer}></div>
        </div>
      </div>
    </>
  );
}
