// Import React and other necessary modules
'use client'
import React, { useState, useEffect } from 'react';
import { Container, Paper, List, ListItem, ListItemText, styled } from '@mui/material';
import { Timestamp, collection, getDocs } from 'firebase/firestore';
import db from '../../../database/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Navbar from 'components/Navbar';
import '../home/page.css'

interface Listing {
  id: string;
  title: string;
  category: string;
  description: string;
  timestamp: Timestamp;
  price: number;
}

const categories = ['House', 'Tech', 'Funny', 'Other'];

// Simplified styling components
const AppContainer = styled(Container)``;
const CategoriesContainer = styled(Paper)``;
const CategoryList = styled(List)``;
const CategoryItem = styled(ListItem)``;
const ListingsContainer = styled(Paper)``;
const ListingItem = styled(ListItem)``;
const ListingDetails = styled('div')``;

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
  }, []);

  const filteredListings = selectedCategory
    ? listings.filter((listing) => listing.category.toLowerCase() === selectedCategory.toLowerCase())
    : listings;

  return (

	
	<div className="homepage-container">
    <div className="background-image" />
    <div className="AppContainer">
      <Navbar />
      <div className="CategoriesContainer">
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
      </div>

      <div className="ListingsContainer">
        <h2>Listings</h2>
        <List>
          {filteredListings.map((listing) => (
            <ListingItem key={listing.id}>
              <ListItemText primary={listing.title} secondary={listing.description} />
              <ListingDetails>
			  	<div>{listing.category}</div>
  				<div>{listing.timestamp && listing.timestamp.toDate().toLocaleString()}</div>
			  </ListingDetails>
            </ListingItem>
          ))}
        </List>
      </div>
    </div>
	</div>
  );
};

export default MarketplaceApp;
