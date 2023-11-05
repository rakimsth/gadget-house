import { Link } from "react-router-dom";
import { Stack } from "react-bootstrap";

import { BiLogOut } from "react-icons/bi";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function AdminNavBar() {
  return (
    <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>
          <Link
            to={"/admin/dashboard"}
            className="text-dark text-decoration-none"
          >
            Gadget House Admin
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link
              to={"/admin/products"}
              className="nav-link text-dark text-decoration-none"
            >
              Products
            </Link>
            <Link
              to={"/admin/orders"}
              className="nav-link text-dark text-decoration-none"
            >
              Orders
            </Link>
            <Link
              to={"/admin/categories"}
              className="nav-link text-dark text-decoration-none"
            >
              Categories
            </Link>
            <Link
              to={"/admin/users"}
              className="nav-link text-dark text-decoration-none"
            >
              Users
            </Link>
          </Nav>
          <div className="p-1">
            <Stack gap={1} direction="horizontal">
              <Link className="btn btn-outline-secondary">
                <BiLogOut size={24} />
              </Link>
            </Stack>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNavBar;
