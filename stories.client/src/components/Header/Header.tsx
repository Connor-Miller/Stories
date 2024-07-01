import { Burger, Group, Image, Input, Title, useMantineColorScheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconMoonStars, IconSearch } from '@tabler/icons-react';
import { useState } from 'react';

type HeaderProps = {
    opened: boolean;
    toggle: any;
}

const Header: React.FC<HeaderProps> = ({ opened, toggle }) => {
    const { colorScheme, setColorScheme } = useMantineColorScheme();
    const isMobile = useMediaQuery(`(max-width: 600px)`);


    const [value, setValue] = useState('');

    return (
        <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Image src="./treeIconGreen.png" radius="md" h={50 } />
            <Title order={1}>Our Legacy</Title>
            {!isMobile && (
                <Input
                    placeholder="Search"
                    value={value}
                    onChange={(event) => setValue(event.currentTarget.value)}
                    leftSection={<IconSearch size={16} />}
                />
            )}
            <IconMoonStars
                style={{ marginLeft: 'auto', cursor: 'pointer' }}

                onClick={() => {
                    setColorScheme(colorScheme === 'light' ? 'dark' : 'light')
                }}
            />
        </Group>
    );
}

export default Header;