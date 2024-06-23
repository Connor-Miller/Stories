import React from 'react';
import { FamilyMember } from '../../data/types';
import './familyNode.css';



const FamilyNode: React.FC<{ member: FamilyMember }> = ({ member }) => {


    return (
        <div className="family-node relative flex flex-col items-center">
            <div className="family-node-name inline-block font-bold border rounded-2xl p-2.5">{member.name}</div>
            <div className="flex justify-center mt-4 space-x-8">
            <div className="connector-bottom" />
                {member.mother && (
                    <div className="relative flex flex-col items-center">
                        <div className="connector-left-vert" />
                        <div className="connector-left-hori" />
                        <FamilyNode member={member.mother} />
                    </div>
                )}
                {member.father && (
                    <div className="family-node-right relative flex flex-col items-center">
                        <div className="connector-right-vert" />
                        <div className="connector-right-hori" />
                        <FamilyNode member={member.father} />
                    </div>
                )}
            </div>
        </div>
    );
};


export default FamilyNode