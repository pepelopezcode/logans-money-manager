import React, { useContext } from 'react';
import { AppContext } from '../App';

function YearView() {

  const {
    totalInfo
  } = useContext(AppContext);

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const monthlyIncomeAdder = () => {
    const monthIncomeArray = []
    for (let i = 1 ; i < 13 ; i++ ){
      let moneySum = 0;
      const monthKey = i < 10 ? `0${i}` : `${i}`;
      if ( monthKey in totalInfo[2024] ){
        for (let key in totalInfo[2024][monthKey]) {
          const moneyPerDayObj = totalInfo[2024][monthKey][key];
          moneySum += (moneyPerDayObj.cash + moneyPerDayObj.notCash);
        }
      }
      monthIncomeArray.push(moneySum);
    }
    return monthIncomeArray;
  }
  
  
  const yearlyIncomeAdder = () => {
    let yearlyIncome = 0;
    for (let i = 0 ; i < monthlyIncomeAdder().length ; i++){
      yearlyIncome += monthlyIncomeAdder()[i];
    }
    return yearlyIncome
  }

  
  

  return (
    <div>YearView
      <div>
        Year to date: ${yearlyIncomeAdder()}
      </div>
      <div>
        {monthlyIncomeAdder().map((item, index) => {
        return <div key={index} >{monthNames[index]}: ${item}</div>
      })}
      </div>
      
    </div>
  )
}

export default YearView