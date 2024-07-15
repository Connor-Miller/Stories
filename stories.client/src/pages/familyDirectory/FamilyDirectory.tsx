// src/components/FamilyTree.tsx
import { Button, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import React, { useState } from 'react';
import AddPersonModal from '../../components/familyDirectory/AddPersonModal';
import PersonList from '../../components/familyDirectory/PersonList';
import { samplePeople } from '../../data/sampleData';
import { Person } from '../../data/types';

import '@mantine/core/styles.css'; // Import Mantine CSS
import { useMutation, useQuery } from '@tanstack/react-query';
import { getToken } from '../../data/jwt';
import { useAuth } from '../../components/login/AuthContext';


interface FamilyDirectoryProps {
}



const FamilyDirectory: React.FC<FamilyDirectoryProps> = () => {

    const currentUser = useAuth().currentUser;

    const [persons, setPersons] = useState<Person[]>(samplePeople);
    const [opened, { open, close }] = useDisclosure(false);

    // Queries
    const getPersonListQuery = useQuery({
        queryKey: ['todos'],
        //queryFn: getTodos
    })

    // Mutations
    const addNewPersonMutation = useMutation({
        //mutationFn: postTodo,
        onSuccess: () => {
            // Invalidate and refetch
            //queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })

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
