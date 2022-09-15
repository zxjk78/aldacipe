// mui
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import styled from '@emotion/styled';

export const SignUpStepper: React.FC<{ cur: number }> = (props) => {
  const steps = ['이메일 입력', '상세정보 입력', '비밀번호 입력'];
  const MyStep = styled(Step)`
    & .MuiStepLabel-root .Mui-completed {
      color: #058181;
    }
    & .MuiStepLabel-root .Mui-active {
      color: #2fbba0;
    }
  `;

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
