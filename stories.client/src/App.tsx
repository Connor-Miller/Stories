import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import FamilyTree from './pages/familyTree/FamilyTree';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';


function App() {

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: Infinity,
            },
        },
    })

    return (
        <MantineProvider>
            <QueryClientProvider client={queryClient}>
                <MainApp />
                <ReactQueryDevtools />
            </QueryClientProvider>
        </MantineProvider>
        
    );

}

function MainApp() {


    return (
        <div className="App">
            <header className="App-header">
                <h1 className="text-4xl font-bold my-8">Family Tree</h1>
                <FamilyTree />
            </header>
        </div>
    );
}

export default App;