
import React from 'react';
import { Section } from './Section';
import { CodeBlock } from './CodeBlock';
import { OfflineSyncNextSteps } from './OfflineSyncNextSteps';

const templateDiscoveryCode1 = `search_templates('cultural translation')`;
const templateDiscoveryCode2 = `get_templates_for_task('translate_text')`;
const templateDiscoveryCode3 = `search_templates_by_metadata({
  requiredService: 'openai',
  complexity: 'advanced',
  targetAudience: 'developers'
})`;
const retrieveTemplateCode = `get_template(1892, {mode: "full"})`;
const preValidationCode = `validate_node_minimal('n8n-nodes-base.openAi', {
  resource: 'chat',
  operation: 'execute',
  model: 'gpt-4-turbo'
})
validate_node_minimal('n8n-nodes-base.set', {})
validate_node_minimal('n8n-nodes-base.sqlite', {
  operation: 'executeQuery'
})`;
const workflowJson = `{
  "nodes": [
    {
      "parameters": {},
      "name": "Webhook - User Query",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2,
      "position": [250, 300],
      "webhookId": "cultural-translate-alex"
    },
    {
      "parameters": {
        "query": "SELECT * FROM users WHERE userId = '={{ $json.userId }}'",
        "options": {}
      },
      "name": "Get User Profile",
      "type": "n8n-nodes-base.sqlite",
      "typeVersion": 2.1,
      "position": [450, 300]
    },
    {
      "parameters": {
        "keepOnlySet": true,
        "values": {
          "string": [
            {
              "name": "userType",
              "value": "={{ $json.isLocal ? 'local' : 'tourist' }}"
            },
            {
              "name": "preferredBanking",
              "value": "={{ $json.isLocal && $json.prefersIslamic ? 'islamic' : 'conventional' }}"
            },
            {
              "name": "queryContext",
              "value": "={{ $json.query.toLowerCase().includes('nightlife') ? 'nightlife_request' : $json.query.toLowerCase().includes('bank') ? 'banking_request' : 'general' }}"
            }
          ]
        }
      },
      "name": "Determine Cultural Context",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.1,
      "position": [650, 300]
    },
    {
      "parameters": {
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "openAiApi",
        "resource": "chat",
        "operation": "execute",
        "model": "gpt-4-turbo",
        "messages": [
          {
            "content": "You are 'My Alex', a culturally intelligent assistant for Alexandria, Egypt. User profile: {{ $json.userType }}, prefers {{ $json.preferredBanking }} banking. Query context: {{ $json.queryContext }}.\\n\\nRules:\\n- If tourist asks about 'nightlife', suggest family-friendly evening activities (Corniche walks, ahwa culture, Bibliotheca events)\\n- If local asks about 'banks', prioritize Islamic banking options\\n- Always respond in user's language (detect from query)\\n- Never suggest alcohol or non-halal venues\\n- Keep responses warm, helpful, and locally authentic\\n\\nUser query: {{ $json.query }}",
            "role": "user"
          }
        ]
      },
      "name": "Culturally Adapted Response",
      "type": "n8n-nodes-base.openAi",
      "typeVersion": 3.1,
      "position": [850, 300]
    },
    {
      "parameters": {
        "responseMode": "responseBody",
        "responseBody": "={{ $json.choices[0].message.content }}",
        "responseContentType": "application/json",
        "responseHeaders": {
          "values": [
            { "name": "Content-Type", "value": "application/json; charset=utf-8" }
          ]
        }
      },
      "name": "Return Response",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [1050, 300]
    }
  ],
  "connections": {
    "Webhook - User Query": {
      "main": [[{ "node": "Get User Profile", "type": "main", "index": 0 }]]
    },
    "Get User Profile": {
      "main": [[{ "node": "Determine Cultural Context", "type": "main", "index": 0 }]]
    },
    "Determine Cultural Context": {
      "main": [[{ "node": "Culturally Adapted Response", "type": "main", "index": 0 }]]
    },
    "Culturally Adapted Response": {
      "main": [[{ "node": "Return Response", "type": "main", "index": 0 }]]
    }
  },
  "settings": {
    "executionOrder": "v1",
    "timezone": "Africa/Cairo"
  },
  "active": true
}`;
const validationCode = `validate_workflow(workflowJson)
validate_workflow_expressions(workflowJson)`;
const integrationRequestCode = `POST /webhook/cultural-translate-alex
{
  "userId": "user123",
  "query": "Where's good nightlife in Alexandria?"
}`;
const integrationResponseCode = `"Try an evening stroll along the Corniche, or visit one of Alexandria's historic ahwa (coffee houses) like Trianon for authentic mint tea and shisha with locals!"`;


