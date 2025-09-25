import React from 'react';
import { DeepResearchIcon } from './components/icons/DeepResearchIcon';
import { DeepCanvasIcon } from './components/icons/DeepCanvasIcon';
import { DeepAgentIcon } from './components/icons/DeepAgentIcon';
import { DeepAgent2Icon } from './components/icons/DeepAgent2Icon';
import { DeepDebateIcon } from './components/icons/DeepDebateIcon';
import { DeepStudyIcon } from './components/icons/DeepStudyIcon';
import { DeepStudioIcon } from './components/icons/DeepStudioIcon';
import { DeepTripIcon } from './components/icons/DeepTripIcon';
import { DeepHealthIcon } from './components/icons/DeepHealthIcon';
import { DeepInterviewIcon } from './components/icons/DeepInterviewIcon';
import { DeepMarketIcon } from './components/icons/DeepMarketIcon';
import { DeepChefIcon } from './components/icons/DeepChefIcon';
import { DeepGameIcon } from './components/icons/DeepGameIcon';
import { DeepCodeIcon } from './components/icons/DeepCodeIcon';
import { DeepLegalIcon } from './components/icons/DeepLegalIcon';
import { DeepFinanceIcon } from './components/icons/DeepFinanceIcon';
import { DeepSlidesIcon } from './components/icons/DeepSlidesIcon';

export enum AppState {
  MODE_SELECTION,
  SEARCHING,
  LOADING,
  RESULTS,
}

export enum ResearchMode {
  DEEP_RESEARCH = 'DEEP_RESEARCH',
  DEEP_CANVAS = 'DEEP_CANVAS',
  DEEP_AGENT = 'DEEP_AGENT',
  DEEP_AGENT_2 = 'DEEP_AGENT_2',
  DEEP_DEBATE = 'DEEP_DEBATE',
  DEEP_STUDY = 'DEEP_STUDY',
  DEEP_STUDIO = 'DEEP_STUDIO',
  DEEP_TRIP = 'DEEP_TRIP',
  DEEP_HEALTH = 'DEEP_HEALTH',
  DEEP_INTERVIEW = 'DEEP_INTERVIEW',
  DEEP_MARKET = 'DEEP_MARKET',
  DEEP_CHEF = 'DEEP_CHEF',
  DEEP_GAME = 'DEEP_GAME',
  DEEP_CODE = 'DEEP_CODE',
  DEEP_LEGAL = 'DEEP_LEGAL',
  DEEP_FINANCE = 'DEEP_FINANCE',
  DEEP_SLIDES = 'DEEP_SLIDES',
}

export interface Source {
  title: string;
  url: string;
  snippet: string;
}

export interface FlashCard {
  question: string;
  answer: string;
}

export interface RelatedVideo {
  title: string;
  description: string;
}

export interface MiniAppData {
  keyword: string;
  frequency: number;
}

export interface ResearchData {
  summary: string;
  sources: Source[];
  flashCards: FlashCard[];
  relatedVideos: RelatedVideo[];
  miniAppData: MiniAppData[];
}

export interface CodeFile {
  filename: string;
  language: 'html' | 'css' | 'javascript';
  content: string;
}

export interface CanvasData {
  sources: Source[];
  code: CodeFile[];
}

export interface AgentStep {
  title: string;
  reasoning: string;
  sourceURL?: string;
}

export interface AgentData {
    summary: string;
    sources: Source[];
    agentPath: AgentStep[];
}

export interface Argument {
    claim: string;
    evidence: string;
    counterArgument: string;
}

export interface Viewpoint {
    title: string;
    summary: string;
    arguments: Argument[];
}

export interface DebateData {
    topic: string;
    viewpoints: Viewpoint[];
    pointsOfConsensus: string;
    unresolvedQuestions: string[];
    sources: Source[];
}

export interface KeyConcept {
    concept: string;
    definition: string;
    example: string;
}

export interface StudyPlanItem {
    timeframe: string;
    topics: string[];
    activities: string[];
}

export interface PracticeProblem {
    question: string;
    answer: string;
}

export interface Analogy {
    concept: string;
    analogy: string;
}

export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
}

export interface StudyData {
    keyConcepts: KeyConcept[];
    studyPlan: StudyPlanItem[];
    practiceProblems: PracticeProblem[];
    analogies: Analogy[];
    quiz: QuizQuestion[];
    sources: Source[];
}

