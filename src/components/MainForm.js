import React, { useState } from 'react'

function MainForm() {

  const [ moneyAmount, setMoneyAmount ] = useState(0);
  const [ monthYear, setMonthYear ] = useState('');
  const [ weekNumber, setWeekNumber ] = useState(1);
  const [ typeOfMoney, setTypeOfMoney ] = useState('cash');
  const [ totalInfo, setTotalInfo ] = useState({'2024': {}})


  const handleSubmit = (e) => {
    e.preventDefault();
    let tempInfo = totalInfo
    const month = monthYear.substring(5,7)
    const year = monthYear.substring(0, 4)
    const day = monthYear.substring(8)

    if (!(year in tempInfo)) {
      tempInfo[year] = {};
    }
    
    if (!(month in tempInfo[year])) {
      tempInfo[year][month] = {};
    }

    if (!(day in tempInfo[year][month])) {
      tempInfo[year][month][day] = {
        'cash': 0,
        'notCash': 0
      }
    }

    tempInfo[year][month][day][typeOfMoney] += parseFloat(moneyAmount) ;
    setTotalInfo(tempInfo)
    
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='number'
          min='0'
          onChange={e => setMoneyAmount(e.target.value)}
        />
        <input
          type='date'
          onChange={e => setMonthYear(e.target.value)}
        />
        <select
          onChange={e => setWeekNumber(e.target.value)}
        >
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
          <option value='6'>6</option>
        </select>
        <select
          onChange={e => setTypeOfMoney(e.target.value)}
        >
          <option value='cash'>cash</option>
          <option value='notCash'>not cash</option>
        </select>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default MainForm