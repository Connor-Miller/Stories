export interface FamilyMember {
    name: string;
    mother?: FamilyMember;
    father?: FamilyMember;
}