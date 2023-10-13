## Order Payment using Stripe

1. Open account in https://stripe.com/
   a. use US as the country
   b. use fake sms verification using any services such as https://mobilesms.io/free-sms-verification/

2. Goto dashboard.stripe.com

3. Open the stripe doc to start checkout process (https://stripe.com/docs/checkout/quickstart)

4. In Dashboard, turn on test mode, click on developer => go to API Keys section

5. Copy the publishable keys and secret key

6. Create the env in the backend for these keys

<hr>
<b>Do this in index.js file of backend</b> 
<hr>

7. Use the doc, to create the checkout session api endpoint

<hr>
<b>Do this in checkout.jsx file of frontend</b> 
<hr>

8. replace the hardcoded line items with cart items in the front end. (use your logic to create line item payload)

9. Bind the API in the checkout page in react app using useCallback and useEffect Hook

10. Redirect the user to checkout page using window.location.replace

<hr>
<b>Do this to allow stripe to update the order </b> 
<hr>

11. Create the webhook endpoint in the index.js

12. Convert endpointsecret as env variables

13. Make sure that express.json() middleware comes after the webhook endpoint. Because we are using raw data from express instead of JSON data

14. Add all the event associated with checkout session.

15. Create order controller function to handle the stripe event calls such as order expired/ success

16. Incase of failed transaction, mark the order as failed and restock the orders product item back to product stock.
