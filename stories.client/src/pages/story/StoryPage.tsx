import React, { useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Container, Group, Text, TextInput, Button, useMantineTheme, ActionIcon, Tooltip } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import { IconEdit, IconDownload, IconTag, IconX } from '@tabler/icons-react';
import StoryEditor from '../../components/story/StoryEditor';
import './StoryPage.css';

const StoryPage: React.FC = () => {
    const theme = useMantineTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const initialData = location.state?.initialData || {};
    const [readOnly, setReadOnly] = useState(location.state?.readOnly || false);

    const [title, setTitle] = useState(initialData?.title || '');
    const [storyLocation, setStoryLocation] = useState(initialData?.storyLocation || '');
    const [date, setDate] = useState<Date | null>(initialData?.storyDate || null);
    const [tags, setTags] = useState<string[]>(initialData?.storyTags || []);
    const [content, setContent] = useState(initialData?.storyText || '');

    const [newTag, setNewTag] = useState('');

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: content,
        editable: !readOnly,
    });

    const handleAddTag = () => {
        if (newTag && newTag.length <= 50 && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
            setNewTag('');
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleAddTag();
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const toggleEditMode = useCallback(() => {
        if (!readOnly) {
            console.log('Saving changes:', { title, storyLocation, date, tags, content: editor?.getHTML() });
        }
        setReadOnly(!readOnly);
        editor?.setEditable(!readOnly);
    }, [readOnly, title, storyLocation, date, tags, editor]);

    return (
        <Container size="lg" className="story-page">
            <Box className="edit-button-container">
                <Tooltip label={readOnly ? 'Edit Story' : 'Save Changes'}>
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
                    <Text className="story-title">{title}</Text>
                ) : (
                    <TextInput
                        className="story-input"
                        label="Story Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter story title"
                        size="lg"
                    />
                )}
            </Box>

            <Group mb="md" className="story-info">
                {readOnly ? (
                    <>
                        <Text size="sm"><b>Location:</b> {storyLocation}</Text>
                        <Text size="sm"><b>Date:</b> {date?.toLocaleDateString()}</Text>
                    </>
                ) : (
                    <>
                        <TextInput
                            className="story-input"
                            label="Story Location"
                            value={storyLocation}
                            onChange={(e) => setStoryLocation(e.target.value)}
                            placeholder="Enter story location"
                        />
                        <DatePickerInput
                            className="story-input"
                            label="Story Date"
                            value={date}
                            onChange={setDate}
                            placeholder="Pick a date"
                        />
                    </>
                )}
            </Group>

            <Box mb="xl" className="story-content">
                {readOnly ? (
                    <RichTextEditor editor={editor} className="story-editor">
                        <RichTextEditor.Content />
                    </RichTextEditor>
                ) : (
                    <StoryEditor content={content} />
                )}
            </Box>

            <Box mb="md" className="tag-container">
                <Text className="tag-title">Tags</Text>
                <div className="tag-list">
                    {tags.map((tag) => (
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
                    {!readOnly && (
                        <Group className="add-tag-group">
                            <TextInput
                                value={newTag}
                                onChange={(event) => setNewTag(event.currentTarget.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="New tag"
                                maxLength={50}
                                size="xs"
                                className="tag-input"
                            />
                            <Button
                                onClick={handleAddTag}
                                size="xs"
                                variant="filled"
                                color="primary"
                                className="add-tag-button"
                            >
                                Add Tag
                            </Button>
                        </Group>
                    )}
                </div>
            </Box>
        </Container>
    );
};

export default StoryPage;