
import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-50">
      <div className="w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Silo is researching...</h2>
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div className="bg-blue-600 h-2.5 rounded-full w-full animate-pulse"></div>
        </div>
         <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: '100%', animation: 'loading-progress 2s linear infinite' }}
            ></div>
        </div>
        <style>{`
            @keyframes loading-progress {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
        `}</style>
      </div>
    </div>
  );
};

export default LoadingState;