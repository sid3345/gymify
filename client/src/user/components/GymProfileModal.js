import React from 'react'

const GymProfileModal = ({image , gymData}) => {
    console.log(gymData)
    return (
        <div style = {{display : 'flex'}}>
            <div style = {{margin : '10px' , width : '50%'}}><img src = {image} style = {{width : "100%" , height : "350px"}}/></div>
            <div style = {{margin : '10px' , width : '50%'}}>
                <p>Owner : {gymData.name}</p>
                <p>Email : {gymData.email}</p>
                <p>Cost : {gymData.cost}</p>
                <p>Location : {gymData.address}</p>
                <p>City : {gymData.city}</p>
                <p>Registration No. : {gymData.propertyGovt}</p>
                <p>Description : {gymData.description}</p>
            </div>
        </div>
    )
}

export default GymProfileModal
