// pages/index.tsx
import React from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import PostForm from '../../components/Post/postform'; // Updated import

const Home: React.FC = () => {
  return (
    <main className={styles.main}>
      <PostForm /> {/* Updated usage */}
      {/* Other content of your app */}
    </main>
  );
};

export default Home;