export interface VideoIdea {
    title: string;
    hook: string;
    description: string;
}

export interface ScriptSegment {
    scene: string;
    dialogue: string;
    visuals: string;
}

export interface StudioData {
    topic: string;
    videoIdeas: VideoIdea[];
    script: ScriptSegment[];
    seoKeywords: string[];
    hashtags: string[];
    sources: Source[];
}

export interface Activity {
    time: string;
    description: string;
}

export interface ItineraryItem {
    day: string;
    title: string;
    activities: Activity[];
}

export interface BudgetItem {
    category: string;
    cost: string;
}

export interface TripData {
    destination: string;
    tripSummary: string;
    itinerary: ItineraryItem[];
    packingList: string[];
    budgetBreakdown: BudgetItem[];
    sources: Source[];
}

export interface Exercise {
    name: string;
    sets: string;
    reps: string;
}

export interface WorkoutDay {
    day: string;
    exercises: Exercise[];
}

export interface Meal {
    name: string;
    description: string;
}

export interface MealDay {
    day: string;
    meals: Meal[];
}

export interface HealthData {
    goal: string;
    disclaimer: string;
    workoutPlan: WorkoutDay[];
    mealPlan: MealDay[];
    healthyHabits: string[];
    sources: Source[];
}

export interface InterviewQuestion {
    question: string;
    sampleAnswer: string;
    tips: string[];
}

export interface InterviewData {
    jobRole: string;
    introduction: string;
    commonQuestions: InterviewQuestion[];
    behavioralQuestions: InterviewQuestion[];
    technicalQuestions: InterviewQuestion[];
    closingStatement: string;
    sources: Source[];
}

export interface TargetAudience {
    segment: string;
    description: string;
}

export interface Competitor {
    name: string;
    strengths: string;
    weaknesses: string;
}

export interface Swot {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
}

export interface MarketData {
    productIdea: string;
    summary: string;
    targetAudience: TargetAudience[];
    competitors: Competitor[];
    swotAnalysis: Swot;
    marketingStrategies: string[];
    sources: Source[];
}

export interface Ingredient {
    name: string;
    quantity: string;
}

export interface ChefData {
    recipeName: string;
    description: string;
    prepTime: string;
    cookTime: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    ingredients: Ingredient[];
    instructions: string[];
    sources: Source[];
}

export interface GameMechanic {
    name: string;
    description: string;
}

export interface CharacterConcept {
    name: string;
    description: string;
    abilities: string[];
}

export interface GameData {
    title: string;
    concept: string;
    coreMechanics: GameMechanic[];
    characterConcepts: CharacterConcept[];
    monetization: string[];
    sources: Source[];
}

export interface CodeSnippet {
    language: string;
    code: string;
}

export interface CodeData {
    problemStatement: string;
    solutionExplanation: string;
    codeSnippets: CodeSnippet[];
    edgeCases: string[];
    sources: Source[];
}

export interface LegalTerm {
    term: string;
    definition: string;
}

export interface LegalData {
    topic: string;
    disclaimer: string;
    plainSummary: string;
    keyTerms: LegalTerm[];
    mainPoints: string[];
    sources: Source[];
}

export interface FinanceMetric {
    metric: string;
    value: string;
    explanation: string;
}

export interface FinanceProsCons {
    pros: string[];
    cons: string[];
}

export interface FinanceData {
    topic: string;
    disclaimer: string;
    summary: string;
    keyMetrics: FinanceMetric[];
    prosAndCons: FinanceProsCons;
    sources: Source[];
}

export interface Slide {
    title: string;
    content: string;
}

export interface SlidesData {
    title: string;
    slides: Slide[];
    htmlContent: string;
    sources: Source[];
}

export interface GroundingChunk {
    web: {
        uri: string;
        title: string;
    }
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
    sources?: GroundingChunk[];
}

export type AnyData = ResearchData | CanvasData | AgentData | DebateData | StudyData | StudioData | TripData | HealthData | InterviewData | MarketData | ChefData | GameData | CodeData | LegalData | FinanceData | SlidesData;

export interface HistoryItem {
  id: string;
  query: string;
  mode: ResearchMode;
  data: AnyData;
  timestamp: number;
}

