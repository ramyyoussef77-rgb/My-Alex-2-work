import React from 'react';

interface UIDesignNextStepsProps {
    onProceed: () => void;
}

export const UIDesignNextSteps: React.FC<UIDesignNextStepsProps> = ({ onProceed }) => {
    return (
        <section className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl p-8 text-center shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-2">
                <span className="text-4xl mr-3">🎨</span>Final Phase: UI/UX Design
            </h2>
            <p className="text-rose-100 mb-6 text-lg">Let's create the final UI/UX Design Brief to guide the mobile development team.</p>
            <button
                onClick={onProceed}
                className="mt-8 bg-white text-rose-700 font-bold py-3 px-8 rounded-full hover:bg-rose-100 transform hover:scale-105 transition-all"
            >
                Generate UI/UX Design Brief
            </button>
        </section>
    );
};
