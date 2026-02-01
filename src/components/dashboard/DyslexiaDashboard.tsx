import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, BookOpen, Check, ArrowRight } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { AccessibilityPanel } from '@/components/dashboard/AccessibilityPanel';
import { useToast } from '@/hooks/use-toast';

export function DyslexiaDashboard() {
  const { tasks, setTasks, currentTaskIndex, setCurrentTaskIndex, user, accessibility } = useApp();
  const { toast } = useToast();
  const [showSettings, setShowSettings] = useState(false);

  const completedCount = tasks.filter((t) => t.completed).length;
  const currentTask = tasks[currentTaskIndex];

  const handleCompleteTask = () => {
    const newTasks = [...tasks];
    newTasks[currentTaskIndex].completed = true;
    setTasks(newTasks);

    toast({
      title: "Great job! ✓",
      description: "Task completed successfully",
    });

    if (currentTaskIndex < tasks.length - 1) {
      setTimeout(() => {
        setCurrentTaskIndex(currentTaskIndex + 1);
      }, 500);
    }
  };

  const fontSizeClass = `text-size-${accessibility.fontSize}`;

  return (
    <div className={`min-h-screen bg-dyslexia-secondary/30 mode-dyslexia spacing-relaxed ${accessibility.highContrast ? 'high-contrast' : ''}`}>
      {/* Header with high contrast */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 bg-dyslexia-secondary/80 backdrop-blur-sm border-b-2 border-dyslexia-primary/30 z-30"
      >
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-dyslexia-primary flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-dyslexia-text" />
            </div>
            <div>
              <h1 className={`font-bold text-foreground tracking-wide ${fontSizeClass}`}>
                Welcome, {user?.name}
              </h1>
              <p className="text-base text-muted-foreground tracking-wide">
                One step at a time
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setShowSettings(true)}
            className="p-4 rounded-xl bg-dyslexia-primary/20 hover:bg-dyslexia-primary/30 transition-colors border-2 border-dyslexia-primary/30"
          >
            <Settings className="w-6 h-6 text-dyslexia-primary" />
          </button>
        </div>
      </motion.header>

      {/* Progress bar - Large and clear */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-semibold text-foreground tracking-wide">
            Progress
          </span>
          <span className="text-lg font-bold text-dyslexia-primary tracking-wide">
            {completedCount} of {tasks.length} done
          </span>
        </div>
        <div className="h-4 bg-dyslexia-secondary rounded-full overflow-hidden border-2 border-dyslexia-primary/20">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / tasks.length) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-dyslexia-primary rounded-full"
          />
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-3xl mx-auto px-6 py-6">
        <AnimatePresence mode="wait">
          {currentTask && !currentTask.completed ? (
            <motion.div
              key={currentTask.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-card rounded-3xl p-8 md:p-12 border-3 border-dyslexia-primary/30 shadow-lg"
            >
              {/* Step indicator */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-dyslexia-primary/20 rounded-full mb-6 border-2 border-dyslexia-primary/30">
                <span className="text-base font-bold text-dyslexia-primary tracking-wide">
                  Step {currentTask.order}
                </span>
              </div>

              {/* Task content with extra spacing */}
              <h2 className={`text-3xl md:text-4xl font-bold text-foreground mb-6 leading-relaxed tracking-wide ${fontSizeClass}`}>
                {currentTask.title}
              </h2>
              <p className={`text-xl text-muted-foreground mb-10 leading-loose tracking-wide ${fontSizeClass}`}>
                {currentTask.description}
              </p>

              {/* Large, high-contrast button */}
              <motion.button
                onClick={handleCompleteTask}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-6 px-8 bg-dyslexia-primary text-dyslexia-text rounded-2xl font-bold text-2xl flex items-center justify-center gap-4 shadow-lg border-3 border-dyslexia-primary hover:bg-dyslexia-primary/90 transition-colors tracking-wide"
              >
                <Check className="w-8 h-8" />
                <span>Done! Next step</span>
                <ArrowRight className="w-8 h-8" />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-dyslexia-primary rounded-3xl p-12 text-center shadow-lg"
            >
              <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-dyslexia-text/10 flex items-center justify-center">
                <Check className="w-12 h-12 text-dyslexia-text" />
              </div>
              <h2 className="text-3xl font-bold text-dyslexia-text mb-4 tracking-wide">
                All Done!
              </h2>
              <p className="text-xl text-dyslexia-text/80 tracking-wide leading-relaxed">
                You finished all {tasks.length} tasks today.
                <br />
                Great work!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Visual step indicators */}
        <div className="flex justify-center gap-4 mt-8">
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                task.completed
                  ? 'bg-dyslexia-primary border-dyslexia-primary'
                  : index === currentTaskIndex
                  ? 'border-dyslexia-primary bg-dyslexia-primary/20'
                  : 'border-dyslexia-primary/30 bg-dyslexia-secondary'
              }`}
            >
              {task.completed && <Check className="w-4 h-4 text-dyslexia-text" />}
            </motion.div>
          ))}
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
