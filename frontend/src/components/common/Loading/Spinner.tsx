import { JSX } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface SpinnerProps {
  text?: string | JSX.Element;
  percent?: number;
}
export default function Spinner({ text, percent }: SpinnerProps) {
  return (
    <div className="flex items-start gap-5">
      <div className="spinner-container">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="spinner-line" />
        ))}
      </div>
      {percent !== undefined && (
        <div className="text-md text-gray-400">{percent}%</div>
      )}
      {text && (
        <div className="overflow-hidden flex-1 h-8 flex items-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={text as string}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full text-gray-400 text-md"
            >
              {text}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
