import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import './App.css';


import {
    AppShell,
    MantineProvider
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';
import Header from './components/Header/Header';
import { Navbar } from './components/Navbar/Navbar';


function App() {

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: Infinity,
            },
        },
    })
    const [opened, { toggle }] = useDisclosure();


    return (
        <MantineProvider>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <AppShell
                        header={{ height: 60 }}
                        navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
                        padding="md"
                    >
                        <AppShell.Header>
                            <Header opened={opened} toggle={toggle} />
                        </AppShell.Header>
                        <AppShell.Navbar p="md">
                            <Navbar />
                        </AppShell.Navbar>
                        <AppShell.Main>
                            <Router />
                        </AppShell.Main>
                    </AppShell>
                </BrowserRouter>               
                <ReactQueryDevtools />
            </QueryClientProvider>
        </MantineProvider>
        
    );

}

export default App;