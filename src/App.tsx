import React, { useState } from 'react';
import Header from './components/Header';
import Homepage from './components/Homepage';
import SearchResults from './components/SearchResults';
import BeachProfile from './components/BeachProfile';
import ReviewModal from './components/ReviewModal';
import VisitMalaysia2026 from './components/VisitMalaysia2026';
import { Beach } from './types/Content';
import { searchBeaches } from './utils/contentLoader';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'search' | 'beach' | 'vm2026'>('home');
  const [selectedBeach, setSelectedBeach] = useState<Beach | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentView('search');
  };

  const handleBeachSelect = (beach: Beach) => {
    setSelectedBeach(beach);
    setCurrentView('beach');
  };

  const handleVM2026BeachSelect = (beachName: string) => {
    // Search for the beach and navigate to it
    const beaches = searchBeaches(beachName);
    if (beaches.length > 0) {
      setSelectedBeach(beaches[0]);
      setCurrentView('beach');
    } else {
      // If no specific beach found, search for the general area
      setSearchQuery(beachName);
      setCurrentView('search');
    }
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedBeach(null);
  };

  const handleBackToSearch = () => {
    setCurrentView('search');
    setSelectedBeach(null);
  };

  const handleNavigateToVM2026 = () => {
    setCurrentView('vm2026');
    setSelectedBeach(null);
  };

  return (
    <div className="min-h-screen bg-sandy-beige font-inter">
      <Header 
        onBackToHome={handleBackToHome}
        onBackToSearch={handleBackToSearch}
        currentView={currentView}
        selectedBeach={selectedBeach}
        onNavigateToVM2026={handleNavigateToVM2026}
      />
      
      <main>
        {currentView === 'home' && (
          <Homepage 
            onSearch={handleSearch}
            onBeachSelect={handleBeachSelect}
          />
        )}
        
        {currentView === 'search' && (
          <SearchResults 
            searchQuery={searchQuery}
            onBeachSelect={handleBeachSelect}
          />
        )}
        
        {currentView === 'beach' && selectedBeach && (
          <BeachProfile 
            beach={selectedBeach}
            onWriteReview={() => setShowReviewModal(true)}
          />
        )}

        {currentView === 'vm2026' && (
          <VisitMalaysia2026 
            onBeachSelect={handleVM2026BeachSelect}
          />
        )}
      </main>

      {showReviewModal && selectedBeach && (
        <ReviewModal
          beach={selectedBeach}
          onClose={() => setShowReviewModal(false)}
        />
      )}
    </div>
  );
}

export default App;