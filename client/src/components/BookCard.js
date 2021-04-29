import React from 'react';


const BookCard = ({book}) =>{
	return(
		<div className="book-list-item">
			<p>{book.title.toString().substring(0, 80)}</p>
			<p className="book-details"><i className="fas fa-rupee-sign"></i> Location: {book.isbn}</p>
			<p className="book-details"><i className="fas fa-rupee-sign"></i> Type: {book.type}</p>
			<p className="book-details"><i className="fas fa-rupee-sign"></i> Rating: {book.average_rating}</p>
			<p className="book-details"><i className="fas fa-rupee-sign"></i> Rating Count: {book.ratings_count}</p>
			<p className="book-price"><i className="fas fa-rupee-sign"></i> Cost per hour: {book.price}</p>
		</div>
	);
	

}

export default BookCard;