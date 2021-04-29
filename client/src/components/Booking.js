import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import GetAppointment from "./GetAppointment";

const Booking = (props) => {
  const { className, size, title } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

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
          <GetAppointment />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Booking;
