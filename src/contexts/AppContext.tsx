import React, { createContext, useContext, useState, ReactNode } from 'react';

export type SupportMode = 'adhd' | 'autism' | 'dyslexia' | null;

export interface User {
  email: string;
  name: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  order: number;
}

export interface AccessibilitySettings {
  fontSize: 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  highContrast: boolean;
  zenMode: boolean;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  supportMode: SupportMode;
  setSupportMode: (mode: SupportMode) => void;
  isAuthenticated: boolean;
  onboardingComplete: boolean;
  setOnboardingComplete: (complete: boolean) => void;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  currentTaskIndex: number;
  setCurrentTaskIndex: (index: number) => void;
  accessibility: AccessibilitySettings;
  setAccessibility: (settings: AccessibilitySettings) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultTasks: Task[] = [
  { id: '1', title: 'Take a deep breath', description: 'Start your session with 3 deep breaths to center yourself', completed: false, order: 1 },
  { id: '2', title: 'Check your priorities', description: 'Review what matters most today - pick just one thing', completed: false, order: 2 },
  { id: '3', title: 'Break it down', description: 'Split your main task into 3 smaller steps', completed: false, order: 3 },
  { id: '4', title: 'Set a timer', description: 'Work for 25 minutes, then take a 5-minute break', completed: false, order: 4 },
  { id: '5', title: 'Celebrate progress', description: 'Acknowledge what you accomplished today', completed: false, order: 5 },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [supportMode, setSupportMode] = useState<SupportMode>(null);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>({
    fontSize: 'base',
    highContrast: false,
    zenMode: false,
  });

  const logout = () => {
    setUser(null);
    setSupportMode(null);
    setOnboardingComplete(false);
    setTasks(defaultTasks);
    setCurrentTaskIndex(0);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        supportMode,
        setSupportMode,
        isAuthenticated: user !== null,
        onboardingComplete,
        setOnboardingComplete,
        tasks,
        setTasks,
        currentTaskIndex,
        setCurrentTaskIndex,
        accessibility,
        setAccessibility,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
