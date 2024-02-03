'use client'
import React, { useState, useEffect } from 'react';
import { Container, Paper, List, ListItem, ListItemText, styled } from '@mui/material';
import db from '../../../database/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface Listing {
  id: number;
  title: string;
  category: string;
  description: string;
}

const categories = ['House', 'Tech', 'Funny', 'Other'];

const initialListings: Listing[] = [
	{ id: 1, title: 'House Listing 1', category: 'House', description: 'Description 1 for house' },
  ];

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
  padding: 20px;
  margin-left: 200px; /* Set to CategoriesContainer width */
  width: 100%;
  border-radius: 0;
`;

const ListingItem = styled(ListItem)`
  margin-bottom: 20px;
  background-color: #d1d1d1;
  &:hover {
    background-color: #91ac17;
  }
`;


const MarketplaceApp: React.FC = () => {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	
	// Cateogry filtering
	const filteredListings = selectedCategory
		? initialListings.filter(
			(listing) => listing.category.toLowerCase() === selectedCategory.toLowerCase()
		)
		: initialListings;

	return (
		<AppContainer>
		<CategoriesContainer>
			<h2>Categories</h2>
			<button onClick = {readData}>Blah</button>
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
				</ListingItem>
			))}
			</List>
		</ListingsContainer>
		</AppContainer>
	);
	};

	export default MarketplaceApp;