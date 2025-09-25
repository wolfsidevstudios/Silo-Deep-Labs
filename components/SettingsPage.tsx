
import React from 'react';

interface SettingsPageProps {
    onClearApiKey: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onClearApiKey }) => {
    return (
        <div className="p-8 max-w-2xl mx-auto mt-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>
            <div className="bg-white p-6 rounded-lg shadow-md border">
                <h2 className="text-xl font-semibold text-gray-700">API Key Management</h2>
                <p className="text-gray-600 mt-2 mb-4">
                    Your Gemini API key is stored in your browser's local storage. Clearing it will require you to enter it again.
                </p>
                <button
                    onClick={onClearApiKey}
                    className="px-4 py-2 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                    Clear API Key
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;
