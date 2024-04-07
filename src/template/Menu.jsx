import { useContext } from "react";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Context } from "../Context/GlobalContext";

export default function Menu(props) {
  const { user, setUser } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <Container>
      <Navbar bg="light" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Home</Navbar.Brand>
          </LinkContainer>
          <LinkContainer to="/DW">
            <Navbar.Brand>New DW</Navbar.Brand>
          </LinkContainer>
          <LinkContainer to="/DwList">
            <Navbar.Brand>DW List</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Button variant="outline-danger" onClick={handleLogout}>
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
}
