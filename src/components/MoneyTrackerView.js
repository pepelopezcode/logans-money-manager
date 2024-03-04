import React, { useState } from 'react'
import MonthView from './MonthView'
import YearView from './YearView'
import { useNavigate } from 'react-router-dom';

function MoneyTrackerView() {
  const navigate = useNavigate();

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const [ showMonth, setShowMonth ] = useState(true)

  

  return (
    <div>
      <button onClick={() => setShowMonth(true)} >Month</button>
      <button onClick={() => setShowMonth(false)} >Year</button>
      <button onClick={() => navigate('/')} >Back</button>
      {showMonth ? <MonthView monthNames={monthNames} /> : <YearView monthNames={monthNames} />}
    </div>
  )
}

export default MoneyTrackerView