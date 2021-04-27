import { Container } from "reactstrap";
import doc1 from "../assets/img/fitness1.jfif";
import doc2 from "../assets/img/fitness2.jpg";

const Information = () => {
  return (
    <div>
      <Container fluid>
        <div className="row m-3 d-flex align-items-center">
          <div className="col-12 col-md-6 p-5">
            <img src={doc1} alt="" width="100%" height="auto" />
          </div>
          <div className="col-12 col-md-6 text-center p-5">
            <h3 className="display-4">Nothing truly great comes from a comfort zone ! </h3>
          </div>
        </div>
        <div className="row m-3 d-flex align-items-center">
          <div className="col-12 col-md-6 text-center p-5">
            <h4 className="display-4">Your body can stand almost anything. It’s your mind that you have to convince !</h4>
          </div>
          <div className="col-12 col-md-6 p-5">
            <img src={doc2} alt="" width="100%" height="auto" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Information;
