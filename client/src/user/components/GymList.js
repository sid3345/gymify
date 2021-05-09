import React from 'react';
import GymCard from './GymCard';

const GymList = ({gyms}) =>{
	return(
	<div className="gym-list">
		{gyms.length > 0 && 
			<React.Fragment>
			{gyms.map(gym =>
				<GymCard  
					key={gym.email}
				 	gym={gym} 
				/>
			)}
			</React.Fragment>
		}
		{gyms.length === 0 &&
			<h3>No results found!</h3>
		}
	</div>
	);
}

export default GymList;