import React from 'react';
import potImg from '../../assets/pot.png'
import RefrigeratorList from './RefrigeratorList';

import classes from './Refrigerator.module.scss';
export default function Refrigerator(props: {}) {

  return (
    <>
      <div className={classes.container}>
        <img src={potImg} alt="potImg" />
        <RefrigeratorList />
      </div>
    </>
  );
}
