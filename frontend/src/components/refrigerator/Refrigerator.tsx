import React, { useEffect, useState } from 'react';
import potImg from '../../assets/pot.png'
import RefrigeratorList from './RefrigeratorList';

import classes from './Refrigerator.module.scss';
import { getRefrigerator } from '../../api/myrefrigerator';
export default function Refrigerator(props: {}) {
  const [refrigeList, setRefrigeList] = useState([])

  useEffect(() => {
    (async () => {
      const data = await getRefrigerator();
      setRefrigeList(data)
    })();
  }, [])

  
  return (
    <>
      <div className={classes.container}>
        <img src={potImg} alt="potImg" />
        <RefrigeratorList listItems={refrigeList}/>
      </div>
    </>
  );
}
