// ViewListing.tsx
'use client'
import React, { useState, useEffect } from 'react';
import { Container, Paper, styled } from '@mui/material';
import Navbar from 'components/Navbar';
import { Timestamp, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import {db} from '../../../../database/firebase';
import './page.css';
import { useParams } from 'next/navigation'
import { FC } from 'react';

interface pageProps {
	params: {
		listingId: string
	}
}

const ViewListing: FC<pageProps> = ({ params }) => {
	const [listingDetails, setListingDetails] = useState<any>({}); // Use appropriate types
	console.log(params.listingId);
	// const params = useParams();
  
	useEffect(() => {
	  const fetchListingDetails = async () => {
		try {
		  const postId = params.listingId; // Replace with the actual post ID
		  const postDocRef = doc(db, 'posts', postId);
		  const postDocSnapshot = await getDoc(postDocRef);
  
		  if (postDocSnapshot.exists()) {
			const data = postDocSnapshot.data();
			setListingDetails(data);
			console.log(data);
		  } else {
			console.log('Post not found!');
		  }
		} catch (error) {
		  console.error('Error fetching listing details:', error);
		}
	  };
  
	  fetchListingDetails();
	}, []); // Run the effect only once on component mount
  
	return (
	  <div>
		<div className="background-image" />
		<Navbar />
  
		<Container className="view-listing-container">
		  <Paper className="listing-details-paper">
			<h2>{listingDetails.title || 'N/A'}</h2>
			{/* Render listing details dynamically */}
			<div>
			  <strong>Description:</strong> {listingDetails.description || 'N/A'}
			</div>
  
			<div>
			  <strong>Category:</strong> {listingDetails.category || 'N/A'}
			</div>

			<div>
			  <strong>Contact:</strong> {listingDetails.contact || 'N/A'}
			</div>
  
			<div>
			  {/* <strong>Timestamp:</strong> {listingDetails.timestamp || 'N/A'} */}
			</div>
  
			{/* Display image from URL */}
			{listingDetails.imgUrl && (
			  <div>
				<img src={listingDetails.imgUrl} alt="Listing" style={{ maxWidth: '25%' }} />
			  </div>
			)}
		  </Paper>
		</Container>
	  </div>
	);
  }
  
  export default ViewListing;