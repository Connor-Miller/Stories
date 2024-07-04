import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import './App.css';


import {
    AppShell,
    MantineColorsTuple,
    MantineProvider,
    createTheme
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

    // Dark Blue
    const primary: MantineColorsTuple = [
        '#f3f3f7','#e3e3e7','#c5c5d0','#a4a4b9','#8888a5','#777699','#6d6d94','#5c5c82','#525174','#464668'
    ];
    // Light Purple
    const secondary: MantineColorsTuple = [
        '#f1eeff','#dedaf6','#bbb2e9','#9587db','#7563d0','#624cc9','#5740c7','#4733b0','#3e2c9e','#35258c'
    ];
    // Light Green
    const tertiary: MantineColorsTuple = [
        '#ebfffb','#d7fdf6','#a9fdec','#79fde2','#5bfdda','#4cfdd5','#44fdd2','#37e1b9','#28c8a5','#00ad8d'
    ];

    const theme = createTheme({
        fontFamily: 'Greycliff CF, sans-serif',
        colors: {
            primary,
            secondary,
            tertiary
        },
    });


    return (
        <MantineProvider theme={theme }>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <AppShell
                        header={{ height: 60 }}
                        navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
                        padding={0}
                    >
                        <AppShell.Header>
                            <Header opened={opened} toggle={toggle} />
                        </AppShell.Header>
                        <AppShell.Navbar>
                            <Navbar />
                        </AppShell.Navbar>
                        <AppShell.Main className="main-app">
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