import '../database/firebase'
import { signInWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import '../styles/Login.css'; // Adjust the path based on your project structure

const Login = () => {

    const [username, setUsername] = useState<string | null>("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const auth = getAuth();

    const handleLoginClick = async (e: any) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                // Signed in
                const user = userCredential.user;
                if(user) {
                    alert(user.displayName + " Signed In!");
                    setUsername(user.displayName);
                }
            })
            .catch((error) => {
                setError(error.message);
            });
        } catch (error) {
            console.error(error);
        }
    }

    const handleResetClick = async () => {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log("Password Reset Link Sent!")
        })
        .catch((error) => {
            console.error(error);
        });

    }

    return (
        <div className="login-container">
            <form>
                <h2>Login</h2>
                <div>
                    <label>Email:</label>
                    <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    
                </div>
                    <button type="button" className="button-login" onClick={handleLoginClick}>
                        Login
                    </button>
                    <button type="button" className="button-reset" onClick={handleResetClick}>
                        Reset Password
                    </button>
                    <Link className="create-account" href="/createaccount">Create Account</Link>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
  
    )
}

export default Login;