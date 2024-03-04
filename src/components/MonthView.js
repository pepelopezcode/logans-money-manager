import React, { useContext } from 'react';
import { AppContext } from '../App';

function MonthView() {

  const {
    totalInfo
  } = useContext(AppContext)

  

  return (
    <div>MonthView</div>
  )
}

export default MonthView