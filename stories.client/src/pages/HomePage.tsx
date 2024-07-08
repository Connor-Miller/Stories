import DiscoverFamily from "../components/home/DiscoverFamily";
import HiddenDetails from "../components/home/HiddenDetails";
import SignIn from "../components/login/SignIn";

import './HomePage.css';

export function HomePage() {



    return (
        <div className="home">
            <DiscoverFamily />
            <HiddenDetails />
            <SignIn />
        </div>            
    );
}