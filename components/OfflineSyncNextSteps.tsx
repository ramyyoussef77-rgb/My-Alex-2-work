
import React from 'react';

interface OfflineSyncNextStepsProps {
    onProceed: () => void;
}

export const OfflineSyncNextSteps: React.FC<OfflineSyncNextStepsProps> = ({ onProceed }) => {
    return (
        <section className="bg-gradient-to-r from-pink-600 to-purple-500 rounded-xl p-8 text-center shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-2">
                <span className="text-4xl mr-3">🚀</span>Now: Build Prompt #3
            </h2>
            <p className="text-purple-100 mb-6 text-lg">Disaster-Resilient Offline City Intelligence (Sync Coordinator)</p>
            
            <div className="max-w-3xl mx-auto text-left bg-black/20 p-6 rounded-lg text-purple-100">
               This workflow will pre-cache critical data, sync user content when connectivity resumes, and trigger mesh-network alerts via webhook.
            </div>

            <button onClick={onProceed} className="mt-8 bg-white text-purple-700 font-bold py-3 px-8 rounded-full hover:bg-purple-100 transform hover:scale-105 transition-all">
                Proceed to Build Offline Sync Coordinator
            </button>
        </section>
    )
}