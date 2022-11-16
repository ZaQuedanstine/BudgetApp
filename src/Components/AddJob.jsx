import React from 'react';
import { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';

function AddJob() {
    const [jobName, setJobName] = useState('');
    const [income, setIncome] = useState('');
    const [incomeType, setincomeType] = useState("hourly");
    const [hours, sethours] = useState(0);
    const [taxRate, setTaxRate] = useState(0);

    const handleSubmit = (e) =>{
      //e.preventDefault();
      let job = {jobName, income, incomeType, hours, taxRate}
      fetch("http://localhost:3001/jobs", {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(job)
    })
      .then((res) => {
        console.log(res.data);
      })
    }
  return (
    <div>
      <h1>Add New Job</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setJobName(e.target.value)}
          required/>
          <label>$</label>
        <CurrencyInput
            placeholder="Pay Rate"
            onChange={(e) => setIncome(e.target.value)}
            required/>
        <select value={incomeType} onChange={(e) => setincomeType(e.target.value)}>
            <option value="hourly">Hourly</option>
            <option value="salary">Salary</option>    
        </select>
        {incomeType === "hourly" ? 
        <input
          type="number"
          placeholder="hours per week"
          onChange={(e) => sethours(e.target.value)}
          required/> : ""}
        <input
          type="number"
          step="0.01"
          max="1"
          min="0"
          placeholder="tax rate"
          onChange={(e) => setTaxRate(e.target.value)}
          required/>
        <button>Add</button>  
      </form>
    </div>
  )
}

export default AddJob