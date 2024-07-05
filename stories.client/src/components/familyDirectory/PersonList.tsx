import { Table } from '@mantine/core';
import React from 'react';
import { Person } from '../../data/types';
import PersonItem from './PersonItem';

interface ContactsListProps {
    contacts: Person[];
}

const PersonList: React.FC<ContactsListProps> = ({ contacts }) => {


    return (
        <Table.ScrollContainer minWidth="300px">
            <Table verticalSpacing="sm">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Relatives</Table.Th>
                        <Table.Th>Stories</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {contacts.map((person: Person) => (
                        <PersonItem person={person} key={person.id} />
                    ))}
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
};

export default PersonList;
