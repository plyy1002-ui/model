
import React, { useState, useEffect } from 'react';
import { TabType } from './types';
import HomeView from './components/HomeView';
import ServicesView from './components/ServicesView';
import MeView from './components/MeView';
import TabBar from './components/TabBar';
import ToolDetailView from './components/ToolDetailView';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);

  const renderContent = () => {
    if (selectedToolId) {
      return (
        <ToolDetailView 
          toolId={selectedToolId} 
          onBack={() => setSelectedToolId(null)} 
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return <HomeView onSelectService={() => setActiveTab('services')} />;
      case 'services':
        return <ServicesView onSelectTool={setSelectedToolId} />;
      case 'me':
        return <MeView />;
      default:
        return <HomeView onSelectService={() => setActiveTab('services')} />;
    }
  };

  return (
    <div className="relative h-screen w-full max-w-md mx-auto bg-white shadow-2xl overflow-hidden">
      {/* Content Area - Full screen, TabBar floats on top */}
      <main className="absolute inset-0 w-full h-full overflow-y-auto no-scrollbar">
        {renderContent()}
      </main>

      {/* Floating Tab Bar - Only show if no tool is selected */}
      {!selectedToolId && (
        <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
    </div>
  );
};

export default App;
