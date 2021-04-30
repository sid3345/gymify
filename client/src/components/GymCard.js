import React, {useState} from 'react';
import Booking from "./Booking";
import {Nav, Button} from "reactstrap";

const GymCard = ({gym}) =>{
	return(
		<div className="gym-list-item">
			<p>{gym.title.toString().substring(0, 80)}</p>
			<p className="gym-details"><img src={`./gyms/${gym.img}.jpg`}></img></p>
			<p className="gym-details"><i className="fas fa-rupee-sign"></i> Location: {gym.location}</p>
			<p className="gym-details"><i className="fas fa-rupee-sign"></i> Type: {gym.type}</p>
			<p className="gym-details"><i className="fas fa-rupee-sign"></i> Rating: {gym.average_rating}</p>
			<p className="gym-details"><i className="fas fa-rupee-sign"></i> Rating Count: {gym.ratings_count}</p>
			<p className="gym-price"><i className="fas fa-rupee-sign"></i> Cost per hour: ₹ {gym.price}</p>
			
            <Booking title={gym.title} className="BookApp" />
		</div>
	);
	

}

export default GymCard;