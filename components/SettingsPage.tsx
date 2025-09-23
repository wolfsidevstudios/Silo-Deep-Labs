import React from 'react';

interface SettingsPageProps {
    onClearApiKey: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onClearApiKey }) => {
    return (
        <div className="p-8 max-w-2xl mx-auto mt-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>
            <div className="bg-white p-6 rounded-lg shadow-md border">
                <h2 className="text-xl font-semibold text-gray-700">API Key</h2>
                <p className="text-gray-600 mt-2">
                    Your Gemini API key is securely stored in your browser's local storage. Click the button below to remove it and enter a new one.
                </p>
                <button
                    onClick={onClearApiKey}
                    className="mt-4 px-5 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                    Change API Key
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;
