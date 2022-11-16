export function update(jobName, income, incomeType, hours, taxRate, id)
{
    let newJob = {jobName, income, incomeType, hours, taxRate}
    
    fetch("http://localhost:3001/jobs", {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(newJob)
    })
    .then(
      fetch("http://localhost:3001/jobs/" + id,{
      method: "DELETE"
      })
    )
    .catch((err) => console.log(err));
};

export function post()
{

}