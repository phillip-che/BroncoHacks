'use client'

import db from "../../database/firebase";
import styles from "./page.module.css";
import Login from "../../components/Login";
import { useEffect, useState } from 'react';
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore"; 

export default function Home() {

  const [posts, setPosts] = useState([]);

  // const savePost = async () => {
  //   const docRef = await addDoc(collection(db, "posts"), {
  //     username: "test username",
  //     description: "test description"
  //   });
  // };
  
  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getDocs(collection(db, "posts"));
      console.log(posts);

      // const postsData = posts.docs.map((doc) => ({
      //   id: doc.id,
      //   ...doc.data(),
      // }));

      // const postArray: any = [];
      // posts.forEach((post) => {
      //   postArray.push(post);
      // });
      // console.log(postArray);
      // setPosts(postArray);
      
    };
    fetchPosts();
  }, []);

  return (
    <main className={styles.main}>
      <Login />
    </main>
  );
}
