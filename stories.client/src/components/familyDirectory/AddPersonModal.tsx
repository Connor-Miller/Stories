import React from 'react';
import { useForm } from '@mantine/form';
import { Button, Group, Modal, TextInput, Select } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { Person, Story } from '../../data/types';

import '@mantine/core/styles.css'; // Import Mantine CSS
import '@mantine/dates/styles.css';


interface AddPersonModalProps {
    opened: boolean;
    onClose: () => void;
    onAddPerson: (person: Person) => void;
    stories: Story[];
}

const AddPersonModal: React.FC<AddPersonModalProps> = ({ opened, onClose, onAddPerson, stories }) => {
    const form = useForm({
        initialValues: {
            name: '',
            gender: '',
            birthday: new Date(),
            storyIds: [] as string[]
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
            stories: stories.filter(story => values.storyIds.includes(story.id)),
            relatives: []
        };
        onAddPerson(newPerson);
        form.reset();
        onClose();
    };

    return (
        <div>
            <Modal
                opened={opened}
                onClose={onClose}
                title="Add New Person"
                mih={100 }
                miw={100}
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
                        label="Stories"
                        placeholder="Select stories"
                        data={stories.map(story => ({ value: story.id, label: story.title }))}
                        {...form.getInputProps('storyIds')}
                        multiple
                    />

                    <Group mt="md">
                        <Button type="submit">Add Person</Button>
                    </Group>
                </form>
            </Modal>
        </div>
        
    );
};

export default AddPersonModal;