import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import GetAppointment from "./GetAppointment";
import {connect} from 'react-redux'


const Booking = (props) => {
  const { className, size, title , price} = props;

  const [modal, setModal] = useState(false);

  const toggle = () => {
  if(props.uservalue.user){
    setModal(!modal)
    }
  else{
    alert("Please Sign In First!")
  }
  }
  
  
  

  const closeBtn = (
    <button className="close" onClick={toggle}>
      &times;
    </button>
  );

  return (
    <div>
      <Button color="primary" size={size} onClick={toggle}>
        Book Fitness Slot
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        className={className}
        centered
        size="lg"
      >
        <ModalHeader toggle={toggle} close={closeBtn}>
          Schedule a slot for {title}
        </ModalHeader>
        <ModalBody>
          <GetAppointment priceOnPayment = {price}/>
        </ModalBody>
      </Modal>
    </div>
  );
};


const mapStateToProps = (state) =>{
  return{
    uservalue : state
  }
}

export default connect(mapStateToProps)(Booking);
