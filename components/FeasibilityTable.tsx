import React from 'react';
import { FeasibilityData } from '../types';

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const WarningIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 100-2 1 1 0 000 2zm-1-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
);


const getFeasibilityBadge = (feasibility: FeasibilityData['feasibility']) => {
    switch (feasibility) {
        case 'High':
            return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-200 text-green-800"><CheckIcon/><CheckIcon/><CheckIcon/> {feasibility}</span>;
        case 'Medium-High':
            return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-200 text-cyan-800"><CheckIcon/><CheckIcon/> {feasibility}</span>;
        case 'Medium':
            return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-200 text-blue-800"><CheckIcon/> {feasibility}</span>;
        case 'Medium-Low':
            return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-200 text-yellow-800"><WarningIcon/> {feasibility}</span>;
        case 'Low (Privacy Risk)':
        case 'Low':
            return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-200 text-red-800"><WarningIcon/> {feasibility}</span>;
        default:
            return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-800">{feasibility}</span>;
    }
}


interface FeasibilityTableProps {
  data: FeasibilityData[];
}

export const FeasibilityTable: React.FC<FeasibilityTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-slate-900/70 border border-slate-700 rounded-lg">
        <thead className="bg-slate-800/50">
          <tr className="border-b border-slate-700">
            <th scope="col" className="p-4 font-bold text-slate-300 text-left w-1/12">Rank</th>
            <th scope="col" className="p-4 font-bold text-slate-300 text-left w-2/12">Prompt</th>
            <th scope="col" className="p-4 font-bold text-slate-300 text-left w-2/12">n8n Feasibility</th>
            <th scope="col" className="p-4 font-bold text-slate-300 text-left w-2/12">Capabilities</th>
            <th scope="col" className="p-4 font-bold text-slate-300 text-left w-2/12">Gaps</th>
            <th scope="col" className="p-4 font-bold text-slate-300 text-left w-3/12">Approach</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {data.map((row) => (
            <tr key={row.rank} className="text-sm hover:bg-slate-700/30 transition-colors">
              <td className="p-4 font-bold text-cyan-400">{row.rank}</td>
              <td className="p-4 font-semibold text-slate-100">{row.prompt}</td>
              <td className="p-4">{getFeasibilityBadge(row.feasibility)}</td>
              <td className="p-4 text-slate-400">{row.capabilities}</td>
              <td className="p-4 text-slate-400">{row.gaps}</td>
              <td className="p-4 font-medium text-slate-200">{row.approach}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};