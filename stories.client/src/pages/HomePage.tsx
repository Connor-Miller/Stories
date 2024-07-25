import DiscoverFamily from "../components/home/DiscoverFamily";
import HiddenDetails from "../components/home/HiddenDetails";
import SignInWithGoogle from "../components/login/SignInWithGoogle";

import './HomePage.css';
import FamilyLegacyComponent from "./OurLegacy";

const HomePage: React.FC = () => {



    return (
        <div className="home">
            <FamilyLegacyComponent />
            <DiscoverFamily />
            <HiddenDetails />
            <SignInWithGoogle
                onSuccess={(user) => console.log(user)}
                onError={(error) => console.log(error) }
            />
        </div>            
    );
}

export default HomePage;