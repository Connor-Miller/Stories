import DiscoverFamily from "../components/home/DiscoverFamily";
import HiddenDetails from "../components/home/HiddenDetails";
import SignInWithGoogle from "../components/login/SignInWithGoogle";

import './HomePage.css';

const HomePage: React.FC = () => {



    return (
        <div className="home">
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