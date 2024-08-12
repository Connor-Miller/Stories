import { Button } from '@mantine/core';
import React from 'react';
import { Person } from '../../data/types';
import PersonItem from './PersonItem';

interface ContactsListProps {
    contacts: Person[];
}

const PersonList: React.FC<ContactsListProps> = ({ contacts }) => {

    return (
        <div className="mx-auto max-w-md bg-gray-100 p-4 font-sans">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg font-semibold">24 People</h1>
                <Button>New Person +</Button>
            </div>

            <div className="flex mb-4">
                <button className="bg-white px-4 py-2 rounded-full mr-2 text-blue-500 font-medium">
                    3 Active
                </button>
                <button className="bg-gray-200 px-4 py-2 rounded-full text-gray-600">
                    21 Archive
                </button>
            </div>

            <div className="space-y-4">
                {contacts.map((person) => (
                    <PersonItem person={person} key={person.id} />
                ))}
            </div>
        </div>
    );
};

export default PersonList;
