import React from 'react';

interface DeploymentNextStepsProps {
    onProceed: () => void;
}

export const DeploymentNextSteps: React.FC<DeploymentNextStepsProps> = ({ onProceed }) => {
    return (
        <section className="bg-gradient-to-r from-blue-700 to-teal-600 rounded-xl p-8 text-center shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-2">
                <span className="text-4xl mr-3">🚀</span>Ready for Launch?
            </h2>
            <p className="text-teal-100 mb-6 text-lg">Let's generate the final, detailed production deployment guide.</p>
            <button
                onClick={onProceed}
                className="mt-8 bg-white text-teal-700 font-bold py-3 px-8 rounded-full hover:bg-teal-100 transform hover:scale-105 transition-all"
            >
                Generate Complete Deployment Guide
            </button>
        </section>
    );
};
