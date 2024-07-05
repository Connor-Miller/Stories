export interface FamilyMember {
    name: string;
    mother?: FamilyMember;
    father?: FamilyMember;
}
export interface Person {
    id: string;
    name: string;
    email: string;
    phone: string;
}