import { Container, Paper, Stack, Text, Title } from '@mantine/core';
import React from 'react';
import SignInWithGoogle from '../components/login/SignInWithGoogle';

const SignInPage: React.FC = () => {

     
    return (
        <Container size="xs" mt="xl">
            <Paper radius="md" p="xl" withBorder>
                <Stack align="center" spacing="lg">
                    <Title order={2}>Welcome to Our Legacy</Title>
                    <Text size="md" align="center">
                        Sign in to access your account and preserve your legacy.
                    </Text>
                    <SignInWithGoogle
                        onSuccess={() => window.location.href = '/directory'}
                        onError={(error) => console.log(error)}
                    />
                </Stack>
            </Paper>
        </Container>
    );
};

export default SignInPage;