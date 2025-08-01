import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useUser } from "../../context/userContext";

const Header = () => {
  const { user, setUser } = useUser();
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      variant="dark"
      data-bs-theme="dark"
      bg="dark"
    >
      <Container>
        <Navbar.Brand href="/dashboard">FT</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user && user._id ? (
              <>
                <Nav.Link as={Link} to="/dashboard">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/transaction">
                  Transaction
                </Nav.Link>

                <Button
                  onClick={() => {
                    //remove user data from context
                    setUser({});
                    localStorage.removeItem("accessToken");
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
