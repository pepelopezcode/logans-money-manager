import { Route, Routes } from "react-router-dom";
import MainForm from "./components/MainForm";
import { useState, createContext } from "react";
import MoneyTrackerView from "./components/MoneyTrackerView";


export const AppContext = createContext();

function App() {


  const [ moneyAmount, setMoneyAmount ] = useState(0);
  const [ monthYear, setMonthYear ] = useState('');
  const [ typeOfMoney, setTypeOfMoney ] = useState('cash');
  const [ totalInfo, setTotalInfo ] = useState({'2024': {}});


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
        'zelle': 0,
        'color': 0
      }
    }

    tempInfo[year][month][day][typeOfMoney] = parseFloat(moneyAmount);
    setTotalInfo(tempInfo)
    
  }


  return (
    <div>
      <AppContext.Provider 
        value={{
          totalInfo,
          setTotalInfo,
          monthYear,
          setMonthYear,
          moneyAmount,
          setMoneyAmount,
          typeOfMoney,
          setTypeOfMoney,
          handleSubmit
        }}
      >
        <Routes>
          <Route exact path='/' element={<MainForm />} />
          <Route exact path='/money-view' element={<MoneyTrackerView />} />
        </Routes>
      </AppContext.Provider>
      
      
    </div>
  );
}

export default App;
