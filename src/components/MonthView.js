import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';

function MonthView({ monthNames }) {

  const [ chosenMonth, setChosenMonth ] = useState('01');

  const monthArray = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
  const weekArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const {
    totalInfo
  } = useContext(AppContext)

  
  useEffect(() => {
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth() + 1; 
    setChosenMonth(currentMonth < 10 ? '0' + currentMonth : currentMonth)
  },[])

  const incomeForMonth = () => {
    const moneyPerDayArray = []
    const daysInMonth =  getDaysInMonth(chosenMonth, 2024)
    for (let i = 1 ; i <= daysInMonth ; i++ ){
      const dayKey = i < 10 ? `0${i}` : `${i}`;
      const currentDate = new Date(2024, parseInt(chosenMonth) - 1, i);
      const dayOfWeek = currentDate.getDay();
      if ( totalInfo[2024][chosenMonth] && totalInfo[2024][chosenMonth][dayKey] ){
        totalInfo[2024][chosenMonth][dayKey].dayOfWeek = dayOfWeek;
        moneyPerDayArray.push(totalInfo[2024][chosenMonth][dayKey])
      }else {
         moneyPerDayArray.push({'cash': 0, 'notCash': 0, dayOfWeek});
      }
    }

    
    return moneyPerDayArray;
  }

  const getDaysInMonth = (monthNumber, year) => {
    year = parseInt(year, 10);
    monthNumber = ("0" + monthNumber).slice(-2);
    const nextMonthDate = new Date(year, monthNumber, 1);
    const lastDayOfCurrentMonth = new Date(nextMonthDate.getTime() - 1);
    return lastDayOfCurrentMonth.getDate();
  }

  const weekSeparator = () => {
    const monthInfo = incomeForMonth();
    const separatedWeek = Array.from({ length: 6 }, () => new Array(7));
    const sixWeekMonthArray = Array.from({ length: 42 });
    let dayIndex = 0;
    for (let i = monthInfo[0].dayOfWeek ; i < sixWeekMonthArray.length ; i++){
      if (dayIndex < monthInfo.length){
        monthInfo[dayIndex].dayOfMonth = dayIndex + 1
      }
      sixWeekMonthArray[i] = monthInfo[dayIndex]
      dayIndex++
    }
    for (let i = 0; i < separatedWeek.length; i++) {
      separatedWeek[i] = sixWeekMonthArray.slice(i * 7, (i + 1) * 7);
    }
    return separatedWeek
  }

  const weekTotalFinder = (week) => {
    let weekTotal = 0;
    for (let i = 0 ; i < week.length ; i++){
      if (week[i]){
        weekTotal += (week[i].cash + week[i].notCash)
      } 
    }
    return weekTotal
  }

  const monthHtml = () => {
    const weekElements = [];
      for (let i = 0; i < 6; i++) {
        const weekJSX = weekSeparator()[i].map((item, index) => {
          return item ? <div key={index}>{weekArray[item.dayOfWeek]} {item.dayOfMonth}: ${item.cash} ${item.notCash}</div> :  <div key={index}>//////////////////</div>
        })
        const weekTotal = weekTotalFinder(weekSeparator()[i]);
        weekElements.push(
        <div key={i}>
            {weekJSX}
            <div>Week {i + 1} Total: ${weekTotal}</div>
            <div>==========================</div>
        </div>
      )}
      return weekElements
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
        {monthHtml()}  
    </div>
  )
}
export default MonthView