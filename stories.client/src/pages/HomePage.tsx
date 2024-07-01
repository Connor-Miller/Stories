import { ColorSchemeToggle } from "../components/home/ColorSchemeToggle";
import DiscoverFamily from "../components/home/DiscoverFamily";

import './HomePage.css'

export function HomePage() {
    return (
        <div className="home">
            <DiscoverFamily />
            <ColorSchemeToggle />
        </div>            
    );
}