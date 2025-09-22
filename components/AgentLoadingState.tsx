import React, { useState, useEffect, useMemo } from 'react';

const AgentLoadingState: React.FC<{ query: string }> = ({ query }) => {
    const [log, setLog] = useState<string[]>([]);
    const [currentUrl, setCurrentUrl] = useState('...');
    const [iframeUrl, setIframeUrl] = useState('about:blank');

    const actions = useMemo(() => [
        { text: `Initializing agent for research on "${query}"...`, url: 'agent://localhost/init' },
        { text: 'Formulating initial research plan...', url: 'agent://localhost/planning' },
        { text: 'Querying academic databases...', url: `https://scholar.google.com/scholar?q=${encodeURIComponent(query)}` },
        { text: 'Analyzing top search results for relevance.', url: `https://www.google.com/search?q=${encodeURIComponent(query)}` },
        { text: 'Cross-referencing claims from multiple sources.', url: `https://en.wikipedia.org/wiki/${encodeURIComponent(query)}` },
        { text: 'Identifying key concepts and terminology.', url: 'agent://localhost/synthesis' },
        { text: 'Detecting potential biases in sources.', url: 'agent://localhost/analysis' },
        { text: 'Synthesizing findings into a coherent summary.', url: 'agent://localhost/compiling' },
        { text: 'Finalizing source list and agent path.', url: 'agent://localhost/finalizing' },
    ], [query]);

    useEffect(() => {
        const agentStatusPage = (text: string) => `
            data:text/html;charset=utf-8,${encodeURIComponent(`
                <!DOCTYPE html>
                <html>
                <head>
                    <script src="https://cdn.tailwindcss.com"></script>
                </head>
                <body class="bg-gray-800 text-gray-300 font-mono flex flex-col items-center justify-center h-screen p-8 text-center">
                    <div class="text-2xl mb-4 text-blue-400">[ Agent Internal State ]</div>
                    <div class="text-lg animate-pulse">${text}</div>
                </body>
                </html>
            `)}`;
            
        // Initialize with the first action
        if (actions.length > 0) {
            setLog([actions[0].text]);
            setCurrentUrl(actions[0].url);
            setIframeUrl(agentStatusPage(actions[0].text));
        }

        const interval = setInterval(() => {
            setLog(prev => {
                const nextIndex = prev.length;
                if (nextIndex < actions.length) {
                    const nextAction = actions[nextIndex];
                    setCurrentUrl(nextAction.url);

                    if (nextAction.url.startsWith('https://')) {
                        setIframeUrl(nextAction.url);
                    } else {
                        setIframeUrl(agentStatusPage(nextAction.text));
                    }
                    return [...prev, nextAction.text];
                }
                clearInterval(interval);
                return prev;
            });
        }, 2500);

        return () => clearInterval(interval);
    }, [actions]);


    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white font-mono">
            <header className="p-4 border-b border-gray-700">
                <h1 className="text-lg">Silo labs // Deep Agent Mode <span className="animate-pulse">_</span></h1>
            </header>
            <main className="flex-grow flex flex-col md:flex-row gap-4 p-4 overflow-hidden">
                {/* Left Pane: Embedded Browser */}
                <div className="md:w-3/5 h-full flex flex-col border border-gray-700 rounded-lg">
                    <div className="flex-shrink-0 p-2 bg-gray-800 border-b border-gray-700 flex items-center gap-2">
                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                        <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                        <div className="ml-4 bg-gray-700 text-gray-300 text-sm rounded-md px-3 py-1 w-full truncate">{currentUrl}</div>
                    </div>
                    <div className="flex-grow bg-gray-800/50 relative">
                       <iframe
                            key={iframeUrl}
                            src={iframeUrl}
                            className="w-full h-full border-0 bg-gray-800"
                            title="Agent Browser"
                            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                        ></iframe>
                    </div>
                </div>

                {/* Right Pane: Agent Log */}
                <div className="md:w-2/5 h-full flex flex-col border border-gray-700 rounded-lg bg-gray-800">
                     <div className="flex-shrink-0 p-3 border-b border-gray-700">
                        <h2 className="font-bold text-green-400">AGENT LOG</h2>
                     </div>
                     <div className="flex-grow p-4 overflow-y-auto">
                        <ul className="space-y-2 text-sm">
                            {log.map((entry, index) => (
                                <li key={index} className="flex gap-2">
                                    <span className="text-gray-500">{`[${new Date().toLocaleTimeString()}]`}</span>
                                    <span className="text-gray-300">{entry}</span>
                                </li>
                            ))}
                            {log.length < actions.length && (
                                <li className="flex gap-2">
                                    <span className="text-gray-500">{`[${new Date().toLocaleTimeString()}]`}</span>
                                    <span className="text-gray-300 animate-pulse">Thinking...</span>
                                </li>
                            )}
                        </ul>
                     </div>
                </div>
            </main>
        </div>
    );
};

export default AgentLoadingState;
