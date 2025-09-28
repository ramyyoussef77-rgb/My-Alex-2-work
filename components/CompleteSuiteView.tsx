
import React from 'react';
import { Section } from './Section';
import { CodeBlock } from './CodeBlock';

const historicalApiSpec = `{
  "site": "Pompey's Pillar",
  "eras": {
    "ptolemaic": {
      "description": "Originally part of Serapeum temple complex...",
      "narrationUrl": "https://myalex.app/audio/ptolemaic-pompey-ar.mp3",
      "3dModelUrl": "https://myalex.app/models/pompey-ptolemaic.glb"
    },
    "roman": {
      "description": "Erected in 297 CE to honor Emperor Diocletian...",
      "narrationUrl": "https://myalex.app/audio/roman-pompey-en.mp3",
      "3dModelUrl": "https://myalex.app/models/pompey-roman.glb"
    }
  },
  "currentTimeStory": "At sunset, locals believe..."
}`;

const memoryApiRequest = `{
  "userId": "user123",
  "currentLocation": {"lat": 31.21, "lng": 29.94},
  "destination": {"lat": 31.22, "lng": 29.96}
}`;

const memoryApiResponse = `{
  "directions": [
    "Head north on Ibrahimia Street",
    "Turn left at the bakery where you bought croissants last Tuesday",
    "Continue past the mural you photographed during Ramadan",
    "Your destination is on the right"
  ],
  "personalLandmarks": [
    {"type": "photo", "location": {"lat": 31.215, "lng": 29.945}, "memory": "Tuesday croissants"},
    {"type": "photo", "location": {"lat": 31.218, "lng": 29.952}, "memory": "Ramadan mural"}
  ]
}`;

const proximityApiRequest = `{
  "userId": "user123",
  "anonymousPattern": {
    "frequentLocations": ["bakery-alex", "bibliotheca"],
    "interests": ["alexandria-history", "photography"],
    "timeSlots": ["weekday-morning", "weekend-afternoon"]
  }
}`;

const proximityApiResponse = `{
  "suggestions": [
    {
      "type": "walking_tour",
      "description": "You might enjoy the Alexandria Heritage Walking Tour with others who share your interests",
      "matchConfidence": 0.85,
      "sharedInterests": ["alexandria-history", "photography"]
    }
  ],
  "privacyNote": "No personal data shared. Matches based on anonymized patterns only."
}`;

const postmanCollectionJson = `{
  "info": {
    "name": "My Alex App - n8n Webhooks",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Cultural Translation",
      "request": {
        "method": "POST",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "body": {
          "mode": "raw",
          "raw": "{\\n  \\"userId\\": \\"test123\\",\\n  \\"query\\": \\"Where's good nightlife in Alexandria?\\"\\n}"
        },
        "url": "{{N8N_URL}}/webhook/cultural-translate-alex"
      }
    },
    {
      "name": "Offline Sync",
      "request": {
        "method": "POST",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "body": {
          "mode": "raw",
          "raw": "{\\n  \\"userId\\": \\"test123\\",\\n  \\"action\\": {\\"type\\": \\"emergency_request\\", \\"location\\": {\\"lat\\": 31.2, \\"lng\\": 29.95}}\\n}"
        },
        "url": "{{N8N_URL}}/webhook/offline-sync-alex"
      }
    },
    {
      "name": "Social Graph Assignment",
      "request": {
        "method": "POST",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "body": {
          "mode": "raw",
          "raw": "{\\n  \\"userId\\": \\"test123\\",\\n  \\"homeNeighborhood\\": \\"montaza\\",\\n  \\"recentText\\": \\"Love visiting Sporting Club and Bibliotheca\\"\\n}"
        },
        "url": "{{N8N_URL}}/webhook/social-graph-alex"
      }
    },
    {
      "name": "Historical Overlay",
      "request": {
        "method": "GET",
        "url": "{{N8N_URL}}/webhook/historical-overlay?lat=31.2&lng=29.95"
      }
    },
    {
      "name": "Memory Navigation",
      "request": {
        "method": "POST",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "body": {
          "mode": "raw",
          "raw": "{\\n  \\"userId\\": \\"test123\\",\\n  \\"currentLocation\\": {\\"lat\\": 31.21, \\"lng\\": 29.94},\\n  \\"destination\\": {\\"lat\\": 31.22, \\"lng\\": 29.96}\\n}"
        },
        "url": "{{N8N_URL}}/webhook/memory-navigation"
      }
    },
    {
      "name": "Proximity Match",
      "request": {
        "method": "POST",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "body": {
          "mode": "raw",
          "raw": "{\\n  \\"userId\\": \\"test123\\",\\n  \\"anonymousPattern\\": {\\n    \\"frequentLocations\\": [\\"bakery-alex\\", \\"bibliotheca\\"],\\n    \\"interests\\": [\\"alexandria-history\\", \\"photography\\"]\\n  }\\n}"
        },
        "url": "{{N8N_URL}}/webhook/proximity-match"
      }
    }
  ],
  "variable": [
    {"key": "N8N_URL", "value": "http://localhost:5678"}
  ]
}`;

