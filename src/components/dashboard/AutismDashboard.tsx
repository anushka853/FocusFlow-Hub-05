import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Heart, Check } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { TaskCard } from '@/components/dashboard/TaskCard';
import { ZenButton } from '@/components/dashboard/ZenButton';
import { AccessibilityPanel } from '@/components/dashboard/AccessibilityPanel';
import { useToast } from '@/hooks/use-toast';

export function AutismDashboard() {
  const { tasks, setTasks, currentTaskIndex, setCurrentTaskIndex, user, accessibility, setAccessibility } = useApp();
  const { toast } = useToast();
  const [showSettings, setShowSettings] = useState(false);

  const completedCount = tasks.filter((t) => t.completed).length;
  const currentTask = tasks[currentTaskIndex];

  const handleCompleteTask = () => {
    const newTasks = [...tasks];
    newTasks[currentTaskIndex].completed = true;
    setTasks(newTasks);

    toast({
      title: "Task complete",
      description: "Moving to the next step",
    });

    if (currentTaskIndex < tasks.length - 1) {
      setTimeout(() => {
        setCurrentTaskIndex(currentTaskIndex + 1);
      }, 500);
    }
  };

  const toggleZenMode = () => {
    setAccessibility({ ...accessibility, zenMode: !accessibility.zenMode });
  };

  const fontSizeClass = `text-size-${accessibility.fontSize}`;

  return (
    <div className={`min-h-screen bg-autism-muted mode-autism ${accessibility.highContrast ? 'high-contrast' : ''}`}>
      {/* Header - Hidden in Zen mode */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`sticky top-0 bg-autism-muted/90 backdrop-blur-sm border-b border-autism-primary/10 z-30 transition-opacity duration-500 ${
          accessibility.zenMode ? 'opacity-0 pointer-events-none' : ''
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-autism-primary/20 flex items-center justify-center">
              <Heart className="w-5 h-5 text-autism-primary" />
            </div>
            <div>
              <h1 className={`font-semibold text-foreground ${fontSizeClass}`}>
                Hello, {user?.name}
              </h1>
              <p className="text-sm text-muted-foreground">Focus on one thing at a time</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowSettings(true)}
            className="p-3 rounded-xl bg-autism-secondary hover:bg-autism-primary/20 transition-colors"
          >
            <Settings className="w-5 h-5 text-autism-primary" />
          </button>
        </div>
      </motion.header>

      {/* Main content - Centered, minimal */}
      <main className="max-w-2xl mx-auto px-4 py-12">
        {/* Simple progress indicator - Hidden in Zen mode */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`flex justify-center gap-3 mb-8 transition-opacity duration-500 ${
            accessibility.zenMode ? 'opacity-0' : ''
          }`}
        >
          {tasks.map((task, index) => (
            <div
              key={task.id}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                task.completed
                  ? 'bg-autism-primary text-white'
                  : index === currentTaskIndex
                  ? 'bg-autism-primary/20 border-2 border-autism-primary'
                  : 'bg-autism-secondary'
              }`}
            >
              {task.completed ? (
                <Check className="w-4 h-4" />
              ) : (
                <span className="text-sm font-medium text-autism-primary">{index + 1}</span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Task Card */}
        <AnimatePresence mode="wait">
          {currentTask && !currentTask.completed ? (
            <TaskCard
              key={currentTask.id}
              task={currentTask}
              onComplete={handleCompleteTask}
              variant="autism"
            />
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-autism-secondary rounded-3xl p-10 text-center border border-autism-primary/20"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-autism-primary/20 flex items-center justify-center">
                <Check className="w-8 h-8 text-autism-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-3">All tasks complete</h2>
              <p className="text-muted-foreground">
                You've finished everything for today. Well done.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Breathing reminder - Hidden in Zen mode */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`mt-8 text-center text-muted-foreground transition-opacity duration-500 ${
            accessibility.zenMode ? 'opacity-0' : ''
          }`}
        >
          <p className="text-sm">Take your time. There's no rush.</p>
        </motion.div>
      </main>

      {/* Zen Button */}
      <ZenButton isZenMode={accessibility.zenMode} onToggle={toggleZenMode} />

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <AccessibilityPanel isOpen={showSettings} onClose={() => setShowSettings(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
