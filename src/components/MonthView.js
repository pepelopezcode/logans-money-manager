import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';

function MonthView({ monthNames }) {

  const [ chosenMonth, setChosenMonth ] = useState('01');

  const monthArray = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

  const {
    totalInfo
  } = useContext(AppContext)

  
  useEffect(() => {
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth() + 1; 
    setChosenMonth(currentMonth < 10 ? '0' + currentMonth : currentMonth)
  },[])

  const monthlyIncomeAdder = () => {
    const monthIncomeArray = []
    const daysInMonth =  getDaysInMonth(chosenMonth, 2024)
    for (let i = 1 ; i <= daysInMonth ; i++ ){
      const dayKey = i < 10 ? `0${i}` : `${i}`;
      
      if ( totalInfo[2024][chosenMonth] && totalInfo[2024][chosenMonth][dayKey] ){
        monthIncomeArray.push(totalInfo[2024][chosenMonth][dayKey])
      }else {
         monthIncomeArray.push({'cash': 0, 'notCash': 0});
      }
    }
    return monthIncomeArray;
  }

  const getDaysInMonth = (monthNumber, year) => {
    year = parseInt(year, 10);
    monthNumber = ("0" + monthNumber).slice(-2);
    const nextMonthDate = new Date(year, monthNumber, 1);
    const lastDayOfCurrentMonth = new Date(nextMonthDate.getTime() - 1);
    return lastDayOfCurrentMonth.getDate();
  }
 



  return (
    <div>
      <select
         onChange={e => setChosenMonth(e.target.value)}
         value={chosenMonth}
        >
          {monthArray.map(( item, index )  => {
            return <option value={item} key={index} >{monthNames[index]}</option>
          })}
        </select>
        <div>
          Day // Cash // Not Cash
        </div>
        {monthlyIncomeAdder().map((item, index) => {
          return <div key={index}>{index + 1}: ${item.cash} ${item.notCash}</div>
        })}
        
    </div>
  )
}

export default MonthView