import React from 'react';

interface ArchitectureNextStepsProps {
    onProceed: () => void;
}

export const ArchitectureNextSteps: React.FC<ArchitectureNextStepsProps> = ({ onProceed }) => {
    return (
        <section className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-center shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-2">
                <span className="text-4xl mr-3">🧠</span>Final Summary: The Brain & The Body
            </h2>
            <p className="text-indigo-100 mb-6 text-lg">Let's review the final architecture and the roles of the n8n backend vs. the React Native frontend.</p>
            <button
                onClick={onProceed}
                className="mt-8 bg-white text-indigo-700 font-bold py-3 px-8 rounded-full hover:bg-indigo-100 transform hover:scale-105 transition-all"
            >
                View Final Architecture Summary
            </button>
        </section>
    );
};
