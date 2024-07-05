import { Avatar, Group, Select, Table, Text, rem } from '@mantine/core';
import React from 'react';
import { Person } from '../../data/types';
import { IconBook, IconDots, IconFriends } from '@tabler/icons-react';

interface PersonItemProps {
    person: Person;
}

const PersonItem: React.FC<PersonItemProps> = ({ person }) => {

    // Transform person.stories to the format expected by Select component
    const storyOptions = person.stories?.map(story => ({
        value: story.id,
        label: story.title
    }));
    // Transform person.relatives to the format expected by Select component
    const relativeOptions = person.relatives?.map(relative => ({
        value: relative.id,
        label: relative.name
    }));

    const friendsIcon = <IconFriends style={{ width: rem(16), height: rem(16) }} />;
    const bookIcon = <IconBook style={{ width: rem(16), height: rem(16) }} />;


    return (
        <Table.Tr key={person.id} >
            <Table.Td>
                <Group gap="sm">
                    <Avatar size={40} src="./user.png" radius={40} />
                    <div>
                        <Text fz="sm" fw={500}>
                            {person.name}
                        </Text>
                        <Text fz="xs" c="dimmed">
                            {person.birthday?.toLocaleDateString()}
                        </Text>
                    </div>
                </Group>
            </Table.Td>
            <Table.Td>
                <Select
                    data={relativeOptions}
                    placeholder={`${relativeOptions?.length} relatives added`}
                    allowDeselect={false}
                    leftSection={friendsIcon}
                    searchable
                    nothingFoundMessage="Nothing found..."
                />
            </Table.Td>
            <Table.Td>
                <Select
                    data={storyOptions}
                    placeholder={`${storyOptions?.length} stories added`}
                    allowDeselect={false}
                    leftSection={bookIcon}
                    searchable
                    nothingFoundMessage="Nothing found..."
                />
            </Table.Td>
            <Table.Td>
                <IconDots />
            </Table.Td>
            
        </Table.Tr>
    );
};

export default PersonItem;
