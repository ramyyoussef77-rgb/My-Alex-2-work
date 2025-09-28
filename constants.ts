
import { FeasibilityData, RecommendationPhase } from './types';

export const feasibilityData: FeasibilityData[] = [
  {
    rank: 1,
    prompt: "#6: Hyper-Local Event Prediction Engine",
    feasibility: "High",
    capabilities: "Web scraping (HTTP Request), AI prediction (OpenAI), Calendar (Google/Outlook), Weather APIs",
    gaps: "Facebook scraping requires login bypass or RSS fallback",
    approach: "Build from scratch – strong node support"
  },
  {
    rank: 2,
    prompt: "#5: Dynamic Cultural Translation Layer",
    feasibility: "Medium-High",
    capabilities: "OpenAI function calling, language detection, conditional routing",
    gaps: "Needs fine-tuned cultural prompt engineering",
    approach: "Custom AI workflow with context routing"
  },
  {
    rank: 3,
    prompt: "#2: Predictive Neighborhood Social Graph",
    feasibility: "Medium",
    capabilities: "Text analysis (OpenAI), SQLite for user profiles, clustering via code (minimal)",
    gaps: "True ML clustering not native – needs lightweight logic",
    approach: "Hybrid: AI + simple rules + code node (minimal)"
  },
  {
    rank: 4,
    prompt: "#3: Disaster-Resilient Offline City Intelligence",
    feasibility: "Medium-Low",
    capabilities: "SQLite caching, webhook sync triggers, AI response templates",
    gaps: "No native PWA/mesh/offline execution – n8n is server-side only",
    approach: "Sync coordinator only – handle offline logic in app"
  },
  {
    rank: 5,
    prompt: "#4: Contextual Memory Palace Navigation",
    feasibility: "Medium-Low",
    capabilities: "Photo metadata via HTTP (if API exists), location history via DB, AI narration",
    gaps: "Requires deep mobile integration (photo GPS, timestamps)",
    approach: "Backend enrichment only – app must send context"
  },
  {
    rank: 6,
    prompt: "#7: Ambient Social Proximity Awareness",
    feasibility: "Low (Privacy Risk)",
    capabilities: "Anonymization possible via function node, pattern matching via SQLite",
    gaps: "Real-time proximity = mobile BLE/GPS – not n8n’s domain",
    approach: "Batch matching only – nightly job, not real-time"
  },
  {
    rank: 7,
    prompt: "#1: Temporal Historical Overlay System",
    feasibility: "Low",
    capabilities: "Can serve era metadata by GPS/time via API",
    gaps: "AR, camera, real-time GPS overlay = frontend/mobile only",
    approach: "Data API only – n8n provides JSON payload"
  }
];

export const recommendationPhases: RecommendationPhase[] = [
    {
        phase: 1,
        title: "Build Prompt #6 (Event Prediction Engine)",
        points: ["Highest ROI", "Full n8n native support", "Can be deployed immediately"],
    },
    {
        phase: 2,
        title: "Build Prompt #5 (Cultural Translation Layer)",
        points: ["Reusable for all user queries", "Enhances every other prompt"],
    },
    {
        phase: 3,
        title: "Build Prompt #2 (Social Graph) + #3 (Offline Sync)",
        points: ["Complementary: social data needs offline resilience"],
    },
    {
        phase: 4,
        title: "Support Prompts #1, #4, #7 via Data APIs",
        points: ["n8n acts as backend intelligence layer", "Mobile app consumes n8n webhooks/APIs"],
    }
];
