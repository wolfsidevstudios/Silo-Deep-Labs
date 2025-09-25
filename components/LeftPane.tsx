import React, { useState, useMemo, useEffect } from 'react';
import type { ResearchData, FlashCard, MiniAppData, CanvasData, CodeFile, AgentData, AgentStep, DebateData, Viewpoint, StudyData, KeyConcept, StudyPlanItem, PracticeProblem, Analogy, StudioData, VideoIdea, ScriptSegment, TripData, ItineraryItem, BudgetItem, HealthData, WorkoutDay, MealDay, InterviewData, InterviewQuestion, MarketData, TargetAudience, Competitor, Swot, ChefData, GameData, Ingredient, GameMechanic, CharacterConcept, CodeData, LegalData, FinanceData, CodeSnippet, LegalTerm, FinanceMetric, AnyData, SlidesData, Slide, QuizQuestion } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Type guards to differentiate between data types
function isCanvasData(data: any): data is CanvasData { return (data as CanvasData).code !== undefined; }
function isAgentData(data: any): data is AgentData { return (data as AgentData).agentPath !== undefined; }
function isDebateData(data: any): data is DebateData { return (data as DebateData).viewpoints !== undefined; }
function isStudyData(data: any): data is StudyData { return (data as StudyData).studyPlan !== undefined; }
function isStudioData(data: any): data is StudioData { return (data as StudioData).videoIdeas !== undefined; }
function isTripData(data: any): data is TripData { return (data as TripData).itinerary !== undefined; }
function isHealthData(data: any): data is HealthData { return (data as HealthData).workoutPlan !== undefined; }
function isInterviewData(data: any): data is InterviewData { return (data as InterviewData).jobRole !== undefined; }
function isMarketData(data: any): data is MarketData { return (data as MarketData).productIdea !== undefined; }
function isChefData(data: any): data is ChefData { return (data as ChefData).recipeName !== undefined; }
function isGameData(data: any): data is GameData { return (data as GameData).coreMechanics !== undefined; }
function isCodeData(data: any): data is CodeData { return (data as CodeData).codeSnippets !== undefined; }
function isLegalData(data: any): data is LegalData { return (data as LegalData).plainSummary !== undefined; }
function isFinanceData(data: any): data is FinanceData { return (data as FinanceData).keyMetrics !== undefined; }
function isSlidesData(data: any): data is SlidesData { return (data as SlidesData).htmlContent !== undefined; }


type ResearchTab = 'Summary' | 'Sources' | 'Flash Cards' | 'Related Videos' | 'Interactive Mini App';
type CanvasTab = 'Preview' | 'Sources' | 'Code';
type AgentTab = 'Summary' | 'Agent Path' | 'Sources';
type DebateTab = 'Argument Map' | 'Consensus' | 'Unresolved Questions' | 'Sources';
type StudyTab = 'Key Concepts' | 'Study Plan' | 'Practice Problems' | 'Analogies' | 'Quiz' | 'Sources';
type StudioTab = 'Video Ideas' | 'Script' | 'SEO & Hashtags' | 'Sources';
type TripTab = 'Itinerary' | 'Packing List' | 'Budget' | 'Sources';
type HealthTab = 'Disclaimer' | 'Workout Plan' | 'Meal Plan' | 'Healthy Habits' | 'Sources';
type InterviewTab = 'Overview' | 'Common Qs' | 'Behavioral Qs' | 'Technical Qs' | 'Closing' | 'Sources';
type MarketTab = 'Summary' | 'Target Audience' | 'Competitors' | 'SWOT' | 'Marketing' | 'Sources';
type ChefTab = 'Recipe' | 'Sources';
type GameTab = 'Concept' | 'Mechanics' | 'Characters' | 'Monetization' | 'Sources';
type CodeTab = 'Explanation' | 'Code' | 'Edge Cases' | 'Sources';
type LegalTab = 'Disclaimer' | 'Summary' | 'Key Terms' | 'Main Points' | 'Sources';
type FinanceTab = 'Disclaimer' | 'Summary' | 'Key Metrics' | 'Pros & Cons' | 'Sources';
type SlidesTab = 'Presentation' | 'Content' | 'Code' | 'Sources';

const researchTabs: ResearchTab[] = ['Summary', 'Sources', 'Flash Cards', 'Related Videos', 'Interactive Mini App'];
const canvasTabs: CanvasTab[] = ['Preview', 'Sources', 'Code'];
const agentTabs: AgentTab[] = ['Summary', 'Agent Path', 'Sources'];
const debateTabs: DebateTab[] = ['Argument Map', 'Consensus', 'Unresolved Questions', 'Sources'];
const studyTabs: StudyTab[] = ['Key Concepts', 'Study Plan', 'Practice Problems', 'Analogies', 'Quiz', 'Sources'];
const studioTabs: StudioTab[] = ['Video Ideas', 'Script', 'SEO & Hashtags', 'Sources'];
const tripTabs: TripTab[] = ['Itinerary', 'Packing List', 'Budget', 'Sources'];
const healthTabs: HealthTab[] = ['Disclaimer', 'Workout Plan', 'Meal Plan', 'Healthy Habits', 'Sources'];
const interviewTabs: InterviewTab[] = ['Overview', 'Common Qs', 'Behavioral Qs', 'Technical Qs', 'Closing', 'Sources'];
const marketTabs: MarketTab[] = ['Summary', 'Target Audience', 'Competitors', 'SWOT', 'Marketing', 'Sources'];
const chefTabs: ChefTab[] = ['Recipe', 'Sources'];
const gameTabs: GameTab[] = ['Concept', 'Mechanics', 'Characters', 'Monetization', 'Sources'];
const codeTabs: CodeTab[] = ['Explanation', 'Code', 'Edge Cases', 'Sources'];
const legalTabs: LegalTab[] = ['Disclaimer', 'Summary', 'Key Terms', 'Main Points', 'Sources'];
const financeTabs: FinanceTab[] = ['Disclaimer', 'Summary', 'Key Metrics', 'Pros & Cons', 'Sources'];
const slidesTabs: SlidesTab[] = ['Presentation', 'Content', 'Code', 'Sources'];

