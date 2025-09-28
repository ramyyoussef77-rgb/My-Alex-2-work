
import React from 'react';

interface SectionProps {
  step: number;
  title: string;
  emoji: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ step, title, emoji, children }) => {
  return (
    <section className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">
      <div className="flex items-center mb-4">
        <span className="text-3xl mr-4">{emoji}</span>
        <div>
            <h2 className="text-2xl font-bold text-slate-100">
            <span className="text-cyan-400">Step {step}:</span> {title}
            </h2>
        </div>
      </div>
      <div className="pl-12">
        {children}
      </div>
    </section>
  );
};
