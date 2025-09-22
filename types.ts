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
  DEEP_DEBATE = 'DEEP_DEBATE',
  DEEP_STUDY = 'DEEP_STUDY',
  DEEP_STUDIO = 'DEEP_STUDIO',
  DEEP_TRIP = 'DEEP_TRIP',
  DEEP_HEALTH = 'DEEP_HEALTH',
  DEEP_INTERVIEW = 'DEEP_INTERVIEW',
  DEEP_MARKET = 'DEEP_MARKET',
  DEEP_CHEF = 'DEEP_CHEF',
  DEEP_GAME = 'DEEP_GAME',
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

export interface StudyData {
    keyConcepts: KeyConcept[];
    studyPlan: StudyPlanItem[];
    practiceProblems: PracticeProblem[];
    analogies: Analogy[];
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


export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}
