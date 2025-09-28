
import React from 'react';

interface PostmanNextStepsProps {
    onProceed: () => void;
}

export const PostmanNextSteps: React.FC<PostmanNextStepsProps> = ({ onProceed }) => {
    return (
        <section className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl p-8 text-center shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-2">
                <span className="text-4xl mr-3">▶️</span>Final Step: Complete the Suite
            </h2>
            <p className="text-blue-100 mb-6 text-lg">Shall I now generate the final API specifications, Postman collection, and monitoring setup?</p>
            
            <div className="max-w-3xl mx-auto space-y-2 text-left bg-black/20 p-4 rounded-lg text-sm text-blue-100">
                <p>✓ Generate data API specifications for prompts #1, #4, and #7.</p>
                <p>✓ Create a Postman collection for testing all webhooks.</p>
                <p>✓ Provide monitoring setup (execution logging, error alerts).</p>
                <p>✓ Export all workflows as a single JSON bundle for deployment.</p>
            </div>

            <button onClick={onProceed} className="mt-8 bg-white text-blue-700 font-bold py-3 px-8 rounded-full hover:bg-blue-100 transform hover:scale-105 transition-all">
                Confirm: Complete the n8n Automation Suite
            </button>
        </section>
    );
};
