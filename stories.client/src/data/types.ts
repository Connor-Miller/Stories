import { User } from "firebase/auth";

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
    relatives?: Relative[];
}
export interface Story {
    id: string;
    title: string;
    storyText?: string;
    storyDate?: Date;
    storyLocation?: string;
    storyTags?: string[];
}
export interface Relationship {
    fromId: string;
    toId: string;
    relationship: string;
}
export interface AuthContextProps {
    currentUser: User | null;
    signOut: () => void;
}
export interface RequestOptions {
    headers?: Record<string, string>;
    timeout?: number;
}
export interface AppUser {
    email: string;
    displayName: string;
    ipAddress?: string;
    userAgent?: string;
}
export interface Relative {
    person: Person;
    relation: string;
}