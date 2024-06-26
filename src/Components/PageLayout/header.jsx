import { Alert } from "react-bootstrap";

export default function Header(props) {
  
  return (
    <Alert className="text-center" variant="dark">
      <strong>{props.texto} </strong>
    </Alert>
  );
}
