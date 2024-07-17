// src/components/FamilyTree.tsx
import { Button, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import React, { useEffect, useState } from 'react';
import AddPersonModal from '../../components/familyDirectory/AddPersonModal';
import PersonList from '../../components/familyDirectory/PersonList';
import { samplePeople } from '../../data/sampleData';
import { Person } from '../../data/types';

import '@mantine/core/styles.css'; // Import Mantine CSS
import { useMutation, useQuery } from '@tanstack/react-query';
import { getToken } from '../../data/jwt';
import { useAuth } from '../../components/login/AuthContext';
import { getFollowedPersonsList } from '../../data/familyAPI';


interface FamilyDirectoryProps {
}



const FamilyDirectory: React.FC<FamilyDirectoryProps> = () => {

    const currentUser = useAuth().currentUser;

    const [token, setToken] = useState<string>("");
    const [persons, setPersons] = useState<Person[]>(samplePeople);
    const [opened, { open, close }] = useDisclosure(false);

    // Queries
    const getPersonListQuery = useQuery({
        queryKey: ['todos'],
        queryFn: () => getFollowedPersonsList(token),
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
        const fetchToken = async () => {
            if (currentUser) {
                const newToken = await getToken(currentUser);
                setToken(newToken ?? "");
                getPersonListQuery.refetch()
            }
        };

        fetchToken();
        
    },[currentUser])
    
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
            <>{console.log(getPersonListQuery.data)}</>
        </Container>
    );
};


export default FamilyDirectory;
