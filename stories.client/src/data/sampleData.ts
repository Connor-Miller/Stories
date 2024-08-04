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
            },
            {
                id: "103",
                title: "The Third Adventure",
                storyText: "Once upon a time, John had his first adventure..."
            },
            {
                id: "104",
                title: "The Fourth Adventure",
                storyText: "In his second adventure, John faced many challenges..."
            },
            {
                id: "105",
                title: "The Fifth Adventure",
                storyText: "Once upon a time, John had his first adventure..."
            },
            {
                id: "106",
                title: "The Sixth Adventure",
                storyText: "In his second adventure, John faced many challenges..."
            },
            {
                id: "107",
                title: "The Seventh Adventure",
                storyText: "In his second adventure, John faced many challenges..."
            },
            {
                id: "108",
                title: "The Eighth Adventure",
                storyText: "Once upon a time, John had his first adventure..."
            },
            {
                id: "109",
                title: "The Ninth Adventure",
                storyText: "In his second adventure, John faced many challenges..."
            }
        ],
        relatives: [
            {
                person: {
                    id: "2",
                    name: "Jane Doe",
                    gender: undefined,
                    birthday: undefined,
                    stories: [],
                    relatives: []
                },
                relation: "Sister"
            },
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
                person: {
                    id: "1",
                    name: "John Doe",
                    gender: undefined,
                    birthday: undefined,
                    stories: [],
                    relatives: []
                },
                relation: "Brother"
            },
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
                person: {
                    id: "",
                    name: "Emily Davis",
                    gender: undefined,
                    birthday: undefined,
                    stories: [],
                    relatives: []
                },
                relation: "Wife"
            },
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
                person: {
                    id: "2",
                    name: "Jane Doe",
                    gender: undefined,
                    birthday: undefined,
                    stories: [],
                    relatives: []
                },
                relation: "Mom"
            },
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