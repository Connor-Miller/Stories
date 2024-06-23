// src/components/FamilyTree.tsx
import React from 'react';
import FamilyNode from '../../components/familyTree/FamilyNode';
import { FamilyMember } from '../../data/types';


interface FamilyTreeProps {
}

const familyData:FamilyMember = {
    name: "User",
    mother: {
        name: "Mother",
        mother: {
            name: "Grandmother (Mother's side)",
        },
        father: {
            name: "Grandfather (Mother's side)",
        },
    },
    father: {
        name: "Father",
        mother: {
            name: "Grandmother (Father's side)",
        },
        father: {
            name: "Grandfather (Father's side)",
        },
    },
};

const FamilyTree: React.FC<FamilyTreeProps> = () => {



    return (
        <div className="flex flex-col items-center justify-center">
            <FamilyNode member={familyData} />
        </div>
    );
};


export default FamilyTree;
