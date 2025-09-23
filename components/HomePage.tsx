import React from 'react';
import { ResearchMode, modeDetails } from '../types';

interface ModeSelectionPageProps {
  onModeSelect: (mode: ResearchMode) => void;
}

const researchModes = Object.entries(modeDetails).map(([id, details]) => ({
    id: id as ResearchMode,
    ...details
}));

const ModeSelectionPage: React.FC<ModeSelectionPageProps> = ({ onModeSelect }) => {
  return (
    <div className="flex flex-col p-4 sm:p-6 md:p-8">
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
