import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Type, Sun, Moon, Palette, LogOut, X } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface AccessibilityPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccessibilityPanel({ isOpen, onClose }: AccessibilityPanelProps) {
  const navigate = useNavigate();
  const { accessibility, setAccessibility, setSupportMode, supportMode, logout } = useApp();

  const fontSizes = [
    { id: 'sm' as const, label: 'Small' },
    { id: 'base' as const, label: 'Medium' },
    { id: 'lg' as const, label: 'Large' },
    { id: 'xl' as const, label: 'XL' },
    { id: '2xl' as const, label: '2XL' },
  ];

  const modes = [
    { id: 'adhd' as const, label: 'ADHD', color: 'bg-adhd-primary' },
    { id: 'autism' as const, label: 'Autism', color: 'bg-autism-primary' },
    { id: 'dyslexia' as const, label: 'Dyslexia', color: 'bg-dyslexia-primary' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
      />

      {/* Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border shadow-2xl z-50 overflow-y-auto"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Settings className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Settings</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Font Size */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Type className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Font Size</h3>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {fontSizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() =>
                    setAccessibility({ ...accessibility, fontSize: size.id })
                  }
                  className={`py-3 px-2 rounded-xl text-sm font-medium transition-all ${
                    accessibility.fontSize === size.id
                      ? 'bg-primary text-primary-foreground shadow-glow'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contrast */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Sun className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">High Contrast</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() =>
                  setAccessibility({ ...accessibility, highContrast: false })
                }
                className={`py-4 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                  !accessibility.highContrast
                    ? 'bg-primary text-primary-foreground shadow-glow'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <Sun className="w-5 h-5" />
                Normal
              </button>
              <button
                onClick={() =>
                  setAccessibility({ ...accessibility, highContrast: true })
                }
                className={`py-4 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                  accessibility.highContrast
                    ? 'bg-foreground text-background'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <Moon className="w-5 h-5" />
                High Contrast
              </button>
            </div>
          </div>

          {/* Support Mode */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Palette className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Support Mode</h3>
            </div>
            <div className="space-y-2">
              {modes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setSupportMode(mode.id)}
                  className={`w-full py-4 px-4 rounded-xl font-medium transition-all flex items-center gap-3 ${
                    supportMode === mode.id
                      ? 'bg-primary/10 border-2 border-primary'
                      : 'bg-muted hover:bg-muted/80 border-2 border-transparent'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full ${mode.color}`} />
                  <span className="text-foreground">{mode.label} Mode</span>
                </button>
              ))}
            </div>
          </div>

          {/* Logout */}
          <div className="pt-4 border-t border-border">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full py-6 rounded-xl text-destructive border-destructive/30 hover:bg-destructive/10"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
