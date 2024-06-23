import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FamilyTree from './pages/familyTree/FamilyTree';

const router = createBrowserRouter([
    {
        path: '/',
        element: <FamilyTree />,
    },
]);

export function Router() {
    return <RouterProvider router={router} />;
}