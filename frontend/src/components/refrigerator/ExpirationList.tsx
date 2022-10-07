import React, { useEffect, useState } from 'react';
import { ingredient } from './interface';
import ExpirationListItem from './ExpirationListItem';

import classes from './ExpirationList.module.scss';

export default function ExpirationList(props: { itemList: any[] }) {
  // console.log('유통기한 임박', props.item);

  return (
    <div className={classes.wrapper}>
      {props.itemList.map((item) => (
        <ExpirationListItem key={item.id} ingredient={item} />
      ))}
    </div>
  );
}