interface LeftPaneProps {
  data: AnyData;
  query: string;
}

const LeftPane: React.FC<LeftPaneProps> = ({ data, query }) => {
  const mode = useMemo(() => {
    if (isCanvasData(data)) return 'canvas';
    if (isAgentData(data)) return 'agent';
    if (isDebateData(data)) return 'debate';
    if (isStudyData(data)) return 'study';
    if (isStudioData(data)) return 'studio';
    if (isTripData(data)) return 'trip';
    if (isHealthData(data)) return 'health';
    if (isInterviewData(data)) return 'interview';
    if (isMarketData(data)) return 'market';
    if (isChefData(data)) return 'chef';
    if (isGameData(data)) return 'game';
    if (isCodeData(data)) return 'code';
    if (isLegalData(data)) return 'legal';
    if (isFinanceData(data)) return 'finance';
    if (isSlidesData(data)) return 'slides';
    return 'research';
  }, [data]);

  const TABS = useMemo(() => {
    switch(mode) {
        case 'canvas': return canvasTabs;
        case 'agent': return agentTabs;
        case 'debate': return debateTabs;
        case 'study': return studyTabs;
        case 'studio': return studioTabs;
        case 'trip': return tripTabs;
        case 'health': return healthTabs;
        case 'interview': return interviewTabs;
        case 'market': return marketTabs;
        case 'chef': return chefTabs;
        case 'game': return gameTabs;
        case 'code': return codeTabs;
        case 'legal': return legalTabs;
        case 'finance': return financeTabs;
        case 'slides': return slidesTabs;
        default: return researchTabs;
    }
  }, [mode]);

  const [activeTab, setActiveTab] = useState<any>(TABS[0]);

  useEffect(() => {
    setActiveTab(TABS[0]);
  }, [TABS]);

  return (
    <div className="bg-white rounded-2xl shadow-lg h-full flex flex-col p-6 overflow-hidden">
      <div className="flex-shrink-0">
        <h2 className="text-xl font-bold mb-2 capitalize">{query}</h2>
        <div className="bg-gray-100 rounded-full p-1 flex items-center space-x-1 self-start mb-4 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors whitespace-nowrap ${
                activeTab === tab ? 'bg-white shadow' : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-grow overflow-y-auto pr-2 -mr-2">
        <TabContent activeTab={activeTab} data={data} />
      </div>
    </div>
  );
};

