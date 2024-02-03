import { User, getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react';
import db, { auth } from "../database/firebase";
import firebase from 'firebase/compat/app';

const Login = () => {
    const auth = getAuth();

    const [username, setUsername] = useState<string | null>("");
    const [emailInput, setUserInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginClick = async (e: any) => {
        e.preventDefault();
        try {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                if(user) {
                    setUsername(user.displayName);
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        
    }, []);

    return (
        <div>
            LOGIN PAGE
        </div>
    )
}

export default Login;