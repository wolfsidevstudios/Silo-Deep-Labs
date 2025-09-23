import React from 'react';
import type { ResearchData, CanvasData, AgentData, DebateData, StudyData, StudioData, TripData, HealthData, InterviewData, MarketData, ChefData, GameData } from '../types';
import LeftPane from './LeftPane';
import ChatPane from './ChatPane';
import type { GeminiService } from '../services/geminiService';

interface ResultsPageProps {
  query: string;
  data: ResearchData | CanvasData | AgentData | DebateData | StudyData | StudioData | TripData | HealthData | InterviewData | MarketData | ChefData | GameData;
  onReset: () => void;
  geminiService: GeminiService;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ query, data, onReset, geminiService }) => {
  return (
    <div className="flex flex-col h-full bg-gray-100">
      <header className="px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-8 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-800 cursor-pointer" onClick={onReset}>Silo labs</h1>
          <div className="bg-white text-gray-700 text-sm font-medium px-4 py-1.5 rounded-full shadow-sm">
            Deep research
          </div>
        </div>
        <div className="flex items-center space-x-4">
            <button onClick={onReset} className="text-sm font-medium text-blue-600 hover:underline">
              New Research
            </button>
        </div>
      </header>

      <main className="flex-grow flex flex-col lg:flex-row gap-6 p-4 sm:p-6 md:p-8 pt-6 overflow-y-auto lg:overflow-hidden">
        <div className="lg:w-3/5 lg:h-full">
          <LeftPane data={data} query={query} />
        </div>
        <div className="lg:w-2/5 lg:h-full">
          <ChatPane query={query} geminiService={geminiService} />
        </div>
      </main>
    </div>
  );
};

export default ResultsPage;