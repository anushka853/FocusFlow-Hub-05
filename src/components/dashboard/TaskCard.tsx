import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { useApp, Task } from '@/contexts/AppContext';

interface TaskCardProps {
  task: Task;
  onComplete: () => void;
  variant: 'adhd' | 'autism' | 'dyslexia';
}

export function TaskCard({ task, onComplete, variant }: TaskCardProps) {
  const { accessibility } = useApp();

  const getVariantStyles = () => {
    switch (variant) {
      case 'adhd':
        return {
          card: 'bg-gradient-to-br from-adhd-primary/5 to-adhd-secondary/10 border-adhd-primary/20',
          button: 'bg-gradient-adhd text-white shadow-glow-adhd',
          icon: 'text-adhd-primary',
        };
      case 'autism':
        return {
          card: 'bg-autism-muted border-autism-primary/10',
          button: 'bg-autism-primary text-white',
          icon: 'text-autism-primary',
        };
      case 'dyslexia':
        return {
          card: 'bg-dyslexia-secondary/30 border-dyslexia-primary/20',
          button: 'bg-dyslexia-primary text-dyslexia-text font-bold',
          icon: 'text-dyslexia-primary',
        };
    }
  };

  const styles = getVariantStyles();
  const fontSizeClass = `text-size-${accessibility.fontSize}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`relative p-8 md:p-10 rounded-3xl border-2 ${styles.card} ${
        variant === 'dyslexia' ? 'spacing-relaxed' : ''
      }`}
    >
      {/* Decorative element */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className={`absolute -top-3 -right-3 w-12 h-12 rounded-full flex items-center justify-center ${
          variant === 'adhd' ? 'bg-gradient-adhd' : 
          variant === 'autism' ? 'bg-autism-primary' : 'bg-dyslexia-primary'
        }`}
      >
        <Sparkles className="w-6 h-6 text-white" />
      </motion.div>

      {/* Task number */}
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${styles.card} mb-4`}>
        <span className={`text-sm font-medium ${styles.icon}`}>
          Step {task.order} of 5
        </span>
      </div>

      {/* Task content */}
      <h2 className={`text-2xl md:text-3xl font-bold text-foreground mb-4 ${fontSizeClass}`}>
        {task.title}
      </h2>
      <p className={`text-lg text-muted-foreground mb-8 leading-relaxed ${fontSizeClass}`}>
        {task.description}
      </p>

      {/* Complete button */}
      <motion.button
        onClick={onComplete}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`w-full py-5 px-8 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all duration-300 ${styles.button}`}
      >
        <Check className="w-6 h-6" />
        <span>Done! Next step</span>
      </motion.button>
    </motion.div>
  );
}
