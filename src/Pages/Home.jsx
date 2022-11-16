import {React, useEffect, useState} from 'react'
import '../App.css'


function Home() {
  //Data State Variables
  const [jobsData, setJobsData] = useState(null);
  const [costsData, setCostsData] = useState(null);

  //Income State Variables
  const [yearlyIncome, setYearlyIncome] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [weeklyIncome, setWeeklyIncome] = useState(0);
  const [grossYearlyIncome, setGrossYearlyIncome] = useState(0);
  const [grossMonthlyIncome, setGrossMonthlyIncome] = useState(0);
  const [grossWeeklyIncome, setGrossWeeklyIncome] = useState(0);

  //Spending State Variables
  const [shelterSpending, setShelterSpending ] = useState(0);
  const [billsSpending, setBillsSpending ] = useState(0);
  const [investSpending, setInvestSpending ] = useState(0);
  const [consumptionSpending, setConsumptionSpending ] = useState(0);

  //Spending Target State Variables
  const [monthlyTarget, setMonthlyTarget] = useState(0);

  const getIncome = (data) => {
    let yearlyIncome = 0;
    let monthlyIncome = 0;
    let weeklyIncome = 0; 
    let grossYearlyIncome = 0;
    let grossMonthlyIncome = 0;
    let grossWeeklyIncome = 0; 
    for(let i = 0; i < data.length; i++){
      let tempIncome = 0;
      let job = data[i];
      let hours = parseFloat(job["hours"]);
      let rate = parseFloat(job["income"]);
      let taxRate = parseFloat(job["taxRate"]);
      tempIncome = (hours * rate);
      weeklyIncome += tempIncome
      monthlyIncome += (tempIncome * 52)/12;
      yearlyIncome += tempIncome * 52
      grossWeeklyIncome += tempIncome - (tempIncome * taxRate);
      grossMonthlyIncome += (tempIncome * 52)/12 - ((tempIncome * 52)/12 * taxRate);
      grossYearlyIncome += (tempIncome * 52) - (tempIncome * 52 * taxRate);
    }
    //set income
    setYearlyIncome(yearlyIncome.toFixed(2));
    setMonthlyIncome(monthlyIncome.toFixed(2));
    setWeeklyIncome(weeklyIncome.toFixed(2));
    //set gross income
    setGrossYearlyIncome(grossYearlyIncome.toFixed(2));
    setGrossMonthlyIncome(grossMonthlyIncome.toFixed(2));
    setGrossWeeklyIncome(grossWeeklyIncome.toFixed(2));
    //set target spending
    setMonthlyTarget((monthlyIncome/4).toFixed(2));
  };

  useEffect(() =>{
    fetch("http://localhost:3001/jobs")
    .then(response => response.json())
    .then(data => {
          setJobsData(data);
          getIncome(data);
          console.log(data)})
    .then(fetch("http://localhost:3001/costs")
    .then(response => response.json())
    .then(data => {
          setCostsData(data);
          console.log(data)}));
          }, []);
    
  useEffect(() =>{
    if(costsData != null){
      let shelter = 0;
      let bills = 0;
      let invest = 0;
      let consumption = 0;
      costsData.forEach(cost => {
      let temp = parseFloat(cost["amount"]);
      if(cost["costType"] === "shelter") shelter += temp;
      else if(cost["costType"] === "bills")bills += temp;
      else if(cost["costType"] === "invest")invest += temp;
      else if(cost["costType"] === "consumption")consumption += temp;
      })
      setShelterSpending(shelter);
      setBillsSpending(bills);
      setInvestSpending(invest);
      setConsumptionSpending(consumption);
    }
  }, [costsData])

  return (
    <div>
      {(jobsData === null) ? 
        <p>loading...</p> : 
        <>
        <h2>Before Tax Income:</h2>
        <h5>Yearly {"$" + yearlyIncome}</h5>
        <h5>Monthly (average) {"$" + monthlyIncome}</h5>
        <h5>Weekly {"$" + weeklyIncome}</h5>
        <h2>After Tax Income:</h2>
        <h5>Yearly {"$" + grossYearlyIncome}</h5>
        <h5>Monthly (average) {"$" + grossMonthlyIncome}</h5>
        <h5>Weekly {"$" + grossWeeklyIncome}</h5>
        <h2>Spending This Month</h2>
        <table className='border'>
          <tbody>
            <tr className='border'>
              <th></th>
              <th>Current Total Amount</th>
              <th>Target Amount</th>
            </tr>
            <tr>
              <th>Shelter</th>
              <th>{shelterSpending}</th>
              <th>{monthlyTarget}</th>
            </tr>
            <tr>
              <th>Bills</th>
              <th>{billsSpending}</th>
              <th>{monthlyTarget}</th>
            </tr>
            <tr>
              <th>Invest</th>
              <th>{investSpending}</th>
              <th>{monthlyTarget}</th>
            </tr>
            <tr>
              <th>Consumption</th>
              <th>{consumptionSpending}</th>
              <th>{monthlyTarget}</th>
            </tr>
            <tr className='border'>
              <th>Total</th>
              <th>{shelterSpending + billsSpending + investSpending + consumptionSpending}</th>
              <th>{grossMonthlyIncome}</th>
            </tr>
          </tbody>
        </table>
        </>
      }
    </div>
  )
}

export default Home