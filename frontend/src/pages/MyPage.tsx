// external component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// custom component
import MyInfo from '../components/mypage/MyInfo';
import FoodBlackList from '../components/mypage/FoodBlackList';
// css
import classes from './MyPage.module.scss';

export default function MyPage() {
  const infoToastr = (message: string) =>
    toast.info(<div className={classes.errorMsg}>{message}</div>);

  const errorToastr = (message: string) =>
    toast.error(<div className={classes.errorMsg}>{message}</div>);

  const modifyMyInfo = () => {
    infoToastr('개인정보가 수정되었습니다.');
  };
  const addBlackListDone = () => {
    infoToastr('블랙리스트에 추가되었습니다.');
  };
  const addBlackListFail = () => {
    errorToastr('이미 블랙리스트 된 재료입니다.');
  };
  const removeBlackList = () => {
    infoToastr('블랙리스트에서 제거되었습니다.');
  };

  return (
    <>
      <div className={classes.wrapper}>
        <ToastContainer autoClose={3000} closeOnClick />

        <div className={classes.container}>
          <MyInfo modifySuccess={modifyMyInfo} />
          <FoodBlackList
            addItemDone={addBlackListDone}
            addItemError={addBlackListFail}
            removeItemDone={removeBlackList}
          />
        </div>
      </div>
    </>
  );
}
