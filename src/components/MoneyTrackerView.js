import React, { useState } from 'react'
import MonthView from './MonthView'
import YearView from './YearView'
import { useNavigate } from 'react-router-dom';

function MoneyTrackerView() {
  const navigate = useNavigate();

  const [ showMonth, setShowMonth ] = useState(true)

  

  return (
    <div>
      <button onClick={() => setShowMonth(true)} >Month</button>
      <button onClick={() => setShowMonth(false)} >Year</button>
      <button onClick={() => navigate('/')} >Back</button>
      {showMonth ? <MonthView /> : <YearView />}
    </div>
  )
}

export default MoneyTrackerView