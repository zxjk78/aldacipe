import React, { ChangeEvent, useRef, useState } from 'react';
import BirthdayInput from '../common/mui/BirthdayInput';
import dayjs, { Dayjs } from 'dayjs';

// interface - 타입스크립트 인터페이스를 다른 곳에 입력해두고 받아옴
import { form1Data, form2Data, form3Data } from './config';
// css
import classes from './Forms.module.scss';

// components
export const FormContent1: React.FC<{
  stepOneDataHandle: (data: form1Data) => void;
}> = (props) => {
  // useRef 는 이런식으로 제네릭<null>
  const emailRef = useRef<HTMLInputElement>(null);
  const submitStepOneDataHandler = () => {
    // 그리고 current 가 항상 null이 아니라는 것을 보장해서 사용
    const email: string = emailRef.current!.value;

    props.stepOneDataHandle({ email: email });
  };

  return (
    <>
      <input
        type="email"
        placeholder="이메일을 입력해 주세요."
        ref={emailRef}
      />

      <div>
        <button
          type="button"
          className={`${classes.nextBtn}`}
          onClick={submitStepOneDataHandler}
        >
          다음
        </button>
      </div>
    </>
  );
};

export const FormContent2: React.FC<{
  stepTwoDataHandle: (data: form2Data) => void;
  stepBackHandle: () => void;
}> = (props) => {
  const [stepTwoData, setStepTwoData] = useState<form2Data>({
    gender: '',
    weight: 0,
    height: 0,
    birthday: '',
  });

  const [isGenderValid, setIsGenderValid] = useState(false);
  const [isWeightValid, setIsWeightValid] = useState(false);
  const [isHeightValid, setIsHeightValid] = useState(false);

  const birthdayChange = (newBirthday: Dayjs | null) => {
    const tmp = newBirthday!.format('YYYY-MM-DD');
    setStepTwoData((prev) => {
      return { ...prev, birthday: tmp };
    });
  };
  const genderChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStepTwoData((prev) => {
      return { ...prev, gender: event.target.value };
    });
    setIsGenderValid(true);
  };
  const heightChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStepTwoData((prev) => {
      return { ...prev, height: Number(event.target.value) };
    });
    setIsHeightValid(true);
  };
  const weightChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStepTwoData((prev) => {
      return { ...prev, weight: Number(event.target.value) };
    });
    setIsWeightValid(true);
  };

  const formStepBackHandler = () => {
    props.stepBackHandle();
  };
  const submitStepTwoDataHandler = () => {
    props.stepTwoDataHandle(stepTwoData);
  };
  return (
    <>
      <label htmlFor="">생년월일</label>
      <BirthdayInput changeBirthday={birthdayChange} />
      <label htmlFor="gender">성별</label>
      <label htmlFor="male">남성</label>
      <input
        type="radio"
        name="gender"
        id="male"
        value="male"
        onChange={genderChange}
      />
      <label htmlFor="female">여성</label>
      <input type="radio" name="gender" id="female" value="female" />
      <div>
        <div>
          <label htmlFor="height">키</label>
          <input
            type="number"
            name="height"
            id="height"
            min={0}
            max={300}
            onChange={heightChange}
          />{' '}
          cm
          <label htmlFor="weight">몸무게</label>
          <input
            type="number"
            name="weight"
            id="weight"
            min={0}
            max={300}
            onChange={weightChange}
          />{' '}
          kg
        </div>
      </div>

      <div>
        <button onClick={formStepBackHandler}>이전</button>
        <button
          type="button"
          className={`${classes.nextBtn}`}
          onClick={submitStepTwoDataHandler}
          disabled={!(isGenderValid && isWeightValid && isHeightValid)}
        >
          다음
        </button>
      </div>
    </>
  );
};
export const FormContent3: React.FC<{
  stepThreeDataHandle: (data: form3Data) => void;
  stepBackHandle: () => void;
}> = (props) => {
  const checkPassword = (event: React.FocusEvent<HTMLInputElement>) => {
    console.log(event);
  };

  const formStepBackHandler = () => {
    props.stepBackHandle();
  };
  const sumbitStepThreeHandler = () => {
    const password = '123';
    props.stepThreeDataHandle({ password: password });
  };
  return (
    <>
      <label htmlFor="password1">비밀번호</label>
      <input type="password" id="password1" />
      <label htmlFor="password1">비밀번호 확인</label>
      <input type="password" id="password2" onBlur={checkPassword} />

      <button onClick={formStepBackHandler}>이전</button>
      <button
        type="submit"
        className={`${classes.nextBtn}`}
        onClick={sumbitStepThreeHandler}
      >
        완료
      </button>
    </>
  );
};
