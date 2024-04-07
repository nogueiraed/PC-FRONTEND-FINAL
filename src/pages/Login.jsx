import { useContext, useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Context } from "../Context/GlobalContext";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "../Services/authenticationService";

const authenticationService = new AuthenticationService();

export default function Login(props) {
  const { setUser } = useContext(Context);
  const [userName, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const user = await authenticationService.auth(userName, password);

    try {
      if (user) {
        setUser(user);
        navigate("/");
      } else {
        setError("Username or passoword is incorrect. Please try again");
        console.log(setError);
      }
    } catch (error) {
      console.error("Error in login: ", error);
    }
  };

  return (
    <Container className="container col-3 p-3 mb-2 ">
      <Form onSubmit={handleLogin}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group className="mb-3">
          <Form.Label>User</Form.Label>
          <Form.Control
            type="text"
            id="user"
            name="user"
            onChange={(e) => setUserName(e.target.value)}
          />
          <Form.Text className="text-muted">Do not share your login</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassWord(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
}
