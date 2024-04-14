import StandardPage from "../PageLayout/standardPage";
import Carousel from "react-bootstrap/Carousel";
import Precision from "../Images/Precision.png";
import Van from "../Images/Van.jpg";
import Logo from "../Images/Logo.png";


export default function Home(props) {
  return (
    <StandardPage>
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
    </StandardPage>
  );
}
