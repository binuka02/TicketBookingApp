import React from 'react'
import Under from '../../assets/img/undercon.png';
import classes from './underconstruction.module.css';

function UnderConstruction() {
  return (
    <div className={classes.under_container}>
    <img className={classes.under_image} src={Under}  />
  </div>
  )
}

export default UnderConstruction