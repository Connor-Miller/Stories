// src/components/FamilyTree.tsx
import { Button, Container } from '@mantine/core';
import React, { useState } from 'react';
import AddPersonModal from '../../components/familyDirectory/AddPersonModal';
import PersonList from '../../components/familyDirectory/PersonList';
import { samplePeople, sampleStories } from '../../data/sampleData';
import { Person } from '../../data/types';

import '@mantine/core/styles.css'; // Import Mantine CSS
import { useDisclosure } from '@mantine/hooks';


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
            <AddPersonModal
                opened={opened}
                onClose={() => close()}
                onAddPerson={handleAddPerson}
                stories={sampleStories}
            />
            <PersonList contacts={persons} />
        </Container>
    );
};


export default FamilyDirectory;
