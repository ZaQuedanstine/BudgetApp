import React, {useState} from 'react'
import CurrencyInput from 'react-currency-input-field'
import { update } from '../Utils/Function'

function UpdateJob({job}) {
  const [jobName, setJobName] = useState(job["jobName"]);
  const [income, setIncome] = useState(job["income"]);
  const [incomeType, setIncomeType] = useState(job["incomeType"]);
  const [hours, setHours] = useState(job["hours"]);
  const [taxRate, setTaxRate] = useState(job["taxRate"]);

  return (
    <tr>
      <th>
        <input
          type="text"
          placeholder='Name'
          onChange={(e) => setJobName(e.target.value)}/>
        </th>
        <th>
        $<CurrencyInput
        placeholder='Pay Rate'
        onChange={(e) => setIncome(e.target.value)}/>
        </th>
        <th>
          <select onChange={(e) => setIncomeType(e.target.value)}>
              <option value="hourly">Hourly</option>
              <option value="salary">Salary</option>    
          </select>
        </th>
        <th>
          <input
            type="number"
            placeholder='hours'
            min="0"
            onChange={(e) => setHours(e.target.value)}/>
        </th>
        <th>
          <input
            type="number"
            step="0.01"
            max="1"
            min="0"
            placeholder='tax rate'
            onChange={(e) => setTaxRate(e.target.value)}/>
        </th>
        <th>
          <button onClick={() => {
            update(jobName, income, incomeType, hours, taxRate, job["id"])
            window.location.reload()}}>Submit Update</button>
        </th>
        <th></th>
    </tr>
  )
}

export default UpdateJob