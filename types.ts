
export interface FeasibilityData {
  rank: number;
  prompt: string;
  feasibility: 'High' | 'Medium-High' | 'Medium' | 'Medium-Low' | 'Low' | 'Low (Privacy Risk)';
  capabilities: string;
  gaps: string;
  approach: string;
}

export interface RecommendationPhase {
    phase: number;
    title: string;
    points: string[];
}
