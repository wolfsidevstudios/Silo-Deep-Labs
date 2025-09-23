import React from 'react';
import type { HistoryItem } from '../types';
import { modeDetails } from '../types';

interface HistoryPageProps {
    history: HistoryItem[];
    onRestore: (item: HistoryItem) => void;
    onClear: () => void;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ history, onRestore, onClear }) => {
    if (history.length === 0) {
        return (
            <div className="p-8 max-w-2xl mx-auto text-center mt-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Research History</h1>
                <div className="bg-white p-10 rounded-lg shadow-md border">
                    <p className="text-gray-600">
                        You have no past research sessions. Complete a new search to see it appear here.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Research History</h1>
                <button
                    onClick={onClear}
                    className="text-sm font-medium text-red-600 hover:underline"
                >
                    Clear History
                </button>
            </div>
            <div className="space-y-4">
                {history.map((item) => {
                    const details = modeDetails[item.mode];
                    const Icon = details.Icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onRestore(item)}
                            className="w-full text-left p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 flex items-start space-x-4"
                        >
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                <Icon />
                            </div>
                            <div className="flex-grow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-gray-800 truncate">{item.query}</p>
                                        <p className={`text-xs font-semibold px-2 py-0.5 rounded-full inline-block mt-1 ${details.tag.color}`}>{details.title}</p>
                                    </div>
                                    <p className="text-xs text-gray-500 flex-shrink-0 ml-4">
                                        {new Date(item.timestamp).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    );
};

export default HistoryPage;
