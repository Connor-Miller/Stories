import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import { Button, Group, Modal, TextInput, Select } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { Person, Relationship } from '../../data/types';

import '@mantine/core/styles.css'; // Import Mantine CSS
import '@mantine/dates/styles.css';


interface AddPersonModalProps {
    opened: boolean;
    onClose: () => void;
    onAddPerson: (person: Person) => void;
    persons: Person[];
}

const AddPersonModal: React.FC<AddPersonModalProps> = ({ opened, onClose, onAddPerson, persons }) => {

    const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);
    const [selectedRelationship, setSelectedRelationship] = useState<string | null>(null);

    const form = useForm({
        initialValues: {
            name: '',
            gender: '',
            birthday: new Date(),
            storyIds: [] as string[],
            relationships: [] as Relationship[],

        },

        validate: {
            name: (value) => (value ? null : 'Name is required'),
            gender: (value) => (value ? null : 'Gender is required'),
            birthday: (value) => (value ? null : 'Birthday is required'),
        },
    });

    const handleSubmit = (values: typeof form.values) => {
        const newPerson: Person = {
            id: Date.now().toString(),
            name: values.name,
            gender: values.gender,
            birthday: values.birthday,
        };
        onAddPerson(newPerson);
        form.reset();
        onClose();
    };
    const handleAddRelationship = () => {
        if (selectedPersonId && selectedRelationship) {
            form.setFieldValue('relationships', [
                ...form.values.relationships,
                {
                    fromId: "self",
                    toId: selectedPersonId,
                    relationship: selectedRelationship
                },
            ]);
            setSelectedPersonId(null);
            setSelectedRelationship(null);
        }
    };

    return (
        <div>
            <Modal
                opened={opened}
                onClose={onClose}
                title="Add New Person"
                className="modal-container"
            >
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput
                        label="Name"
                        placeholder="Enter name"
                        {...form.getInputProps('name')}
                    />

                    <Select
                        label="Gender"
                        placeholder="Select gender"
                        data={[
                            { value: 'Male', label: 'Male' },
                            { value: 'Female', label: 'Female' },
                            { value: 'Other', label: 'Other' }
                        ]}
                        {...form.getInputProps('gender')}
                    />

                    <DatePicker
                        {...form.getInputProps('birthday')}
                    />

                    <Select
                        label="Select Person"
                        placeholder="Select a person"
                        data={persons.map(person => ({ value: person.id, label: person.name }))}
                        value={selectedPersonId}
                        onChange={setSelectedPersonId}
                    />

                    <Select
                        label="Select Relationship"
                        placeholder="Select relationship"
                        data={[
                            { value: 'Parent', label: 'Parent' },
                            { value: 'Child', label: 'Child' },
                            { value: 'Spouse/Partner', label: 'Spouse/Partner' }
                        ]}
                        value={selectedRelationship}
                        onChange={setSelectedRelationship}
                    />

                    <Button onClick={handleAddRelationship} disabled={!selectedPersonId || !selectedRelationship}>
                        Add Relationship
                    </Button>

                    <ul>
                        {form.values.relationships.map((rel, index) => (
                            <li key={index}>
                                {persons.find(person => person.id === rel.toId)?.name} - {rel.relationship}
                            </li>
                        ))}
                    </ul>

                    <Group mt="md">
                        <Button type="submit">Add Person</Button>
                    </Group>
                </form>
            </Modal>
        </div>
        
    );
};

export default AddPersonModal;