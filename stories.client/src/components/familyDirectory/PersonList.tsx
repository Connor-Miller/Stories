import React from 'react';
import { Box, Card, Text } from '@mantine/core';
import { Person } from '../../data/types';

interface ContactsListProps {
    contacts: Person[];
}

const PersonList: React.FC<ContactsListProps> = ({ contacts }) => {
    return (
        <Box sx={{ maxWidth: 400 }} mx="auto" mt="md">
            {contacts.map((contact) => (
                <Card key={contact.id} shadow="sm" p="lg" mb="md">
                    <Text weight={500}>{contact.name}</Text>
                    <Text>{contact.email}</Text>
                    <Text>{contact.phone}</Text>
                </Card>
            ))}
        </Box>
    );
};

export default PersonList;
