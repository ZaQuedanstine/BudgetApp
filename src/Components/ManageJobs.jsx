import React, {useEffect, useState } from 'react';
import UpdateJob from './UpdateJob';
import '../App.css'

function ManageJobs() {
    const [backendData, setbackendData] = useState(null);
    const [selected, setSelected] = useState([]);
    const [selectedForUpdating, setSelectedforUpdating] = useState(null);

    const getBackendData = () =>{
        fetch("http://localhost:3001/jobs")
        .then(response => response.json())
        .then(data => {
              setbackendData(data)
              console.log(data)})
        .catch((err) => {console.log(err)})
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
    <h1>Jobs List:</h1>
    {(backendData === null) ? 
        <p>loading...</p> : 
        <>
        <table>
            <thead>
            <tr className='border'>
                <th>Name</th>
                <th>Pay Rate</th>
                <th>Pay Type</th>
                <th>hours</th>
                <th>Tax Rate</th>
                <th>Update?</th>
                <th>Remove?</th>
            </tr>
            </thead>
            {backendData.map((job, i) => (
            <tbody>
                <tr key={i} className='border'>
                    <th>{job["jobName"]}</th>
                    <th>${job["income"]}</th>
                    <th>{job["incomeType"]}</th>
                    <th>{job["hours"]}</th>
                    <th>{job["taxRate"]}</th>
                    <th><button
                        onClick={(e) => (selectedForUpdating === i) ? setSelectedforUpdating(null) : setSelectedforUpdating(i)}>Update</button></th>
                    <th><input
                        type="checkbox"
                        onClick={(e) => handleCheckBoxClick(e, job["id"])}/></th>
                </tr>
                {(selectedForUpdating === i) ?
                <UpdateJob job={job}/>
                : ""}
            </tbody>))
            }
            <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th><buttton className='button' onClick={(e) => handleCheckRemove(e.checked)}>Remove Selected</buttton></th>
            </tr>
        </table>
        </>
    }
    </>
  )
}

export default ManageJobs