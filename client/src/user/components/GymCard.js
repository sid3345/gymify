import React, {useState} from 'react';
import Booking from "./Booking";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import GymProfileModal from './GymProfileModal';


const GymCard = ({gym}) =>{

  const [modal, setModal] = useState(false);

  const toggle = () =>{
    setModal(!modal)
  }

  const closeBtn = (
    <button className="close" onClick={toggle}>
      &times;
    </button>
  );

	return(
		// <div className="gym-list-item">
		// 	<p>{gym.gym.toString().substring(0, 80)}</p>
		// 	<p className="gym-details"><img src={`./gyms/${gym.img}.jpg`} alt={'image'}></img></p>
		// 	<p className="gym-details"><i className="fas fa-rupee-sign"></i> City: {gym.city}</p>
		// 	<p className="gym-details"><i className="fas fa-rupee-sign"></i> Location: {gym.address}</p>
		// 	<p className="gym-details"><i className="fas fa-rupee-sign"></i> Rating: </p>
		// 	<p className="gym-details"><i className="fas fa-rupee-sign"></i> Rating Count: </p>
		// 	<p className="gym-price"><i className="fas fa-rupee-sign"></i> Cost per hour: ₹ {gym.cost}</p>
			
        //     <Booking gymEmail = {gym.email} title={gym.gym} price={gym.cost} className="BookApp" />
		// </div>
<>
	<Card sx={{ width : 300 ,  maxWidth: 300 , margin : 1 }}>
		<CardContent>
			<Typography gutterBottom variant="h6" component="div">
				{gym.gym.toString().substring(0, 80)}
			</Typography>
			</CardContent>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={`./gyms/${gym.img}.jpg`}
          alt="green iguana"
          onClick = {toggle}
        />
      </CardActionArea>
	
        <CardContent>

          <Typography gutterBottom variant="p" component="div">
		  	<i className="fas fa-rupee-sign"></i> City: {gym.city}
          </Typography>
          {/* <Typography gutterBottom variant="p" component="div">
		  	<i className="fas fa-rupee-sign"></i> Location: {gym.address}
          </Typography> */}
          <Typography gutterBottom variant="p" component="div">
		  	<i className="fas fa-rupee-sign"></i> Rating:
          </Typography>
          <Typography gutterBottom variant="p" component="div">
		  	<i className="fas fa-rupee-sign"></i> Rating Count:
          </Typography>
          <Typography gutterBottom variant="p" component="div">
		  	<i className="fas fa-rupee-sign"></i> Cost per hour: ₹ {gym.cost}
          </Typography>

        </CardContent>

      <CardActions style={{justifyContent: 'center'}}>
	  	<Booking gymEmail = {gym.email} title={gym.gym} price={gym.cost} />
      </CardActions>
    </Card>

    <Modal
        isOpen={modal}
        toggle={toggle}
        centered
        size="lg"
      >
        <ModalHeader toggle={toggle} close={closeBtn}>
          {gym.gym}
        </ModalHeader>
        <ModalBody>
          {modal ? <GymProfileModal image={`./gyms/${gym.img}.jpg`} gymData = {gym}/> : null }
        </ModalBody>
      </Modal>
  </>
	);
	

}

export default GymCard;