import React from 'react';
import Agent2ChatPane from './Agent2ChatPane';
import type { GeminiService } from '../services/geminiService';

interface Agent2PageProps {
  query: string;
  onReset: () => void;
  geminiService: GeminiService;
}

const Agent2Page: React.FC<Agent2PageProps> = ({ query, onReset, geminiService }) => {
  const searchUrl = `https://www.duckduckgo.com/`;

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <header className="px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-8 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-800 cursor-pointer" onClick={onReset}>Silo labs</h1>
          <div className="bg-white text-gray-700 text-sm font-medium px-4 py-1.5 rounded-full shadow-sm">
            Deep Agent 2.0
          </div>
        </div>
        <div className="flex items-center space-x-4">
            <button onClick={onReset} className="text-sm font-medium text-blue-600 hover:underline">
              New Research
            </button>
        </div>
      </header>

      <main className="flex-grow flex flex-col lg:flex-row gap-6 p-4 sm:p-6 md:p-8 pt-6 overflow-y-auto lg:overflow-hidden">
        <div className="lg:w-3/5 lg:h-full flex flex-col border border-gray-200 bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="flex-shrink-0 p-2 bg-gray-100 border-b border-gray-200 flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <div className="ml-4 bg-white text-gray-500 text-sm rounded-md px-3 py-1 w-full truncate border">{searchUrl}</div>
            </div>
            <div className="flex-grow relative">
                <iframe
                    src={searchUrl}
                    className="w-full h-full border-0"
                    title="Web Browser"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                ></iframe>
            </div>
        </div>
        <div className="lg:w-2/5 lg:h-full bg-white rounded-2xl shadow-lg flex flex-col">
          <Agent2ChatPane query={query} geminiService={geminiService} />
        </div>
      </main>
    </div>
  );
};

export default Agent2Page;