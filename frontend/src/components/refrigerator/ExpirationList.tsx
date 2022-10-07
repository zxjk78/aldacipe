import React, { useEffect, useState } from 'react';
import { ingredient } from './interface';

import classes from './ExpirationList.module.scss';
import { useEventCallback } from '@mui/material';

export default function ExpirationList(props: {
  item: any;
}) {


  return (
    <div className={classes.wrapper}>
      <div>
        {props.item.name}
      </div>
      {/* {props.item.largeCategory} */}
      <div>
        {/* Dday- */}
        {props.item.Dday}
      </div>
    </div>
  );
}
