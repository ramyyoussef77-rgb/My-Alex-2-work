import React from 'react';
import { Section } from './Section';
import { CodeBlock } from './CodeBlock';
import { ArchitectureNextSteps } from './ArchitectureNextSteps';

const dockerComposeYaml = `version: '3.8'
services:
  n8n:
    image: n8nio/n8n:latest
    ports:
      - "5678:5678"
    environment:
      - N8N_HOST=your-domain.com
      - N8N_PORT=5678
      - N8N_PROTOCOL=https
      - DB_TYPE=sqlite
      - DB_SQLITE_PATH=/home/node/.n8n/my-alex-data.db
      - # Your custom secrets (replace with real values)
      - MY_ALEX_API_KEY=generate_a_64_char_hex_key_here
      - WEATHER_API_KEY=your_openweather_api_key
      - MONITORING_TOKEN=your_monitoring_service_token
      - # Security
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=strong_admin_password_here
    volumes:
      - n8n_data:/home/node/.n8n
    restart: unless-stopped

volumes:
  n8n_data:`;

const generateApiKeyCommand = `# Run this command to generate a secure 64-character hex key
openssl rand -hex 32`;
const deployCommands = `# On your server (AWS/Google Cloud/DigitalOcean)
mkdir my-alex-n8n && cd my-alex-n8n
nano docker-compose.yml
docker-compose up -d`;

const nginxConfig = `server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5678;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:5678;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}`;

const certbotCommands = `# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com

# Test auto-renewal
sudo certbot renew --dry-run`;

const nginxEnableCommands = `sudo ln -s /etc/nginx/sites-available/my-alex-n8n /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx`;

const dbVerifyCommand = `# Check if database file exists
docker-compose exec n8n ls -la /home/node/.n8n/

# You should see: my-alex-data.db`;

const holyGrailTest = `Can a new developer:
1. Deploy your docker-compose.yml in 15 minutes?
2. Import the workflow bundle in 5 minutes?  
3. Configure credentials in 10 minutes?
4. Have a fully functional, culturally intelligent, offline-resilient backend running?`;

const monitoringSummaryWorkflow = `{
  "name": "My Alex - Monitoring Summary",
  "active": true,
  "nodes": [
    {
      "parameters": { "expression": "0 * * * *" },
      "name": "Hourly Check",
      "type": "n8n-nodes-base.cron",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "url": "http://localhost:5678/rest/executions?limit=100&workflowId=your-workflow-id",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "httpHeaderAuth"
      },
      "name": "Get Recent Executions",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [450, 300]
    },
    {
      "parameters": {
        "keepOnlySet": true,
        "values": {
          "number": [
            {
              "name": "errorRate",
              "value": "={{ ($json.data.filter(e => e.finished === false).length / $json.count) * 100 }}"
            }
          ]
        }
      },
      "name": "Calculate Error Rate",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.1,
      "position": [650, 300]
    },
    {
      "parameters": {
        "channel": "#myalex-monitoring",
        "text": "📊 Hourly Summary: {{ $json.errorRate }}% error rate across all workflows. Total executions: {{ $json.count }}."
      },
      "name": "Post to Slack",
      "type": "n8n-nodes-base.slack",
      "typeVersion": 2.1,
      "position": [850, 300]
    }
  ],
  "connections": {
    "Hourly Check": {
      "main": [[{ "node": "Get Recent Executions", "type": "main", "index": 0 }]]
    },
    "Get Recent Executions": {
      "main": [[{ "node": "Calculate Error Rate", "type": "main", "index": 0 }]]
    },
    "Calculate Error Rate": {
      "main": [[{ "node": "Post to Slack", "type": "main", "index": 0 }]]
    }
  }
}`;

const feedbackSnippet = `// After AI response
const handleFeedback = async (messageId, rating) => {
  // Send feedback to n8n for prompt improvement
  await N8nService.callWebhook('feedback-collect', {
    messageId,
    rating, // 1-5 stars
    userId: currentUser.id,
    originalQuery: message.originalQuery,
    aiResponse: message.text,
    timestamp: new Date().toISOString()
  });
};`;

