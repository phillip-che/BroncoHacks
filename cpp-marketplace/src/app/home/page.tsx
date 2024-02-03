// Import React and other necessary modules
'use client'
import React, { useState, useEffect } from 'react';
import { Container, Paper, List, ListItem, ListItemText, styled } from '@mui/material';
import { Timestamp, collection, getDocs } from 'firebase/firestore';
import { db } from '../../../database/firebase';
import Navbar from 'components/Navbar';
import '../home/page.css'
import Link from 'next/link';

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
        <CategoryList className="CategoryList">
          <CategoryItem className="CategoryItem" onClick={() => setSelectedCategory(null)}>
            <ListItemText primary="All" />
          </CategoryItem>
          {categories.map((category) => (
            <CategoryItem className="CategoryItem" key={category} onClick={() => setSelectedCategory(category)}>
              <ListItemText primary={category} />
            </CategoryItem>
          ))}
        </CategoryList>
      </div>

      <div className="ListingsContainer">
        <List>
          {filteredListings.map((listing) => (
			<Link href={`/listing/${listing.id}`} key={listing.id} >
				<ListingItem className="ListingItem" key={listing.id}>
				<ListItemText primary={listing.title} />
				<ListingDetails className="ListingDetails">
					<div>{listing.category}</div>
					<div>{listing.timestamp && listing.timestamp.toDate().toLocaleString()}</div>
				</ListingDetails>
				</ListingItem>
			</Link>
          ))}
        </List>
      </div>
    </div>
	</div>
  );
};

export default MarketplaceApp;