export const modeDetails: Record<ResearchMode, { Icon: React.FC; title: string; description: string; tag: { text: string; color: string; }}> = {
    [ResearchMode.DEEP_RESEARCH]: { Icon: DeepResearchIcon, title: 'Deep Research', description: 'In-depth analysis with sources, flashcards, and more.', tag: { text: 'CORE', color: 'bg-gray-200 text-gray-700' } },
    [ResearchMode.DEEP_AGENT]: { Icon: DeepAgentIcon, title: 'Deep Agent', description: 'Autonomous AI agent that shows its research path.', tag: { text: 'PRO', color: 'bg-purple-100 text-purple-800' } },
    [ResearchMode.DEEP_AGENT_2]: { Icon: DeepAgent2Icon, title: 'Deep Agent 2.0', description: 'Browse the web and chat with a search-powered AI.', tag: { text: 'BETA', color: 'bg-teal-100 text-teal-800' } },
    [ResearchMode.DEEP_CANVAS]: { Icon: DeepCanvasIcon, title: 'Deep Canvas', description: 'Generate a fully functional web app from a prompt.', tag: { text: 'NEW', color: 'bg-blue-100 text-blue-800' } },
    [ResearchMode.DEEP_SLIDES]: { Icon: DeepSlidesIcon, title: 'Deep Slides', description: 'Generate a beautiful, custom-designed presentation.', tag: { text: 'NEW', color: 'bg-orange-100 text-orange-800' } },
    [ResearchMode.DEEP_CODE]: { Icon: DeepCodeIcon, title: 'Deep Code', description: 'Solve coding problems with explanations and snippets.', tag: { text: 'NEW', color: 'bg-gray-800 text-gray-100' } },
    [ResearchMode.DEEP_LEGAL]: { Icon: DeepLegalIcon, title: 'Deep Legal', description: 'Simplify complex legal topics into plain English.', tag: { text: 'BETA', color: 'bg-amber-100 text-amber-800' } },
    [ResearchMode.DEEP_FINANCE]: { Icon: DeepFinanceIcon, title: 'Deep Finance', description: 'Analyze financial concepts with key metrics.', tag: { text: 'BETA', color: 'bg-emerald-100 text-emerald-800' } },
    [ResearchMode.DEEP_DEBATE]: { Icon: DeepDebateIcon, title: 'Deep Debate', description: 'Explore both sides of a controversial topic.', tag: { text: 'BETA', color: 'bg-green-100 text-green-800' } },
    [ResearchMode.DEEP_STUDY]: { Icon: DeepStudyIcon, title: 'Deep Study', description: 'Create a personalized study guide for any subject.', tag: { text: 'NEW', color: 'bg-yellow-100 text-yellow-800' } },
    [ResearchMode.DEEP_STUDIO]: { Icon: DeepStudioIcon, title: 'Deep Studio', description: 'Generate video ideas, scripts, and SEO keywords.', tag: { text: 'NEW', color: 'bg-red-100 text-red-800' } },
    [ResearchMode.DEEP_TRIP]: { Icon: DeepTripIcon, title: 'Deep Trip', description: 'Plan your next vacation with a detailed itinerary.', tag: { text: 'NEW', color: 'bg-indigo-100 text-indigo-800' } },
    [ResearchMode.DEEP_HEALTH]: { Icon: DeepHealthIcon, title: 'Deep Health', description: 'Get a personalized workout and meal plan.', tag: { text: 'NEW', color: 'bg-pink-100 text-pink-800' } },
    [ResearchMode.DEEP_INTERVIEW]: { Icon: DeepInterviewIcon, title: 'Deep Interview', description: 'Ace your next job interview with prep materials.', tag: { text: 'NEW', color: 'bg-cyan-100 text-cyan-800' } },
    [ResearchMode.DEEP_MARKET]: { Icon: DeepMarketIcon, title: 'Deep Market', description: 'Analyze market trends for your business idea.', tag: { text: 'NEW', color: 'bg-orange-100 text-orange-800' } },
    [ResearchMode.DEEP_CHEF]: { Icon: DeepChefIcon, title: 'Deep Chef', description: 'Generate a complete recipe from ingredients or a dish idea.', tag: { text: 'NEW', color: 'bg-lime-100 text-lime-800' } },
    [ResearchMode.DEEP_GAME]: { Icon: DeepGameIcon, title: 'Deep Game', description: 'Design a game concept with mechanics and characters.', tag: { text: 'NEW', color: 'bg-rose-100 text-rose-800' } },
};