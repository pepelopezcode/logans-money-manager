import React, { useContext } from 'react'
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';

function MainForm() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    setMoneyAmount,
    setMonthYear,
    setTypeOfMoney
  } = useContext(AppContext)

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <span>$</span>
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
          onChange={e => setTypeOfMoney(e.target.value)}
        >
          <option value='cash'>cash</option>
          <option value='notCash'>not cash</option>
        </select>
        <button type='submit'>Submit</button>
      </form>
      <button onClick={() => navigate('/money-view')} >View</button>
    </div>
  )
}

export default MainForm