
import React from 'react';

interface FinalNextStepsProps {
    onProceed: () => void;
}

export const FinalNextSteps: React.FC<FinalNextStepsProps> = ({ onProceed }) => {
    return (
        <section className="bg-gradient-to-r from-green-600 to-teal-500 rounded-xl p-8 text-center shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-2">
                <span className="text-4xl mr-3">▶️</span>Next Steps
            </h2>
            <p className="text-teal-100 mb-6 text-lg">You have chosen to proceed with the final integration steps.</p>
            
            <button 
                onClick={onProceed} 
                className="mt-8 bg-white text-teal-700 font-bold py-3 px-8 rounded-full hover:bg-teal-100 transform hover:scale-105 transition-all"
            >
                Proceed to Final Summary
            </button>
        </section>
    );
};
