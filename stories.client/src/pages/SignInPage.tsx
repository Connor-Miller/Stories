import { Container, Paper, Stack, Text, Title } from '@mantine/core';
import React from 'react';
import SignInWithGoogle from '../components/login/SignInWithGoogle';

const SignInPage: React.FC = () => {

    function onSignInSuccess() {
        window.location.href = '/directory'
    }
    function onSignInError(error: Error) {
        console.log(error)
    }
     
    return (
        <Container size="xs" mt="xl">
            <Paper radius="md" p="xl" withBorder>
                <Stack align="center">
                    <Title order={2}>Welcome to Our Legacy</Title>
                    <Text size="md">
                        Sign in to access your account and preserve your legacy.
                    </Text>
                    <SignInWithGoogle
                        onSuccess={() => onSignInSuccess()}
                        onError={(error) => onSignInError(error)}
                    />
                </Stack>
            </Paper>
        </Container>
    );
};

export default SignInPage;