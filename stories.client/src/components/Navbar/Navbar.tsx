import { Code, Group, NavLink } from '@mantine/core';
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
import classes from './Navbar.module.css';
import { Link } from 'react-router-dom';

const data = [
    { link: '/', label: 'Home', icon: IconHome },
    { link: '/tree', label: 'Family Tree', icon: IconTree },
    { link: '/directory', label: 'Family Directory', icon: IconMan },
    { link: '/search', label: 'Story Search', icon: IconSearch },
    { link: '/settings', label: 'Other Settings', icon: IconSettings },
];

export function Navbar() {
    const [active, setActive] = useState('Billing');

    const links = data.map((item) => (
        <a
            key={item.label}
            onClick={() => {
                setActive(item.label)
                window.location.href = item.link
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </a>
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