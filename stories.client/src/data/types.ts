export interface FamilyMember {
    name: string;
    mother?: FamilyMember;
    father?: FamilyMember;
}
export interface Person {
    id: string;
    name: string;
    gender?: string;
    birthday?: Date;
    stories?: Story[];
    relatives?: Person[];
}
export interface Story {
    id: string;
    title: string;
    storyText?: string;
}
export interface Relationship {
    fromId: string;
    toId: string;
    relationship: string;
}