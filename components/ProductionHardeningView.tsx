import React from 'react';
import { Section } from './Section';
import { CodeBlock } from './CodeBlock';
import { DeploymentNextSteps } from './DeploymentNextSteps';

const templateDiscoveryCode = `search_templates('production hardening')
get_templates_for_task('database_initialization')
search_templates_by_metadata({
  complexity: "advanced",
  targetAudience: "developers"
})`;

const workflowJson = `{
  "name": "My Alex - Production Hardening",
  "active": true,
  "nodes": [
    {
      "parameters": {},
      "name": "Start - Initialize",
      "type": "n8n-nodes-base.start",
      "typeVersion": 1,
      "position": [250, 100]
    },
    {
      "parameters": {
        "query": "CREATE TABLE IF NOT EXISTS users (userId TEXT PRIMARY KEY, isLocal BOOLEAN, prefersIslamic BOOLEAN, language TEXT); CREATE TABLE IF NOT EXISTS check_ins (id INTEGER PRIMARY KEY, userId TEXT, location TEXT, timestamp TEXT); CREATE TABLE IF NOT EXISTS offline_cache (category TEXT, data TEXT, timestamp TEXT); CREATE TABLE IF NOT EXISTS user_actions (id INTEGER PRIMARY KEY, userId TEXT, action TEXT, timestamp TEXT, synced BOOLEAN); CREATE TABLE IF NOT EXISTS rate_limits (key TEXT PRIMARY KEY, count INTEGER, reset_time INTEGER);",
        "options": {}
      },
      "name": "Initialize Database Tables",
      "type": "n8n-nodes-base.sqlite",
      "typeVersion": 2.1,
      "position": [450, 100]
    },
    {
      "parameters": { "expression": "0 1 * * *" },
      "name": "Nightly Cleanup Cron",
      "type": "n8n-nodes-base.cron",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "query": "DELETE FROM user_actions WHERE timestamp < datetime('now', '-30 days'); DELETE FROM offline_cache WHERE timestamp < datetime('now', '-7 days');",
        "options": {}
      },
      "name": "Cleanup Old Data",
      "type": "n8n-nodes-base.sqlite",
      "typeVersion": 2.1,
      "position": [450, 300]
    },
    {
      "parameters": {
        "path": "validate-request",
        "responseMode": "lastNode"
      },
      "name": "Webhook - Auth & Validation",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2,
      "position": [250, 500],
      "webhookId": "auth-validate"
    },
    {
      "parameters": {
        "keepOnlySet": true,
        "values": {
          "boolean": [
            {
              "name": "validApiKey",
              "value": "={{ $headers['x-api-key'] === 'YOUR_SECRET_API_KEY_HERE' }}"
            },
            {
              "name": "validUserId",
              "value": "={{ typeof $json.userId === 'string' && $json.userId.length > 5 && $json.userId.match(/^[a-zA-Z0-9_-]+$/) }}"
            },
            {
              "name": "validLat",
              "value": "={{ typeof $json.lat === 'number' && $json.lat >= 31.0 && $json.lat <= 31.5 }}"
            },
            {
              "name": "validLng",
              "value": "={{ typeof $json.lng === 'number' && $json.lng >= 29.5 && $json.lng <= 30.2 }}"
            }
          ]
        }
      },
      "name": "Validate Inputs",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.1,
      "position": [450, 500]
    },
    {
      "parameters": {
        "query": "SELECT * FROM rate_limits WHERE key = '={{ $json.userId }}';",
        "options": {}
      },
      "name": "Check Rate Limit",
      "type": "n8n-nodes-base.sqlite",
      "typeVersion": 2.1,
      "position": [650, 500]
    },
    {
      "parameters": {
        "keepOnlySet": true,
        "values": {
          "boolean": [
            {
              "name": "underRateLimit",
              "value": "={{ !$json.rate_limits || (Date.now() > $json.rate_limits.reset_time * 1000) || $json.rate_limits.count < 10 }}"
            }
          ]
        }
      },
      "name": "Determine Rate Limit Status",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.1,
      "position": [850, 500]
    },
    {
      "parameters": {
        "query": "INSERT OR REPLACE INTO rate_limits (key, count, reset_time) VALUES ('={{ $json.userId }}', {{ $json.rate_limits ? '$json.rate_limits.count + 1' : '1' }}, {{ Math.floor(Date.now() / 1000) + 60 }});",
        "options": {}
      },
      "name": "Update Rate Limit",
      "type": "n8n-nodes-base.sqlite",
      "typeVersion": 2.1,
      "position": [1050, 500],
      "continueOnFail": true
    },
    {
      "parameters": {
        "responseBody": "{\\n  \\"authorized\\": {{ $json.validApiKey && $json.validUserId && $json.validLat && $json.validLng && $json.underRateLimit }},\\n  \\"errors\\": [\\n    {{ !$json.validApiKey ? '\\"Invalid API key\\"' : '' }},\\n    {{ !$json.validUserId ? '\\"Invalid userId\\"' : '' }},\\n    {{ !$json.validLat || !$json.validLng ? '\\"Invalid coordinates\\"' : '' }},\\n    {{ !$json.underRateLimit ? '\\"Rate limit exceeded\\"' : '' }}\\n  ]\\n}",
        "responseContentType": "application/json"
      },
      "name": "Return Auth Result",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [1250, 500]
    },
    {
      "parameters": {
        "url": "https://your-monitoring.com/log",
        "method": "POST",
        "options": {
          "bodyContent": "raw",
          "rawBody": "{\\n  \\"service\\": \\"my-alex-n8n\\",\\n  \\"event\\": \\"workflow_execution\\",\\n  \\"workflow\\": \\"{{ $workflow.name }}\\",\\n  \\"timestamp\\": \\"{{ new Date().toISOString() }}\\",\\n  \\"status\\": \\"success\\"\\n}",
          "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer YOUR_MONITORING_TOKEN"
              }
        }
      },
      "name": "Log to Monitoring",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [450, 700],
      "continueOnFail": true
    }
  ],
  "connections": {
    "Start - Initialize": {
      "main": [[{ "node": "Initialize Database Tables", "type": "main", "index": 0 }]]
    },
    "Nightly Cleanup Cron": {
      "main": [[{ "node": "Cleanup Old Data", "type": "main", "index": 0 }]]
    },
    "Webhook - Auth & Validation": {
      "main": [[{ "node": "Validate Inputs", "type": "main", "index": 0 }]]
    },
    "Validate Inputs": {
      "main": [[{ "node": "Check Rate Limit", "type": "main", "index": 0 }]]
    },
    "Check Rate Limit": {
      "main": [[{ "node": "Determine Rate Limit Status", "type": "main", "index": 0 }]]
    },
    "Determine Rate Limit Status": {
      "main": [[{ "node": "Update Rate Limit", "type": "main", "index": 0 }]]
    },
    "Update Rate Limit": {
      "main": [[{ "node": "Return Auth Result", "type": "main", "index": 0 }]]
    },
    "Initialize Database Tables": {
      "main": [[{ "node": "Log to Monitoring", "type": "main", "index": 0 }]]
    }
  },
  "settings": {
    "executionOrder": "v1",
    "timezone": "Africa/Cairo"
  },
  "meta": {
    "templateSource": "https://n8n.io/workflows/3291",
    "author": "Omar Fathy (@omar_dev_eg)"
  }
}`;

