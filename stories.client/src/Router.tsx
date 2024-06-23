import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FamilyTree from './pages/familyTree/FamilyTree';
import { HomePage } from './pages/HomePage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/tree',
        element: <FamilyTree />,
    },
]);

export function Router() {
    return (
        <div className="main-content">
            <RouterProvider
                router={router}
            />
        </div>
        
    )
    
}