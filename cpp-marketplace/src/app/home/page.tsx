'use client'
import React, { useState, useEffect } from 'react';
import { Container, Paper, List, ListItem, ListItemText, styled } from '@mui/material';
import { Timestamp, collection, getDocs } from 'firebase/firestore';
import db from '../../../database/firebase';
import Navbar from '../../../components/Navbar';


interface Listing {
  id: string;
  title: string;
  category: string;
  description: string;
  timestamp: Timestamp;
  price: number;
}

const categories = ['House', 'Tech', 'Funny', 'Other'];

const AppContainer = styled(Container)`
  display: flex;
  overflow: auto; /* Enable scrolling for the entire content */
`;

const CategoriesContainer = styled(Paper)`
  background-color: gray;
  height: 100%;
  width: 200px;
  padding-left: 0px;
  border-radius: 0;
  text-align: center;
`;

const CategoryList = styled(List)`
  padding: 0;
`;

const CategoryItem = styled(ListItem)`
  cursor: pointer;
  background-color: gray;
  color: #fff;
  width: 200px;
  padding-left: 15px;

  &:hover {
    background-color: #d1d1d1;
  }
`;

const ListingsContainer = styled(Paper)`
  padding: 40px; /* Increased padding for larger dimensions */
  margin-left: 200px; /* Set to CategoriesContainer width */
  width: calc(100% - 200px); /* Adjust the width based on CategoriesContainer width */
  border-radius: 0;
`;

const ListingItem = styled(ListItem)`
  margin-bottom: 20px;
  height: 400px;
  background-color: #d1d1d1;
  position: relative; /* Position relative for absolute positioning of category and timestamp */
  &:hover {
    background-color: #91ac17;
  }
`;

const ListingDetails = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 5px;
  font-size: 12px; /* Smaller font size */
`;

const MarketplaceApp: React.FC = () => {
	const [listings, setListings] = useState<Listing[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
	useEffect(() => {
	  const fetchData = async () => {
		try {
		  const postsRef = collection(db, 'posts');
		  const snapshot = await getDocs(postsRef);
		  const posts = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Listing[];
		  setListings(posts);
		} catch (error) {
		  console.error('Error fetching data:', error);
		}
	  };
  
	  fetchData();
	}, []); // Run the effect only once on component mount
  
	// Category filtering
	const filteredListings = selectedCategory
	  ? listings.filter((listing) => listing.category.toLowerCase() === selectedCategory.toLowerCase())
	  : listings;
  
	return (
	  <AppContainer>
		
		<CategoriesContainer>
		  <h2>Categories</h2>
		  <CategoryList>
			<CategoryItem onClick={() => setSelectedCategory(null)}>
			  <ListItemText primary="All" />
			</CategoryItem>
			{categories.map((category) => (
			  <CategoryItem key={category} onClick={() => setSelectedCategory(category)}>
				<ListItemText primary={category} />
			  </CategoryItem>
			))}
		  </CategoryList>
		</CategoriesContainer>
  
		<ListingsContainer>
		  <h2>Listings</h2>
		  <List>
			{filteredListings.map((listing) => (
			  <ListingItem key={listing.id}>
				<ListItemText primary={listing.title} secondary={listing.description} />
				<ListingDetails>
				  <div>{listing.category}</div>
				  <div>{listing.timestamp.toDate().toLocaleString()}</div>
				</ListingDetails>
			  </ListingItem>
			))}
		  </List>
		</ListingsContainer>
		
	  </AppContainer>
	);
  };
  
  export default MarketplaceApp;