import { Button } from '@mantine/core';
import { signInWithPopup } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth, provider } from './firebaseConfig';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../../data/userApi';
import { AppUser } from '../../data/types';
import { useAuth } from './AuthContext';
import { fetchToken } from '../../data/jwt';


interface SignInWithGoogleProps {
    onSuccess?: (user: any) => void;
    onError?: (error: Error) => void;
}

const SignInWithGoogle: React.FC<SignInWithGoogleProps> = ({ onSuccess, onError }) => {

    const currentUser = useAuth().currentUser;

    const [token, setToken] = useState<any>("");

    const createUserMutation = useMutation({
        mutationFn: (appUser: AppUser) => loginUser(token, appUser),
    })

    useEffect(() => {
        fetchToken(currentUser!)
            .then((data) => {
                setToken(data);
                return data;
            })
    }, [currentUser])

    const handleSignIn = async () => {

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            if (onSuccess) {
                onSuccess(user);
                 
                const appUser: AppUser = {
                    email: user.email ?? "",
                    displayName: user.displayName ?? "",

                }
                createUserMutation.mutate(appUser);
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