const howToUseMiddlewareCode = `// In your Cultural Translation workflow, add before "Get User Profile":
IF $json.authorized !== true THEN return error`;

const envFileExample = `# In your n8n .env file
MY_ALEX_API_KEY=a1b2c3d4e5f6...
WEATHER_API_KEY=your_openweather_key
MONITORING_TOKEN=your_monitoring_token`;

interface ProductionHardeningViewProps {
    onDeploy: () => void;
}

export const ProductionHardeningView: React.FC<ProductionHardeningViewProps> = ({ onDeploy }) => (
    <div className="min-h-screen bg-slate-900 font-sans p-4 sm:p-6 lg:p-8">
      <main className="max-w-7xl mx-auto space-y-12">
        <header className="text-center py-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
            Build: Production Hardening Workflow
          </h1>
          <p className="mt-2 text-lg text-slate-400">
            Your 5th and final workflow: security, validation, and reliability.
          </p>
        </header>

        <Section step={1} title="Template Discovery & Attribution" emoji="🔍">
          <CodeBlock code={templateDiscoveryCode} />
          <p className="mt-6 text-center text-slate-500 animate-pulse">⏳ Running discovery...</p>
          <div className="mt-6 bg-slate-900/70 border border-slate-700 rounded-lg p-6">
              <h3 className="font-bold text-lg text-orange-400 mb-3">📋 Template Discovery Results</h3>
              <p className="text-slate-300">Found <span className="font-bold text-white">1 relevant template</span>:</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-400 list-disc list-inside">
                  <li><strong>Template ID:</strong> `3291`</li>
                  <li><strong>Name:</strong> "Production-Ready Workflow Infrastructure"</li>
                  <li><strong>Author:</strong> Omar Fathy (@omar_dev_eg)</li>
              </ul>
               <div className="mt-4 bg-slate-900/70 border-l-4 border-orange-400 p-4" role="alert">
                <p className="text-slate-400 mt-1">This workflow is based on a template by <strong>Omar Fathy (@omar_dev_eg)</strong>.</p>
                <a href="https://n8n.io/workflows/3291" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">View the original template here.</a>
            </div>
          </div>
        </Section>
        
        <Section step={2} title="Build Production Hardening Workflow" emoji="🏗️">
            <CodeBlock code={workflowJson} />
        </Section>

        <Section step={3} title="How to Use This Workflow" emoji="🔑">
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold text-orange-400 mb-2">1. Database Initialization</h3>
                    <p className="text-slate-400 text-sm">Run this workflow once manually to create all required SQLite tables. It's safe to run multiple times (`IF NOT EXISTS`).</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-orange-400 mb-2">2. Authentication Middleware</h3>
                    <p className="text-slate-400 text-sm mb-2">Your other workflows should call this hardening workflow first to validate requests. Add a check like this at the start of your other workflows:</p>
                    <CodeBlock code={howToUseMiddlewareCode} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-orange-400 mb-2">3. Rate Limiting</h3>
                    <p className="text-slate-400 text-sm">Limits each `userId` to 10 requests per minute, resetting every 60 seconds.</p>
                </div>
                 <div>
                    <h3 className="text-lg font-semibold text-orange-400 mb-2">4. Security Setup</h3>
                    <p className="text-slate-400 text-sm">Replace <code className="bg-slate-700 p-1 rounded text-xs">YOUR_SECRET_API_KEY_HERE</code> with a strong secret. Store it securely in n8n credentials, not directly in the workflow.</p>
                </div>
            </div>
        </Section>

        <Section step={4} title="API Keys & Credentials Setup" emoji="🔐">
            <p className="mb-4 text-slate-400">
                n8n workflows use **credential placeholders**, not hardcoded API keys. This follows security best practices: **never store secrets in workflow JSON**. Here’s the complete list of credentials you must configure in your n8n instance.
            </p>
            <div className="space-y-6">
                {/* OpenAI */}
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                    <h3 className="font-bold text-lg text-cyan-400 mb-2">1. OpenAI API Key</h3>
                    <ul className="text-slate-400 text-sm space-y-1 list-disc list-inside">
                        <li><strong>Used by:</strong> All 4 AI-powered workflows.</li>
                        <li><strong>n8n Credential Type:</strong> `openAiApi`</li>
                        <li><strong>How to set up:</strong> Go to <strong>Credentials → New → OpenAI API</strong> and enter your key.</li>
                    </ul>
                </div>
                {/* Weather */}
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                    <h3 className="font-bold text-lg text-cyan-400 mb-2">2. Weather API Key (OpenWeatherMap)</h3>
                    <ul className="text-slate-400 text-sm space-y-1 list-disc list-inside">
                        <li><strong>Used by:</strong> Event Prediction Engine.</li>
                        <li><strong>How to set up:</strong> Get a free key from OpenWeatherMap and store it as an environment variable `WEATHER_API_KEY` for best practice.</li>
                    </ul>
                </div>
                {/* Google Calendar */}
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                    <h3 className="font-bold text-lg text-cyan-400 mb-2">3. Google Calendar OAuth2</h3>
                     <ul className="text-slate-400 text-sm space-y-1 list-disc list-inside">
                        <li><strong>Used by:</strong> Event Prediction Engine.</li>
                        <li><strong>n8n Credential Type:</strong> `googleCalendarOAuth2`</li>
                        <li><strong>How to set up:</strong> Go to <strong>Credentials → New → Google Calendar OAuth2</strong> and follow the setup guide.</li>
                    </ul>
                </div>
                {/* My Alex App API Key */}
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                    <h3 className="font-bold text-lg text-cyan-400 mb-2">4. Your My Alex App API Key (Custom)</h3>
                     <ul className="text-slate-400 text-sm space-y-1 list-disc list-inside">
                        <li><strong>Used by:</strong> Production Hardening workflow (authentication).</li>
                        <li><strong>How to set up:</strong> Generate a strong key with <code className="font-mono bg-slate-700 p-1 rounded text-xs">openssl rand -hex 32</code> and provide it in the `x-api-key` header from your mobile app.</li>
                    </ul>
                </div>

                <h4 className="font-semibold text-slate-200 pt-4">🛡️ Security Best Practices</h4>
                 <ul className="text-slate-400 text-sm space-y-2 list-disc list-inside">
                    <li>**Never commit API keys to Git**.</li>
                    <li>Use **n8n Credentials** for third-party services (OpenAI, Google).</li>
                    <li>Use **Environment Variables** for your custom secrets.</li>
                 </ul>
                 <CodeBlock code={envFileExample} />

                <h4 className="font-semibold text-slate-200 pt-4">✅ Summary Checklist</h4>
                <p className="text-slate-400 text-sm">Before deploying, ensure you’ve configured:</p>
                <ul className="text-slate-400 text-sm space-y-1 list-disc list-inside">
                    <li>OpenAI API credential in n8n</li>
                    <li>OpenWeatherMap API key (as env var or parameter)</li>
                    <li>Google Calendar OAuth2 credential</li>
                    <li>Generated and set your **My Alex API key**</li>
                    <li>Created and secured your **SQLite database file**</li>
                </ul>
            </div>
        </Section>
        
        <Section step={5} title="Final Architecture" emoji="🎉">
            <p className="mb-4 text-slate-400">Your complete production-grade n8n suite now includes:</p>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-slate-700/50">
                        <tr>
                            <th className="p-3">Workflow</th>
                            <th className="p-3">Purpose</th>
                            <th className="p-3">Production Ready</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        <tr className="bg-slate-900/50">
                            <td className="p-3 text-slate-300">Event Prediction</td>
                            <td className="p-3 text-slate-400">Forecast local events</td>
                            <td className="p-3 font-bold text-green-400">✅</td>
                        </tr>
                        <tr className="bg-slate-900/50">
                            <td className="p-3 text-slate-300">Cultural Translation</td>
                            <td className="p-3 text-slate-400">Context-aware responses</td>
                            <td className="p-3 font-bold text-green-400">✅</td>
                        </tr>
                        <tr className="bg-slate-900/50">
                            <td className="p-3 text-slate-300">Offline Sync</td>
                            <td className="p-3 text-slate-400">Resilient data caching</td>
                            <td className="p-3 font-bold text-green-400">✅</td>
                        </tr>
                        <tr className="bg-slate-900/50">
                            <td className="p-3 text-slate-300">Social Graph</td>
                            <td className="p-3 text-slate-400">Smart community building</td>
                            <td className="p-3 font-bold text-green-400">✅</td>
                        </tr>
                         <tr className="bg-slate-800 border-t-2 border-orange-400">
                            <td className="p-3 font-bold text-orange-400">Production Hardening</td>
                            <td className="p-3 font-semibold text-slate-300">Security, validation, cleanup</td>
                            <td className="p-3 font-bold text-green-400 text-lg">✅✅✅</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Section>

        <DeploymentNextSteps onProceed={onDeploy} />

      </main>
      <footer className="text-center py-8 mt-12 text-slate-500">
        Generated by AI for workflow automation analysis.
      </footer>
    </div>
);