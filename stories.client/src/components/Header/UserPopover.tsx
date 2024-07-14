import { Avatar, Button, Popover, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconLogin, IconLogout, IconSettings, IconUserCircle } from '@tabler/icons-react';
import { useAuth } from '../login/AuthContext';

const UserPopover: React.FC = () => {
    const {currentUser, signOut} = useAuth();

    const [opened, { close, open }] = useDisclosure(false);

    const handleLogout = () => {
        signOut();
        close();
    };

    const handleLogin = () => {
        // Implement your login logic here
        window.location.href = '/signin'
        close();
    };

    return (
        <Popover width={200} position="bottom" withArrow shadow="md" opened={opened}>
            <Popover.Target>
                {currentUser ? (
                    <Avatar
                        src={currentUser.photoURL}
                        alt="Google User Image"
                        onMouseEnter={open}
                        style={{ cursor: 'pointer' }}
                    />
                ): (
                    <IconUserCircle
                        onMouseEnter = { open }
                        style = {{ cursor: 'pointer' }}
                    />
                )}
                
            </Popover.Target>
            <Popover.Dropdown style={{ pointerEvents: 'auto' }} onMouseLeave={close}>
                {currentUser ? (
                    <Stack>
                        <Text size="sm">Welcome, {currentUser.displayName}!</Text>
                        <Button
                            leftSection={<IconSettings size={16} />}
                            variant="light"
                            size="xs"
                            fullWidth
                        >
                            User Settings
                        </Button>
                        <Button
                            leftSection={<IconLogout size={16} />}
                            variant="light"
                            color="red"
                            size="xs"
                            fullWidth
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </Stack>
                ) : (
                    <Button
                        leftSection={<IconLogin size={16} />}
                        variant="light"
                        size="sm"
                        fullWidth
                        onClick={handleLogin}
                    >
                        Go to Login
                    </Button>
                )}
            </Popover.Dropdown>
        </Popover>
    );
}

export default UserPopover;