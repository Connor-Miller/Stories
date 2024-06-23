import { ColorSchemeToggle } from "../components/home/ColorSchemeToggle";
import { Welcome } from "../components/home/Welcome";

export function HomePage() {
    return (
        <>
            <Welcome />
            <ColorSchemeToggle />
        </>
    );
}