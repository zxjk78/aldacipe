import React, { FormEvent, useState } from 'react';

import {
  FormContent1,
  FormContent2,
  FormContent3,
} from '../components/signup/Forms';
import * as all from '../components/signup/config';
import { SignUpStepper } from '../components/signup/SignUpComponents';

// css
import classes from './SignupPage.module.scss';

const SignupPage: React.FC<{}> = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [signUpInfo, setSignUpInfo] = useState<all.userInfo>({
    email: '',
    password: '',
    birthday: '',
    weight: 0,
    height: 0,
    gender: '',
  });

  const handleRegister = (formValue: any) => {
    const { email, password } = formValue;
    const data = {
      email,
      password,
    };
  };

  const addOneData = (data: all.form1Data) => {
    setSignUpInfo((prevState) => {
      return { ...prevState, email: data.email };
    });
    setCurrentStep(() => currentStep + 1);
  };
  const addTwoData = (data: all.form2Data) => {
    setSignUpInfo((prevState) => {
      return {
        ...prevState,
        birthday: data.birthday,
        gender: data.gender,
        height: data.height,
        weight: data.weight,
      };
    });
    setCurrentStep(() => currentStep + 1);
  };
  const submitFormData = (data: all.form3Data) => {
    setSignUpInfo((prevState) => {
      return { ...prevState, email: data.password };
    });
    // api 서버에 signUpInfo 제출 (asyncThunk or 그냥)
  };
  const stepBack = () => {
    if (currentStep > 0) {
      setCurrentStep(() => currentStep - 1);
    }
  };
  const stepForms = [
    <FormContent1 formData={signUpInfo} stepOneDataHandle={addOneData} />,
    <FormContent2
      formData={signUpInfo}
      stepTwoDataHandle={addTwoData}
      stepBackHandle={stepBack}
    />,
    <FormContent3
      formData={signUpInfo}
      stepThreeDataHandle={submitFormData}
      stepBackHandle={stepBack}
    />,
  ];

  return (
    <>
      <div className={classes.background}>
        <div className={classes.wrapper}>
          <div className={classes.signupHeader}>
            <div>회원가입</div>
            <div>
              이미 가입하셨나요? <span>로그인</span>
            </div>
          </div>
          <SignUpStepper cur={currentStep} />
          <form className={classes.signupForm}>
            <>{stepForms[currentStep]}</>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
