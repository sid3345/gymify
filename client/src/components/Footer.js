import { Jumbotron, Container } from "reactstrap";
import doc2 from "../assets/img/fitness2.jpg";

const Footer = (props) => {
  return (
    <div>
      <Jumbotron fluid>
        <Container fluid>
          <div className="row">
            <div className="col-12 col-md-6">
              <h3 className="display-4 ">Your body can stand almost anything. It’s your mind that you have to convince !</h3>
            </div>
          <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
            <img src={doc2} alt="" width="100%" height="auto" />
        </div>
          </div>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default Footer;
