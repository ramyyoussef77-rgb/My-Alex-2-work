import React, { useState } from 'react';
import { Section } from './components/Section';
import { CodeBlock } from './components/CodeBlock';
import { FeasibilityTable } from './components/FeasibilityTable';
import { RecommendationList } from './components/RecommendationList';
import { NextStep } from './components/NextStep';
import { feasibilityData, recommendationPhases } from './constants';
import { WorkflowBuilder } from './components/WorkflowBuilder';
import { CulturalTranslationBuilder } from './components/CulturalTranslationBuilder';
import { OfflineSyncBuilder } from './components/OfflineSyncBuilder';
import { FinalSummary } from './components/FinalSummary';
import { CompleteSuiteView } from './components/CompleteSuiteView';
import { ProductionHardeningView } from './components/ProductionHardeningView';
import { DeploymentGuideView } from './components/DeploymentGuideView';
import { FinalArchitectureView } from './components/FinalArchitectureView';
import { UIDesignView } from './components/UIDesignView';


const discoveryQueries = [
  {
    title: "Prompt 1: Historical Overlay → GPS + time-based metadata",
    code: `search_templates('historical timeline')
get_templates_for_task('geolocation_context')
list_node_templates(['n8n-nodes-base.openAi', 'n8n-nodes-base.sqlite'])`
  },
  {
    title: "Prompt 2: Social Graph → text + check-in clustering",
    code: `search_templates('social graph')
search_nodes({query: 'clustering'})
list_ai_tools()`
  },
  {
    title: "Prompt 3: Offline Resilience → sync + local cache",
    code: `search_templates('offline sync')
get_templates_for_task('progressive_sync')`
  },
  {
    title: "Prompt 4: Memory Palace → personal location history",
    code: `search_templates('location memory')
search_nodes({query: 'photo metadata'})`
  },
  {
    title: "Prompt 5: Cultural Translation → context-aware routing",
    code: `search_templates('cultural translation')
get_node_for_task('translate_text')`
  },
  {
    title: "Prompt 6: Event Prediction → FB scraping + AI forecasting",
    code: `search_templates('event prediction')
get_templates_for_task('web_scraping')`
  },
  {
    title: "Prompt 7: Proximity Awareness → anonymized matching",
    code: `search_templates('privacy proximity')
search_nodes({query: 'anonymize'})`
  }
];

const nodeMappingCode = `// Core AI & Data Nodes
get_node_essentials('n8n-nodes-base.openAi')
get_node_essentials('n8n-nodes-base.httpRequest')
get_node_essentials('n8n-nodes-base.sqlite')
get_node_essentials('n8n-nodes-base.set')
get_node_essentials('n8n-nodes-base.function')  // Only if absolutely necessary

// Geolocation & Time
search_nodes({query: 'geolocation'})
search_nodes({query: 'timezone'})

// Privacy & Anonymization
search_node_properties('n8n-nodes-base.set', 'anonymize')`;

const FeasibilityView = ({ onProceed }: { onProceed: () => void }) => (
    <div className="min-h-screen bg-slate-900 font-sans p-4 sm:p-6 lg:p-8">
      <main className="max-w-7xl mx-auto space-y-12">
        <header className="text-center py-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            n8n Feasibility & Implementation Plan
          </h1>
          <p className="mt-2 text-lg text-slate-400">
            An automated analysis of prompt-to-workflow feasibility.
          </p>
        </header>

        <Section step={1} title="Discovery Queries" emoji="🧩">
            <p className="mb-6 text-slate-400">Parallel discovery queries to map each prompt to existing templates, nodes, and AI tool capabilities.</p>
            <div className="space-y-6">
                {discoveryQueries.map((query, index) => (
                    <div key={index} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                        <h3 className="font-semibold text-cyan-400 mb-2">{query.title}</h3>
                        <CodeBlock code={query.code} />
                    </div>
                ))}
            </div>
            <p className="mt-6 text-center text-slate-500 animate-pulse">⏳ Running comprehensive discovery...</p>
        </Section>
        
        <Section step={2} title="Node & AI Tool Mapping" emoji="🗺️">
            <p className="mb-6 text-slate-400">Identifying core nodes required for each prompt.</p>
            <CodeBlock code={nodeMappingCode} />
            <p className="mt-6 text-center text-slate-500 animate-pulse">⏳ Gathering node essentials...</p>
        </Section>
        
        <Section step={3} title="Feasibility Assessment & Ranking" emoji="📊">
             <p className="mb-6 text-slate-400">Based on template availability, node capabilities, and validation potential, here is the ranked feasibility matrix:</p>
            <FeasibilityTable data={feasibilityData} />
        </Section>

        <Section step={4} title="Recommendation: Implementation Order" emoji="🏆">
            <RecommendationList phases={recommendationPhases} />
        </Section>

        <NextStep onProceed={onProceed} />

      </main>
      <footer className="text-center py-8 mt-12 text-slate-500">
        Generated by AI for workflow automation analysis.
      </footer>
    </div>
);


export default function App() {
  const [view, setView] = useState('feasibility');

  switch (view) {
    case 'eventPrediction':
        return <WorkflowBuilder onBuildCulturalLayer={() => setView('culturalTranslation')} />;
    case 'culturalTranslation':
        return <CulturalTranslationBuilder onBuildOfflineSync={() => setView('offlineSync')} />;
    case 'offlineSync':
        return <OfflineSyncBuilder onFinalize={() => setView('finalSummary')} />;
    case 'finalSummary':
        return <FinalSummary onFinalizeSuite={() => setView('completeSuite')} />;
    case 'completeSuite':
        return <CompleteSuiteView onBuildHardening={() => setView('productionHardening')} />;
    case 'productionHardening':
        return <ProductionHardeningView onDeploy={() => setView('deploymentGuide')} />;
    case 'deploymentGuide':
        return <DeploymentGuideView onProceedToArchitecture={() => setView('finalArchitecture')} />;
    case 'finalArchitecture':
        return <FinalArchitectureView onProceedToUIDesign={() => setView('uiDesign')} />;
    case 'uiDesign':
        return <UIDesignView />;
    case 'feasibility':
    default:
        return <FeasibilityView onProceed={() => setView('eventPrediction')} />;
  }
}