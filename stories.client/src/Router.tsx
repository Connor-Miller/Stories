import { Route, Routes } from 'react-router-dom';
import FamilyTree from './pages/familyTree/FamilyTree';
import { HomePage } from './pages/HomePage';

//const router = createBrowserRouter([
//    {
//        path: '/',
//        element: <HomePage />,
//    },
//    {
//        path: '/tree',
//        element: <FamilyTree />,
//    },
//]);
const router = [
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/tree',
        element: <FamilyTree />,
    },
];

export function Router() {
    return (
        <div className="main-content">
            <Routes>
                {router.map((route: any) => (
                    <Route path={route.path} element={route.element} key={route.path } />
                ))}
            </Routes>
            {/*<RouterProvider*/}
            {/*    router={router}*/}
            {/*/>*/}
        </div>
        
    )
    
}