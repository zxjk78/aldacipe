import React, { useRef, useState } from 'react';
import BirthdayInput from '../common/mui/BirthdayInput';
import dayjs, { Dayjs } from 'dayjs';

export const FormContent1: React.FC<{
  emailHandle: (email: string) => void;
}> = (props) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const formStep1Handler = () => {
    const email = emailRef.current!.value;

    props.emailHandle(email);
  };

  return (
    <>
      <input type="text" placeholder="이메일을 입력해 주세요." ref={emailRef} />
      <div>
        <button onClick={formStep1Handler}>다음</button>
      </div>
    </>
  );
};
export const FormContent2: React.FC<{
  birthdayHandle: (birthday: Dayjs | null) => void;
}> = (props) => {
  const [birthday, setBirthday] = useState<Dayjs | null>(null);
  const birthdayChange = (newBirthday: Dayjs | null) => {
    setBirthday(newBirthday);
  };
  const formStep2Handler = () => {
    props.birthdayHandle(birthday);
  };
  return (
    <>
      <label htmlFor="">생년월일</label>
      <BirthdayInput changeBirthday={birthdayChange} />
      <input type="text" placeholder="이메일을 입력해 주세요." />
      <div>
        <button>이전</button>
        <button onClick={formStep2Handler}>다음</button>
      </div>
    </>
  );
};
export const FormContent3: React.FC<{}> = () => {
  return <></>;
};
