// pages/index.tsx

import React from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import Navbar from '../../components/Navbar';

const Home: React.FC = () => {
  return (
    <main className={styles.main}>
      <Navbar />
      {/* Other content of your app */}
    </main>
  );
};

export default Home;