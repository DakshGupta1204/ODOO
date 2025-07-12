'use client';

import { useState, useEffect } from 'react';

interface PasswordStrengthProps {
  password: string;
  className?: string;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password, className = '' }) => {
  const [strength, setStrength] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const calculateStrength = (pwd: string) => {
      let score = 0;
      let feedbackText = '';

      if (pwd.length === 0) {
        setStrength(0);
        setFeedback('');
        return;
      }

      // Length check
      if (pwd.length >= 8) score += 1;
      if (pwd.length >= 12) score += 1;

      // Character variety checks
      if (/[a-z]/.test(pwd)) score += 1; // lowercase
      if (/[A-Z]/.test(pwd)) score += 1; // uppercase
      if (/[0-9]/.test(pwd)) score += 1; // numbers
      if (/[^A-Za-z0-9]/.test(pwd)) score += 1; // special characters

      // Set feedback based on score
      if (score < 2) {
        feedbackText = 'Too weak';
      } else if (score < 4) {
        feedbackText = 'Fair';
      } else if (score < 5) {
        feedbackText = 'Good';
      } else {
        feedbackText = 'Strong';
      }

      setStrength(Math.min(score, 4)); // Max 4 for UI purposes
      setFeedback(feedbackText);
    };

    calculateStrength(password);
  }, [password]);

  if (!password) return null;

  const getStrengthColor = () => {
    switch (strength) {
      case 1:
        return 'bg-red-500';
      case 2:
        return 'bg-yellow-500';
      case 3:
        return 'bg-blue-500';
      case 4:
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getTextColor = () => {
    switch (strength) {
      case 1:
        return 'text-red-400';
      case 2:
        return 'text-yellow-400';
      case 3:
        return 'text-blue-400';
      case 4:
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className={`mt-2 ${className}`}>
      <div className="flex space-x-1 mb-1">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`h-1 w-full rounded-full transition-colors duration-200 ${
              level <= strength ? getStrengthColor() : 'bg-white/20'
            }`}
          />
        ))}
      </div>
      <p className={`text-xs ${getTextColor()} transition-colors duration-200`}>
        Password strength: {feedback}
      </p>
    </div>
  );
};
