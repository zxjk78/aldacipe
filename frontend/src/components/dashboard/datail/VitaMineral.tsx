// react core

// API

// external module

// external component
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// custom component

// css, interface(type)
import PieChart from './PieChart';
import classes from './VitaMineral.module.scss';

export default function VitaMineral(props: {}) {
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}>{`비타민`}</div>
          <div className={classes.main}>
            <PieChart />
          </div>
          <div className={classes.footer}>
            자세히 보기
            <ChevronRightIcon />
          </div>
        </div>
      </div>
    </>
  );
}
