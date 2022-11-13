import React, {useEffect, useState } from 'react'
import '../App.css'

function RemoveJob() {
    const [backendData, setbackendData] = useState(null);
    const [selected, setSelected] = useState([]);

    const getBackendData = () =>{
        fetch("http://localhost:3001/jobs")
        .then(response => response.json())
        .then(data => {
              setbackendData(data)
              console.log(data)})
    }

    const handleCheckBoxClick = (checked, id) => {
        let tempSelected = selected;
        if(checked)
        { 
            tempSelected.push(id);
            
        }
        else
        {
            for (let i = 0; i < tempSelected.length; i++) {
                if (tempSelected[i] === id) {
                  tempSelected.splice(i, 1);
                }
              }
        }
        setSelected(tempSelected);
    }

    const handleCheckRemove = (e) =>{
        selected.forEach(id =>
        {
            fetch("http://localhost:3001/jobs/" + id,{
                method: "DELETE"
            })
            .then(() => {
                getBackendData();
            })
        })
    }

    useEffect(() =>{
        getBackendData()
      }, []);

  return (
    <>
    <h1>Remove Job</h1>
    {(backendData === null) ? 
        <p>loading...</p> : 
        <>
        <table>
            <tr className='border'>
                <th>Name</th>
                <th>Pay Rate</th>
                <th>Pay Type</th>
                <th>hours</th>
                <th>Tax Rate</th>
                <th>Remove?</th>
            </tr>
            {backendData.map((job, i) => (
            <tr key={i} className='border'>
                <th>{job["jobName"]}</th>
                <th>${job["income"]}</th>
                <th>{job["incomeType"]}</th>
                <th>{job["hours"]}</th>
                <th>{job["taxRate"]}</th>
                <th><input
                    type="checkbox"
                    onClick={(e) => handleCheckBoxClick(e, job["id"])}/></th>
            </tr>))}
        </table>
        <button onClick={(e) => handleCheckRemove(e.checked)} >Remove</button>
        </>
    }
    </>
  )
}

export default RemoveJob