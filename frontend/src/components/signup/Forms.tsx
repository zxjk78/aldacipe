import React, { ChangeEvent, useRef, useState, useEffect } from 'react';
import BirthdayInput from '../common/mui/BirthdayInput';

import { debounce } from 'lodash';
// api
import { emailDupCheck } from '../../api/signup';

// interface - 타입스크립트 인터페이스를 다른 곳에 입력해두고 받아옴
import * as all from './config';
import { emailRegExp, passwordRegExp } from '../../util/regexp';
// css
import classes from './Forms.module.scss';

// components
export const FormContent1: React.FC<{
  formData: all.userInfo;
  stepOneDataHandle: (data: all.form1Data) => void;
}> = (props) => {
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(
    props.formData.email.length > 0
      ? emailRegExp.test(props.formData.email)
      : false
  );
  const [emailValidMsg, setEmailValidMsg] = useState<null | string>(null);

  // useRef 는 이런식으로 제네릭<null>
  const submitStepOneDataHandler = () => {
    props.stepOneDataHandle({ email: email });
  };

  const checkEmailValid = (event: React.FocusEvent<HTMLInputElement>) => {
    debounce(async () => {
      setEmail(event.target.value);

      if (emailRegExp.test(event.target.value)) {
        const isDup = await emailDupCheck(event.target.value);
        console.log(isDup);

        if (isDup) {
          setEmailValid(() => false);
          setEmailValidMsg(() => '중복된 이메일입니다.');
        } else {
          setEmailValid(() => true);
          setEmailValidMsg(null);
        }
      } else {
        setEmailValid(() => false);
        setEmailValidMsg(() => '유효하지 않은 이메일입니다.');
      }
    }, 500)();
  };
  const enterHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter' || !emailValid) {
      return;
    } else {
      props.stepOneDataHandle({ email: email });
    }
  };
  return (
    <div className={classes.wrapper} onKeyDown={enterHandler}>
      <div className={classes.inputContainer}>
        <input
          className={classes.signupInput}
          type="email"
          placeholder="이메일을 입력해 주세요."
          onChange={checkEmailValid}
          defaultValue={props.formData.email}
          autoFocus
        />
        <p className={classes.errorMsg}>
          {email.length > 0 &&
            !emailValid &&
            (emailValidMsg || '유효한 이메일을 입력해 주세요.')}
        </p>
      </div>
      <div className={classes.btnContainer}>
        <div></div>
        <button
          type="button"
          className={`${classes.nextBtn}`}
          onClick={submitStepOneDataHandler}
          disabled={email.length === 0 || !emailValid}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export const FormContent2: React.FC<{
  formData: all.userInfo;
  stepTwoDataHandle: (data: all.form2Data) => void;
  stepBackHandle: () => void;
}> = (props) => {
  const [stepTwoData, setStepTwoData] = useState<all.form2Data>({
    gender: props.formData.gender,
    weight: props.formData.weight,
    height: props.formData.height,
    birthday: props.formData.birthday,
    name: props.formData.name,
  });

  const [isGenderValid, setIsGenderValid] = useState(
    props.formData.gender.length > 0 ? true : false
  );
  const [isWeightValid, setIsWeightValid] = useState(
    props.formData.weight >= 0 && props.formData.weight <= 300 ? true : false
  );
  const [isHeightValid, setIsHeightValid] = useState(
    props.formData.height >= 0 && props.formData.height <= 300 ? true : false
  );
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tmp = event.target.value;
    setStepTwoData((prev) => {
      return { ...prev, name: tmp };
    });
  };

  const birthdayChangeHandler = (newBirthday: string) => {
    const tmp = newBirthday;
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
  const heightBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const height = Number(event.target.value);
    if (height >= 0 && height <= 300) {
      setStepTwoData((prev) => {
        return { ...prev, height: height };
      });
      setIsHeightValid(true);
    } else {
      setIsHeightValid(false);
    }
  };
  const weightBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const weight = Number(event.target.value);
    if (weight >= 0 && weight <= 300) {
      setStepTwoData((prev) => {
        return { ...prev, weight: weight };
      });
      setIsWeightValid(true);
    } else {
      setIsWeightValid(false);
    }
  };

  const formStepBackHandler = () => {
    props.stepBackHandle();
  };
  const enterHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      !(isGenderValid && isWeightValid && isHeightValid) ||
      event.key !== 'Enter'
    ) {
      return;
    } else {
      props.stepTwoDataHandle(stepTwoData);
    }
  };
  const submitStepTwoDataHandler = () => {
    props.stepTwoDataHandle(stepTwoData);
  };
  return (
    <div
      className={`${classes.wrapper} ${classes.form2}`}
      onKeyDown={enterHandler}
    >
      <div className={classes.nameContainer}>
        <div>이름</div>
        <div>
          <input
            type="text"
            name="name"
            defaultValue={props.formData.name}
            onChange={handleNameChange}
          />
        </div>
      </div>
      <div className={`${classes.form2InputContainer}`}>
        <div className={`${classes.genderContainer}`}>
          <div className={classes.title}>성별</div>
          <div>
            <div className={classes.genderOption}>
              <label htmlFor="male">남성</label>
              <input
                type="radio"
                name="gender"
                id="male"
                value="MALE"
                defaultChecked={props.formData.gender === 'MALE'}
                onChange={genderChange}
              />
            </div>
            <div className={classes.genderOption}>
              <label htmlFor="female">여성</label>
              <input
                type="radio"
                name="gender"
                id="female"
                value="FEMALE"
                defaultChecked={props.formData.gender === 'FEMALE'}
                onChange={genderChange}
              />
            </div>
          </div>
        </div>

        <div>
          <div className={classes.title}>생년월일</div>
          <BirthdayInput
            birthday={props.formData.birthday}
            changeBirthday={birthdayChangeHandler}
          />
        </div>
      </div>
      <div className={classes.form2InputContainer}>
        <div className={classes.numberInputs}>
          <div>
            <label htmlFor="height">키</label>
            <input
              type="number"
              name="height"
              id="height"
              min={0}
              max={300}
              defaultValue={props.formData.height}
              onBlur={heightBlur}
            />{' '}
            cm
          </div>
          <div>
            <label htmlFor="weight">몸무게</label>
            <input
              type="number"
              name="weight"
              id="weight"
              min={0}
              max={300}
              defaultValue={props.formData.weight}
              onBlur={weightBlur}
            />{' '}
            kg
          </div>
        </div>
      </div>

      <div className={classes.btnContainer}>
        <button
          type="button"
          className={classes.prevBtn}
          onClick={formStepBackHandler}
        >
          이전
        </button>
        <button
          type="button"
          className={classes.nextBtn}
          onClick={submitStepTwoDataHandler}
          disabled={!(isGenderValid && isWeightValid && isHeightValid)}
        >
          다음
        </button>
      </div>
    </div>
  );
};
export const FormContent3: React.FC<{
  formData: all.userInfo;
  stepBackHandle: () => void;
  updatePw: (password: string) => void;
}> = (props) => {
  const [password, setPassword] = useState('');
  const [pwValid, setPwValid] = useState(false);
  const [pwCheckValid, setPwCheckValid] = useState(false);
  const passwordsRef = useRef<HTMLInputElement[] | null[]>([]);
  useEffect(() => {
    if (pwValid) {
      props.updatePw(password);
    } else {
      props.updatePw('');
    }
  }, [pwValid]);

  const checkPasswordValid = (event: React.FocusEvent<HTMLInputElement>) => {
    const tmp = event.target.value;
    if (tmp.length > 0 && passwordRegExp.test(tmp)) {
      setPassword(() => tmp);
      setPwValid(true);
    } else {
      setPassword(() => '');
      setPwValid(false);
    }
    setPwCheckValid(false);
  };
  const checkPasswordConfirm = (event: React.FocusEvent<HTMLInputElement>) => {
    const pw2 = event.target.value;
    if (password.length > 0 && password === pw2) {
      setPwCheckValid(true);
    } else {
      setPwCheckValid(false);
    }
  };

  const formStepBackHandler = () => {
    props.stepBackHandle();
  };
  const enterHandler = (
    event: React.KeyboardEvent<HTMLDivElement | HTMLInputElement>
  ) => {
    if (!(event.target instanceof HTMLInputElement)) {
      return;
    }
    if (event.key === 'Enter' && !pwValid) {
      const tmp: any = event.target;

      if (tmp.dataset.idx < passwordsRef.current.length - 1) {
        passwordsRef.current[+tmp.dataset.idx + 1]!.focus();
      }
    }
    return;
  };
  return (
    <div className={classes.wrapper} onKeyDown={enterHandler}>
      <label htmlFor="password1">비밀번호</label>
      <div>
        <input
          type="password"
          className={classes.signupInput}
          id="password1"
          onChange={checkPasswordValid}
          data-idx={0}
          ref={(ele) => {
            passwordsRef.current[0] = ele;
          }}
          autoFocus
        />
        <div className={classes.pwMsg}>
          {!pwValid &&
            '비밀번호는 특수문자를 포함한 영숫자 6-16자리로 입력해 주세요'}
        </div>
      </div>
      <label htmlFor="password1">비밀번호 확인</label>
      <div>
        <input
          type="password"
          className={classes.signupInput}
          id="password2"
          data-idx={1}
          onChange={checkPasswordConfirm}
          ref={(ele) => {
            passwordsRef.current[1] = ele;
          }}
        />
        <div className={classes.pwMsg}>
          {pwValid &&
            !pwCheckValid &&
            '상기의 비밀번호와 같은 비밀번호를 입력해 주세요.'}
        </div>
      </div>
      <div className={classes.btnContainer}>
        <button
          type="button"
          className={classes.prevBtn}
          onClick={formStepBackHandler}
          tabIndex={-1}
        >
          이전
        </button>
        <button
          type="submit"
          className={classes.nextBtn}
          // onClick={sumbitStepThreeHandler}
          disabled={!pwValid || !pwCheckValid}
        >
          완료
        </button>
      </div>
    </div>
  );
};
