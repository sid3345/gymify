import React from "react";
import { Jumbotron, Container } from "reactstrap";

const Greeting = (props) => {
  return (
    <div>
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-4">Welcome</h1>
          <p className="lead">
            To all Fitness Enthusiasts !
          </p>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default Greeting;
