'use client'

import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from "../../components/Login";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import PostForm from 'components/Post/postform';
import backgroundImage from '../../styles/cppbackgroundpic.jpg'

export default function Home() {

  const auth = getAuth();
  const router = useRouter();
  const [userID, setUserID] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user && user.emailVerified) {
        setUserID(user.uid);
        // router.push('/home');
      } 
      else{
        setUserID("");
      }
    });
    
  }, [auth]);

  return (
    <main>

      {userID ? 
      <div className="homepage-container">
        <div className="background-image" />
      {/* <main className={styles.main}> */}
        <Navbar />
        {/* Other content of your app */}
      {/* </main> */}
      </div>
      : <div>
          <Navbar />
          <Login /> 
          <div className="background-image" />
        </div>}
      {/* <SignUp /> */}
    </main>
  );
};