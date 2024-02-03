'use client'

import '../database/firebase'
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth'
import { useEffect, useState } from 'react';
import Link from 'next/link';

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
            <h2>Create Account</h2>
                <form>
                <div>
                    <label>Username:</label>
                    <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                    <button type="button" onClick={handleCreateClick}>
                        Sign Up
                    </button>
                    <Link href="/">Home</Link>
                </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
  
    )
}

export default SignUp;