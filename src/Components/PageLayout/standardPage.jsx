import { Container } from "react-bootstrap";
import Header from "./header";
import NavigationBar from "./navigationBar";
import Footer from "./footer";

export default function StandardPage(props) {
  return (
    <Container className="w-100">
      <Header texto="PRECISION CLEANING" />
      <NavigationBar />
      <section>{props.children}</section>
      <Footer/>
    </Container>
  );
}