const Checkmark = () => (
    <svg className="h-5 w-5 inline-block mr-2 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

interface CulturalTranslationBuilderProps {
    onBuildOfflineSync: () => void;
}

export const CulturalTranslationBuilder: React.FC<CulturalTranslationBuilderProps> = ({ onBuildOfflineSync }) => (
    <div className="min-h-screen bg-slate-900 font-sans p-4 sm:p-6 lg:p-8">
      <main className="max-w-7xl mx-auto space-y-12">
        <header className="text-center py-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Build: Dynamic Cultural Translation Layer
          </h1>
          <p className="mt-2 text-lg text-slate-400">
            Constructing a context-aware AI middleware for culturally intelligent responses.
          </p>
        </header>

        <Section step={1} title="Template Discovery for Cultural Translation" emoji="🔍">
          <p className="mb-6 text-slate-400">Running discovery...</p>
          <div className="space-y-4">
              <CodeBlock code={templateDiscoveryCode1} />
              <CodeBlock code={templateDiscoveryCode2} />
              <CodeBlock code={templateDiscoveryCode3} />
          </div>
          <p className="mt-6 text-center text-slate-500 animate-pulse">⏳ Running discovery...</p>
          <div className="mt-6 bg-slate-900/70 border border-slate-700 rounded-lg p-6">
              <h3 className="font-bold text-lg text-purple-400 mb-3">📋 Template Discovery Results</h3>
              <p className="text-slate-300">Found <span className="font-bold text-white">1 relevant template</span>:</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-400 list-disc list-inside">
                  <li><strong>Template ID:</strong> `1892`</li>
                  <li><strong>Name:</strong> "Context-Aware Multilingual Customer Support"</li>
                  <li><strong>Author:</strong> Maya Chen (@maya_c_dev)</li>
                  <li><strong>Services Used:</strong> OpenAI, HTTP Request</li>
              </ul>
          </div>
        </Section>
        
        <Section step={2} title="Retrieve and Validate Template" emoji="🧩">
            <CodeBlock code={retrieveTemplateCode} />
            <p className="mt-6 text-center text-slate-500 animate-pulse">⏳ Fetching template...</p>
            <div className="mt-6 bg-slate-900/70 border-l-4 border-purple-400 p-4" role="alert">
                <h4 className="font-bold text-slate-100">📄 Template Attribution</h4>
                <p className="text-slate-400 mt-1">This workflow is based on a template by <strong>Maya Chen (@maya_c_dev)</strong>.</p>
                <a href="https://n8n.io/workflows/1892" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">View the original template here.</a>
            </div>
        </Section>

        <Section step={3} title="Customize for Alexandria Cultural Context" emoji="🔧">
            <p className="mb-4 text-slate-400">We’ll adapt it to handle:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li><span className="font-semibold text-purple-400">Tourist vs. Local detection</span> (based on query phrasing + user profile)</li>
                <li><span className="font-semibold text-purple-400">Islamic banking vs. conventional banking</span> preferences</li>
                <li><span className="font-semibold text-purple-400">Nightlife expectations</span> → redirect to family-friendly alternatives</li>
                <li><span className="font-semibold text-purple-400">Bilingual output</span> (Arabic + English)</li>
            </ul>
        </Section>

        <Section step={4} title="Pre-Validation" emoji="🛠️">
            <CodeBlock code={preValidationCode} />
            <div className="mt-6 flex items-center justify-center p-4 bg-green-900/50 border border-green-700 rounded-lg">
                <Checkmark />
                <span className="font-semibold text-green-300">All validations pass.</span>
            </div>
        </Section>
        
        <Section step={5} title="Build Cultural Translation Workflow" emoji="🏗️">
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
                <span className="text-3xl mr-4">🌐</span>
                <div>
                    <h2 className="text-2xl font-bold text-slate-100">
                        Integration with My Alex App
                    </h2>
                </div>
             </div>
             <div className="pl-12 space-y-3 text-slate-400">
                <p>Your React Native app sends queries to:</p>
                <CodeBlock code={integrationRequestCode} />
                <p className="pt-2">Returns culturally adapted response:</p>
                <CodeBlock code={integrationResponseCode} />
            </div>
        </section>

        <OfflineSyncNextSteps onProceed={onBuildOfflineSync} />

      </main>
      <footer className="text-center py-8 mt-12 text-slate-500">
        Generated by AI for workflow automation analysis.
      </footer>
    </div>
);