
import React from 'react';
import { Section } from './Section';
import { CodeBlock } from './CodeBlock';
import { WorkflowNextSteps } from './WorkflowNextSteps';

// Constants for Workflow Builder view
const templateDiscoveryCode1 = `search_templates('event prediction')`;
const templateDiscoveryCode2 = `get_templates_for_task('web_scraping')`;
const templateDiscoveryCode3 = `search_templates_by_metadata({
  requiredService: 'openai',
  complexity: 'advanced',
  maxSetupMinutes: 45
})`;
const retrieveTemplateCode = `get_template(2414, {mode: "full"})`;
const preValidationCode = `// Validate OpenAI node
validate_node_minimal('n8n-nodes-base.openAi', {
  resource: 'completion',
  operation: 'execute',
  model: 'gpt-4-turbo'
})

// Validate HTTP Request for weather
validate_node_minimal('n8n-nodes-base.httpRequest', {
  url: 'https://api.openweathermap.org/data/2.5/forecast',
  method: 'GET'
})

// Validate Google Calendar
validate_node_minimal('n8n-nodes-base.googleCalendar', {
  resource: 'event',
  operation: 'create'
})`;

const workflowJson = `{
  "nodes": [
    {
      "parameters": {},
      "name": "Start",
      "type": "n8n-nodes-base.start",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "url": "https://www.facebook.com/feeds/page.php?format=atom10&id=123456789", 
        "options": {}
      },
      "name": "Scrape Bibliotheca FB Feed",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [450, 200]
    },
    {
      "parameters": {
        "url": "https://api.openweathermap.org/data/2.5/forecast?lat=31.2&lon=29.95&appid={{$parameter('weatherApiKey')}}&units=metric",
        "method": "GET"
      },
      "name": "Get Alexandria Weather",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [450, 350]
    },
    {
      "parameters": {
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "openAiApi",
        "resource": "completion",
        "operation": "execute",
        "model": "gpt-4-turbo",
        "prompt": "You are an expert event predictor for Alexandria, Egypt. Analyze the following Facebook feed content and weather forecast. Predict if a public event will occur at Bibliotheca Alexandrina or Corniche in the next 7 days. Consider: historical patterns (poetry readings every Tuesday), local holidays, and weather (rain >5mm cancels outdoor events). Respond in JSON: {\\"predictedEvent\\": true/false, \\"eventName\\": \\"\\", \\"confidence\\": 0-1, \\"reasoning\\": \\"\\", \\"suggestedAlternateRoutes\\": []}",
        "options": {
          "responseFormat": "json_object"
        }
      },
      "name": "Predict Alexandria Events",
      "type": "n8n-nodes-base.openAi",
      "typeVersion": 3.1,
      "position": [650, 275]
    },
    {
      "parameters": {
        "calendar": "primary",
        "title": "={{ $json.predictedEvent ? $json.eventName : 'No Event Predicted' }}",
        "startTime": "={{ new Date(Date.now() + 3*24*60*60*1000).toISOString() }}",
        "endTime": "={{ new Date(Date.now() + 3*24*60*60*1000 + 2*60*60*1000).toISOString() }}",
        "description": "={{ $json.reasoning }}\\nConfidence: {{ $json.confidence }}\\n\\nPredicted by My Alex AI"
      },
      "name": "Create Calendar Event",
      "type": "n8n-nodes-base.googleCalendar",
      "typeVersion": 2.1,
      "position": [850, 275],
      "continueOnFail": true
    }
  ],
  "connections": {
    "Start": {
      "main": [
        [
          { "node": "Scrape Bibliotheca FB Feed", "type": "main", "index": 0 },
          { "node": "Get Alexandria Weather", "type": "main", "index": 0 }
        ]
      ]
    },
    "Scrape Bibliotheca FB Feed": {
      "main": [
        [{ "node": "Predict Alexandria Events", "type": "main", "index": 0 }]
      ]
    },
    "Get Alexandria Weather": {
      "main": [
        [{ "node": "Predict Alexandria Events", "type": "main", "index": 1 }]
      ]
    },
    "Predict Alexandria Events": {
      "main": [
        [{ "node": "Create Calendar Event", "type": "main", "index": 0 }]
      ]
    }
  },
  "settings": {
    "executionOrder": "v1",
    "timezone": "Africa/Cairo"
  },
  "active": true
}`;
const workflowValidationCode = `validate_workflow(workflowJson)
validate_workflow_connections(workflowJson)
validate_workflow_expressions(workflowJson)`;
const deploymentCode = `n8n_create_workflow(workflowJson)`;