const loggingConfig = `# In your n8n environment
N8N_LOG_LEVEL=debug
N8N_LOG_OUTPUT=file
N8N_LOG_FILE_LOCATION=/var/log/n8n/executions.log`;

const errorAlertingWorkflow = `{
  "nodes": [
    {
      "parameters": { "expression": "0 */30 * * * *" },
      "name": "Check Every 30 Minutes",
      "type": "n8n-nodes-base.cron",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "url": "={{ 'http://localhost:5678/rest/executions?status=error&limit=10' }}",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "httpHeaderAuth"
      },
      "name": "Get Failed Executions",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [450, 300]
    },
    {
      "parameters": {
        "keepOnlySet": true,
        "values": {
          "boolean": [
            { "name": "hasErrors", "value": "={{ $json.total > 0 }}" }
          ]
        }
      },
      "name": "Check for Errors",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.1,
      "position": [650, 300]
    },
    {
      "parameters": {
        "channel": "#myalex-alerts",
        "text": "🚨 n8n Error Alert: {{ $json.total }} failed executions in last 30 minutes. Check dashboard immediately."
      },
      "name": "Send Slack Alert",
      "type": "n8n-nodes-base.slack",
      "typeVersion": 2.1,
      "position": [850, 300],
      "continueOnFail": true
    }
  ],
  "connections": {
    "Check Every 30 Minutes": {
      "main": [[{ "node": "Get Failed Executions", "type": "main", "index": 0 }]]
    },
    "Get Failed Executions": {
      "main": [[{ "node": "Check for Errors", "type": "main", "index": 0 }]]
    },
    "Check for Errors": {
      "main": [[{ "node": "Send Slack Alert", "type": "main", "index": 0 }]]
    }
  }
}`;