const TabContent: React.FC<{ activeTab: any; data: any }> = ({ activeTab, data }) => {
    if (isSlidesData(data)) {
        switch (activeTab as SlidesTab) {
            case 'Presentation': return <PresentationPreviewContent htmlContent={data.htmlContent} />;
            case 'Content': return <PresentationContent slides={data.slides} />;
            case 'Code': return <PresentationCodeContent htmlContent={data.htmlContent} />;
            case 'Sources': return <SourcesContent sources={data.sources} />;
            default: return null;
        }
    } else if (isCanvasData(data)) {
        switch (activeTab as CanvasTab) {
            case 'Preview': return <PreviewContent codeFiles={data.code} />;
            case 'Sources': return <SourcesContent sources={data.sources} />;
            case 'Code': return <CodeContent codeFiles={data.code} />;
            default: return null;
        }
    } else if (isAgentData(data)) {
        switch(activeTab as AgentTab) {
            case 'Summary': return <SummaryContent summary={data.summary} />;
            case 'Agent Path': return <AgentPathContent agentPath={data.agentPath} />;
            case 'Sources': return <SourcesContent sources={data.sources} />;
            default: return null;
        }
    } else if (isDebateData(data)) {
        switch(activeTab as DebateTab) {
            case 'Argument Map': return <ArgumentMapContent viewpoints={data.viewpoints} />;
            case 'Consensus': return <ConsensusContent consensus={data.pointsOfConsensus} />;
            case 'Unresolved Questions': return <UnresolvedQuestionsContent questions={data.unresolvedQuestions} />;
            case 'Sources': return <SourcesContent sources={data.sources} />;
            default: return null;
        }
    } else if (isStudyData(data)) {
        switch(activeTab as StudyTab) {
            case 'Key Concepts': return <KeyConceptsContent concepts={data.keyConcepts} />;
            case 'Study Plan': return <StudyPlanContent plan={data.studyPlan} />;
            case 'Practice Problems': return <PracticeProblemsContent problems={data.practiceProblems} />;
            case 'Analogies': return <AnalogiesContent analogies={data.analogies} />;
            case 'Quiz': return <QuizContent quiz={data.quiz} />;
            case 'Sources': return <SourcesContent sources={data.sources} />;
            default: return null;
        }
    } else if (isStudioData(data)) {
        switch(activeTab as StudioTab) {
            case 'Video Ideas': return <VideoIdeasContent ideas={data.videoIdeas} />;
            case 'Script': return <ScriptContent script={data.script} />;
            case 'SEO & Hashtags': return <SeoAndHashtagsContent keywords={data.seoKeywords} hashtags={data.hashtags} />;
            case 'Sources': return <SourcesContent sources={data.sources} />;
            default: return null;
        }
    } else if (isTripData(data)) {
        switch(activeTab as TripTab) {
            case 'Itinerary': return <ItineraryContent itinerary={data.itinerary} summary={data.tripSummary} />;
            case 'Packing List': return <PackingListContent items={data.packingList} />;
            case 'Budget': return <BudgetContent items={data.budgetBreakdown} />;
            case 'Sources': return <SourcesContent sources={data.sources} />;
            default: return null;
        }
    } else if (isHealthData(data)) {
        switch(activeTab as HealthTab) {
            case 'Disclaimer': return <DisclaimerContent disclaimer={data.disclaimer} />;
            case 'Workout Plan': return <WorkoutPlanContent plan={data.workoutPlan} />;
            case 'Meal Plan': return <MealPlanContent plan={data.mealPlan} />;
            case 'Healthy Habits': return <HealthyHabitsContent habits={data.healthyHabits} />;
            case 'Sources': return <SourcesContent sources={data.sources} />;
            default: return null;
        }
    } else if (isInterviewData(data)) {
        switch(activeTab as InterviewTab) {
            case 'Overview': return <InterviewOverviewContent intro={data.introduction} />;
            case 'Common Qs': return <InterviewQuestionsContent title="Common Questions" questions={data.commonQuestions} />;
            case 'Behavioral Qs': return <InterviewQuestionsContent title="Behavioral Questions" questions={data.behavioralQuestions} />;
            case 'Technical Qs': return <InterviewQuestionsContent title="Technical Questions" questions={data.technicalQuestions} />;
            case 'Closing': return <ClosingStatementContent statement={data.closingStatement} />;
            case 'Sources': return <SourcesContent sources={data.sources} />;
            default: return null;
        }
    } else if (isMarketData(data)) {
        switch(activeTab as MarketTab) {
            case 'Summary': return <SummaryContent summary={data.summary} />;
            case 'Target Audience': return <TargetAudienceContent audience={data.targetAudience} />;
            case 'Competitors': return <CompetitorsContent competitors={data.competitors} />;
            case 'SWOT': return <SwotAnalysisContent swot={data.swotAnalysis} />;
            case 'Marketing': return <MarketingStrategiesContent strategies={data.marketingStrategies} />;
            case 'Sources': return <SourcesContent sources={data.sources} />;
            default: return null;
        }
    } else if (isChefData(data)) {
        switch(activeTab as ChefTab) {
            case 'Recipe': return <RecipeContent data={data} />;
            case 'Sources': return <SourcesContent sources={data.sources} />;
            default: return null;
        }
    } else if (isGameData(data)) {
        switch(activeTab as GameTab) {
            case 'Concept': return <GameConceptContent title={data.title} concept={data.concept} />;
            case 'Mechanics': return <GameMechanicsContent mechanics={data.coreMechanics} />;
            case 'Characters': return <GameCharactersContent characters={data.characterConcepts} />;
            case 'Monetization': return <GameMonetizationContent strategies={data.monetization} />;
            case 'Sources': return <SourcesContent sources={data.sources} />;
            default: return null;
        }
    } else if (isCodeData(data)) {
        switch (activeTab as CodeTab) {
            case 'Explanation': return <CodeExplanationContent explanation={data.solutionExplanation} />;
            case 'Code': return <CodeSnippetsContent snippets={data.codeSnippets} />;
            case 'Edge Cases': return <EdgeCasesContent cases={data.edgeCases} />;
            case 'Sources': return <SourcesContent sources={data.sources} />;
            default: return null;
        }
    } else if (isLegalData(data)) {
        switch (activeTab as LegalTab) {
            case 'Disclaimer': return <DisclaimerContent disclaimer={data.disclaimer} />;
            case 'Summary': return <SummaryContent summary={data.plainSummary} />;
            case 'Key Terms': return <KeyTermsContent terms={data.keyTerms} />;
            case 'Main Points': return <MainPointsContent points={data.mainPoints} />;
            case 'Sources': return <SourcesContent sources={data.sources} />;
            default: return null;
        }
    } else if (isFinanceData(data)) {
        switch (activeTab as FinanceTab) {
            case 'Disclaimer': return <DisclaimerContent disclaimer={data.disclaimer} />;
            case 'Summary': return <SummaryContent summary={data.summary} />;
            case 'Key Metrics': return <KeyMetricsContent metrics={data.keyMetrics} />;
            case 'Pros & Cons': return <ProsAndConsContent pros={data.prosAndCons.pros} cons={data.prosAndCons.cons} />;
            case 'Sources': return <SourcesContent sources={data.sources} />;
            default: return null;
        }
    } else {
        switch (activeTab as ResearchTab) {
            case 'Summary': return <SummaryContent summary={data.summary} />;
            case 'Sources': return <SourcesContent sources={data.sources} />;
            case 'Flash Cards': return <FlashCardsContent flashCards={data.flashCards} />;
            case 'Related Videos': return <RelatedVideosContent videos={data.relatedVideos} />;
            case 'Interactive Mini App': return <MiniAppContent appData={data.miniAppData} />;
            default: return null;
        }
    }
};

// --- Deep Slides Components ---
const PresentationPreviewContent: React.FC<{ htmlContent: string }> = ({ htmlContent }) => (
    <div className="w-full h-[60vh] border border-gray-200 rounded-lg overflow-hidden shadow-inner">
        <iframe
            srcDoc={htmlContent}
            title="Presentation Preview"
            sandbox="allow-scripts"
            className="w-full h-full"
            frameBorder="0"
        />
    </div>
);

