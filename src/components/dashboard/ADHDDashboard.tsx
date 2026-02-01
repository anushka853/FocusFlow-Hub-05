import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Zap, Trophy } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { TaskCard } from '@/components/dashboard/TaskCard';
import { CountdownTimer } from '@/components/dashboard/CountdownTimer';
import { ProgressStats } from '@/components/dashboard/ProgressStats';
import { AccessibilityPanel } from '@/components/dashboard/AccessibilityPanel';
import { useToast } from '@/hooks/use-toast';

export function ADHDDashboard() {
  const { tasks, setTasks, currentTaskIndex, setCurrentTaskIndex, user, accessibility } = useApp();
  const { toast } = useToast();
  const [showSettings, setShowSettings] = useState(false);

  const completedCount = tasks.filter((t) => t.completed).length;
  const currentTask = tasks[currentTaskIndex];

  const handleCompleteTask = () => {
    const newTasks = [...tasks];
    newTasks[currentTaskIndex].completed = true;
    setTasks(newTasks);

    // Show celebration toast
    toast({
      title: "🎉 Task complete!",
      description: "Amazing work! Keep the momentum going!",
    });

    // Move to next task
    if (currentTaskIndex < tasks.length - 1) {
      setTimeout(() => {
        setCurrentTaskIndex(currentTaskIndex + 1);
      }, 500);
    }
  };

  const fontSizeClass = `text-size-${accessibility.fontSize}`;

  return (
    <div className={`min-h-screen bg-gradient-hero mode-adhd ${accessibility.highContrast ? 'high-contrast' : ''}`}>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 bg-background/80 backdrop-blur-lg border-b border-border/50 z-30"
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-adhd flex items-center justify-center shadow-glow-adhd">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className={`font-bold text-foreground ${fontSizeClass}`}>
                Hey {user?.name}! 
              </h1>
              <p className="text-sm text-muted-foreground">Let's crush it today! 🚀</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowSettings(true)}
            className="p-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
          >
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </motion.header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column - Timer and Stats */}
          <div className="space-y-6">
            <CountdownTimer />
            <ProgressStats completed={completedCount} total={tasks.length} />
          </div>

          {/* Right column - Task Card */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {currentTask && !currentTask.completed ? (
                <TaskCard
                  key={currentTask.id}
                  task={currentTask}
                  onComplete={handleCompleteTask}
                  variant="adhd"
                />
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-adhd rounded-3xl p-10 text-center text-white"
                >
                  <Trophy className="w-20 h-20 mx-auto mb-6" />
                  <h2 className="text-3xl font-bold mb-4">All done for today! 🎉</h2>
                  <p className="text-xl opacity-90">
                    You completed all {tasks.length} tasks. Take a well-deserved break!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Task progress dots */}
            <div className="flex justify-center gap-2 mt-6">
              {tasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    task.completed
                      ? 'bg-adhd-primary'
                      : index === currentTaskIndex
                      ? 'bg-adhd-secondary animate-pulse'
                      : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <AccessibilityPanel isOpen={showSettings} onClose={() => setShowSettings(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
