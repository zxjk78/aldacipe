// external component
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// api
import { createIntakeInDetail } from '../../../api/detail';
// custom component
import CuisineStep from './CuisineStep';
import { useOutletContext } from 'react-router-dom';

// css
import classes from './CuisineContainer.module.scss';
import { Manual, RecipeDetail } from '../../../util/interface';
import styled from '@emotion/styled';

const CustomButton = styled(Button)`
  background-color: #2fbca0;
  width: 20%;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  &:hover {
    background-color: #058181;
  }
`;

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    padding: '8px 16px',
    maxWidth: 400,
  },
});
// 부모 detailPage
const CuisineContainer = (props: {}) => {
  const parentData: RecipeDetail = useOutletContext();
  const recipeMenual: Manual[] = parentData?.manualList;
  const recipeId = parentData?.recipe.id;
  const successToastr = (message: string) =>
    toast.success(<div className={classes.errorMsg}>{message}</div>);
  const completeCooking = async () => {
    //API로 recipeId 보내서 냉장고 재료 소비
    const success = await createIntakeInDetail(recipeId);
    if (success) {
      successToastr('섭취한 음식을 기록하였습니다.');
    }
  };

  return (
    <>
      {recipeMenual && (
        <div className={classes.wrapper}>
          <ToastContainer autoClose={2000} closeOnClick />

          {/* <div className={classes.header}>조리방법</div> */}
          <div className={classes.main}>
            {recipeMenual.map((step) => (
              <CuisineStep key={step.order} step={step} />
            ))}
          </div>
          <div className={classes.footer}>
            <CustomWidthTooltip title="1인분 만큼의 냉장고 재료를 차감합니다.">
              <CustomButton variant="contained" onClick={completeCooking}>
                요리 완료
              </CustomButton>
            </CustomWidthTooltip>
          </div>
        </div>
      )}
    </>
  );
};

export default CuisineContainer;
