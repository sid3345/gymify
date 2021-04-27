import { Jumbotron, Container } from "reactstrap";

const Greeting = (props) => {
  return (
    <div>
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-3">Welcome</h1>
          <p className="lead">
            To all Fitness Enthusiasts ! <br /> Press the "Book Fitness Slot" in
            the header to schedule a fitness activity.
          </p>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default Greeting;
