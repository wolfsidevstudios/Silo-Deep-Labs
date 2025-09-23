import React from 'react';

type Page = 'home' | 'history' | 'settings';

interface NavbarProps {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
}

const navItems: Page[] = ['home', 'history', 'settings'];

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage }) => {
    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 pointer-events-none">
            <div className="bg-white/70 backdrop-blur-lg p-1 rounded-full flex items-center space-x-1 shadow-lg border border-gray-200/80 pointer-events-auto">
                {navItems.map((item) => (
                    <button
                        key={item}
                        onClick={() => setCurrentPage(item)}
                        className={`px-6 py-2 text-sm font-semibold rounded-full transition-colors capitalize ${
                            currentPage === item ? 'bg-white shadow text-gray-800' : 'text-gray-600 hover:bg-gray-300/50'
                        }`}
                    >
                        {item}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Navbar;