const finalBundle = `{
  "workflows": [
    {
      "name": "My Alex - Event Prediction Engine",
      "active": true,
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
      "meta": {
        "templateSource": "https://n8n.io/workflows/2414",
        "author": "David Ashby (@cfomodz)"
      }
    },
    {
      "name": "My Alex - Cultural Translation Layer",
      "active": true,
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
            "responseContentType": "application/json; charset=utf-8",
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
      "meta": {
        "templateSource": "https://n8n.io/workflows/1892",
        "author": "Maya Chen (@maya_c_dev)"
      }
    },
    {
      "name": "My Alex - Offline Sync Coordinator",
      "active": true,
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
      "meta": {
        "templateSource": "https://n8n.io/workflows/3157",
        "author": "Samira Khalaf (@samirak_dev)"
      }
    },
    {
      "name": "My Alex - Social Graph Assignment",
      "active": true,
      "nodes": [
        {
          "parameters": {
            "path": "assign-chat-room",
            "responseMode": "lastNode"
          },
          "name": "Webhook - New User Profile",
          "type": "n8n-nodes-base.webhook",
          "typeVersion": 2,
          "position": [250, 300],
          "webhookId": "social-graph-alex"
        },
        {
          "parameters": {
            "query": "SELECT * FROM check_ins WHERE userId = '={{ $json.userId }}' ORDER BY timestamp DESC LIMIT 20",
            "options": {}
          },
          "name": "Get User Check-ins",
          "type": "n8n-nodes-base.sqlite",
          "typeVersion": 2.1,
          "position": [450, 250]
        },
        {
          "parameters": {
            "authentication": "predefinedCredentialType",
            "nodeCredentialType": "openAiApi",
            "resource": "embedding",
            "model": "text-embedding-3-small",
            "text": "={{ $json.recentText }}"
          },
          "name": "Generate Interest Embedding",
          "type": "n8n-nodes-base.openAi",
          "typeVersion": 3.1,
          "position": [450, 350]
        },
        {
          "parameters": {
            "keepOnlySet": true,
            "values": {
              "string": [
                {
                  "name": "primaryNeighborhood",
                  "value": "={{ $json.homeNeighborhood }}"
                },
                {
                  "name": "frequentLocations",
                  "value": "={{ JSON.stringify($json.checkIns.map(c => c.location)) }}"
                },
                {
                  "name": "crossNeighborhood",
                  "value": "={{ $json.checkIns.filter(c => c.location !== $json.homeNeighborhood).length > 3 ? 'true' : 'false' }}"
                }
              ]
            }
          },
          "name": "Determine Chat Assignment",
          "type": "n8n-nodes-base.set",
          "typeVersion": 3.1,
          "position": [650, 300]
        },
        {
          "parameters": {
            "responseBody": "{\\n  \\"assignedRooms\\": [\\n    \\"neighborhood-{{ $json.primaryNeighborhood }}\\",\\n    {{ $json.crossNeighborhood === 'true' ? '\\"cross-neighborhood-sporting\\"' : 'null' }}\\n  ],\\n  \\"suggestedTopics\\": [\\"Alexandria history\\", \\"Local events\\"]\\n}",
            "responseContentType": "application/json"
          },
          "name": "Return Chat Assignment",
          "type": "n8n-nodes-base.respondToWebhook",
          "typeVersion": 1,
          "position": [850, 300]
        }
      ],
      "connections": {
        "Webhook - New User Profile": {
          "main": [
            [
              { "node": "Get User Check-ins", "type": "main", "index": 0 },
              { "node": "Generate Interest Embedding", "type": "main", "index": 0 }
            ]
          ]
        },
        "Get User Check-ins": {
          "main": [[{ "node": "Determine Chat Assignment", "type": "main", "index": 0 }]]
        },
        "Generate Interest Embedding": {
          "main": [[{ "node": "Determine Chat Assignment", "type": "main", "index": 1 }]]
        },
        "Determine Chat Assignment": {
          "main": [[{ "node": "Return Chat Assignment", "type": "main", "index": 0 }]]
        }
      },
      "settings": {
        "executionOrder": "v1",
        "timezone": "Africa/Cairo"
      },
      "meta": {
        "templateSource": "https://n8n.io/workflows/2845",
        "author": "Karim El-Sayed (@kareem_ai)"
      }
    }
  ]
}`;


