import React, { useState } from 'react';
import { ResearchMode } from '../types';
import { ArrowUpIcon } from './icons/ArrowUpIcon';
import { BackArrowIcon } from './icons/BackArrowIcon';

interface SearchPageProps {
  mode: ResearchMode;
  onSearch: (query: string) => void;
  onBack: () => void;
  error: string | null;
}

const modeDetails = {
    [ResearchMode.DEEP_RESEARCH]: { title: 'Deep Research', placeholder: "What do you want to deep research today?" },
    [ResearchMode.DEEP_CANVAS]: { title: 'Deep Canvas', placeholder: "What kind of app do you want to build?" },
    [ResearchMode.DEEP_AGENT]: { title: 'Deep Agent', placeholder: "What topic should the AI agent investigate?" },
    [ResearchMode.DEEP_AGENT_2]: { title: 'Deep Agent 2.0', placeholder: "What do you want to search the web for?" },
    [ResearchMode.DEEP_DEBATE]: { title: 'Deep Debate', placeholder: "Enter a controversial topic to debate..." },
    [ResearchMode.DEEP_STUDY]: { title: 'Deep Study', placeholder: "What topic do you want a study guide for?" },
    [ResearchMode.DEEP_STUDIO]: { title: 'Deep Studio', placeholder: "Enter a topic for your next viral video..." },
    [ResearchMode.DEEP_TRIP]: { title: 'Deep Trip', placeholder: "Describe your dream trip..." },
    [ResearchMode.DEEP_HEALTH]: { title: 'Deep Health', placeholder: "What's your health and fitness goal?" },
    [ResearchMode.DEEP_INTERVIEW]: { title: 'Deep Interview', placeholder: "Enter a job role you're interviewing for..." },
    [ResearchMode.DEEP_MARKET]: { title: 'Deep Market', placeholder: "Describe your business or product idea..." },
    [ResearchMode.DEEP_CHEF]: { title: 'Deep Chef', placeholder: "List ingredients or describe a dish..." },
    [ResearchMode.DEEP_GAME]: { title: 'Deep Game', placeholder: "Describe your game idea..." },
};

const SearchPage: React.FC<SearchPageProps> = ({ mode, onSearch, onBack, error }) => {
  const [query, setQuery] = useState('');
  const details = modeDetails[mode];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="flex flex-col min-h-full">
      <header className="absolute top-0 left-0 p-8">
        <button onClick={onBack} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 group">
          <BackArrowIcon />
          <span className="font-medium">All Modes</span>
        </button>
      </header>
      
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl text-center">
            <h1 className="text-3xl font-bold text-gray-800">{details.title}</h1>

            <form onSubmit={handleSubmit} className="relative w-full mt-8">
                <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={details.placeholder}
                className="w-full pl-6 pr-20 py-5 text-lg bg-white border-2 border-gray-200 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
                autoFocus
                />
                <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-800 hover:bg-black rounded-full flex items-center justify-center transition-colors disabled:opacity-50"
                disabled={!query.trim()}
                aria-label="Submit search"
                >
                <ArrowUpIcon />
                </button>
            </form>
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </div>
      </main>
    </div>
  );
};

export default SearchPage;