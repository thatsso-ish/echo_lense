import { useState, useEffect } from 'react';
import { AuthProvider } from './features/auth/contexts/AuthContext';
import { Header } from './shared/components/Header';
import { Footer } from './shared/components/Footer';
import { HomePage } from './shared/pages/HomePage';
import { ProjectsPage } from './features/LandingPage/pages/ProjectsPage';
import { ProjectDetailPage } from './features/LandingPage/pages/ProjectDetailPage';
import CalculatorPage from './features/LandingPage/pages/CalculatorPage';
import { LoginPage } from './features/auth/pages/LoginPage';
import { DashboardPage } from './features/LandingPage/pages/DashboardPage';
import { DashboardSelectPage } from './features/LandingPage/pages/DashboardSelectPage';
import ProjectDetailViewPage from './features/LandingPage/pages/ProjectDetailViewPage';

type Page = 'home' | 'projects' | 'project-detail' | 'about' | 'calculator' | 'contact' | 'login' | 'dashboard' | 'dashboard-select' | 'project-detail-view';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash === 'admin') {
      setCurrentPage('dashboard');
      setPageData({ previewRole: 'admin' });
    } else if (hash === 'manager') {
      setCurrentPage('dashboard');
      setPageData({ previewRole: 'manager' });
    } else if (hash === 'developer') {
      setCurrentPage('dashboard');
      setPageData({ previewRole: 'developer' });
    } else if (hash === 'client') {
      setCurrentPage('dashboard');
      setPageData({ previewRole: 'client' });
    } else if (hash === 'dashboard-select') {
      setCurrentPage('dashboard-select');
    }
  }, []);

  const handleNavigate = (page: string, data?: any) => {
    setCurrentPage(page as Page);
    setPageData(data || null);

    if (page === 'dashboard' && data?.previewRole) {
      window.location.hash = data.previewRole;
    } else if (page === 'dashboard-select') {
      window.location.hash = 'dashboard-select';
    } else if (page === 'home') {
      window.location.hash = '';
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showHeaderFooter = currentPage !== 'dashboard' && currentPage !== 'dashboard-select' && currentPage !== 'project-detail-view';

  return (
    <AuthProvider>
      <div className="min-h-screen bg-zinc-950">
        {showHeaderFooter && <Header onNavigate={handleNavigate} currentPage={currentPage} />}

        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'projects' && <ProjectsPage onNavigate={handleNavigate} />}
        {currentPage === 'project-detail' && pageData && (
          <ProjectDetailPage slug={pageData.slug} onNavigate={handleNavigate} />
        )}
        {currentPage === 'calculator' && <CalculatorPage onNavigate={handleNavigate} />}
        {currentPage === 'login' && <LoginPage onNavigate={handleNavigate} />}
        {currentPage === 'dashboard-select' && <DashboardSelectPage onNavigate={handleNavigate} />}
        {currentPage === 'dashboard' && <DashboardPage onNavigate={handleNavigate} pageData={pageData} />}
        {currentPage === 'project-detail-view' && pageData?.projectId && (
          <ProjectDetailViewPage projectId={pageData.projectId} onNavigate={handleNavigate} />
        )}
        {currentPage === 'about' && (
          <div className="min-h-screen bg-zinc-950 pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h1 className="text-5xl font-light text-white mb-6">
                About <span className="font-semibold text-lime-400">Us</span>
              </h1>
              <p className="text-gray-400 text-lg">Coming soon...</p>
            </div>
          </div>
        )}
        {currentPage === 'contact' && (
          <div className="min-h-screen bg-zinc-950 pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h1 className="text-5xl font-light text-white mb-6">
                Contact <span className="font-semibold text-lime-400">Us</span>
              </h1>
              <p className="text-gray-400 text-lg">Coming soon...</p>
            </div>
          </div>
        )}

        {showHeaderFooter && <Footer />}
      </div>
    </AuthProvider>
  );
}

export default App;
