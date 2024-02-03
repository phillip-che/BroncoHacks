'use client'

import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from "../../components/Login";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';

export default function Home() {

  const auth = getAuth();
  const router = useRouter();
  const [userID, setUserID] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user && user.emailVerified) {
        setUserID(user.uid);
        router.push('/home');
      } else {
        setUserID("");
      }
    });
    
  }, [auth]);

  return (
    <main>
      {userID ? 
      <div className="homepage-container">
        <div className="background-image" />
        <Navbar />
      </div>
      : <div>
          <Navbar />
          <Login /> 
          <div className="background-image" />
        </div>}
    </main>
  );
};