const PresentationContent: React.FC<{ slides: Slide[] }> = ({ slides }) => (
    <div className="space-y-6">
        {slides.map((slide, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800">{index + 1}. {slide.title}</h3>
                <p className="mt-2 text-gray-700 whitespace-pre-wrap">{slide.content}</p>
            </div>
        ))}
    </div>
);

const PresentationCodeContent: React.FC<{ htmlContent: string }> = ({ htmlContent }) => (
    <div className="flex flex-col h-[60vh]">
        <div className="flex-grow bg-gray-800 text-white font-mono text-sm rounded-md p-4 overflow-auto">
            <pre><code>{htmlContent}</code></pre>
        </div>
    </div>
);


// --- Deep Finance Components ---
const KeyMetricsContent: React.FC<{ metrics: FinanceMetric[] }> = ({ metrics }) => (
    <div className="space-y-6">
        {metrics.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-800">{item.metric}</h3>
                    <span className="text-lg font-mono font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-md">{item.value}</span>
                </div>
                <p className="mt-2 text-gray-700">{item.explanation}</p>
            </div>
        ))}
    </div>
);

const ProsAndConsContent: React.FC<{ pros: string[]; cons: string[] }> = ({ pros, cons }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-bold text-lg text-green-800">Pros</h4>
            <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                {pros.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-bold text-lg text-red-800">Cons</h4>
            <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                {cons.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
        </div>
    </div>
);

// --- Deep Legal Components ---
const KeyTermsContent: React.FC<{ terms: LegalTerm[] }> = ({ terms }) => (
    <div className="space-y-4">
        {terms.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800">{item.term}</h3>
                <p className="mt-1 text-gray-700">{item.definition}</p>
            </div>
        ))}
    </div>
);

const MainPointsContent: React.FC<{ points: string[] }> = ({ points }) => (
    <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Main Points</h3>
        <ul className="space-y-3">
            {points.map((point, index) => (
                <li key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-md border border-blue-200">
                    <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span className="text-gray-700">{point}</span>
                </li>
            ))}
        </ul>
    </div>
);

