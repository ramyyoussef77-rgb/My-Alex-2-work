import React from 'react';

interface ProductionHardeningNextStepsProps {
    onProceed: () => void;
}

export const ProductionHardeningNextSteps: React.FC<ProductionHardeningNextStepsProps> = ({ onProceed }) => {
    return (
        <section className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-8 text-center shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-2">
                <span className="text-4xl mr-3">🛡️</span>Final Step: Production Hardening
            </h2>
            <p className="text-orange-100 mb-6 text-lg">Let's build the 5th and final workflow to add security, validation, and reliability to your suite.</p>
            
            <button 
                onClick={onProceed} 
                className="mt-8 bg-white text-orange-700 font-bold py-3 px-8 rounded-full hover:bg-orange-100 transform hover:scale-105 transition-all"
            >
                Proceed to Build Hardening Workflow
            </button>
        </section>
    );
};