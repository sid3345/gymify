import React from 'react';
import { Container } from "reactstrap";
import doc1 from "../assets/img/fitness1.jfif";
import doc2 from "../assets/img/fitness2.jpg";
import BookList from './BookList';

const Information = ({books}) => {
  return (
    <div>
      <Container fluid>
        <div className="row m-3 d-flex align-items-center">
            <div className="container">
		    	<BookList books={books}/>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Information;
