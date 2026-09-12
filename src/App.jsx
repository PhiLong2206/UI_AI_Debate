import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppLayout } from './components/layout/AppLayout';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { TopicListPage } from './pages/TopicListPage';
import { TopicDetailPage } from './pages/TopicDetailPage';
import { AIDebatePage } from './pages/AIDebatePage';
import { AIDebateSetupPage } from './pages/AIDebateSetupPage';
import { DebateResultPage } from './pages/DebateResultPage';
import { PvpLobbyPage } from './pages/PvpLobbyPage';
import { PvpDebatePage } from './pages/PvpDebatePage';
import { PvpResultPage } from './pages/PvpResultPage';
import { MyDebatesPage } from './pages/MyDebatesPage';
import { ProgressPage } from './pages/ProgressPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';

// Educator Pages
import { EducatorTopicsPage } from './pages/educator/EducatorTopicsPage';
import { TopicEditorPage } from './pages/educator/TopicEditorPage';
import { EducatorReportsPage } from './pages/educator/EducatorReportsPage';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing & Auth */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/dang-nhap" element={<LoginPage />} />
          <Route path="/dang-ky" element={<RegisterPage />} />

          {/* Focused Standalone Debate Rooms */}
          <Route path="/tranh-bien/ai/:id" element={<AIDebatePage />} />
          <Route path="/tranh-bien/1v1/phong/:id" element={<PvpDebatePage />} />

          {/* Main App Layout */}
          <Route element={<AppLayout />}>
            <Route path="/tong-quan" element={<DashboardPage />} />
            <Route path="/chu-de" element={<TopicListPage />} />
            <Route path="/chu-de/:id" element={<TopicDetailPage />} />
            <Route path="/tranh-bien-ai" element={<AIDebateSetupPage />} />
            <Route path="/ket-qua/:id" element={<DebateResultPage />} />
            
            <Route path="/tranh-bien/1v1" element={<PvpLobbyPage />} />
            <Route path="/ket-qua-1v1/:id" element={<PvpResultPage />} />

            <Route path="/tran-cua-toi" element={<MyDebatesPage />} />
            <Route path="/tien-do" element={<ProgressPage />} />
            <Route path="/ho-so" element={<ProfilePage />} />
            <Route path="/cai-dat" element={<SettingsPage />} />

            {/* Educator Specific Routes */}
            <Route path="/giang-vien/chu-de" element={<EducatorTopicsPage />} />
            <Route path="/giang-vien/chu-de/tao-moi" element={<TopicEditorPage />} />
            <Route path="/giang-vien/bao-cao" element={<EducatorReportsPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
