import {
    Box,
    Container,
    Grid,
    Text,
    Title
} from '@mantine/core';
import React from 'react';
import SignInWithGoogle from '../components/login/SignInWithGoogle';
import './SignInPage.css';

const SignInPage: React.FC = () => {

    function onSignInSuccess(data: any) {
        console.log("DATA", data)
        //window.location.href = '/directory'
    }
    function onSignInError(error: Error) {
        console.log(error)
    }
     
    return (
        <Container size="xl" p={0} className="signin-container">
            <Grid gutter={0} className="signin-grid">
                <Grid.Col
                    span={{ base: 6, md: 12 }}
                    className="image-side"
                >
                    {/*<Box p="xl" h="100%">*/}
                    {/*    <Stack justify="space-between" h="100%">*/}
                    {/*        <div>*/}
                    {/*            <Title order={1} mb="xl">Our Legacy</Title>*/}
                    {/*            <Text size="lg">*/}
                    {/*                Make memories,<br />*/}
                    {/*                Save the experience,<br />*/}
                    {/*                Relive the joy,<br />*/}
                    {/*                At the touch of you fingertips!*/}
                    {/*            </Text>*/}
                    {/*        </div>*/}
                    {/*    </Stack>*/}
                    {/*</Box>*/}
                </Grid.Col>
                <Grid.Col span={{ base: 6, md: 12 }}>
                    <Box p="xl">
                        <Title order={2} mb="md">Welcome Back!</Title>
                        <Text mb="lg">Continue with Google to get started.</Text>

                        <SignInWithGoogle
                            onSuccess={onSignInSuccess}
                            onError={onSignInError}
                        />


                    </Box>
                </Grid.Col>
            </Grid>
        </Container>

    );
};

export default SignInPage;