// src/components/FamilyTree.tsx
import { Container } from '@mantine/core';
import React, { useState } from 'react';
import AddPersonForm from '../../components/familyDirectory/AddPersonForm';
import PersonList from '../../components/familyDirectory/PersonList';
import { Person } from '../../data/types';


interface FamilyDirectoryProps {
}

const sampleContacts: Person[] = [
    {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "123-456-7890"
    },
    {
        id: "2",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "234-567-8901"
    },
    {
        id: "3",
        name: "Michael Johnson",
        email: "michael.johnson@example.com",
        phone: "345-678-9012"
    },
    {
        id: "4",
        name: "Emily Davis",
        email: "emily.davis@example.com",
        phone: "456-789-0123"
    },
    {
        id: "5",
        name: "William Brown",
        email: "william.brown@example.com",
        phone: "567-890-1234"
    }
];


const FamilyDirectory: React.FC<FamilyDirectoryProps> = () => {

    const [contacts, setContacts] = useState<Person[]>(sampleContacts);

    const handleAddContact = (contact: Person) => {
        setContacts((prevContacts) => [...prevContacts, contact]);
    };

    return (
        <Container>
            <AddPersonForm onAddContact={handleAddContact} />
            <PersonList contacts={contacts} />
        </Container>
    );
};


export default FamilyDirectory;
