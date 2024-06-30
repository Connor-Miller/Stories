import { Burger, Group } from '@mantine/core';

type HeaderProps = {
    opened: boolean;
    toggle: any;
}

const Header: React.FC<HeaderProps> = ({ opened, toggle }) => {
    

    return (
        <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            
        </Group>
    );
}

export default Header;