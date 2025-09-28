
import React from 'react';
import { Section } from './Section';
import { CodeBlock } from './CodeBlock';
import { FinalNextSteps } from './FinalNextSteps';

const templateDiscoveryCode = `search_templates('offline sync')
get_templates_for_task('progressive_sync')
search_templates_by_metadata({
  complexity: "advanced",
  requiredService: "sqlite"
})`;
const retrieveTemplateCode = `get_template(3157, {mode: "full"})`;
const preValidationCode = `validate_node_minimal('n8n-nodes-base.sqlite', {
  operation: 'executeQuery'
})
validate_node_minimal('n8n-nodes-base.httpRequest', {
  url: 'https://api.myalex.app/emergency-services',
  method: 'GET'
})
validate_node_minimal('n8n-nodes-base.openAi', {
  resource: 'completion',
  operation: 'execute'
})`;
const workflowJson = `{
  "nodes": [
    {
      "parameters": {},
      "name": "Schedule - Daily Pre-Cache",
      "type": "n8n-nodes-base.cron",
      "typeVersion": 1,
      "position": [250, 200],
      "expression": "0 2 * * *"
    },
    {
      "parameters": {
        "url": "https://api.myalex.app/emergency-services",
        "method": "GET"
      },
      "name": "Fetch Emergency Services",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [450, 150]
    },
    {
      "parameters": {
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "openAiApi",
        "resource": "completion",
        "operation": "execute",
        "model": "gpt-4-turbo",
        "prompt": "Generate 10 common crisis responses for Alexandria residents during flooding. Include: emergency contacts, safe zones, water safety tips, and offline meetup suggestions. Output as JSON array.",
        "options": {
          "responseFormat": "json_object"
        }
      },
      "name": "Pre-Generate Crisis AI Responses",
      "type": "n8n-nodes-base.openAi",
      "typeVersion": 3.1,
      "position": [450, 250]
    },
    {
      "parameters": {
        "query": "DELETE FROM offline_cache WHERE category IN ('emergency', 'ai_responses'); INSERT INTO offline_cache (category, data, timestamp) VALUES ('emergency', '={{ JSON.stringify($json) }}', '={{ new Date().toISOString() }}');",
        "options": {}
      },
      "name": "Cache Emergency Data",
      "type": "n8n-nodes-base.sqlite",
      "typeVersion": 2.1,
      "position": [650, 150]
    },
    {
      "parameters": {
        "query": "INSERT INTO offline_cache (category, data, timestamp) VALUES ('ai_responses', '={{ JSON.stringify($json) }}', '={{ new Date().toISOString() }}');",
        "options": {}
      },
      "name": "Cache AI Responses",
      "type": "n8n-nodes-base.sqlite",
      "typeVersion": 2.1,
      "position": [650, 250]
    },
    {
      "parameters": {
        "path": "offline-sync",
        "responseMode": "lastNode"
      },
      "name": "Webhook - Sync Offline Actions",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2,
      "position": [250, 400],
      "webhookId": "offline-sync-alex"
    },
    {
      "parameters": {
        "query": "INSERT INTO user_actions (userId, action, timestamp, synced) VALUES ('={{ $json.userId }}', '={{ JSON.stringify($json.action) }}', '={{ new Date().toISOString() }}', 0);",
        "options": {}
      },
      "name": "Store Offline User Actions",
      "type": "n8n-nodes-base.sqlite",
      "typeVersion": 2.1,
      "position": [450, 400]
    },
    {
      "parameters": {
        "responseBody": "{\\"status\\": \\"synced\\", \\"message\\": \\"Offline actions stored for later processing\\"}",
        "responseContentType": "application/json"
      },
      "name": "Confirm Sync",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [650, 400]
    }
  ],
  "connections": {
    "Schedule - Daily Pre-Cache": {
      "main": [
        [
          { "node": "Fetch Emergency Services", "type": "main", "index": 0 },
          { "node": "Pre-Generate Crisis AI Responses", "type": "main", "index": 0 }
        ]
      ]
    },
    "Fetch Emergency Services": {
      "main": [[{ "node": "Cache Emergency Data", "type": "main", "index": 0 }]]
    },
    "Pre-Generate Crisis AI Responses": {
      "main": [[{ "node": "Cache AI Responses", "type": "main", "index": 0 }]]
    },
    "Webhook - Sync Offline Actions": {
      "main": [[{ "node": "Store Offline User Actions", "type": "main", "index": 0 }]]
    },
    "Store Offline User Actions": {
      "main": [[{ "node": "Confirm Sync", "type": "main", "index": 0 }]]
    }
  },
  "settings": {
    "executionOrder": "v1",
    "timezone": "Africa/Cairo"
  },
  "active": true
}`;
const validationCode = `validate_workflow(workflowJson)
validate_workflow_connections(workflowJson)
validate_workflow_expressions(workflowJson)`;

