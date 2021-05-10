import React, {useState} from 'react';
import Booking from "./Booking";

const GymCard = ({gym}) =>{
	return(
		<div className="gym-list-item">
			<p>{gym.gym.toString().substring(0, 80)}</p>
			<p className="gym-details"><img src={`./gyms/${gym.img}.jpg`} alt={'image'}></img></p>
			<p className="gym-details"><i className="fas fa-rupee-sign"></i> City: {gym.city}</p>
			<p className="gym-details"><i className="fas fa-rupee-sign"></i> Location: {gym.address}</p>
			<p className="gym-details"><i className="fas fa-rupee-sign"></i> Rating: </p>
			<p className="gym-details"><i className="fas fa-rupee-sign"></i> Rating Count: </p>
			<p className="gym-price"><i className="fas fa-rupee-sign"></i> Cost per hour: ₹ {gym.cost}</p>
			
            <Booking gymEmail = {gym.email} title={gym.gym} price={gym.cost} className="BookApp" />
		</div>
	);
	

}

export default GymCard;