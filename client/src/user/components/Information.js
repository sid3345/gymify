import React, {useState} from 'react';
import { Container } from "reactstrap";
import doc1 from "../assets/img/fitness1.jfif";
import GymList from './GymList';
import {gyms} from './data';

import Search from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";

// core components
import CustomInput from "../../dashboard/components/CustomInput/CustomInput.js";
import Button from "../../dashboard/components/CustomButtons/Button.js";

import styles from "../../dashboard/assets/jss/material-dashboard-react/components/headerLinksStyle";

const useStyles = makeStyles(styles);

const Information = () => {
    const classes = useStyles();

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

      <div className={classes.searchWrapper}>
        <CustomInput
        onChange={(e)=>handleSearchChange(e)}
        
          formControlProps={{
            className: classes.margin + " " + classes.search
          }}
          inputProps={{
            placeholder: "Search",
            inputProps: {
              "aria-label": "Search"
            }
          }}
        />
        <Button color="white" aria-label="edit" justIcon round>
          <Search />
        </Button>
      </div>

            <div className="container">
		    	<GymList gyms={filteredBooks}/>
          </div>
      </Container>
    </div>
  );
};

export default Information;