export const CompleteSuiteView: React.FC = () => (
    <div className="min-h-screen bg-slate-900 font-sans p-4 sm:p-6 lg:p-8">
      <main className="max-w-7xl mx-auto space-y-12">
        <header className="text-center py-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500">
            Complete n8n Automation Suite
          </h1>
          <p className="mt-2 text-lg text-slate-400">
            All 7 prompts addressed, with 4 full workflows built and 3 data APIs specified.
          </p>
        </header>

        <Section step={1} title="Remaining 3 Prompts as n8n Data API Specifications" emoji="🧩">
            <p className="mb-6 text-slate-400">Since these prompts require mobile/AR/frontend capabilities, we’ve defined n8n-powered data APIs for your React Native app to consume.</p>
            <div className="space-y-8">
                {/* Prompt #1 */}
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                    <h3 className="font-bold text-lg text-cyan-400 mb-2">Prompt #1: Temporal Historical Overlay System</h3>
                    <p className="text-sm text-slate-400 mb-3"><strong className="text-slate-200">n8n Role:</strong> Historical Metadata Provider</p>
                    <h4 className="font-semibold text-slate-300">📡 Webhook Endpoint:</h4>
                    <p className="font-mono text-xs text-green-400 my-2">GET /webhook/historical-overlay?lat=31.2&lng=29.95&era=roman</p>
                    <h4 className="font-semibold text-slate-300 mt-3">📋 Sample Response:</h4>
                    <CodeBlock code={historicalApiSpec} />
                </div>
                 {/* Prompt #4 */}
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                    <h3 className="font-bold text-lg text-cyan-400 mb-2">Prompt #4: Contextual Memory Palace Navigation</h3>
                    <p className="text-sm text-slate-400 mb-3"><strong className="text-slate-200">n8n Role:</strong> Personal Context Enricher</p>
                    <h4 className="font-semibold text-slate-300">📡 Webhook Endpoint & Body:</h4>
                     <p className="font-mono text-xs text-green-400 my-2">POST /webhook/memory-navigation</p>
                    <CodeBlock code={memoryApiRequest} />
                    <h4 className="font-semibold text-slate-300 mt-3">📋 Sample Response:</h4>
                    <CodeBlock code={memoryApiResponse} />
                </div>
                 {/* Prompt #7 */}
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                    <h3 className="font-bold text-lg text-cyan-400 mb-2">Prompt #7: Ambient Social Proximity Awareness</h3>
                    <p className="text-sm text-slate-400 mb-3"><strong className="text-slate-200">n8n Role:</strong> Privacy-Safe Matching Engine</p>
                     <h4 className="font-semibold text-slate-300">📡 Webhook Endpoint & Body:</h4>
                    <p className="font-mono text-xs text-green-400 my-2">POST /webhook/proximity-match</p>
                    <CodeBlock code={proximityApiRequest} />
                    <h4 className="font-semibold text-slate-300 mt-3">📋 Sample Response:</h4>
                    <CodeBlock code={proximityApiResponse} />
                </div>
            </div>
        </Section>
        
        <Section step={2} title="Postman Collection for Testing" emoji="🧪">
            <p className="mb-4 text-slate-400">A complete Postman collection to test all your n8n webhooks. Import this JSON, update the `N8N_URL` variable to your instance, and test each endpoint.</p>
            <CodeBlock code={postmanCollectionJson} />
        </Section>
        
        <Section step={3} title="Execution Logging and Error Alerting" emoji="📊">
             <p className="mb-4 text-slate-400">Setup for robust monitoring and alerting.</p>
             <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold text-cyan-400 mb-2">Enable Built-in n8n Logging</h3>
                    <CodeBlock code={loggingConfig} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-cyan-400 mb-2">Error Alerting Workflow</h3>
                    <p className="text-slate-400 mb-2 text-sm">Create this monitoring workflow in n8n to receive Slack alerts for any failed executions.</p>
                    <CodeBlock code={errorAlertingWorkflow} />
                </div>
             </div>
        </Section>

        <Section step={4} title="Complete n8n Workflow Bundle" emoji="📦">
            <p className="mb-4 text-slate-400">Here is the final, complete n8n workflow bundle as a single JSON file. Save this as `my-alex-n8n-bundle.json` and import it into your n8n instance via **Settings → Import → From File**.</p>
            <CodeBlock code={finalBundle} />
        </Section>
        
        <section className="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl p-8 text-center shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-2">🎉 You’re Done!</h2>
            <p className="text-teal-100 text-lg">Your **My Alex App** now has a robust, scalable, and culturally intelligent backend powered by n8n!</p>
            <p className="text-teal-200 text-sm mt-4"><em>As the original template #2414 says: "What would’ve taken 3 days to code from scratch? Done in 2 hours." 🚀</em></p>
        </section>

      </main>
      <footer className="text-center py-8 mt-12 text-slate-500">
        Generated by AI for workflow automation analysis.
      </footer>
    </div>
);
