import { useApp } from '@/contexts/AppContext';
import { ADHDDashboard } from '@/components/dashboard/ADHDDashboard';
import { AutismDashboard } from '@/components/dashboard/AutismDashboard';
import { DyslexiaDashboard } from '@/components/dashboard/DyslexiaDashboard';
import { Navigate } from 'react-router-dom';

export default function Dashboard() {
  const { isAuthenticated, onboardingComplete, supportMode } = useApp();

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to onboarding if not complete
  if (!onboardingComplete || !supportMode) {
    return <Navigate to="/onboarding" replace />;
  }

  // Render the appropriate dashboard based on support mode
  switch (supportMode) {
    case 'adhd':
      return <ADHDDashboard />;
    case 'autism':
      return <AutismDashboard />;
    case 'dyslexia':
      return <DyslexiaDashboard />;
    default:
      return <Navigate to="/onboarding" replace />;
  }
}
