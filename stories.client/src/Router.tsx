import { Route, Routes } from 'react-router-dom';
import FamilyDirectory from './pages/familyDirectory/FamilyDirectory';
import FamilyTree from './pages/familyTree/FamilyTree';

import './Router.css';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';

const router = [
    {path: '/', element: <HomePage />, },
    { path: '/tree', element: <FamilyTree />, },
    { path: '/directory', element: <FamilyDirectory />, },
    { path: '/signin', element: <SignInPage /> },
];

export function Router() {
    return (
        <div className="main-content">
            <Routes>
                {router.map((route: any) => (
                    <Route path={route.path} element={route.element} key={route.path} />
                ))}
            </Routes>
        </div>
        
    )
}