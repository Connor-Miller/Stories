import { Button } from "@mantine/core";
import DiscoverFamily from "../components/home/DiscoverFamily";
import HiddenDetails from "../components/home/HiddenDetails";

import './HomePage.css';

export function HomePage() {

    function signOut() {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
    }

    return (
        <div className="home">
            <DiscoverFamily />
            <HiddenDetails />
            <div className="g-signin2" data-onsuccess="onSignIn"></div>
            <Button onClick={signOut}>
               Signout
            </Button>
        </div>            
    );
}