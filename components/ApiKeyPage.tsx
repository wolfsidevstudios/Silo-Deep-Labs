import React, { useState } from 'react';

interface ApiKeyPageProps {
    onSubmit: (apiKey: string) => void;
}

const ApiKeyPage: React.FC<ApiKeyPageProps> = ({ onSubmit }) => {
    const [apiKey, setApiKey] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (apiKey.trim()) {
            onSubmit(apiKey.trim());
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <h1 className="text-2xl font-bold text-gray-800 text-center">Silo Labs</h1>
                <p className="mt-2 text-center text-gray-600">Enter your Gemini API Key to continue.</p>
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label htmlFor="api-key" className="sr-only">Gemini API Key</label>
                        <input
                            id="api-key"
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="Enter your API Key"
                            className="w-full px-4 py-3 text-base bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                            autoFocus
                        />
                    </div>
                    <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline block text-center">
                        Get your API key from Google AI Studio
                    </a>
                    <button
                        type="submit"
                        disabled={!apiKey.trim()}
                        className="w-full px-4 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Save &amp; Continue
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ApiKeyPage;
