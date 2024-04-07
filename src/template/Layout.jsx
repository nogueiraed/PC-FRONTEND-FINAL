import { Container } from "react-bootstrap";
import Home from "./Home";
import Menu from "./Menu";

export default function Layout(props) {
  return (
    <Container className="w-100">
      <Home texto="Precision Cleaning" />
      <Menu />
      <section>{props.children}</section>
    </Container>
  );
}
