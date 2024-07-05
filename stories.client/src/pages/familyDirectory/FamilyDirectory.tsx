// src/components/FamilyTree.tsx
import { Container } from '@mantine/core';
import React, { useState } from 'react';
import AddPersonForm from '../../components/familyDirectory/AddPersonForm';
import PersonList from '../../components/familyDirectory/PersonList';
import { Person } from '../../data/types';
import { samplePeople } from '../../data/sampleData';


interface FamilyDirectoryProps {
}



const FamilyDirectory: React.FC<FamilyDirectoryProps> = () => {

    const [contacts, setContacts] = useState<Person[]>(samplePeople);

    const handleAddContact = (contact: Person) => {
        setContacts((prevContacts) => [...prevContacts, contact]);
    };

    return (
        <Container>
            <PersonList contacts={contacts} />
        </Container>
    );
};


export default FamilyDirectory;
