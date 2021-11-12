// Fetch accessibility issues in the backend

const testAccessibility = async (e) => {
  e.preventDefault()

  //('#url').value to make sure we are getting the value from the input on submit
  const url = document.querySelector('#url').value
  console.log(url)

  if(url === '') {
    alert('Please add a url')
  } else {
    setLoading();

    // Make a request and get a response with our query param.
    const response = await fetch (`/api/test?url=${url}`)

    // Checking response status
    if(response.status !== 200){
      setLoading(false)
      alert('Oh snap! Something went wrong')
    }
    else {
      const {issues} = await response.json()
      console.log(issues);
    }
  }
}

// Add Issues to the DOM


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