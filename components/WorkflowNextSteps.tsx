
import React from 'react';

interface WorkflowNextStepsProps {
    onBuildCulturalLayer?: () => void;
}

export const WorkflowNextSteps: React.FC<WorkflowNextStepsProps> = ({ onBuildCulturalLayer }) => {
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
                    <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:bg-slate-700 transition-all cursor-pointer">
                        <h3 className="font-semibold text-cyan-400">1. Extend this workflow with WhatsApp/SMS alerts</h3>
                    </div>
                    <div onClick={onBuildCulturalLayer} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:bg-slate-700 transition-all cursor-pointer">
                        <h3 className="font-semibold text-cyan-400">2. Build the Cultural Translation Layer (Prompt #5) next</h3>
                    </div>
                    <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:bg-slate-700 transition-all cursor-pointer">
                        <h3 className="font-semibold text-cyan-400">3. Provide the webhook integration spec for your React Native app</h3>
                    </div>
                </div>
            </div>
        </section>
    );
};
