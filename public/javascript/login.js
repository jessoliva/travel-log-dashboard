async function loginFormHandler(event) {
    event.preventDefault();

    // get user input values
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
<<<<<<< HEAD
  
    if (username && password) {
        
=======

    if (username && password) {

>>>>>>> dev/jess-merge
        // making request to /api/users/login route
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
<<<<<<< HEAD
    
        if (response.ok) {
            document.location.replace('/');
        } 
=======

        if (response.ok) {
            document.location.replace('/');
        }
>>>>>>> dev/jess-merge
        else {
            alert(response.statusText);
        }
    }
}
document.querySelector('#login-form').addEventListener('submit', loginFormHandler);