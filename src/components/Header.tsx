import React from 'react';
import { ArrowLeft, Search, MapPin, Compass } from 'lucide-react';
import { Beach } from '../types/Content';

interface HeaderProps {
  onBackToHome: () => void;
  onBackToSearch: () => void;
  currentView: 'home' | 'search' | 'beach' | 'vm2026';
  selectedBeach?: Beach | null;
  onNavigateToVM2026?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onBackToHome, 
  onBackToSearch, 
  currentView, 
  selectedBeach,
  onNavigateToVM2026 
}) => {
  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-ocean-blue to-coral p-2 rounded-2xl">
                <Compass className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="block text-2xl md:text-3xl font-playfair font-bold text-dark-slate">
                  Pantai.my
                </span>
                <p className="text-sm text-dark-slate/60 hidden md:block">Discover Malaysia's Hidden Paradises</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8 text-dark-slate">
              <a href="#" className="hover:text-ocean-blue transition-colors font-medium">Discover</a>
              <a href="#" className="hover:text-ocean-blue transition-colors font-medium">Stories</a>
              <button 
                onClick={onNavigateToVM2026}
                className="hover:text-ocean-blue transition-colors font-medium bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent"
              >
                Visit Malaysia 2026
              </button>
              <a href="#" className="hover:text-ocean-blue transition-colors font-medium">About</a>
            </nav>
          </div>
        );
      
      case 'search':
        return (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBackToHome}
                className="p-3 hover:bg-light-ocean rounded-2xl transition-all duration-300 group"
              >
                <ArrowLeft className="w-5 h-5 text-ocean-blue group-hover:text-coral transition-colors" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-ocean-blue to-coral p-2 rounded-xl">
                  <Compass className="w-6 h-6 text-white" />
                </div>
                <div>
                <span className="block text-xl font-playfair font-bold text-dark-slate">
                  Pantai.my
                </span>
                  <p className="text-xs text-dark-slate/60 hidden md:block">Your Beach Journey</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3 text-dark-slate">
                <Search className="w-5 h-5 text-ocean-blue" />
                <span className="font-medium hidden md:inline">Exploring Paradises</span>
              </div>
              <button 
                onClick={onNavigateToVM2026}
                className="hidden md:block px-4 py-2 bg-gradient-to-r from-blue-600 to-red-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                VM2026
              </button>
            </div>
          </div>
        );
      
      case 'beach':
        return (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBackToSearch}
                className="p-3 hover:bg-light-ocean rounded-2xl transition-all duration-300 group"
              >
                <ArrowLeft className="w-5 h-5 text-ocean-blue group-hover:text-coral transition-colors" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-ocean-blue to-coral p-2 rounded-xl">
                  <Compass className="w-6 h-6 text-white" />
                </div>
                <div>
                <span className="block text-xl font-playfair font-bold text-dark-slate">
                  Pantai.my
                </span>
                  <p className="text-xs text-dark-slate/60 hidden md:block">Beach Story</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              {selectedBeach && (
                <div className="text-right hidden md:block">
                  <h2 className="text-lg font-playfair font-bold text-dark-slate">{selectedBeach.name}</h2>
                  <div className="flex items-center justify-end space-x-2 text-sm text-dark-slate/70">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedBeach.location}</span>
                  </div>
                </div>
              )}
              <button 
                onClick={onNavigateToVM2026}
                className="hidden md:block px-4 py-2 bg-gradient-to-r from-blue-600 to-red-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                VM2026
              </button>
            </div>
          </div>
        );

      case 'vm2026':
        return (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBackToHome}
                className="p-3 hover:bg-light-ocean rounded-2xl transition-all duration-300 group"
              >
                <ArrowLeft className="w-5 h-5 text-ocean-blue group-hover:text-coral transition-colors" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-red-600 p-2 rounded-xl">
                  <Compass className="w-6 h-6 text-white" />
                </div>
                <div>
                <span className="block text-xl font-playfair font-bold text-dark-slate">
                  Visit Malaysia 2026
                </span>
                  <p className="text-xs text-dark-slate/60 hidden md:block">Truly Asia Campaign</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right hidden md:block">
                <h2 className="text-lg font-playfair font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                  Discover Asia's Best
                </h2>
                <p className="text-sm text-dark-slate/70">In One Extraordinary Destination</p>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <header className="bg-white/90 backdrop-blur-2xl border-b border-white/20 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {renderContent()}
      </div>
    </header>
  );
};

export default Header;