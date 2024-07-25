import { Code, Group } from '@mantine/core';
import {
    IconHome,
    IconLogout,
    IconMan,
    IconSearch,
    IconSettings,
    IconSwitchHorizontal,
    IconTree
} from '@tabler/icons-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './Navbar.module.css';
import { useAuth } from '../login/AuthContext';

const data = [
    { link: '/', label: 'Home', icon: IconHome },
    { link: '/tree', label: 'Family Tree', icon: IconTree },
    { link: '/directory', label: 'Family Directory', icon: IconMan },
    { link: '/search', label: 'Story Search', icon: IconSearch },
    { link: '/settings', label: 'Other Settings', icon: IconSettings },
];

type NavbarProps = {
    toggle: any;
}

const Navbar: React.FC<NavbarProps> = ({ toggle }) => {
    const auth = useAuth();

    const [active, setActive] = useState('Home');

    const links = data.map((item) => (
            <Link
                className={classes.link}
                data-active={item.label === active || undefined}
                to={item.link}
                key={item.label}
                onClick={() => {
                    setActive(item.label);
                    toggle();
                }}
            >
                <item.icon className={classes.linkIcon} stroke={1.5} />
                <span>{item.label}</span>
            </Link>
        
    ));

    return (
        <nav className={classes.navbar}>
            <div className={classes.navbarMain}>
                <Group className={classes.header} justify="space-between">
                    {/*<MantineLogo size={28} />*/}
                    <Code fw={700}>v3.1.2</Code>
                </Group>
                {links}
            </div>

            <div className={classes.footer}>
                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
                    <span>Change account</span>
                </a>

                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Logout</span>
                </a>
            </div>
        </nav>
    );
}

export default Navbar;