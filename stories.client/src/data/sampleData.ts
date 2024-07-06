import { Person, Story } from "./types";

export const samplePeople: Person[] = [
    {
        id: "1",
        name: "John Doe",
        gender: "Male",
        birthday: new Date("1990-01-01"),
        stories: [
            {
                id: "101",
                title: "The First Adventure",
                storyText: "Once upon a time, John had his first adventure..."
            },
            {
                id: "102",
                title: "The Second Adventure",
                storyText: "In his second adventure, John faced many challenges..."
            }
        ],
        relatives: [
            {
                id: "2",
                name: "Jane Doe",
                gender: undefined,
                birthday: undefined,
                stories: [],
                relatives: []
            }
        ]
    },
    {
        id: "2",
        name: "Jane Doe",
        gender: "Female",
        birthday: new Date("1992-02-02"),
        stories: [
            {
                id: "103",
                title: "The Beginning",
                storyText: "Jane's story began in a small town..."
            }
        ],
        relatives: [
            {
                id: "1",
                name: "John Doe",
                gender: undefined,
                birthday: undefined,
                stories: [],
                relatives: []
            }
        ]
    },
    {
        id: "3",
        name: "Michael Johnson",
        gender: "Male",
        birthday: new Date("1985-03-03"),
        stories: [
            {
                id: "104",
                title: "The Journey",
                storyText: "Michael embarked on a long journey across the country..."
            }
        ],
        relatives: [
            {
                id: "4",
                name: "Emily Davis",
                gender: undefined,
                birthday: undefined,
                stories: [],
                relatives: []
            }
        ]
    },
    {
        id: "4",
        name: "Emily Davis",
        gender: "Female",
        birthday: new Date("1995-04-04"),
        stories: [
            {
                id: "105",
                title: "A New Beginning",
                storyText: "Emily started a new chapter in her life..."
            }
        ],
        relatives: [
            {
                id: "3",
                name: "Michael Johnson",
                gender: undefined,
                birthday: undefined,
                stories: [],
                relatives: []
            }
        ]
    }
];
export const sampleStories: Story[] = [
    { id: '101', title: 'The First Adventure', storyText: 'Once upon a time, John had his first adventure...' },
    { id: '102', title: 'The Second Adventure', storyText: 'In his second adventure, John faced many challenges...' },
    { id: '103', title: 'The Beginning', storyText: "Jane's story began in a small town..." },
    { id: '104', title: 'The Journey', storyText: 'Michael embarked on a long journey across the country...' },
    { id: '105', title: 'A New Beginning', storyText: 'Emily started a new chapter in her life...' }
];