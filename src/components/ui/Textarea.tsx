import React from 'react';
import { motion } from 'framer-motion';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export default function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      {label && (
        <label className="block text-sm font-bold text-gray-700 mb-3">
          {label}
        </label>
      )}
      <textarea
        className={`form-textarea-premium focus-ring-premium ${error ? 'border-red-300 focus:ring-red-500/20' : ''} ${className}`}
        {...props}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-600 font-medium"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}