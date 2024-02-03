// pages/index.tsx

import React from 'react';
import Image from 'next/image';
//import styles from './page.module.css';
import Navbar from '../../components/Navbar';
import PostForm from 'components/Post/postform';
import backgroundImage from '../../styles/cppbackgroundpic.jpg'

const Home: React.FC = () => {
  return (
    <div className="homepage-container">
      <div className="background-image"></div>
    {/* <main className={styles.main}> */}
      <Navbar />
      {/* Other content of your app */}
    {/* </main> */}
    </div>
  );
};

export default Home;