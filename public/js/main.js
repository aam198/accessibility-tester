

// Fetch accessibility issues in the backend

const testAccessibility = async (e) => {
  e.preventDefault()

  //('#url').value to make sure we are getting the value from the input on submit
  const url = document.querySelector('#url').value
  console.log(url)

  if(url === '') {
    //Add in SetTimeOut for notification
    const emptyURL = document.querySelector('.alert-danger');
      emptyURL.style.display = 'block';
  } else {
    setLoading();

    // Make a request and get a response with our query param.
    const response = await fetch (`/api/test?url=${url}`)
   
    // Checking response status
    if(response.status !== 200){
      setLoading(false)
      const statusError = document.querySelector('.alert-primary');
      statusError.style.display = 'block';
      alert('Oh snap! Something went wrong!')
    }
    else {
      const {issues} = await response.json()
      console.log(issues);
      //Passing in issues data from object & turning off loader
      addIssuesToDOM(issues)
      setLoading(false)
    }
  }
}

// Add Issues to the DOM

const addIssuesToDOM = (issues) => {
  console.log(issues)
  const issuesOutput = document.querySelector('#issues');

   

  // Checking for empty array/no issues
  if(issues.length === 0){
    issuesOutput.innerHTML = '<h4>Congrats! No Issues Found</h4>'
  }else {
    issuesOutput.innerHTML = `
   
     <h3 class="issue-header">Current Issues to Fix:  <span class="badge bg-primary rounded-pill">${issues.length}</span></h3>  `;
    issues.forEach((issue) =>{
      const output = `
      
      <div class="card border-primary output-card mb-5">
        <div class="card-header bg-danger text-white p-3">
            <strong>CODE</strong>: ${issue.code}
        </div>
        <div class="card-body">
        <p class="card-title p-2"><strong>Element to Check</strong>:
         ${escapeHTML(issue.context)}
         </p>
          <p class="p-2"><strong>Reason</strong>: ${issue.message}</p>
          
        </div>
        </div>
      
      `
      //to output to the DOM, need += to keep adding so doesn't replace
      issuesOutput.innerHTML += output;
    })
  }

}
// Set the loading state 

const setLoading = (isLoading = true) => {
  const loader = document.querySelector('.loader');
  if(isLoading){
    loader.style.display = 'block';
  }
  else{
    loader.style.display = 'none';
  }

}
// Escape HTML - regular expressions to replace certain characters to output the html without rendering.

function escapeHTML(html) {
  return html 
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}



document.querySelector('#form').addEventListener('submit', testAccessibility)