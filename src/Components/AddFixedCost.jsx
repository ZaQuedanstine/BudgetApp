import React, {useState} from 'react';
import CurrencyInput from 'react-currency-input-field';

function AddFixedCost() {
  const [costName, setCostName] = useState('');
  const [amount, setAmount] = useState('');
  const [costType, setCostType] = useState("shelter");
  const [frequency, setFrequency] = useState("oneTime")

  const handleSubmit = (e) =>{
      //e.preventDefault();
      let cost = {costName: costName, amount: amount, frequenct: frequency, costType: costType}
      fetch("http://localhost:3001/costs", {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(cost)
  })
      .then((res) => {
        console.log(res.data);
      })
    }
  return (
    <div>
      <h1>Add New Recurring Cost</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="The Cost"
          onChange={(e) => setCostName(e.target.value)}
          required/>
          <label>$</label>
        <CurrencyInput
            placeholder="Amount"
            onChange={(e) => setAmount(e.target.value)}
            required/>
        <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
            <option value="oneTime">One time</option> 
            <option value="weekly">Weekley</option>
            <option value="bi-weekly">Bi-Weekly</option>
            <option value="monthly">Monthly</option>    
        </select>
        <select value={costType} onChange={(e) => setCostType(e.target.value)}>
            <option value="shelter">Shelter</option>
            <option value="bills">Bills</option>
            <option value="invest">Invest</option>
            <option value="consumption">Consumption</option>     
        </select>
        <button>Add</button>  
      </form>
    </div>
  )
}

export default AddFixedCost