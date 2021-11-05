import React, {useEffect, useState} from "react";
import axios from 'axios'
import { Container } from "reactstrap";
import doc1 from "../assets/img/fitness1.jfif";
import GymList from './GymList';
//import {gyms} from './data';

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
    const [gymList, setGymList] = useState('')
    
    useEffect(() => {
    axios.post("http://localhost:5000/gymList/").then((res)=> {
      //console.log('res.data: ', res.data);

      const gymList1=[]

      for(let i=0; i<res.data.length;i++){

      if ((res.data)[i].approved==1)
      {
        //console.log('(res.data)[i]: ',(res.data)[i]);

        gymList1.push((res.data)[i]);
        
      }
    }      
      setGymList(gymList1)
      });
    },[])

   const handleSearchChange=(e)=>{
    setKeyword(e.target.value.toLowerCase());
    }

   const filteredGyms = gymList ? gymList.filter((gym)=>{
  let bookTitle = gym.gym.toString().toLowerCase();
  return bookTitle.indexOf(keyword) > -1;
  }) : '';

  return (
      <div>
      <Container fluid>
        <div className="row m-3 d-flex align-items-center">

          <div className="col-12 col-md-6 p-5">
            <img src={doc1} alt="" width="100%" height="auto" />
          </div>
          <div className="col-12 col-md-6 text-center p-6">
            <h3 className="display-4">Nothing truly great comes from a comfort zone ! </h3>
          </div>
        </div>

      <div className={classes.searchWrapper}>
        <CustomInput
        
          formControlProps={{
            className: classes.margin + " " + classes.search
          }}
          inputProps={{
            placeholder: "Search",
            inputProps: {
              "aria-label": "Search",
              onChange: (e)=>handleSearchChange(e)
            }
          }}
        />
        <Button color="white" aria-label="edit" justIcon round>
          <Search />
        </Button>
      </div>

        <div className="container">
		    	<GymList gyms={filteredGyms}/>
        </div>
      </Container>
    </div>
  );
};

export default Information;
