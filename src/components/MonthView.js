import React, { useContext, useState } from 'react';
import { AppContext } from '../App';

function MonthView({ monthNames }) {

  const currentDate = new Date();
  let currentMonth = currentDate.getMonth() + 1;
  const [ chosenMonth, setChosenMonth ] = useState((currentMonth < 10 ? '0' + currentMonth : currentMonth));

  const monthArray = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
  const weekArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const {
    totalInfo
  } = useContext(AppContext)

  
  

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
         moneyPerDayArray.push({'cash': 0, 'zelle': 0, 'color': 0, dayOfWeek});
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

  const weekCashTotalFinder = (week) => {
    let weekTotal = 0;
    for (let i = 0 ; i < week.length ; i++){
      if (week[i]){
        weekTotal += (week[i].cash + week[i].color)
      } 
    }
    return weekTotal
  }

  const weekZelleTotalFinder = (week) => {
    let weekTotal = 0;
    for (let i = 0 ; i < week.length ; i++){
      if (week[i]){
        weekTotal += (week[i].zelle)
      } 
    }
    return weekTotal
  }

  const monthHtml = () => {
    const weekElements = [];
      for (let i = 0; i < 6; i++) {
        if (i > 0 && !(weekSeparator()[i][0])){
          continue;
        }else {
        const weekJSX = weekSeparator()[i].map((item, index) => {
          return item ? 
          (<div key={index} className='flex' >
            <p className='w-28 border border-black' >{weekArray[item.dayOfWeek]} {item.dayOfMonth}:</p>
            <p className='w-28 border border-black '>${item.cash}</p> 
            <p className='w-28 border border-black '>${item.zelle}</p> 
            <p className='w-28 border border-black '>${item.color}</p>
          </div> ):  
          (<div key={index} className='flex'>
            <p className='w-28 border border-black bg-slate-600 text-slate-600 ' >1</p>
            <p className='w-28 border border-black bg-slate-600 text-slate-600 ' >1</p>
            <p className='w-28 border border-black bg-slate-600 text-slate-600 ' >1</p>
            <p className='w-28 border border-black bg-slate-600 text-slate-600 ' >1</p>
          </div>)
        })
        const cashTotal = weekCashTotalFinder(weekSeparator()[i]);
        const zelleTotal = weekZelleTotalFinder(weekSeparator()[i]);
        weekElements.push(
        <div key={i} >
            {weekJSX}
            <div className='flex'>
              <p className='w-28 border border-black ' >Week {i + 1} Totals:</p>
              <p className='w-28 border border-black ' >Cash + Color</p>
              <p className='w-28 border border-black ' >Zelle</p>
            </div>
            <div className='flex '>
              <p className='w-28 border border-black '></p>
              <p p className='w-28 border border-black '> ${cashTotal}</p>
              <p p className='w-28 border border-black '> ${zelleTotal}</p> 
            </div>
            <div>=========================================</div>
        </div>)
        }
        
      }
      return weekElements
  }

 

  return (
    <div className='ml-4' >
      <select
         onChange={e => setChosenMonth(e.target.value)}
         value={chosenMonth}
         className="border rounded py-1 px-2 my-2"
        >
          {monthArray.map(( item, index )  => {
            return <option value={item} key={index} >{monthNames[index]}</option>
          })}
        </select>
        <div className='flex mb-4'>
          <p className='w-28 border border-black'>Day</p>
          <p className='w-28 border border-black'>Cash</p>
          <p className='w-28 border border-black'>Zelle</p>
          <p className='w-28 border border-black'>Color</p>
        </div>
        {monthHtml()}  
    </div>
  )
}
export default MonthView