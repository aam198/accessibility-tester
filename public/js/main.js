


// Fetch accessibility issues in the backend

const testAccessibility = async (e) => {
  e.preventDefault()

  //('#url').value to make sure we are getting the value from the input on submit
  const url = document.querySelector('#url').value
  console.log(url)

  if(url === '') {
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
// Escape HTML



document.querySelector('#form').addEventListener('submit', testAccessibility)