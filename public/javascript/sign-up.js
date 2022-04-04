// reference the form 
const signUpForm = document.getElementById('sign-up-form');

// get user input values
const fullName = document.getElementById('name').value.trim();
const username = document.getElementById('username').value.trim();
const email = document.getElementById('email').value.trim();
const password = document.getElementById('password').value.trim();


async function signupFormHandler(event) {
    event.preventDefault();
  
    // a conditional to make sure that all fields have values before making the POST request
    if (name && username && email && password) {

        // making request to /api/users route
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                fullName,
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        
        console.log(response);
    
        // Now we can add error handling by using the .ok property on the response object
        if (response.ok) {
            console.log('success');
        } 
        else {
            alert(response.statusText);
        }
    }
};
signUpForm.addEventListener('submit', signupFormHandler);