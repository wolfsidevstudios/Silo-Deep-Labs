import React, { useState, useCallback, useEffect } from 'react';
import Navbar from './components/Navbar';
import HistoryPage from './components/HistoryPage';
import SettingsPage from './components/SettingsPage';
import ModeSelectionPage from './components/HomePage';
import SearchPage from './components/SearchPage';
import ResultsPage from './components/ResultsPage';
import LoadingState from './components/LoadingState';
import AgentLoadingState from './components/AgentLoadingState';
import ApiKeyPage from './components/ApiKeyPage';
import { GeminiService } from './services/geminiService';
import type { ResearchData, CanvasData, AgentData, DebateData, StudyData, StudioData, TripData, HealthData, InterviewData, MarketData, ChefData, GameData } from './types';
import { AppState, ResearchMode } from './types';

type Page = 'home' | 'history' | 'settings';

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string | null>(() => localStorage.getItem('gemini_api_key') || 'AIzaSyAl-3KSM8MDzZzZWtROP_zLzto5IPjZ4mo');
  const [geminiService, setGeminiService] = useState<GeminiService | null>(null);
  const [appState, setAppState] = useState<AppState>(AppState.MODE_SELECTION);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedMode, setSelectedMode] = useState<ResearchMode | null>(null);
  const [query, setQuery] = useState<string>('');
  const [researchData, setResearchData] = useState<ResearchData | CanvasData | AgentData | DebateData | StudyData | StudioData | TripData | HealthData | InterviewData | MarketData | ChefData | GameData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (apiKey) {
      try {
        setGeminiService(new GeminiService(apiKey));
      } catch (e) {
        console.error("Failed to initialize Gemini Service", e);
        localStorage.removeItem('gemini_api_key');
        setApiKey(null);
      }
    }
  }, [apiKey]);

  const handleApiKeySubmit = (key: string) => {
    localStorage.setItem('gemini_api_key', key);
    setApiKey(key);
    setCurrentPage('home');
  };
  
  const handleClearApiKey = useCallback(() => {
    localStorage.removeItem('gemini_api_key');
    setApiKey(null);
    setGeminiService(null);
    setCurrentPage('home');
  }, []);

  const handleModeSelect = useCallback((mode: ResearchMode) => {
    setSelectedMode(mode);
    setAppState(AppState.SEARCHING);
    setError(null);
    setCurrentPage('home');
  }, []);

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim() || !selectedMode || !geminiService) return;
    setQuery(searchQuery);
    setAppState(AppState.LOADING);
    setError(null);
    try {
      let data;
      switch (selectedMode) {
        case ResearchMode.DEEP_CANVAS:
          data = await geminiService.performCanvasGeneration(searchQuery);
          break;
        case ResearchMode.DEEP_AGENT:
          data = await geminiService.performAgentResearch(searchQuery);
          break;
        case ResearchMode.DEEP_DEBATE:
          data = await geminiService.performDeepDebate(searchQuery);
          break;
        case ResearchMode.DEEP_STUDY:
          data = await geminiService.performDeepStudy(searchQuery);
          break;
        case ResearchMode.DEEP_STUDIO:
          data = await geminiService.performDeepStudio(searchQuery);
          break;
        case ResearchMode.DEEP_TRIP:
          data = await geminiService.performDeepTrip(searchQuery);
          break;
        case ResearchMode.DEEP_HEALTH:
          data = await geminiService.performDeepHealth(searchQuery);
          break;
        case ResearchMode.DEEP_INTERVIEW:
          data = await geminiService.performDeepInterview(searchQuery);
          break;
        case ResearchMode.DEEP_MARKET:
          data = await geminiService.performDeepMarket(searchQuery);
          break;
        case ResearchMode.DEEP_CHEF:
          data = await geminiService.performDeepChef(searchQuery);
          break;
        case ResearchMode.DEEP_GAME:
            data = await geminiService.performDeepGame(searchQuery);
            break;
        case ResearchMode.DEEP_RESEARCH:
        default:
          data = await geminiService.performDeepResearch(searchQuery);
          break;
      }
      setResearchData(data);
      setAppState(AppState.RESULTS);
    } catch (err) {
      console.error(err);
      setError('An error occurred during the process. Please try again.');
      setAppState(AppState.SEARCHING);
    }
  }, [selectedMode, geminiService]);

  const handleReset = useCallback(() => {
    setAppState(AppState.MODE_SELECTION);
    setQuery('');
    setSelectedMode(null);
    setResearchData(null);
    setError(null);
    setCurrentPage('home');
  }, []);

  const handleBackToModes = useCallback(() => {
    setAppState(AppState.MODE_SELECTION);
    setSelectedMode(null);
    setError(null);
  }, []);
  
  const renderHomePage = () => {
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
        return researchData && geminiService && <ResultsPage query={query} data={researchData} onReset={handleReset} geminiService={geminiService} />;
      default:
        return <ModeSelectionPage onModeSelect={handleModeSelect} />;
    }
  };

  const renderContent = () => {
    if (!apiKey) {
      return <ApiKeyPage onSubmit={handleApiKeySubmit} />;
    }

    switch (currentPage) {
        case 'home':
            return renderHomePage();
        case 'history':
            return <HistoryPage />;
        case 'settings':
            return <SettingsPage onClearApiKey={handleClearApiKey} />;
        default:
            return renderHomePage();
    }
  };

  const isAgentLoading = appState === AppState.LOADING && selectedMode === ResearchMode.DEEP_AGENT;
  const showNavbar = apiKey && !isAgentLoading;

  return (
    <div className="h-screen bg-gray-50 font-sans text-gray-800">
      {showNavbar && <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />}
      <main className={`h-full overflow-y-auto ${showNavbar ? 'pt-20' : ''}`}>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;