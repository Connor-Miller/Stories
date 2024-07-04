import DiscoverFamily from "../components/home/DiscoverFamily";
import HiddenDetails from "../components/home/HiddenDetails";

import './HomePage.css';

export function HomePage() {
    return (
        <div className="home">
            <DiscoverFamily />
            <HiddenDetails />
        </div>            
    );
}