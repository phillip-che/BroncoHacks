// pages/index.tsx

import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import {FormContainer, Label, Input, Select, Button} from '../../../components/Post/styles'
import Navbar from '../../../components/Navbar';
import PostForm from 'components/Post/postform';

const Home: React.FC = () => {
  return (
    
    <div className="homepage-container">
      <div className="background-image"></div>
      <Navbar />
      <PostForm />
      {/* Other content of your app */}
    </div>    


  );
};

export default Home;