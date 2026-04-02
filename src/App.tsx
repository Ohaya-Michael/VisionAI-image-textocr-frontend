import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import OCRExtraction from './components/OCRExtraction';
import BatchProcessing from './components/BatchProcessing';
import ImageClassification from './components/ImageClassification';
import APIManagement from './components/APIManagement';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import About from './components/About';
import { View } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'about': return <About />;
      case 'ocr': return <OCRExtraction />;
      case 'batch': return <BatchProcessing />;
      case 'classification': return <ImageClassification />;
      case 'api': return <APIManagement />;
      case 'analytics': return <Analytics />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView}>
      {renderView()}
    </Layout>
  );
}
