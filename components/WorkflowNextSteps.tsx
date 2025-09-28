import React from 'react';

interface WorkflowNextStepsProps {
    onBuildCulturalLayer?: () => void;
}

export const WorkflowNextSteps: React.FC<WorkflowNextStepsProps> = ({ onBuildCulturalLayer }) => {
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, callback?: () => void) => {
        if (e.key === 'Enter' || e.key === ' ') {
            callback?.();
        }
    };

    return (
        <section className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">
             <div className="flex items-center mb-4">
                <span className="text-3xl mr-4">🤔</span>
                <div>
                    <h2 className="text-2xl font-bold text-slate-100">
                        Next Steps
                    </h2>
                </div>
             </div>
             <div className="pl-12">
                <p className="text-slate-400 mb-6">Please choose your next priority.</p>
                <div className="space-y-4">
                    <button className="w-full text-left p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:bg-slate-700 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400">
                        <h3 className="font-semibold text-cyan-400">1. Extend this workflow with WhatsApp/SMS alerts</h3>
                    </button>
                    <button onClick={onBuildCulturalLayer} onKeyDown={(e) => handleKeyDown(e, onBuildCulturalLayer)} className="w-full text-left p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:bg-slate-700 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400">
                        <h3 className="font-semibold text-cyan-400">2. Build the Cultural Translation Layer (Prompt #5) next</h3>
                    </button>
                    <button className="w-full text-left p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:bg-slate-700 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400">
                        <h3 className="font-semibold text-cyan-400">3. Provide the webhook integration spec for your React Native app</h3>
                    </button>
                </div>
            </div>
        </section>
    );
};