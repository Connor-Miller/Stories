// src/components/FamilyTree.tsx
import { Button, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import React, { useState } from 'react';
import AddPersonModal from '../../components/familyDirectory/AddPersonModal';
import PersonList from '../../components/familyDirectory/PersonList';
import { samplePeople } from '../../data/sampleData';
import { Person } from '../../data/types';

import '@mantine/core/styles.css'; // Import Mantine CSS


interface FamilyDirectoryProps {
}



const FamilyDirectory: React.FC<FamilyDirectoryProps> = () => {


    const [persons, setPersons] = useState<Person[]>(samplePeople);
    const [opened, { open, close }] = useDisclosure(false);

    const handleAddPerson = (person: Person) => {
        setPersons([...persons, person]);
    };

    return (
        <Container>
            <Button onClick={() => open()}>Add New Person</Button>
            
            <PersonList contacts={persons} />
            <AddPersonModal
                opened={opened}
                onClose={() => close()}
                onAddPerson={handleAddPerson}
                persons={samplePeople}
            />
        </Container>
    );
};


export default FamilyDirectory;