const virtuousCycleDiagram = `User Interaction → AI Response → Feedback Collection → 
Prompt Optimization → Better Responses → Happier Users`;

interface DeploymentGuideViewProps {
    onProceedToArchitecture: () => void;
}

export const DeploymentGuideView: React.FC<DeploymentGuideViewProps> = ({ onProceedToArchitecture }) => (
    <div className="min-h-screen bg-slate-900 font-sans p-4 sm:p-6 lg:p-8">
      <main className="max-w-7xl mx-auto space-y-12">
        <header className="text-center py-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-lime-500">
            Complete Production Deployment Guide
          </h1>
          <p className="mt-2 text-lg text-slate-400">
            From zero to a live, secure, and production-ready n8n backend.
          </p>
        </header>

        <Section step={1} title="Deploy n8n with Docker Compose" emoji="🐳">
            <p className="mb-4 text-slate-400">This enhanced <code className="bg-slate-700 p-1 rounded text-xs">docker-compose.yml</code> provides a production-ready, isolated environment with persistent data and pre-configured environment variables for your secrets.</p>
            <h3 className="text-lg font-semibold text-cyan-400 mb-2">docker-compose.yml</h3>
            <CodeBlock code={dockerComposeYaml} />
             <h3 className="text-lg font-semibold text-cyan-400 mt-6 mb-2">Generate Your API Key</h3>
             <CodeBlock code={generateApiKeyCommand} />
             <h3 className="text-lg font-semibold text-cyan-400 mt-6 mb-2">Deploy on Your Server</h3>
             <CodeBlock code={deployCommands} />
        </Section>

        <Section step={2} title="Configure Nginx Reverse Proxy with SSL" emoji="🛡️">
            <p className="mb-4 text-slate-400">Use Nginx as a reverse proxy to handle incoming traffic and secure your n8n instance with a free SSL certificate from Let's Encrypt.</p>
            <h3 className="text-lg font-semibold text-cyan-400 mb-2">Nginx Configuration</h3>
             <p className="text-sm text-slate-500 mb-2">Save this as <code className="bg-slate-700 p-1 rounded text-xs">/etc/nginx/sites-available/my-alex-n8n</code></p>
            <CodeBlock code={nginxConfig} />
            <h3 className="text-lg font-semibold text-cyan-400 mt-6 mb-2">Enable SSL with Certbot</h3>
            <CodeBlock code={certbotCommands} />
            <h3 className="text-lg font-semibold text-cyan-400 mt-6 mb-2">Enable Nginx Site</h3>
            <CodeBlock code={nginxEnableCommands} />
            <p className="mt-4 text-slate-300">Your webhooks are now secure at: <code className="bg-slate-700 p-1 rounded text-xs">https://your-domain.com/webhook/...</code></p>
        </Section>

         <Section step={3} title="Securely Configure Credentials in n8n" emoji="🔐">
            <p className="mb-4 text-slate-400">Access your n8n instance at <code className="bg-slate-700 p-1 rounded text-xs">https://your-domain.com</code> and log in with the admin credentials you set in your `docker-compose.yml`.</p>
            <p className="mb-4 text-slate-400">In the n8n UI, navigate to **Credentials → New** and configure the following:</p>
            <ul className="list-disc list-inside space-y-4 text-slate-300">
                <li><strong>OpenAI API:</strong> Type: `OpenAI API`, enter your API Key.</li>
                <li><strong>Google Calendar:</strong> Type: `Google Calendar OAuth2`, follow the setup wizard.</li>
                <li><strong>AWS Polly (for TTS):</strong> Type: `AWS`, provide your Access Key ID & Secret Access Key.</li>
            </ul>
            <div className="mt-4 p-4 bg-blue-900/50 border border-blue-700 rounded-md text-blue-300 text-sm">
                <strong>Note:</strong> Your custom secrets (`MY_ALEX_API_KEY`, etc.) are already set as environment variables via Docker Compose and are accessible in workflows using expressions like <code>{`{{$env.MY_ALEX_API_KEY}}`}</code>.
            </div>
         </Section>

         <Section step={4} title="Deploy and Initialize Workflows" emoji="📂">
            <h3 className="text-lg font-semibold text-cyan-400 mb-2">1. Import the 5-Workflow Bundle</h3>
            <p className="mb-4 text-slate-400">In the n8n UI, go to **Workflows → Import from File** and upload your bundle. When prompted, select the credentials you created in the previous step.</p>
            
            <h3 className="text-lg font-semibold text-cyan-400 mt-6 mb-2">2. Initialize the Database</h3>
            <p className="mb-4 text-slate-400">Find the **"My Alex - Production Hardening"** workflow and click **Execute Workflow**. This manually runs the "Initialize Database Tables" node.</p>

            <h3 className="text-lg font-semibold text-cyan-400 mt-6 mb-2">3. Verify SQLite Database Creation</h3>
            <CodeBlock code={dbVerifyCommand} />
        </Section>

        <Section step={5} title="End-to-End Testing & Launch Plan" emoji="🧪">
            <div className="space-y-8">
                <div>
                    <h3 className="text-xl font-bold text-cyan-400 mb-4">1. Validate with Postman</h3>
                    <p className="text-slate-400 mb-2">Run critical path tests to ensure your deployed endpoints are secure and functional. For example, test the cultural translation endpoint.</p>
                     <p className="text-slate-300 mt-2">✅ <strong>Expected Result:</strong> A culturally appropriate response, suggesting family-friendly alternatives.</p>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-cyan-400 mb-4">2. Conduct User Acceptance Testing (UAT)</h3>
                    <p className="text-slate-400 mb-2">Recruit 10-15 beta testers in Alexandria (mix of locals and tourists) to validate real-world scenarios like offline resilience and event prediction accuracy.</p>
                </div>
                 <div>
                    <h3 className="text-xl font-bold text-cyan-400 mb-4">3. Launch to Public</h3>
                     <p className="text-slate-400 mb-2">Follow a phased approach: soft launch in Egypt, monitor feedback, then expand to all Arabic-speaking countries.</p>
                </div>
            </div>
        </Section>
        
        <Section step={6} title="Final Validation: The Holy Grail Test" emoji="🏆">
            <p className="mb-4 text-slate-400">As the original template #2414 said, the ultimate test is efficiency. Can a new developer get your entire backend running quickly?</p>
            <CodeBlock code={holyGrailTest} />
            <p className="mt-4 text-slate-300">If the answer is yes, you’ve truly found the holy grail of automation.</p>
        </Section>

        <Section step={7} title="Activate Monitoring & Iteration" emoji="🔔">
             <div className="space-y-8">
                <div>
                    <h3 className="text-xl font-bold text-cyan-400 mb-4">1. Activate Monitoring</h3>
                    <p className="text-slate-400 mb-2">Ensure the error alerting in your **Production Hardening** workflow is active. Add this **Monitoring Summary workflow** to run hourly for proactive insights.</p>
                    <CodeBlock code={monitoringSummaryWorkflow} />
                </div>

                <div>
                    <h3 className="text-xl font-bold text-cyan-400 mb-4">2. Gather Feedback and Improve</h3>
                    <p className="text-slate-400 mb-2">Implement an in-app feedback mechanism to collect user ratings on AI responses. This creates a powerful feedback loop for prompt optimization.</p>
                     <h4 className="font-semibold text-slate-200 mt-4 mb-2">In-App Feedback Snippet (React Native):</h4>
                    <CodeBlock code={feedbackSnippet} />
                </div>
                 <div>
                    <h3 className="text-xl font-bold text-cyan-400 mb-4">The Virtuous Cycle of Intelligence</h3>
                     <p className="text-slate-400 mb-2">Your system now follows a powerful loop, making the app smarter with every user interaction.</p>
                     <CodeBlock code={virtuousCycleDiagram} />
                </div>
            </div>
        </Section>

        <ArchitectureNextSteps onProceed={onProceedToArchitecture} />
        
      </main>
      <footer className="text-center py-8 mt-12 text-slate-500">
        Generated by AI for workflow automation analysis.
      </footer>
    </div>
);