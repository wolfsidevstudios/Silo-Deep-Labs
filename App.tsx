import React, { useState, useCallback } from 'react';
import ModeSelectionPage from './components/HomePage';
import SearchPage from './components/SearchPage';
import ResultsPage from './components/ResultsPage';
import LoadingState from './components/LoadingState';
import AgentLoadingState from './components/AgentLoadingState';
import { performDeepResearch, performCanvasGeneration, performAgentResearch, performDeepDebate, performDeepStudy, performDeepStudio, performDeepTrip, performDeepHealth, performDeepInterview, performDeepMarket, performDeepChef, performDeepGame } from './services/geminiService';
import type { ResearchData, CanvasData, AgentData, DebateData, StudyData, StudioData, TripData, HealthData, InterviewData, MarketData, ChefData, GameData } from './types';
import { AppState, ResearchMode } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.MODE_SELECTION);
  const [selectedMode, setSelectedMode] = useState<ResearchMode | null>(null);
  const [query, setQuery] = useState<string>('');
  const [researchData, setResearchData] = useState<ResearchData | CanvasData | AgentData | DebateData | StudyData | StudioData | TripData | HealthData | InterviewData | MarketData | ChefData | GameData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleModeSelect = useCallback((mode: ResearchMode) => {
    setSelectedMode(mode);
    setAppState(AppState.SEARCHING);
    setError(null);
  }, []);

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim() || !selectedMode) return;
    setQuery(searchQuery);
    setAppState(AppState.LOADING);
    setError(null);
    try {
      let data;
      switch (selectedMode) {
        case ResearchMode.DEEP_CANVAS:
          data = await performCanvasGeneration(searchQuery);
          break;
        case ResearchMode.DEEP_AGENT:
          data = await performAgentResearch(searchQuery);
          break;
        case ResearchMode.DEEP_DEBATE:
          data = await performDeepDebate(searchQuery);
          break;
        case ResearchMode.DEEP_STUDY:
          data = await performDeepStudy(searchQuery);
          break;
        case ResearchMode.DEEP_STUDIO:
          data = await performDeepStudio(searchQuery);
          break;
        case ResearchMode.DEEP_TRIP:
          data = await performDeepTrip(searchQuery);
          break;
        case ResearchMode.DEEP_HEALTH:
          data = await performDeepHealth(searchQuery);
          break;
        case ResearchMode.DEEP_INTERVIEW:
          data = await performDeepInterview(searchQuery);
          break;
        case ResearchMode.DEEP_MARKET:
          data = await performDeepMarket(searchQuery);
          break;
        case ResearchMode.DEEP_CHEF:
          data = await performDeepChef(searchQuery);
          break;
        case ResearchMode.DEEP_GAME:
            data = await performDeepGame(searchQuery);
            break;
        case ResearchMode.DEEP_RESEARCH:
        default:
          data = await performDeepResearch(searchQuery);
          break;
      }
      setResearchData(data);
      setAppState(AppState.RESULTS);
    } catch (err) {
      console.error(err);
      setError('An error occurred during the process. Please try again.');
      setAppState(AppState.SEARCHING);
    }
  }, [selectedMode]);

  const handleReset = useCallback(() => {
    setAppState(AppState.MODE_SELECTION);
    setQuery('');
    setSelectedMode(null);
    setResearchData(null);
    setError(null);
  }, []);

  const handleBackToModes = useCallback(() => {
    setAppState(AppState.MODE_SELECTION);
    setSelectedMode(null);
    setError(null);
  }, []);

  const renderContent = () => {
    switch (appState) {
      case AppState.MODE_SELECTION:
        return <ModeSelectionPage onModeSelect={handleModeSelect} />;
      case AppState.SEARCHING:
        return selectedMode && <SearchPage mode={selectedMode} onSearch={handleSearch} onBack={handleBackToModes} error={error} />;
      case AppState.LOADING:
        return selectedMode === ResearchMode.DEEP_AGENT 
            ? <AgentLoadingState query={query} /> 
            : <LoadingState />;
      case AppState.RESULTS:
        return researchData && <ResultsPage query={query} data={researchData} onReset={handleReset} />;
      default:
        return <ModeSelectionPage onModeSelect={handleModeSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {renderContent()}
    </div>
  );
};

export default App;