// --- Deep Code Components ---
const CodeExplanationContent: React.FC<{ explanation: string }> = ({ explanation }) => (
    <div className="prose prose-blue max-w-none text-gray-700">
        {explanation.split('\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}
    </div>
);

const CodeSnippetsContent: React.FC<{ snippets: CodeSnippet[] }> = ({ snippets }) => {
    const [selectedLang, setSelectedLang] = useState(snippets[0]?.language || '');

    return (
        <div className="flex flex-col">
            <div className="flex-shrink-0 border-b border-gray-200 mb-2">
                {snippets.map(snippet => (
                    <button
                        key={snippet.language}
                        onClick={() => setSelectedLang(snippet.language)}
                        className={`px-3 py-2 text-sm font-medium ${selectedLang === snippet.language ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        {snippet.language}
                    </button>
                ))}
            </div>
            {snippets.map(snippet => (
                 <div key={snippet.language} className={`${selectedLang === snippet.language ? 'block' : 'hidden'}`}>
                    <div className="bg-gray-800 text-white font-mono text-sm rounded-md p-4 overflow-auto">
                        <pre><code>{snippet.code}</code></pre>
                    </div>
                </div>
            ))}
        </div>
    );
};

const EdgeCasesContent: React.FC<{ cases: string[] }> = ({ cases }) => (
    <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Edge Cases & Considerations</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
            {cases.map((c, index) => (
                <li key={index}>{c}</li>
            ))}
        </ul>
    </div>
);


// --- Deep Game Components ---
const GameConceptContent: React.FC<{ title: string; concept: string }> = ({ title, concept }) => (
    <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border">{concept}</p>
    </div>
);

const GameMechanicsContent: React.FC<{ mechanics: GameMechanic[] }> = ({ mechanics }) => (
    <div className="space-y-6">
        {mechanics.map((item, index) => (
            <div key={index} className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                <p className="mt-2 text-gray-700">{item.description}</p>
            </div>
        ))}
    </div>
);

const GameCharactersContent: React.FC<{ characters: CharacterConcept[] }> = ({ characters }) => (
    <div className="space-y-6">
        {characters.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                <p className="mt-2 text-gray-600 italic">{item.description}</p>
                <div className="mt-4">
                    <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wider">Abilities</h4>
                    <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                        {item.abilities.map((ability, i) => <li key={i}>{ability}</li>)}
                    </ul>
                </div>
            </div>
        ))}
    </div>
);

const GameMonetizationContent: React.FC<{ strategies: string[] }> = ({ strategies }) => (
     <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Monetization Strategies</h3>
        <div className="flex flex-wrap gap-3">
            {strategies.map((strategy, index) => (
                <span key={index} className="bg-green-100 text-green-800 text-sm font-medium px-4 py-2 rounded-full shadow-sm">
                    {strategy}
                </span>
            ))}
        </div>
    </div>
);

// --- Deep Chef Components ---
const RecipeContent: React.FC<{ data: ChefData }> = ({ data }) => (
    <div className="space-y-8">
        <div>
            <h3 className="text-2xl font-bold text-gray-800">{data.recipeName}</h3>
            <p className="mt-2 text-gray-600 italic">{data.description}</p>
        </div>
        <div className="flex flex-wrap gap-4 text-center">
            <div className="flex-1 bg-gray-50 p-3 rounded-lg border">
                <p className="text-sm font-medium text-gray-500">Prep Time</p>
                <p className="font-semibold text-gray-800">{data.prepTime}</p>
            </div>
             <div className="flex-1 bg-gray-50 p-3 rounded-lg border">
                <p className="text-sm font-medium text-gray-500">Cook Time</p>
                <p className="font-semibold text-gray-800">{data.cookTime}</p>
            </div>
             <div className="flex-1 bg-gray-50 p-3 rounded-lg border">
                <p className="text-sm font-medium text-gray-500">Difficulty</p>
                <p className="font-semibold text-gray-800">{data.difficulty}</p>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
                <h4 className="text-lg font-bold border-b pb-2 mb-3">Ingredients</h4>
                <ul className="space-y-2">
                    {data.ingredients.map((ing, i) => (
                        <li key={i} className="flex justify-between">
                            <span>{ing.name}</span>
                            <span className="text-gray-600 font-medium">{ing.quantity}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="md:col-span-2">
                <h4 className="text-lg font-bold border-b pb-2 mb-3">Instructions</h4>
                <ol className="space-y-4">
                    {data.instructions.map((step, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-800 rounded-full font-bold text-sm flex-shrink-0 mt-0.5">{i + 1}</span>
                            <span className="text-gray-700">{step}</span>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    </div>
);


// --- Deep Market Components ---
const TargetAudienceContent: React.FC<{ audience: TargetAudience[] }> = ({ audience }) => (
    <div className="space-y-6">
        {audience.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800">{item.segment}</h3>
                <p className="mt-2 text-gray-700">{item.description}</p>
            </div>
        ))}
    </div>
);

const CompetitorsContent: React.FC<{ competitors: Competitor[] }> = ({ competitors }) => (
    <div className="space-y-6">
        {competitors.map((item, index) => (
            <div key={index} className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-semibold text-green-700">Strengths</h4>
                        <p className="mt-1 text-gray-600">{item.strengths}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-red-700">Weaknesses</h4>
                        <p className="mt-1 text-gray-600">{item.weaknesses}</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

const SwotAnalysisContent: React.FC<{ swot: Swot }> = ({ swot }) => (
    <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">SWOT Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-bold text-lg text-green-800">Strengths</h4>
                <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                    {swot.strengths.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
            </div>
             <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-bold text-lg text-red-800">Weaknesses</h4>
                <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                    {swot.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
            </div>
             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-bold text-lg text-blue-800">Opportunities</h4>
                <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                    {swot.opportunities.map((o, i) => <li key={i}>{o}</li>)}
                </ul>
            </div>
             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-bold text-lg text-yellow-800">Threats</h4>
                <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                    {swot.threats.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
            </div>
        </div>
    </div>
);

const MarketingStrategiesContent: React.FC<{ strategies: string[] }> = ({ strategies }) => (
     <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Marketing Strategies</h3>
        <ul className="space-y-3">
            {strategies.map((strategy, index) => (
                <li key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-md border">
                    <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    <span className="text-gray-700">{strategy}</span>
                </li>
            ))}
        </ul>
    </div>
);

// --- Deep Interview Components ---
const InterviewOverviewContent: React.FC<{ intro: string }> = ({ intro }) => (
    <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 rounded-r-lg">
        <p className="text-gray-700">{intro}</p>
    </div>
);

const InterviewQuestionComponent: React.FC<{ question: InterviewQuestion }> = ({ question }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-200 rounded-lg">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left p-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 rounded-t-lg"
                aria-expanded={isOpen}
            >
                <span className="font-semibold text-gray-800">{question.question}</span>
                 <svg className={`w-5 h-5 text-gray-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {isOpen && (
                <div className="p-4 space-y-4">
                    <div>
                        <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wider">Sample Answer</h4>
                        <p className="mt-1 text-gray-700 whitespace-pre-wrap">{question.sampleAnswer}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wider">Tips</h4>
                        <ul className="list-disc list-inside mt-1 text-gray-600 space-y-1">
                             {question.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

const InterviewQuestionsContent: React.FC<{ title: string, questions: InterviewQuestion[] }> = ({ title, questions }) => {
    if (questions.length === 0) {
        return (
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
                <p className="text-gray-500">No specific {title.toLowerCase()} were generated for this role.</p>
            </div>
        )
    }
    return (
        <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
            <div className="space-y-4">
                {questions.map((q, i) => <InterviewQuestionComponent key={i} question={q} />)}
            </div>
        </div>
    );
};

const ClosingStatementContent: React.FC<{ statement: string }> = ({ statement }) => (
    <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Closing the Interview</h3>
        <div className="prose prose-blue max-w-none text-gray-700">
            {statement.split('\n').map((p, i) => <p key={i}>{p}</p>)}
        </div>
    </div>
);


// --- Deep Health Components ---
const DisclaimerContent: React.FC<{ disclaimer: string }> = ({ disclaimer }) => (
    <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 rounded-r-lg" role="alert">
        <h3 className="font-bold text-lg">Important Disclaimer</h3>
        <p className="mt-2">{disclaimer}</p>
    </div>
);

const WorkoutPlanContent: React.FC<{ plan: WorkoutDay[] }> = ({ plan }) => (
    <div className="space-y-6">
        {plan.map((day, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800">{day.day}</h3>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {day.exercises.map((ex, exIndex) => (
                        <div key={exIndex} className="bg-white p-3 rounded-md shadow-sm border">
                            <p className="font-semibold text-gray-700">{ex.name}</p>
                            <p className="text-sm text-gray-500 mt-1">{ex.sets} sets of {ex.reps} reps</p>
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
);

const MealPlanContent: React.FC<{ plan: MealDay[] }> = ({ plan }) => (
    <div className="space-y-6">
        {plan.map((day, index) => (
            <div key={index} className="bg-green-50 rounded-lg p-5 border border-green-200">
                <h3 className="text-lg font-bold text-green-800">{day.day}</h3>
                <div className="mt-4 space-y-3">
                    {day.meals.map((meal, mealIndex) => (
                        <div key={mealIndex}>
                            <h4 className="font-semibold text-gray-700">{meal.name}</h4>
                            <p className="text-gray-600 pl-2">{meal.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
);

const HealthyHabitsContent: React.FC<{ habits: string[] }> = ({ habits }) => (
    <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Healthy Habits to Cultivate</h3>
        <ul className="space-y-3">
            {habits.map((habit, index) => (
                <li key={index} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span className="text-gray-700">{habit}</span>
                </li>
            ))}
        </ul>
    </div>
);


// --- Deep Trip Components ---
const ItineraryContent: React.FC<{ itinerary: ItineraryItem[], summary: string }> = ({ itinerary, summary }) => (
    <div className="space-y-8">
        <p className="text-gray-600 italic bg-gray-50 p-4 rounded-lg border">{summary}</p>
        {itinerary.map((item, index) => (
            <div key={index} className="flex gap-4">
                 <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-800 rounded-full font-bold text-sm flex-shrink-0">{item.day.split(' ')[0]} {index+1}</div>
                    {index < itinerary.length - 1 && <div className="w-px h-full bg-gray-200 mt-2"></div>}
                </div>
                <div className="flex-1 pb-4">
                     <h3 className="font-bold text-lg text-gray-800">{item.title}</h3>
                     <div className="mt-2 space-y-3">
                         {item.activities.map((activity, actIndex) => (
                             <div key={actIndex} className="flex items-start gap-3">
                                <div className="font-semibold text-sm text-gray-500 w-20 flex-shrink-0">{activity.time}</div>
                                <div className="text-gray-700">{activity.description}</div>
                             </div>
                         ))}
                     </div>
                </div>
            </div>
        ))}
    </div>
);

const PackingListContent: React.FC<{ items: string[] }> = ({ items }) => (
    <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Packing Checklist</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
            {items.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-700">
                     <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

const BudgetContent: React.FC<{ items: BudgetItem[] }> = ({ items }) => (
    <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Estimated Budget</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <ul className="space-y-2">
                {items.map((item, index) => (
                    <li key={index} className="flex justify-between items-center py-1">
                        <span className="text-gray-800 font-medium">{item.category}</span>
                        <span className="text-gray-600 font-mono bg-white px-2 py-0.5 border rounded-md">{item.cost}</span>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);


// --- Deep Studio Components ---

const VideoIdeasContent: React.FC<{ ideas: VideoIdea[] }> = ({ ideas }) => (
    <div className="space-y-6">
        {ideas.map((idea, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-5 border border-gray-200 transform hover:scale-[1.02] transition-transform duration-300">
                <h3 className="text-lg font-bold text-gray-800">{idea.title}</h3>
                <div className="mt-3 bg-red-50 border-l-4 border-red-400 p-3 rounded-r-md">
                    <p className="font-semibold text-sm text-red-800">Hook</p>
                    <p className="mt-1 text-gray-700 italic">"{idea.hook}"</p>
                </div>
                <p className="mt-3 text-gray-600">{idea.description}</p>
            </div>
        ))}
    </div>
);

const ScriptContent: React.FC<{ script: ScriptSegment[] }> = ({ script }) => (
    <div className="space-y-8">
        {script.map((segment, index) => (
            <div key={index} className="flex gap-4">
                 <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-10 h-10 bg-purple-100 text-purple-800 rounded-full font-bold text-lg flex-shrink-0">{index + 1}</div>
                    {index < script.length - 1 && <div className="w-px h-full bg-gray-200 mt-2"></div>}
                </div>
                <div className="flex-1 pb-4">
                     <h4 className="font-bold text-lg text-gray-800 bg-gray-100 px-3 py-1 rounded-md inline-block">{segment.scene}</h4>
                     <div className="mt-4">
                         <h5 className="font-semibold text-sm text-gray-500 uppercase tracking-wider">Dialogue</h5>
                         <p className="mt-1 text-gray-700 whitespace-pre-wrap">{segment.dialogue}</p>
                     </div>
                      <div className="mt-4">
                         <h5 className="font-semibold text-sm text-gray-500 uppercase tracking-wider">Visuals</h5>
                         <p className="mt-1 text-gray-700">{segment.visuals}</p>
                     </div>
                </div>
            </div>
        ))}
    </div>
);

const SeoAndHashtagsContent: React.FC<{ keywords: string[], hashtags: string[] }> = ({ keywords, hashtags }) => (
    <div className="space-y-8">
        <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">SEO Keywords</h3>
            <div className="flex flex-wrap gap-2">
                {keywords.map((keyword, index) => (
                    <span key={index} className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                        {keyword}
                    </span>
                ))}
            </div>
        </div>
        <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Hashtags</h3>
            <div className="flex flex-wrap gap-2">
                {hashtags.map((tag, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    </div>
);

// --- Deep Study Components ---

const KeyConceptsContent: React.FC<{ concepts: KeyConcept[] }> = ({ concepts }) => (
    <div className="space-y-6">
        {concepts.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800">{item.concept}</h3>
                <p className="mt-2 text-gray-700">{item.definition}</p>
                <p className="mt-3 text-sm text-gray-600 bg-gray-100 p-2 rounded-md italic">
                    <strong>Example:</strong> {item.example}
                </p>
            </div>
        ))}
    </div>
);

const StudyPlanContent: React.FC<{ plan: StudyPlanItem[] }> = ({ plan }) => (
    <div className="space-y-8">
        {plan.map((item, index) => (
            <div key={index} className="flex gap-4">
                 <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 text-yellow-800 rounded-full font-bold text-sm flex-shrink-0">{item.timeframe.split(' ')[0]}</div>
                    {index < plan.length - 1 && <div className="w-px h-full bg-gray-200 mt-2"></div>}
                </div>
                <div className="flex-1 pb-4">
                     <h4 className="font-bold text-gray-800">{item.timeframe}</h4>
                     <div className="mt-2">
                         <h5 className="font-semibold text-sm">Topics:</h5>
                         <ul className="list-disc list-inside ml-2 text-gray-600">
                             {item.topics.map((topic, i) => <li key={i}>{topic}</li>)}
                         </ul>
                     </div>
                      <div className="mt-3">
                         <h5 className="font-semibold text-sm">Activities:</h5>
                         <ul className="list-disc list-inside ml-2 text-gray-600">
                             {item.activities.map((activity, i) => <li key={i}>{activity}</li>)}
                         </ul>
                     </div>
                </div>
            </div>
        ))}
    </div>
);

const PracticeProblemComponent: React.FC<{ problem: PracticeProblem }> = ({ problem }) => {
    const [showAnswer, setShowAnswer] = useState(false);
    return (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="font-semibold text-gray-800">{problem.question}</p>
            <button onClick={() => setShowAnswer(!showAnswer)} className="text-sm text-blue-600 hover:underline mt-3">
                {showAnswer ? 'Hide Answer' : 'Show Answer'}
            </button>
            {showAnswer && (
                <div className="mt-3 text-gray-700 bg-green-50 p-3 rounded-md border border-green-200">
                    {problem.answer}
                </div>
            )}
        </div>
    );
};

const PracticeProblemsContent: React.FC<{ problems: PracticeProblem[] }> = ({ problems }) => (
    <div className="space-y-4">
        {problems.map((problem, index) => <PracticeProblemComponent key={index} problem={problem} />)}
    </div>
);

const AnalogiesContent: React.FC<{ analogies: Analogy[] }> = ({ analogies }) => (
    <div className="space-y-4">
        {analogies.map((item, index) => (
            <div key={index} className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <p className="font-semibold text-gray-800">For "{item.concept}", think of it like this:</p>
                <p className="mt-2 text-gray-700 italic">"{item.analogy}"</p>
            </div>
        ))}
    </div>
);

const QuizContent: React.FC<{ quiz: QuizQuestion[] }> = ({ quiz }) => {
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
    const [submitted, setSubmitted] = useState(false);

    const handleSelectAnswer = (questionIndex: number, answer: string) => {
        if (submitted) return;
        setSelectedAnswers(prev => ({ ...prev, [questionIndex]: answer }));
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    const getOptionClass = (question: QuizQuestion, option: string, index: number) => {
        if (!submitted) {
            return selectedAnswers[index] === option 
                ? 'bg-blue-200 border-blue-400' 
                : 'bg-gray-100 hover:bg-gray-200 border-gray-200';
        }
        if (option === question.correctAnswer) {
            return 'bg-green-200 border-green-400';
        }
        if (selectedAnswers[index] === option && option !== question.correctAnswer) {
            return 'bg-red-200 border-red-400';
        }
        return 'bg-gray-100 border-gray-200 opacity-70';
    };

    const score = Object.keys(selectedAnswers).reduce((acc, key) => {
        const index = parseInt(key, 10);
        if (selectedAnswers[index] === quiz[index].correctAnswer) {
            return acc + 1;
        }
        return acc;
    }, 0);

    return (
        <div className="space-y-8">
            {quiz.map((q, index) => (
                <div key={index} className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
                    <h3 className="font-semibold text-gray-800">{index + 1}. {q.question}</h3>
                    <div className="mt-4 space-y-2">
                        {q.options.map(option => (
                            <button
                                key={option}
                                onClick={() => handleSelectAnswer(index, option)}
                                className={`w-full text-left p-3 rounded-md border-2 transition-colors ${getOptionClass(q, option, index)}`}
                                disabled={submitted}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    {submitted && (
                        <div className="mt-4 p-3 rounded-md bg-yellow-50 border border-yellow-200 text-sm text-gray-700">
                            <strong>Explanation:</strong> {q.explanation}
                        </div>
                    )}
                </div>
            ))}
             <div className="mt-6 flex flex-col items-center">
                {submitted ? (
                    <div className="text-center">
                        <p className="text-xl font-bold">Your Score: {score} / {quiz.length}</p>
                        <button onClick={() => { setSubmitted(false); setSelectedAnswers({}); }} className="mt-4 px-6 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                            Try Again
                        </button>
                    </div>
                ) : (
                    <button onClick={handleSubmit} className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                        Check Answers
                    </button>
                )}
            </div>
        </div>
    );
};

// --- Deep Debate Components ---

const ArgumentMapContent: React.FC<{ viewpoints: Viewpoint[] }> = ({ viewpoints }) => (
    <div className="space-y-8">
        {viewpoints.map((viewpoint, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">{viewpoint.title}</h3>
                <p className="text-gray-600 mb-6 italic">{viewpoint.summary}</p>
                <div className="space-y-6">
                    {viewpoint.arguments.map((arg, argIndex) => (
                        <div key={argIndex} className="border-l-4 border-blue-500 pl-4">
                            <h4 className="font-semibold text-gray-800">Claim: {arg.claim}</h4>
                            <p className="mt-1 text-sm text-gray-600"><span className="font-medium">Evidence:</span> {arg.evidence}</p>
                            <p className="mt-2 text-sm text-gray-500 bg-gray-100 p-2 rounded-md"><span className="font-medium">Counter-Argument:</span> {arg.counterArgument}</p>
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
);

const ConsensusContent: React.FC<{ consensus: string }> = ({ consensus }) => (
    <div className="prose prose-blue max-w-none text-gray-700">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Points of Consensus</h3>
        <p>{consensus}</p>
    </div>
);

const UnresolvedQuestionsContent: React.FC<{ questions: string[] }> = ({ questions }) => (
    <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Unresolved Questions</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
            {questions.map((question, index) => (
                <li key={index}>{question}</li>
            ))}
        </ul>
    </div>
);


// --- Agent Path Component ---
const AgentPathContent: React.FC<{ agentPath: AgentStep[] }> = ({ agentPath }) => (
    <div className="space-y-6">
        {agentPath.map((step, index) => (
            <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full font-bold">{index + 1}</div>
                    {index < agentPath.length - 1 && <div className="w-px h-full bg-gray-200 mt-2"></div>}
                </div>
                <div className="pb-4 flex-1">
                    <h4 className="font-bold text-gray-800">{step.title}</h4>
                    <p className="mt-1 text-gray-600">{step.reasoning}</p>
                    {step.sourceURL && (
                        <a href={step.sourceURL} target="_blank" rel="noopener noreferrer" className="mt-2 text-sm text-blue-600 hover:underline inline-block">
                            View Source
                        </a>
                    )}
                </div>
            </div>
        ))}
    </div>
);


// --- Canvas Components ---

const PreviewContent: React.FC<{ codeFiles: CodeFile[] }> = ({ codeFiles }) => {
    const srcDoc = useMemo(() => {
        const htmlFile = codeFiles.find(f => f.language === 'html')?.content || '';
        const cssFile = codeFiles.find(f => f.language === 'css')?.content || '';
        const jsFile = codeFiles.find(f => f.language === 'javascript')?.content || '';

        return `
            <html>
                <head>
                    <style>${cssFile}</style>
                </head>
                <body>
                    ${htmlFile}
                    <script>${jsFile}</script>
                </body>
            </html>
        `;
    }, [codeFiles]);

    return (
        <div className="w-full h-[60vh] border border-gray-200 rounded-lg overflow-hidden">
            <iframe
                srcDoc={srcDoc}
                title="Preview"
                sandbox="allow-scripts"
                className="w-full h-full"
                frameBorder="0"
            />
        </div>
    );
};

const CodeContent: React.FC<{ codeFiles: CodeFile[] }> = ({ codeFiles }) => {
    const [selectedFile, setSelectedFile] = useState<CodeFile | undefined>(codeFiles[0]);

    useEffect(() => {
        if (!selectedFile && codeFiles.length > 0) {
            setSelectedFile(codeFiles[0]);
        }
    }, [codeFiles, selectedFile]);

    return (
        <div className="flex flex-col h-[60vh]">
            <div className="flex-shrink-0 border-b border-gray-200 mb-2">
                {codeFiles.map(file => (
                    <button
                        key={file.filename}
                        onClick={() => setSelectedFile(file)}
                        className={`px-3 py-2 text-sm font-medium ${selectedFile?.filename === file.filename ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        {file.filename}
                    </button>
                ))}
            </div>
            {selectedFile && (
                <div className="flex-grow bg-gray-800 text-white font-mono text-sm rounded-md p-4 overflow-auto">
                    <pre><code>{selectedFile.content}</code></pre>
                </div>
            )}
        </div>
    );
};


// --- Common and Research Components ---

const SummaryContent: React.FC<{ summary: string }> = ({ summary }) => (
  <div className="prose prose-blue max-w-none text-gray-700">
    {summary.split('\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}
  </div>
);

const SourcesContent: React.FC<{ sources: any[] }> = ({ sources }) => (
    <div className="space-y-4">
        {sources.map((source, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold block">
                    {source.title}
                </a>
                <p className="text-sm text-gray-500 mt-1 italic">"{source.snippet}"</p>
            </div>
        ))}
    </div>
);

const FlashCardComponent: React.FC<{ card: FlashCard }> = ({ card }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    return (
        <div 
            className="w-full h-48 p-4 border rounded-lg shadow-sm cursor-pointer flex items-center justify-center text-center transition-transform duration-500"
            style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
            onClick={() => setIsFlipped(!isFlipped)}
            aria-live="polite"
        >
            <div className="absolute w-full h-full flex items-center justify-center p-4" style={{ backfaceVisibility: 'hidden' }}>
                <p className="font-semibold">{card.question}</p>
            </div>
            <div className="absolute w-full h-full flex items-center justify-center p-4 bg-blue-50 rounded-lg" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                <p className="text-gray-700">{card.answer}</p>
            </div>
        </div>
    );
}

const FlashCardsContent: React.FC<{ flashCards: ResearchData['flashCards'] }> = ({ flashCards }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ perspective: '1000px' }}>
    {flashCards.map((card, index) => <FlashCardComponent key={index} card={card} />)}
  </div>
);

const RelatedVideosContent: React.FC<{ videos: ResearchData['relatedVideos'] }> = ({ videos }) => (
  <div className="space-y-4">
    {videos.map((video, index) => (
      <div key={index} className="flex items-start space-x-4 border border-gray-200 rounded-lg p-4">
        <div className="bg-gray-300 w-32 h-20 rounded-md flex-shrink-0 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">{video.title}</h4>
          <p className="text-sm text-gray-600 mt-1">{video.description}</p>
        </div>
      </div>
    ))}
  </div>
);

const MiniAppContent: React.FC<{ appData: MiniAppData[] }> = ({ appData }) => {
    const chartData = useMemo(() => appData.map(d => ({ name: d.keyword, frequency: d.frequency })), [appData]);

    return (
        <div className="w-full h-96">
            <h3 className="text-lg font-semibold mb-4 text-center">Keyword Frequency</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="frequency" fill="#3b82f6" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LeftPane;