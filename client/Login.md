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

Auth Routing (admin)

2 parts of our application

1. Guest (Any user; role="")

   - list
   - read

2. Admin (special access; role="admin")
   - list
   - read
   - update
   - delete

Routing

- Private (JWT Token === valid ? <allow access to the page> : "login page redirect")
- Protected (JWT TOKEN === valid && ROLE === 'admin" ? <allow access to the page> : "login page redirect")
- Guest

Steps:

1. Check for access token in LS
2. decode access_token using jwt-decode pacakge
3. we will get exp, email, roles
4. use exp to find if the access-token is valid or not
5. allow 2nd check, role check
   a. compare token role with allowed role => match? => allow access to children component
   b. throw to dashboard if role doesnt match
