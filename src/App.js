import { Route, Routes } from "react-router-dom";
import MainForm from "./components/MainForm";
import { useState, createContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import MoneyTrackerView from "./components/MoneyTrackerView";
import ErrorPage from "./components/ErrorPage";


export const AppContext = createContext();

function App() {

  const navigate = useNavigate();

  const [ moneyAmount, setMoneyAmount ] = useState(0);
  const [ monthYear, setMonthYear ] = useState('');
  const [ typeOfMoney, setTypeOfMoney ] = useState('cash');
  const [ totalInfo, setTotalInfo ] = useState({'2024': {}});
  const [ fetchedData, setFetchedData ] = useState([])

  useEffect(()=>{
    fetchTotalInfoData();
    // eslint-disable-next-line
  },[])

  const fetchTotalInfoData = async () => {
    try {
      const response = await fetch('https://zwt3xv2mbs.us-west-2.awsapprunner.com/totalinfo');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      navigate('/');
      const data = await response.json();
      setFetchedData(data)
      if (data.length !== 0){
        const convertedData = schemaToObjectConverter(data)
        setTotalInfo(convertedData) 
      }      
    } catch(error){
      navigate('/error')
      console.error('Error:', error);
    }
  }


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
    if (fetchedData.length === 0){
      firstTimeAddingToDb(tempInfo)
    } else{
      updateTheDb(tempInfo)
    }
  }
  
  
  const firstTimeAddingToDb = async (firstData) => {
    try {
      const response = await fetch('https://zwt3xv2mbs.us-west-2.awsapprunner.com/totalinfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objectToSchemaConverter(firstData)),
        });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateTheDb = async (newData) => {
    const totalInfoId = fetchedData[0]._id
    try {
      const response = await fetch(`https://zwt3xv2mbs.us-west-2.awsapprunner.com/${totalInfoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objectToSchemaConverter(newData)),
      });
      if (!response.ok){
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Success:', data);
    }catch (error) {
      console.error('Error:', error);
    }
  };
  
  const objectToSchemaConverter = (obj) => {
    const convertedObj = {
        years: {}
    };
    for (const year in obj) {
      if (obj.hasOwnProperty(year)) {
        convertedObj.years[year] = {
          months: {}
        };
        for (const month in obj[year]) {
          if (obj[year].hasOwnProperty(month)) {
            convertedObj.years[year].months[month] = {
              days: {}
              };
            for (const day in obj[year][month]) {
              if (obj[year][month].hasOwnProperty(day)) {
                convertedObj.years[year].months[month].days[day] = {
                  cash: obj[year][month][day].cash,
                  zelle: obj[year][month][day].zelle,
                  color: obj[year][month][day].color
                };
    }}}}}}

    return convertedObj;
  }


  const schemaToObjectConverter = (obj) => {
    const onlyObjInArray = obj[0]
    const newObj = {};
    for (const year in onlyObjInArray.years) {
      if (onlyObjInArray.years.hasOwnProperty(year)) {
        newObj[year] = {};
        for (const month in onlyObjInArray.years[year].months) {
          if (onlyObjInArray.years[year].months.hasOwnProperty(month)) {
            newObj[year][month] = {};
            for (const day in onlyObjInArray.years[year].months[month].days) {
              if (onlyObjInArray.years[year].months[month].days.hasOwnProperty(day)) {
                newObj[year][month][day] = {
                  cash: onlyObjInArray.years[year].months[month].days[day].cash,
                  zelle: onlyObjInArray.years[year].months[month].days[day].zelle,
                  color: onlyObjInArray.years[year].months[month].days[day].color
              };
    }}}}}}
    return newObj;
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
          <Route exact path='/error' element={<ErrorPage />} />
        </Routes>
      </AppContext.Provider>
      
      
    </div>
  );
}

export default App;
