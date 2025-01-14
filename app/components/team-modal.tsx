'use client'
import Image from "next/image";
import { TeamMember } from "../types";

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  team: TeamMember[];
}

export const TeamModal = ({ isOpen, onClose, team }: TeamModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">Team Members</h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700"
          >
            ✕
          </button>
        </div>
        <div className="space-y-4">
          {team.map((member) => (
            <div
              key={member.name}
              className="flex items-center p-3 bg-slate-50 rounded-lg border border-slate-200"
            >
              <Image
                src={member.avatar}
                alt={member.name}
                width={40}
                height={40}
                className="rounded-full bg-white"
                unoptimized
              />
              <span className="ml-3 font-medium text-slate-800">{member.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
