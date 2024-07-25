// src/components/FamilyTree.tsx
import { Button, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import AddPersonModal from '../../components/familyDirectory/AddPersonModal';
import PersonList from '../../components/familyDirectory/PersonList';
import { useAuth } from '../../components/login/AuthContext';
import { getFollowedPersonsList } from '../../data/familyAPI';
import { fetchToken } from '../../data/jwt';
import { samplePeople } from '../../data/sampleData';
import { Person } from '../../data/types';

import '@mantine/core/styles.css'; // Import Mantine CSS


interface FamilyDirectoryProps {
}



const FamilyDirectory: React.FC<FamilyDirectoryProps> = () => {

    const currentUser = useAuth().currentUser;

    const [token, setToken] = useState<any>();
    const [persons, setPersons] = useState<Person[]>(samplePeople);
    const [opened, { open, close }] = useDisclosure(false);

    // Queries
    const getPersonListQuery = useQuery({
        queryKey: ['todos'],
        queryFn: () => getFollowedPersonsList(token),
        enabled: !!token
    })

    // Mutations
    //const addNewPersonMutation = useMutation({
    //    //mutationFn: postTodo,
    //    onSuccess: () => {
    //        // Invalidate and refetch
    //        //queryClient.invalidateQueries({ queryKey: ['todos'] })
    //    },
    //})

    const handleAddPerson = (person: Person) => {
        setPersons([...persons, person]);
    };

    useEffect(() => {
        fetchToken(currentUser!)
            .then((data) => setToken(data))
    }, [currentUser])

    useEffect(() => {
        if (token) {
            getPersonListQuery.refetch()
        }
    }, [token])
    
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
