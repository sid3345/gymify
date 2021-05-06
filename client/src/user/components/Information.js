import React, {useState} from 'react';
import { Container } from "reactstrap";
import doc1 from "../assets/img/fitness1.jfif";
import GymList from './GymList';
import {gyms} from './data';

const Information = () => {
    const [keyword, setKeyword] = useState('');

   const handleSearchChange=(e)=>{
    setKeyword(e.target.value.toLowerCase());
    }
    
    const handleSearchSubmit=(e)=>{
      e.preventDefault();
    }
   const filteredBooks = gyms.filter((gym)=>{
  let bookTitle = gym.title.toString().toLowerCase();
  return bookTitle.indexOf(keyword) > -1;
  });

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

        <form className="search-form" onSubmit={(e)=>handleSearchSubmit(e)}>
        <input type="text" value={keyword} placeholder="Search for gyms / sports clubs..."  
        onChange={(e)=>handleSearchChange(e)}/>
					</form>

            <div className="container">
		    	<GymList gyms={filteredBooks}/>
          </div>
      </Container>
    </div>
  );
};

export default Information;
