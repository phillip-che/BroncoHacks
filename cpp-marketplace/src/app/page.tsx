'use client'

import '../../database/firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import styles from "./page.module.css";
import Login from "../../components/Login";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
      } 
    });

  }, [auth]);

  return (
    <main className={styles.main}>
      {userID ? <div> LOGGED IN. </div> : <div> <Login /> </div>}
      {/* <SignUp /> */}
    </main>
  );
}
