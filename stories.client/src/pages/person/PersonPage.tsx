import { ActionIcon, Box, Button, Container, Group, Text, TextInput, Tooltip } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconDownload, IconEdit, IconTag, IconX } from '@tabler/icons-react';
import React, { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PersonPage.css';

const PersonPage: React.FC = () => {
    const location = useLocation();
    const initialData = location.state?.initialData || {};
    const [readOnly, setReadOnly] = useState(location.state?.readOnly || false);

    const [name, setName] = useState(initialData?.name || '');
    const [gender, setGender] = useState(initialData?.gender || '');
    const [birthday, setBirthday] = useState<Date | null>(initialData?.birthday || null);
    const [stories, setStories] = useState<string[]>(initialData?.stories || []);
    const [relatives, ] = useState<string[]>(initialData?.stories || []);

    const handleRemoveTag = (tagToRemove: string) => {
        setStories(stories.filter(tag => tag !== tagToRemove));
    };

    const toggleEditMode = useCallback(() => {
        if (!readOnly) {
            console.log('Saving changes:', { name, gender, birthday, stories, relatives });
        }
        setReadOnly(!readOnly);
    }, [readOnly, name, gender, birthday, stories, relatives]);

    return (
        <Container size="lg" className="story-page">
            <Box className="edit-button-container">
                <Tooltip label={readOnly ? 'Edit Person' : 'Save Changes'}>
                    <ActionIcon
                        onClick={toggleEditMode}
                        size="xl"
                        radius="xl"
                        variant="filled"
                        color={readOnly ? 'blue' : 'green'}
                        className="edit-button"
                    >
                        {readOnly ? <IconEdit size={20} /> : <IconDownload size={20} />}
                    </ActionIcon>
                </Tooltip>
            </Box>

            <Box mb="md" className="story-title-container">
                {readOnly ? (
                    <Text className="story-title">{name}</Text>
                ) : (
                    <TextInput
                        className="story-input"
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Name"
                        size="lg"
                    />
                )}
            </Box>

            <Group mb="md" className="story-info">
                {readOnly ? (
                    <>
                        <Text size="sm"><b>Gender:</b> {gender}</Text>
                        <Text size="sm"><b>Date:</b> {birthday?.toLocaleDateString()}</Text>
                    </>
                ) : (
                    <>
                        <TextInput
                            className="story-input"
                            label="Story Location"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            placeholder="Select Gender"
                        />
                        <DatePickerInput
                            className="story-input"
                            label="Birth Date"
                            value={birthday}
                            onChange={setBirthday}
                            placeholder="Pick a date"
                        />
                    </>
                )}
            </Group>


            <Box mb="md" className="tag-container">
                <Text className="tag-title">Tags</Text>
                <div className="tag-list">
                    {stories.map((tag) => (
                        <Tooltip key={tag} label={readOnly ? tag : 'Click to remove'}>
                            <Button
                                onClick={() => !readOnly && handleRemoveTag(tag)}
                                className="tag-button"
                                disabled={readOnly}
                                leftSection={<IconTag size={14} />}
                                rightSection={!readOnly && <IconX size={14} />}
                                color="primary"
                                variant="light"
                            >
                                {tag}
                            </Button>
                        </Tooltip>
                    ))}

                </div>
            </Box>
        </Container>
    );
};

export default PersonPage;