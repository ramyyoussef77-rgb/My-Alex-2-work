
import React from 'react';

interface NextStepProps {
    onProceed: () => void;
}

export const NextStep: React.FC<NextStepProps> = ({ onProceed }) => {
    return (
        <section className="bg-gradient-to-r from-blue-600 to-cyan-400 rounded-xl p-8 text-center shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-2">
                <span className="text-4xl mr-3">▶️</span>Next Step: Build Prompt #6 Workflow
            </h2>
            <p className="text-blue-100 mb-6 text-lg">Shall I now proceed with the workflow construction?</p>
            
            <div className="max-w-3xl mx-auto space-y-4 text-left bg-black/20 p-6 rounded-lg">
                <div className="p-4 bg-white/10 rounded-lg border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                    <h3 className="font-semibold text-white">1. Build the complete n8n workflow for Prompt #6</h3>
                    <p className="text-sm text-blue-100 mt-1">Includes Facebook monitoring, weather integration, OpenAI prediction, and calendar auto-creation.</p>
                </div>
                <div className="p-4 bg-white/10 rounded-lg border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                    <h3 className="font-semibold text-white">2. Provide architecture diagrams</h3>
                    <p className="text-sm text-blue-100 mt-1">Illustrate how n8n integrates with your React Native app for all 7 prompts.</p>
                </div>
            </div>

            <button onClick={onProceed} className="mt-8 bg-white text-blue-700 font-bold py-3 px-8 rounded-full hover:bg-blue-100 transform hover:scale-105 transition-all">
                Confirm: Proceed with Prompt #6 Workflow Construction
            </button>
        </section>
    )
}
