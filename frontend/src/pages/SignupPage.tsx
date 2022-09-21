import React, { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  FormContent1,
  FormContent2,
  FormContent3,
} from '../components/signup/Forms';
import { SignUpStepper } from '../components/signup/SignUpComponents';
// api
import { signup } from '../api/signup';
// css
import classes from './SignupPage.module.scss';
// etc
import * as all from '../components/signup/config';

const SignupPage: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [signUpInfo, setSignUpInfo] = useState<all.userInfo>({
    email: '',
    password: '',
    birthday: '',
    weight: 0,
    height: 0,
    gender: '',
  });

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
  const form3PwChangeHandler = (password: string) => {
    setSignUpInfo((prevState) => {
      return { ...prevState, password: password };
    });
  };
  const submitFormData = async (event: FormEvent) => {
    event.preventDefault();
    const done = await signup(signUpInfo);

    if (done) {
      navigate('/login', { replace: true });
    }
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
      stepBackHandle={stepBack}
      updatePw={form3PwChangeHandler}
    />,
  ];

  return (
    <>
      <div className={classes.background}>
        <div className={classes.wrapper}>
          <div className={classes.signupHeader}>
            <div>회원가입</div>
            <div>
              이미 가입하셨나요?{` `}
              <Link to="/login">
                <span>로그인</span>
              </Link>
            </div>
          </div>
          <SignUpStepper cur={currentStep} />
          <form className={classes.signupForm} onSubmit={submitFormData}>
            <>{stepForms[currentStep]}</>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
