import React, { useState } from 'react';
import { TextInput, Button, Box } from '@mantine/core';
import { Person } from '../../data/types';

interface ContactFormProps {
    onAddContact: (contact: Person) => void;
}



const AddPersonForm: React.FC<ContactFormProps> = ({ onAddContact }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newContact: Person = {
            id: Date.now().toString(),
            name,
            email,
            phone,
        };
        onAddContact(newContact);
        setName('');
        setEmail('');
        setPhone('');
    };

    return (
        <Box sx={{ maxWidth: 300 }} mx="auto">
            <form onSubmit={handleSubmit}>
                <TextInput
                    label="Name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                    required
                />
                <TextInput
                    label="Email"
                    placeholder="john.doe@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    required
                />
                <TextInput
                    label="Phone"
                    placeholder="123-456-7890"
                    value={phone}
                    onChange={(e) => setPhone(e.currentTarget.value)}
                    required
                />
                <Button type="submit" mt="md">Add Contact</Button>
            </form>
        </Box>
    );
};

export default AddPersonForm;
