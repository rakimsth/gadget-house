<!-- Product Limit check while adding in the cart
Product Limit check during increment in the cart -->

<!-- Stripe Payment option logic in checkout page -->

Pagination in Product Page
Product Detail Page
Search in navbar
Login Logic
Admin Panel (Products/ Orders/ Users/ Logout)
Register Logic
Homepage (Optional)
About (Optional)
Contact Page(Optional)

Steps involved in Pagination in Product Page

<!-- 0. Create Seed database and run the script (add up to 10 products) -->

<!-- 1. Create a new Vite Project (React) and clean it up -->

<!-- 2. install all necessary packages (bootstrap react-bootstrap @reduxjs/toolkit react-redux axios) -->

<!-- 3. axios instance setup -->

<!-- 4. constants (product url) -->

<!-- 5. services (product) -->

<!-- 6. slices (product) -->

<!-- 7. store (productReducer) -->

<!-- 8. store bind into the main.jsx -->

<!-- 9. Pagination Component and Product List -->

<!-- 10. product list page (useSelector and useDispatch) -->

<!-- 11. Pagination send props (total,limit, currentPage, setCurrentPage, setLimit, dispatch)

12. Pagination bootstrap logic update
    a. active === currentPage
    b. numberOfPage = Math.ceil(total/limit)

    c. Onclick event => dispatch(setCurrentPage(number))

13. Limit Dropdown
    a. select/option
    b. onchange dispatch(setLimit(limit)) -->

Complex / Advanced Pagination Logic

1. First Button => currentpage to 1
2. Prev Button => currentpage set to currentpage -1
3. Ellipses ... => look into usePagination Hook
4. Next Button => currentpage set to currentpage+1
5. Last Button => currentpage set to totalNumberofPages

// Detail Page

<!-- 1. Out of stock condition
2. Stocked condition -->

<!-- a. get the id from the browser -->
<!-- b. use that Id to get the detail from mongodb using API -->

<!-- c. create getbyId service API -->

<!-- d. use that service api in the slice like fetchProduct API -->

<!-- e. use the getProductById slice in the product detail page to fetch the product info -->
<!-- f. use that product state in the data display -->

<!-- g. get the 4 random pics to display,
1. use fetchProducts to fetch all products
2. use products state to generate 4 randoms
3. create a function that randomly selects 4 products
4. assign that to the state
5. use the state to loop in the more product section
6. use Link from react router dom to make it clickable -->

<!-- g. in case of out of stock, disable all the button by checking product quantity -->

<!-- Add to cart feature in product detail

1. create new function in cart slice called updateCart
2. import that function in detail page
3. use that function with dispatch on onclick handler during add to cart button press
4. send product as well as quantity from state
5. check for quantity logic before adding -->

<!-- Convert Category id to its name

1. go to server > product> product controller
2. start using aggregation
3. use $match to find the id
4. use $lookup to find the category detail
5. use $unwind to unwind the array
6. use $addField to add the new field to the product document; category_name
7. use aggregation in getById function in controller
8. Since aggregation return array, check if the array is empty; if empty return empty object
9. if not empty, return first item of array; return product[0]

10. In product detail page, fix product?.category to product?.category_name -->
