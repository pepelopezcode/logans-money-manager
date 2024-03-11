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
  <button onClick={() => setShowMonth(true)} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded mr-2">Month</button>
  <button onClick={() => setShowMonth(false)} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded mr-2">Year</button>
  <button onClick={() => navigate('/')} className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-4 rounded">Back</button>
  {showMonth ? <MonthView monthNames={monthNames} /> : <YearView monthNames={monthNames} />}
</div>
  )
}

export default MoneyTrackerView