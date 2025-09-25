import React, { useState, useCallback, useEffect } from 'react';
import Navbar from './components/Navbar';
import HistoryPage from './components/HistoryPage';
import SettingsPage from './components/SettingsPage';
import ModeSelectionPage from './components/HomePage';
import SearchPage from './components/SearchPage';
import ResultsPage from './components/ResultsPage';
import LoadingState from './components/LoadingState';
import AgentLoadingState from './components/AgentLoadingState';
import Agent2Page from './components/Agent2Page';
import { GeminiService } from './services/geminiService';
import type { AnyData, HistoryItem } from './types';
import { AppState, ResearchMode } from './types';
import ApiKeyPage from './components/ApiKeyPage';

type Page = 'home' | 'history' | 'settings';

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [apiKeyChecked, setApiKeyChecked] = useState<boolean>(false);
  const [geminiService, setGeminiService] = useState<GeminiService | null>(null);
  const [appState, setAppState] = useState<AppState>(AppState.MODE_SELECTION);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedMode, setSelectedMode] = useState<ResearchMode | null>(null);
  const [query, setQuery] = useState<string>('');
  const [researchData, setResearchData] = useState<AnyData | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Check for API key in local storage on initial load
  useEffect(() => {
    const storedApiKey = localStorage.getItem('silo_research_api_key');
    if (storedApiKey) {
        setApiKey(storedApiKey);
    }
    setApiKeyChecked(true); // Mark that we've checked for the key

    const storedHistory = localStorage.getItem('silo_research_history');
    if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
    }
  }, []);

  // Initialize GeminiService when API key is available
  useEffect(() => {
    if (apiKey) {
        try {
            setGeminiService(new GeminiService(apiKey));
            setError(null); // Clear previous errors on successful init
        } catch (e) {
            console.error("Failed to initialize Gemini Service", e);
            setError("Failed to initialize Gemini Service. The API key might be invalid.");
            setApiKey(null); // Reset API key if initialization fails
            localStorage.removeItem('silo_research_api_key');
        }
    } else {
        setGeminiService(null);
    }
  }, [apiKey]);
  
  const handleApiKeySubmit = useCallback((newApiKey: string) => {
    setApiKey(newApiKey);
    localStorage.setItem('silo_research_api_key', newApiKey);
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
    
    if (selectedMode === ResearchMode.DEEP_AGENT_2) {
        setAppState(AppState.RESULTS);
        setResearchData(null);
        setError(null);
        return;
    }

    setAppState(AppState.LOADING);
    setError(null);
    try {
      let data: AnyData;
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
        case ResearchMode.DEEP_CODE:
            data = await geminiService.performDeepCode(searchQuery);
            break;
        case ResearchMode.DEEP_LEGAL:
            data = await geminiService.performDeepLegal(searchQuery);
            break;
        case ResearchMode.DEEP_FINANCE:
            data = await geminiService.performDeepFinance(searchQuery);
            break;
        case ResearchMode.DEEP_SLIDES:
            data = await geminiService.performDeepSlides(searchQuery);
            break;
        case ResearchMode.DEEP_RESEARCH:
        default:
          data = await geminiService.performDeepResearch(searchQuery);
          break;
      }
      setResearchData(data);
      setAppState(AppState.RESULTS);
      
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        query: searchQuery,
        mode: selectedMode,
        data: data,
        timestamp: Date.now(),
      };

      setHistory(prevHistory => {
        const updatedHistory = [newHistoryItem, ...prevHistory].slice(0, 50); // Keep latest 50
        localStorage.setItem('silo_research_history', JSON.stringify(updatedHistory));
        return updatedHistory;
      });

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

  const handleClearApiKey = useCallback(() => {
    setApiKey(null);
    localStorage.removeItem('silo_research_api_key');
    handleReset();
  }, [handleReset]);

  const handleBackToModes = useCallback(() => {
    setAppState(AppState.MODE_SELECTION);
    setSelectedMode(null);
    setError(null);
  }, []);

  const handleRestoreSession = useCallback((item: HistoryItem) => {
    setSelectedMode(item.mode);
    setQuery(item.query);
    setResearchData(item.data);
    setAppState(AppState.RESULTS);
    setCurrentPage('home');
  }, []);

  const handleClearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem('silo_research_history');
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
        if (selectedMode === ResearchMode.DEEP_AGENT_2) {
            return geminiService && <Agent2Page query={query} onReset={handleReset} geminiService={geminiService} />;
        }
        return researchData && geminiService && <ResultsPage query={query} data={researchData} onReset={handleReset} geminiService={geminiService} />;
      default:
        return <ModeSelectionPage onModeSelect={handleModeSelect} />;
    }
  };

  const renderContent = () => {
    if (!apiKeyChecked) {
        return <LoadingState />;
    }
    if (!apiKey) {
        return <ApiKeyPage onSubmit={handleApiKeySubmit} />;
    }

    switch (currentPage) {
        case 'home':
            return renderHomePage();
        case 'history':
            return <HistoryPage history={history} onRestore={handleRestoreSession} onClear={handleClearHistory} />;
        case 'settings':
            return <SettingsPage onClearApiKey={handleClearApiKey} />;
        default:
            return renderHomePage();
    }
  };

  const isAgentLoading = appState === AppState.LOADING && selectedMode === ResearchMode.DEEP_AGENT;
  const showNavbar = !!apiKey && !isAgentLoading;

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