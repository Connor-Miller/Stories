import React from 'react';
import { Person, Story } from '../../data/types';
import './PersonItem.css';
import { Container } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

interface PersonItemProps {
    person: Person;
}

const PersonItem: React.FC<PersonItemProps> = ({ person }) => {

    const navigate = useNavigate();

    const handleTagClick = (type: 'story' | 'relative', data: Story | Person) => {
        navigate(`/${type}`, { state: { initialData: data, readOnly: true } });
    };

    const handleAddNew = (type: 'story' | 'relative') => {
        navigate(`/${type}`, { state: { initialData: {}, readOnly: false } });
    };

    return (
        <Container

            className="rounded-lg border border-gray-100 bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg"
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="font-semibold text-xl text-gray-800 mb-1">{person.name}</h2>
                </div>
                <span className="text-sm text-gray-500 bg-blue-50 px-3 py-1 rounded-full">
                    {person.birthday?.toLocaleDateString() ?? "No Birthday listed"}
                </span>
            </div>
            {person.stories && person.stories.length > 0 && (
                <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Stories</h3>
                    <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto relative pb-8">
                        {person.stories.map((story) => (
                            <button
                                key={story.id}
                                onClick={() => handleTagClick('story', story)}
                                className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium
                           hover:bg-indigo-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                {story.title}
                            </button>
                        ))}
                        <button
                            onClick={() => handleAddNew('story')}
                            className="bottom-0 left-0 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium
                           hover:bg-indigo-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            +
                        </button>
                    </div>
                </div>
            )}
            {person.relatives && person.relatives.length > 0 && (
                <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Relatives</h3>
                    <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto relative pb-8">
                        {person.relatives.map((relative) => (
                            <button
                                style={{
                                    backgroundColor: 'var(--mantine-color-green-1)',
                                    color: 'var(--mantine-color-green-9)'
                                }}
                                key={relative.person.id}
                                onClick={() => handleTagClick('relative', relative.person)}
                                className="text-green-700 px-3 py-1 rounded-full text-xs font-medium
                           hover:bg-green-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                {relative.person.name} ({relative.relation})
                            </button>
                        ))}
                        <button
                            style={{
                                backgroundColor: 'var(--mantine-color-green-1)',
                                color: 'var(--mantine-color-green-9)'
                            }}
                            onClick={() => handleAddNew('relative')}
                            className="bottom-0 left-0 text-green-700 px-3 py-1 rounded-full text-xs font-medium
                           hover:bg-green-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            +
                        </button>
                    </div>
                </div>
            )}
        </Container>
    );
};

export default PersonItem;
