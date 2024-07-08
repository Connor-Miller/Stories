// src/components/SignIn.js
import { Button } from '@mantine/core';
import { GoogleAuthProvider, getRedirectResult, signInWithRedirect } from "firebase/auth";
import React, { useEffect } from 'react';
import { auth, provider } from './firebaseConfig';

const SignIn: React.FC = () => {
    const handleSignIn = () => {
        signInWithRedirect(auth, provider);
    };

    useEffect(() => {
        const checkSignInResult = async () => {
            try {
                const result = await getRedirectResult(auth);
                if (result) {
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential?.accessToken;
                    const user = result.user;
                    console.log("User Info:", user);
                }
            } catch (error) {
                console.error("Error handling sign-in redirect:", error);
            }
        };

        checkSignInResult();
    }, []);

    return (
        <div>
            <Button onClick={handleSignIn}>Sign in with Google</Button>
        </div>
    );
};

export default SignIn;
