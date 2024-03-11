import React, { useContext } from 'react';
import { AppContext } from '../App';

function YearView({ monthNames }) {

  const {
    totalInfo
  } = useContext(AppContext);



  const monthlyCashIncomeAdder = () => {
    const monthIncomeArray = []
    for (let i = 1 ; i < 13 ; i++ ){
      let moneySum = 0;
      const monthKey = i < 10 ? `0${i}` : `${i}`;
      if ( monthKey in totalInfo[2024] ){
        for (let key in totalInfo[2024][monthKey]) {
          const moneyPerDayObj = totalInfo[2024][monthKey][key];
          moneySum += (moneyPerDayObj.cash + moneyPerDayObj.color);
        }
      }
      monthIncomeArray.push(moneySum);
    }
    return monthIncomeArray;
  }

  const monthlyZelleIncomeAdder = () => {
    const monthIncomeArray = []
    for (let i = 1 ; i < 13 ; i++ ){
      let moneySum = 0;
      const monthKey = i < 10 ? `0${i}` : `${i}`;
      if ( monthKey in totalInfo[2024] ){
        for (let key in totalInfo[2024][monthKey]) {
          const moneyPerDayObj = totalInfo[2024][monthKey][key];
          moneySum += moneyPerDayObj.zelle;
        }
      }
      monthIncomeArray.push(moneySum);
    }
    return monthIncomeArray;
  }
  
  
  const yearlyCashIncomeAdder = (monthArray) => {
    let yearlyIncome = 0;
    for (let i = 0 ; i <monthArray.length ; i++){
      yearlyIncome += monthArray[i];
    }
    return yearlyIncome
  }

  
  

  return (
    <div className='mt-6 ml-4'>
      <div className='flex'>
        <p className='w-28 border border-black'> Year to date: </p>
        <p className='w-28 border border-black'> Cash + Color </p>
        <p className='w-28 border border-black'>Zelle</p>
      </div>
      <div className='flex'>
        <p className='w-28 border border-black'>  </p>
        <p className='w-28 border border-black'>${yearlyCashIncomeAdder((monthlyCashIncomeAdder()))}</p>
        <p className='w-28 border border-black'>${yearlyCashIncomeAdder((monthlyZelleIncomeAdder()))}</p>
      </div>
      <div>===============================</div>
      <div>
      <div className='flex'>
        <p className='w-28 border border-black'> Month </p>
        <p className='w-28 border border-black'> Cash + Color </p>
        <p className='w-28 border border-black'>Zelle</p>
      </div>
        {monthlyCashIncomeAdder().map((item, index) => {
        return <div key={index} className='flex' >
                <p className='w-28 border border-black'>{monthNames[index]}:</p>
                <p className='w-28 border border-black'>${item}</p>
                <p className='w-28 border border-black'>${monthlyZelleIncomeAdder()[index]}</p> 
              </div>
      })}
      </div>
    </div>
  )
}
export default YearView