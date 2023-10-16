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
