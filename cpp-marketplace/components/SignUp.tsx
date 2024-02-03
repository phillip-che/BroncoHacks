'use client'

import '../database/firebase'
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import '../styles/Signup.css'; // Adjust the path based on your project structure


const SignUp = () => {
    const auth = getAuth();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleCreateClick = async (e: any) => {
        e.preventDefault();

        if (!email.includes("@cpp.edu")) {
            alert("Must be a CPP email.");
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                if (auth.currentUser) {
                    sendEmailVerification(auth.currentUser)
                    .then(() => {
                        console.log("Email Verification Sent!");
                        alert("Check Email for Verification Link.");
                    });
                };
              updateProfile(user, { displayName: username });
            })
            .catch((error) => {
                setError(error.message);
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="signup-container">
                <form>
                <h2>Create Account</h2>
                <div>
                    <label>Username:</label>
                    <input type="username" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" placeholder='example@cpp.edu'value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                    <button type="button" className="button-signup" onClick={handleCreateClick}>
                        Sign Up
                    </button>
                </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
  
    )
}

export default SignUp;