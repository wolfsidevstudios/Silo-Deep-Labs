
import React from 'react';

const SettingsPage: React.FC = () => {
    return (
        <div className="p-8 max-w-2xl mx-auto mt-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>
            <div className="bg-white p-6 rounded-lg shadow-md border">
                <h2 className="text-xl font-semibold text-gray-700">API Key</h2>
                <p className="text-gray-600 mt-2">
                    The application's API key is configured via environment variables and cannot be changed through the user interface.
                </p>
            </div>
        </div>
    );
};

export default SettingsPage;