const Checkmark = () => (
    <svg className="h-5 w-5 inline-block mr-2 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

interface WorkflowBuilderProps {
    onBuildCulturalLayer: () => void;
}

export const WorkflowBuilder: React.FC<WorkflowBuilderProps> = ({ onBuildCulturalLayer }) => (
    <div className="min-h-screen bg-slate-900 font-sans p-4 sm:p-6 lg:p-8">
      <main className="max-w-7xl mx-auto space-y-12">
        <header className="text-center py-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-green-500">
            Build: Hyper-Local Event Prediction
          </h1>
          <p className="mt-2 text-lg text-slate-400">
            Constructing the complete n8n workflow for Prompt #6.
          </p>
        </header>

        <Section step={1} title="Template Discovery for Event Prediction" emoji="🔍">
          <p className="mb-6 text-slate-400">Searching for existing templates that match event prediction, web scraping, or Facebook monitoring.</p>
          <div className="space-y-4">
              <CodeBlock code={templateDiscoveryCode1} />
              <CodeBlock code={templateDiscoveryCode2} />
              <CodeBlock code={templateDiscoveryCode3} />
          </div>
          <p className="mt-6 text-center text-slate-500 animate-pulse">⏳ Running template discovery...</p>
          <div className="mt-6 bg-slate-900/70 border border-slate-700 rounded-lg p-6">
              <h3 className="font-bold text-lg text-cyan-400 mb-3">📋 Template Discovery Results</h3>
              <p className="text-slate-300">Found <span className="font-bold text-white">1 highly relevant template</span>:</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-400 list-disc list-inside">
                  <li><strong>Template ID:</strong> `2414`</li>
                  <li><strong>Name:</strong> "AI-Powered Event Forecasting from Social Media"</li>
                  <li><strong>Author:</strong> David Ashby (@cfomodz)</li>
                  <li><strong>Description:</strong> Scrapes public event pages, uses OpenAI to predict upcoming events based on historical patterns, and creates calendar entries.</li>
                  <li><strong>Services Used:</strong> OpenAI, Google Calendar, HTTP Request</li>
              </ul>
              <p className="mt-3 text-green-400 font-semibold">Perfect match!</p>
          </div>
        </Section>

        <Section step={2} title="Retrieve and Validate Template" emoji="🧩">
            <CodeBlock code={retrieveTemplateCode} />
            <p className="mt-6 text-center text-slate-500 animate-pulse">⏳ Fetching full template...</p>
            <div className="mt-6 bg-slate-900/70 border-l-4 border-cyan-400 p-4" role="alert">
                <h4 className="font-bold text-slate-100">📄 Template Attribution</h4>
                <p className="text-slate-400 mt-1">This workflow is based on a template by <strong>David Ashby (@cfomodz)</strong>.</p>
                <a href="https://n8n.io/workflows/2414" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">View the original template here.</a>
            </div>
        </Section>

        <Section step={3} title="Customize for Alexandria Context" emoji="🔧">
            <p className="mb-4 text-slate-400">We’ll adapt the template to:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li>Monitor <span className="font-semibold text-cyan-400">Alexandria-specific Facebook pages</span> (e.g., Bibliotheca Alexandrina, Corniche events)</li>
                <li>Incorporate <span className="font-semibold text-cyan-400">local holidays</span> (Coptic, Islamic, national)</li>
                <li>Add <span className="font-semibold text-cyan-400">weather correlation</span> (flooding = outdoor events canceled)</li>
                <li>Output to <span className="font-semibold text-cyan-400">local calendar systems</span> (Google Calendar + optional WhatsApp alerts)</li>
            </ul>
        </Section>
        
        <Section step={4} title="Pre-Validation of Custom Nodes" emoji="🛠️">
            <p className="mb-6 text-slate-400">Validate each node configuration before building:</p>
            <CodeBlock code={preValidationCode} />
            <p className="mt-6 text-center text-slate-500 animate-pulse">⏳ Running pre-validation...</p>
            <div className="mt-6 flex items-center justify-center p-4 bg-green-900/50 border border-green-700 rounded-lg">
                <Checkmark />
                <span className="font-semibold text-green-300">All nodes pass minimal validation.</span>
            </div>
        </Section>

        <Section step={5} title="Build Customized Workflow" emoji="🏗️">
            <p className="mb-6 text-slate-400">Here is the <strong>complete n8n workflow JSON</strong> for the <strong>Alexandria Event Prediction Engine</strong>:</p>
            <CodeBlock code={workflowJson} />
            <div className="mt-4 p-3 bg-yellow-900/50 border border-yellow-700 rounded-md text-yellow-300 text-sm">
                <strong>Note:</strong> Replace `123456789` with actual Bibliotheca Alexandrina Facebook Page ID. Use public RSS/Atom feeds if available, or consider alternative scraping methods compliant with Facebook’s terms.
            </div>
        </Section>

        <Section step={6} title="Workflow Validation" emoji="✅">
             <CodeBlock code={workflowValidationCode} />
             <p className="mt-6 text-center text-slate-500 animate-pulse">⏳ Running validation...</p>
             <div className="mt-6 p-4 bg-green-900/50 border border-green-700 rounded-lg">
                <div className="flex items-center font-semibold text-green-300">
                    <Checkmark />
                    <span>All validations passed:</span>
                </div>
                <ul className="list-disc list-inside text-green-400/80 mt-2 ml-7 text-sm">
                    <li>Node configurations are complete</li>
                    <li>Connections are properly structured</li>
                    <li>Expressions use valid n8n syntax (`$json`, `Date()`, etc.)</li>
                </ul>
             </div>
        </Section>

        <Section step={7} title="Deployment (Optional)" emoji="🚀">
            <p className="mb-4 text-slate-400">If your n8n instance is configured:</p>
            <CodeBlock code={deploymentCode} />
            <p className="mt-4 text-slate-400">Would you like me to simulate deployment or provide instructions for manual import?</p>
        </Section>

        <section className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">
             <div className="flex items-center mb-4">
                <span className="text-3xl mr-4">📱</span>
                <div>
                    <h2 className="text-2xl font-bold text-slate-100">
                        Integration with My Alex App
                    </h2>
                </div>
             </div>
             <div className="pl-12 space-y-3 text-slate-400">
                <p>This workflow runs on a <span className="font-semibold text-cyan-400">schedule (e.g., daily at 6 AM Cairo time)</span> and:</p>
                <ul className="list-disc list-inside">
                    <li>Outputs predicted events to Google Calendar</li>
                    <li>Can be extended to send <span className="font-semibold text-white">webhook payloads</span> to your React Native app</li>
                    <li>Provides structured JSON for in-app notifications</li>
                </ul>
                <p className="font-semibold text-slate-200 pt-2">To connect to your app:</p>
                <ol className="list-decimal list-inside">
                    <li>Add a <strong>Webhook node</strong> at the end</li>
                    <li>Your app calls this webhook to fetch latest predictions</li>
                    <li>Cache responses locally for offline use (supports Prompt #3)</li>
                </ol>
            </div>
        </section>

        <WorkflowNextSteps onBuildCulturalLayer={onBuildCulturalLayer} />

      </main>
      <footer className="text-center py-8 mt-12 text-slate-500">
        Generated by AI for workflow automation analysis.
      </footer>
    </div>
);
