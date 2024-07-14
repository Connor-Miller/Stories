import { Button } from '@mantine/core';
import { signInWithPopup } from 'firebase/auth';
import React from 'react';
import { auth, provider } from './firebaseConfig';


interface SignInWithGoogleProps {
    onSuccess?: (user: any) => void;
    onError?: (error: Error) => void;
}

const SignInWithGoogle: React.FC<SignInWithGoogleProps> = ({ onSuccess, onError }) => {
    const handleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            if (onSuccess) {
                onSuccess(user);
            }
        } catch (error) {
            if (onError) {
                onError(error as Error);
            }
        }
    };

    return (
        <Button onClick={handleSignIn}>
            Sign in with Google
        </Button>
    );
};

export default SignInWithGoogle;