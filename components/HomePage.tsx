import React from 'react';
import { ResearchMode } from '../types';
import { DeepResearchIcon } from './icons/DeepResearchIcon';
import { DeepCanvasIcon } from './icons/DeepCanvasIcon';
import { DeepAgentIcon } from './icons/DeepAgentIcon';
import { DeepDebateIcon } from './icons/DeepDebateIcon';
import { DeepStudyIcon } from './icons/DeepStudyIcon';
import { DeepStudioIcon } from './icons/DeepStudioIcon';
import { DeepTripIcon } from './icons/DeepTripIcon';
import { DeepHealthIcon } from './icons/DeepHealthIcon';
import { DeepInterviewIcon } from './icons/DeepInterviewIcon';
import { DeepMarketIcon } from './icons/DeepMarketIcon';
import { DeepChefIcon } from './icons/DeepChefIcon';
import { DeepGameIcon } from './icons/DeepGameIcon';


interface ModeSelectionPageProps {
  onModeSelect: (mode: ResearchMode) => void;
}

const researchModes = [
    { id: ResearchMode.DEEP_RESEARCH, Icon: DeepResearchIcon, title: 'Deep Research', description: 'In-depth analysis with sources, flashcards, and more.', tag: { text: 'CORE', color: 'bg-gray-200 text-gray-700' } },
    { id: ResearchMode.DEEP_AGENT, Icon: DeepAgentIcon, title: 'Deep Agent', description: 'Autonomous AI agent that shows its research path.', tag: { text: 'PRO', color: 'bg-purple-100 text-purple-800' } },
    { id: ResearchMode.DEEP_CANVAS, Icon: DeepCanvasIcon, title: 'Deep Canvas', description: 'Generate a fully functional web app from a prompt.', tag: { text: 'NEW', color: 'bg-blue-100 text-blue-800' } },
    { id: ResearchMode.DEEP_DEBATE, Icon: DeepDebateIcon, title: 'Deep Debate', description: 'Explore both sides of a controversial topic.', tag: { text: 'BETA', color: 'bg-green-100 text-green-800' } },
    { id: ResearchMode.DEEP_STUDY, Icon: DeepStudyIcon, title: 'Deep Study', description: 'Create a personalized study guide for any subject.', tag: { text: 'NEW', color: 'bg-yellow-100 text-yellow-800' } },
    { id: ResearchMode.DEEP_STUDIO, Icon: DeepStudioIcon, title: 'Deep Studio', description: 'Generate video ideas, scripts, and SEO keywords.', tag: { text: 'NEW', color: 'bg-red-100 text-red-800' } },
    { id: ResearchMode.DEEP_TRIP, Icon: DeepTripIcon, title: 'Deep Trip', description: 'Plan your next vacation with a detailed itinerary.', tag: { text: 'NEW', color: 'bg-indigo-100 text-indigo-800' } },
    { id: ResearchMode.DEEP_HEALTH, Icon: DeepHealthIcon, title: 'Deep Health', description: 'Get a personalized workout and meal plan.', tag: { text: 'NEW', color: 'bg-pink-100 text-pink-800' } },
    { id: ResearchMode.DEEP_INTERVIEW, Icon: DeepInterviewIcon, title: 'Deep Interview', description: 'Ace your next job interview with prep materials.', tag: { text: 'NEW', color: 'bg-cyan-100 text-cyan-800' } },
    { id: ResearchMode.DEEP_MARKET, Icon: DeepMarketIcon, title: 'Deep Market', description: 'Analyze market trends for your business idea.', tag: { text: 'NEW', color: 'bg-orange-100 text-orange-800' } },
    { id: ResearchMode.DEEP_CHEF, Icon: DeepChefIcon, title: 'Deep Chef', description: 'Generate a complete recipe from ingredients or a dish idea.', tag: { text: 'NEW', color: 'bg-lime-100 text-lime-800' } },
    { id: ResearchMode.DEEP_GAME, Icon: DeepGameIcon, title: 'Deep Game', description: 'Design a game concept with mechanics and characters.', tag: { text: 'NEW', color: 'bg-rose-100 text-rose-800' } },
];

const ModeSelectionPage: React.FC<ModeSelectionPageProps> = ({ onModeSelect }) => {
  return (
    <div className="flex flex-col min-h-screen p-4 sm:p-6 md:p-8">
      <header className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-gray-800">Silo labs</h1>
        <div className="bg-gray-200 text-gray-700 text-sm font-medium px-4 py-1 rounded-full">
          Deep research
        </div>
      </header>
      
      <main className="flex-grow flex flex-col items-center justify-center pt-8 pb-12">
        <div className="text-center mb-10">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">What will you create today?</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Select a specialized AI mode to begin.</p>
        </div>

        <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchModes.map(({ id, Icon, title, description, tag }) => (
            <button
              key={id}
              onClick={() => onModeSelect(id)}
              className="group text-left p-6 bg-white rounded-2xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 flex flex-col items-start"
            >
              <div className="flex justify-between items-start w-full">
                  <div className="w-12 h-12 bg-gray-100 group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors">
                    <Icon />
                  </div>
                  {tag && <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tag.color}`}>{tag.text}</span>}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mt-4">{title}</h3>
              <p className="text-sm text-gray-600 mt-1 flex-grow">{description}</p>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ModeSelectionPage;
