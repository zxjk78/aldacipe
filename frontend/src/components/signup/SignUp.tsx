import React, { FormEvent, useState } from 'react';

import classes from './SignUp.module.scss';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = ['이메일 입력', '상세정보 입력', '비밀번호 입력'];
type userInfo = {
  email: string;
  password: string;
  weight: number;
  height: number;
  gender: string;
};

const SignUpStepper: React.FC<{ cur: number }> = (props) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={props.cur} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

const SignUp: React.FC<{}> = (props) => {
  const [currentStep, setCurrentStep] = useState(0);

  const [signUpInfo, setSignUpInfo] = useState<userInfo>({
    email: '',
    password: '',
    weight: 0,
    height: 0,
    gender: '',
  });

  const submitHandler = (event: FormEvent) => {};

  return (
    <>
      <div className={classes.backdrop}>
        <div className={classes.wrapper}>
          <div className={classes.signupHeader}>
            <div>회원가입</div>
            <div>
              이미 가입하셨나요? <span>로그인</span>
            </div>
          </div>
          <SignUpStepper cur={currentStep} />
        </div>
      </div>
    </>
  );
};

export default SignUp;
