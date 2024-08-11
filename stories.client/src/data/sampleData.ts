import { Person, Story } from "./types";

export const sampleStories: Story[] = [
    {
        id: "101",
        title: "Summer Adventure in the Rockies",
        storyText: "<p>Last summer, we embarked on an unforgettable journey through the Rocky Mountains. The crisp mountain air and breathtaking vistas left us in awe at every turn...</p>",
        storyDate: new Date("2023-07-15"),
        storyLocation: "Rocky Mountains, Colorado",
        storyTags: ["adventure", "nature", "family", "hiking"]
    },
    {
        id: "102",
        title: "A Culinary Tour of Italy",
        storyText: "<p>Our gastronomic adventure through Italy was a feast for the senses. From the rich pasta dishes of Rome to the delicate seafood of Venice, every meal was a celebration...</p>",
        storyDate: new Date("2023-09-05"),
        storyLocation: "Various cities, Italy",
        storyTags: ["food", "travel", "culture"]
    },
    {
        id: "103",
        title: "The Day We Rescued a Stray Cat",
        storyText: "<p>It was a rainy Tuesday when we found her - a small, trembling ball of fur huddled under a parked car. Little did we know how much joy this little stray would bring to our lives...</p>",
        storyDate: new Date("2024-03-20"),
        storyLocation: "Our Neighborhood",
        storyTags: ["pets", "kindness", "family"]
    },
    {
        id: "104",
        title: "Grandpa's World War II Stories",
        storyText: "<p>On his 90th birthday, Grandpa finally opened up about his experiences in World War II. His tales of bravery, camaraderie, and survival left us all in silent awe...</p>",
        storyDate: new Date("2023-11-11"),
        storyLocation: "Grandpa's House",
        storyTags: ["history", "family", "memories"]
    },
    {
        id: "105",
        title: "Our First Attempt at Urban Gardening",
        storyText: "<p>With nothing but a small balcony and boundless enthusiasm, we decided to start our own urban garden. Through trial, error, and a lot of YouTube tutorials, we managed to grow our first tomatoes...</p>",
        storyDate: new Date("2024-04-01"),
        storyLocation: "Home",
        storyTags: ["gardening", "learning", "sustainability"]
    }
];
export const samplePeople: Person[] = [
    {
        id: "1",
        name: "John Doe",
        gender: "Male",
        birthday: new Date("1990-01-01"),
        stories: sampleStories
        ,
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
