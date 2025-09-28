import React from 'react';
import { Section } from './Section';
import { CodeBlock } from './CodeBlock';
import { UIDesignNextSteps } from './UIDesignNextSteps';

const architectureDiagram = `[React Native Frontend] 
        ⇅ (HTTPS webhooks)
[n8n Backend Intelligence]
        ⇅ (APIs & services)
[OpenAI, Weather, Google Calendar, SQLite]`;

const arExample = `- Frontend: Uses device camera + GPS to detect user is at Pompey’s Pillar
- Frontend: Calls GET /webhook/historical-overlay?lat=31.2&lng=29.95
- n8n: Returns era-specific JSON with narration URLs and 3D model links
- Frontend: Renders AR overlay + plays Arabic TTS audio`;

const chatExample = `- Frontend: User types “Where’s good nightlife?”
- Frontend: Sends to POST /webhook/cultural-translate-alex
- n8n: Returns culturally adapted response
- Frontend: Displays response in chat bubble`;

interface FinalArchitectureViewProps {
    onProceedToUIDesign: () => void;
}

export const FinalArchitectureView: React.FC<FinalArchitectureViewProps> = ({ onProceedToUIDesign }) => (
    <div className="min-h-screen bg-slate-900 font-sans p-4 sm:p-6 lg:p-8">
      <main className="max-w-7xl mx-auto space-y-12">
        <header className="text-center py-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
            Final Architecture: The Brain & The Body
          </h1>
          <p className="mt-2 text-lg text-slate-400">
            Understanding the roles of your n8n backend and React Native frontend.
          </p>
        </header>

        <Section step={1} title="Backend vs. Frontend" emoji="🧠">
            <p className="mb-4 text-slate-300 text-lg">
                Your **n8n backend is the "brain"** of your application. It handles all the complex logic, data processing, AI intelligence, and communication with external services.
            </p>
            <p className="text-slate-300 text-lg">
                Your **React Native app is the "body"**. It handles everything the user sees, touches, and experiences directly on their device.
            </p>
        </Section>

        <Section step={2} title="Your Frontend’s Role: The Experience Layer" emoji="📱">
            <p className="mb-4 text-slate-400">Your React Native app is responsible for:</p>
            <ul className="list-disc list-inside space-y-3 text-slate-300">
                <li><strong>User Interface:</strong> All screens, buttons, maps, AR views</li>
                <li><strong>Device Integration:</strong> Camera, GPS, microphone, speakers</li>
                <li><strong>Offline Experience:</strong> Local caching, queue management, sync triggers</li>
                <li><strong>Real-time Interaction:</strong> Sending user input to n8n, displaying responses</li>
                <li><strong>Platform Compliance:</strong> App Store/Google Play requirements</li>
            </ul>
        </Section>
        
        <Section step={3} title="How They Work Together" emoji="🔗">
            <p className="mb-4 text-slate-400">The two parts communicate via secure HTTPS webhooks.</p>
            <CodeBlock code={architectureDiagram} />
            <div className="mt-6 space-y-6">
                <div>
                    <h3 className="text-lg font-semibold text-cyan-400 mb-2">Example: Historical AR Overlay</h3>
                    <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700 text-slate-400 text-sm">
                        <pre className="font-sans whitespace-pre-wrap">{arExample}</pre>
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-cyan-400 mb-2">Example: Cultural Chat</h3>
                    <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700 text-slate-400 text-sm">
                        <pre className="font-sans whitespace-pre-wrap">{chatExample}</pre>
                    </div>
                </div>
            </div>
        </Section>

        <Section step={4} title="What You’ve Already Built" emoji="✅">
             <p className="mb-4 text-slate-400">Your React Native integration code (from earlier steps) already includes the core components for this architecture:</p>
              <ul className="list-disc list-inside space-y-3 text-slate-300">
                <li>Service layer that calls n8n webhooks</li>
                <li>Offline queue that syncs when back online</li>
                <li>TTS playback using `expo-av`</li>
                <li>Network connectivity handling</li>
                <li>Secure API key management</li>
            </ul>
            <div className="mt-6 p-4 bg-green-900/50 border border-green-700 rounded-md text-green-300 text-center font-semibold">
                This is exactly the right architecture: n8n handles the "thinking" — your app handles the "doing and showing."
            </div>
        </Section>

        <Section step={5} title="Next Frontend Steps" emoji="🚀">
            <p className="mb-4 text-slate-400">To enhance your frontend further, your mobile team can now focus on:</p>
            <ul className="list-disc list-inside space-y-3 text-slate-300">
                <li><strong>AR Implementation:</strong> Use `react-native-arkit` or `ViroReact` for historical overlays.</li>
                <li><strong>Map Integration:</strong> Use `react-native-maps` with custom offline tiles for Alexandria.</li>
                <li><strong>Voice Input:</strong> Add speech-to-text for hands-free queries.</li>
                <li><strong>Performance Optimization:</strong> Implement lazy loading for historical assets.</li>
                <li><strong>Accessibility:</strong> Ensure Arabic RTL support and screen reader compatibility.</li>
            </ul>
        </Section>

        <UIDesignNextSteps onProceed={onProceedToUIDesign} />
        
      </main>
      <footer className="text-center py-8 mt-12 text-slate-500">
        Generated by AI for workflow automation analysis.
      </footer>
    </div>
);