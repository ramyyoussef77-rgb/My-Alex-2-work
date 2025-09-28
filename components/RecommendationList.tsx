
import React from 'react';
import { RecommendationPhase } from '../types';

interface RecommendationListProps {
  phases: RecommendationPhase[];
}

const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);


export const RecommendationList: React.FC<RecommendationListProps> = ({ phases }) => {
  return (
    <div className="space-y-6">
      {phases.map((phaseItem, index) => (
        <div key={index} className="bg-slate-900/70 border border-slate-700 rounded-lg p-6 flex items-start">
          <div className="flex-shrink-0 bg-slate-700 h-10 w-10 rounded-full flex items-center justify-center font-bold text-cyan-400 mr-4">
            {phaseItem.phase}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">{phaseItem.title}</h3>
            <ul className="mt-2 space-y-2">
              {phaseItem.points.map((point, pIndex) => (
                <li key={pIndex} className="flex items-center text-slate-400">
                  <CheckCircleIcon />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};
