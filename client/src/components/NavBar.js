import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {auth} from "../firebase"
import {connect} from 'react-redux'


import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Button,
} from "reactstrap";
import Booking from "./Booking";
import {books} from './data';
import Greeting from "./Greeting";
import Information from "./Information";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState('');

  let {
			handleSearchChange,  
			handleSearchSubmit} = props;

   handleSearchChange=(e)=>{
    setKeyword(e.target.value.toLowerCase());
    }
    handleSearchSubmit=(e)=>{
      e.preventDefault();
    }

  const toggle = () => setIsOpen(!isOpen);

  const history = useHistory()

  

  const handleAuthentication = () =>{
    if (props.uservalue.user){
        auth.signOut()
        history.push('/')
    }

   
}

var listEvent = <Link to="/listAll">
                <Button color="primary" className="mx-2">
                  List All events
                </Button>
              </Link>

  
  const filteredBooks = books.filter((book)=>{
  let bookTitle = book.title.toString().toLowerCase();
  return bookTitle.indexOf(keyword) > -1;
  });

  return (
    <div>
      <Navbar color="light" light expand="md" fixed="top">
        <NavbarBrand href="/">GYMIFY</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {props.uservalue.user ? listEvent : null}

					<form className="search-form" onSubmit={(e)=>handleSearchSubmit(e)}>
						<input type="text" value={keyword} placeholder="Search for gyms / sports clubs..."  
            onChange={(e)=>handleSearchChange(e)}/>
					</form>

            <Link to = {!props.uservalue.user && '/login'}>
                  <Button color="primary" className="mx-2" onClick = {handleAuthentication}>
                        {props.uservalue.user ? 'Sign Out' : 'Sign In'}
                  </Button>
            </Link>

            <Booking className="BookApp" />
          </Nav>
        </Collapse>
      </Navbar>
      <div className="container">
            <Greeting />
		    	<Information books={filteredBooks}/>
	     	</div>
    </div>
  );
};

const mapStateToProps = (state) =>{
  return{
    uservalue : state
  }
}

export default connect(mapStateToProps)(NavBar);