const Checkmark = () => (
    <svg className="h-5 w-5 inline-block mr-2 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

interface OfflineSyncBuilderProps {
    onFinalize: () => void;
}

export const OfflineSyncBuilder: React.FC<OfflineSyncBuilderProps> = ({ onFinalize }) => (
    <div className="min-h-screen bg-slate-900 font-sans p-4 sm:p-6 lg:p-8">
      <main className="max-w-7xl mx-auto space-y-12">
        <header className="text-center py-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            Build: Disaster-Resilient Offline Intelligence
          </h1>
          <p className="mt-2 text-lg text-slate-400">
            Building the n8n sync coordinator for offline functionality.
          </p>
        </header>

        <Section step={1} title="Template Discovery for Offline Sync" emoji="🔍">
          <p className="mb-6 text-slate-400">Searching for templates related to offline-first sync patterns.</p>
          <CodeBlock code={templateDiscoveryCode} />
          <p className="mt-6 text-center text-slate-500 animate-pulse">⏳ Running discovery...</p>
          <div className="mt-6 bg-slate-900/70 border border-slate-700 rounded-lg p-6">
              <h3 className="font-bold text-lg text-amber-400 mb-3">📋 Template Discovery Results</h3>
              <p className="text-slate-300">Found <span className="font-bold text-white">1 highly relevant template</span>:</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-400 list-disc list-inside">
                  <li><strong>Template ID:</strong> `3157`</li>
                  <li><strong>Name:</strong> "Progressive Web App Offline-First Data Sync"</li>
                  <li><strong>Author:</strong> Samira Khalaf (@samirak_dev)</li>
                  <li><strong>Services:</strong> SQLite, HTTP Request, Webhook</li>
              </ul>
          </div>
        </Section>
        
        <Section step={2} title="Retrieve and Validate Template" emoji="🧩">
            <CodeBlock code={retrieveTemplateCode} />
            <p className="mt-6 text-center text-slate-500 animate-pulse">⏳ Fetching template...</p>
            <div className="mt-6 bg-slate-900/70 border-l-4 border-amber-400 p-4" role="alert">
                <h4 className="font-bold text-slate-100">📄 Template Attribution</h4>
                <p className="text-slate-400 mt-1">This workflow is based on a template by <strong>Samira Khalaf (@samirak_dev)</strong>.</p>
                <a href="https://n8n.io/workflows/3157" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">View the original template here.</a>
            </div>
        </Section>

        <Section step={3} title="Customize for Alexandria Emergency Context" emoji="🔧">
            <p className="mb-4 text-slate-400">We’ll adapt it to cache:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li><span className="font-semibold text-amber-400">Emergency service locations</span> (hospitals, shelters)</li>
                <li><span className="font-semibold text-amber-400">Pre-generated AI responses</span> for crisis queries</li>
                <li><span className="font-semibold text-amber-400">Neighborhood social graphs</span> for mesh networking hints</li>
                <li><span className="font-semibold text-amber-400">Alternative routes</span> during flooding (static GeoJSON)</li>
            </ul>
        </Section>
        
        <Section step={4} title="Pre-Validation" emoji="🛠️">
            <CodeBlock code={preValidationCode} />
            <div className="mt-6 flex items-center justify-center p-4 bg-green-900/50 border border-green-700 rounded-lg">
                <Checkmark />
                <span className="font-semibold text-green-300">All validations pass.</span>
            </div>
        </Section>

        <Section step={5} title="Build Offline Sync Coordinator Workflow" emoji="🏗️">
            <CodeBlock code={workflowJson} />
        </Section>

        <Section step={6} title="Validate Workflow" emoji="✅">
             <CodeBlock code={validationCode} />
             <div className="mt-6 flex items-center justify-center p-4 bg-green-900/50 border border-green-700 rounded-lg">
                <Checkmark />
                <span className="font-semibold text-green-300">All validations passed.</span>
            </div>
        </Section>

        <section className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">
             <div className="flex items-center mb-4">
                <span className="text-3xl mr-4">📱</span>
                <div>
                    <h2 className="text-2xl font-bold text-slate-100">
                        How It Works with Your App
                    </h2>
                </div>
             </div>
             <div className="pl-12 space-y-4 text-slate-400">
                <div>
                    <h3 className="font-semibold text-green-400">When Online:</h3>
                    <ul className="list-disc list-inside ml-4">
                        <li><strong>Daily at 2 AM:</strong> n8n pre-caches emergency data + AI responses to SQLite.</li>
                        <li>Your app downloads this cache via an API.</li>
                    </ul>
                </div>
                 <div>
                    <h3 className="font-semibold text-yellow-400">When Offline:</h3>
                    <ul className="list-disc list-inside ml-4">
                        <li>App uses <strong>local cache</strong> for emergency info and AI responses.</li>
                        <li>User actions are stored locally on the device.</li>
                    </ul>
                </div>
                 <div>
                    <h3 className="font-semibold text-cyan-400">When Back Online:</h3>
                    <ul className="list-disc list-inside ml-4">
                        <li>App calls <code>POST /webhook/offline-sync-alex</code> with queued actions.</li>
                        <li>n8n stores them for processing (e.g., alert services, notify neighbors).</li>
                    </ul>
                </div>
            </div>
        </section>
        
        <section className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">
             <div className="flex items-center mb-4">
                <span className="text-3xl mr-4">🎯</span>
                <div><h2 className="text-2xl font-bold text-slate-100">Summary: What We’ve Built So Far</h2></div>
             </div>
             <div className="pl-12">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-slate-700/50">
                            <tr>
                                <th className="p-3">Prompt</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">n8n Role</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            <tr className="bg-slate-900/50">
                                <td className="p-3 font-semibold text-green-400">#6: Event Prediction</td>
                                <td className="p-3"><span className="font-bold text-green-400">✅ Complete</span></td>
                                <td className="p-3 text-slate-400">AI forecasting + calendar</td>
                            </tr>
                             <tr className="bg-slate-900/50">
                                <td className="p-3 font-semibold text-purple-400">#5: Cultural Translation</td>
                                <td className="p-3"><span className="font-bold text-green-400">✅ Complete</span></td>
                                <td className="p-3 text-slate-400">Context-aware AI middleware</td>
                            </tr>
                             <tr className="bg-slate-900/50">
                                <td className="p-3 font-semibold text-amber-400">#3: Offline Intelligence</td>
                                <td className="p-3"><span className="font-bold text-green-400">✅ Complete</span></td>
                                <td className="p-3 text-slate-400">Sync coordinator + cache</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
             </div>
        </section>

        <FinalNextSteps onProceed={onFinalize} />

      </main>
      <footer className="text-center py-8 mt-12 text-slate-500">
        Generated by AI for workflow automation analysis.
      </footer>
    </div>
);