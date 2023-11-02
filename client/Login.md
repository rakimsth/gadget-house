Login process in React

- set username and password in state as object {email: "", password: ""}

- use the form input onChange event to manage the state; controlled form

- submit the form using handle Submit through axios

3 scenarios:

1. best scenario => we get the token
2. good/bad scenario => password/email not found / mismatch using try/catch block
3. worst scenario => API / Database down handled using try/catch block

- success (token) => store that token in local storage by creating session utils

- navigate the user to /admin/dashboard

- cleanup state using finally block

New User Registeration and try to login

<!-- 1. Create signup component -->
<!-- 2. state to enter user information -->
<!-- 3. Validate the password or form itself -->

<!-- 4. axios the registeration api to register the user -->
<!-- 5. success msg => verify component => email/ token state => verify api call => success => redirect user to login page -->
<!-- 6. fail => clear the state and remain in signup page -->
