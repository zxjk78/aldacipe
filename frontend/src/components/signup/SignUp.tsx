import React, { FormEvent, useState } from 'react';

import classes from './SignUp.module.scss';
// mui
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import styled from '@emotion/styled';
import { FormContent1, FormContent2, FormContent3 } from './Forms';

import * as all from './config';

const steps = ['이메일 입력', '상세정보 입력', '비밀번호 입력'];

const MyStep = styled(Step)`
  & .MuiStepLabel-root .Mui-completed {
    color: #058181;
  }
  & .MuiStepLabel-root .Mui-active {
    color: #2fbba0;
  }
`;

const SignUpStepper: React.FC<{ cur: number }> = (props) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={props.cur} alternativeLabel>
        {steps.map((label) => (
          <MyStep key={label}>
            <StepLabel>{label}</StepLabel>
          </MyStep>
        ))}
      </Stepper>
    </Box>
  );
};

const SignUp: React.FC<{}> = (props) => {
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

export default SignUp;
