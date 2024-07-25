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
}