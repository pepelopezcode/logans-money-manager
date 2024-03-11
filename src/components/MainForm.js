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
  <form onSubmit={handleSubmit} className="flex items-center">
    <span className="mr-2">$</span>
    <input
      type='number'
      min='0'
      onChange={e => setMoneyAmount(e.target.value)}
      className="border rounded py-1 px-2 mr-2"
    />
    <input
      type='date'
      onChange={e => setMonthYear(e.target.value)}
      className="border rounded py-1 px-2 mr-2"
    />
    <select
      onChange={e => setTypeOfMoney(e.target.value)}
      className="border rounded py-1 px-2 mr-2"
    >
      <option value='cash'>Cash</option>
      <option value='zelle'>Zelle</option>
      <option value='color'>Color</option>
    </select>
    <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mr-2">Submit</button>
  </form>
  <button onClick={() => navigate('/money-view')} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded">View</button>
</div>
  )
}

export default MainForm