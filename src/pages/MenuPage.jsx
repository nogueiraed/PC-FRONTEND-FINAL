import Layout from "../template/Layout";
import Carousel from "react-bootstrap/Carousel";
import Precision from "../Components/images/Precision.png";
import Van from "../Components/images/Van.jpg";
import Logo from "../Components/images/Logo.png";


export default function MenuPage(props) {
  return (
    <Layout>
      <div>
        <Carousel fade style={{ height: "75vh" }}>
          
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={Precision}
              alt="First slide"
              style={{ maxHeight: "75vh" }}
            />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
          
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={Van}
              alt="Second slide"
              style={{ maxHeight: "75vh" }}
            />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
         
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={Logo}
              alt="Third slide"
              style={{ maxHeight: "75vh" }}
            />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>

        </Carousel>
      </div>
    </Layout>
  );
}
