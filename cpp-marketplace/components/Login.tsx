import '../database/firebase'
import { signInWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth'
import { useEffect, useState } from 'react';
import Link from 'next/link';

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
            setError(error.message);
        });

    }

    return (
        <div className="login-container">
            <h2>Login</h2>
                <form>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="button" onClick={handleResetClick}>
                        Reset Password
                    </button>
                </div>
                    <button type="button" onClick={handleLoginClick}>
                        Login
                    </button>
                    <Link href="/createaccount">Create Account</Link>
                </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
  
    )
}

export default Login;