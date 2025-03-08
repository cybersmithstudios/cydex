
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

// This component is not needed anymore since we're removing dark mode functionality
// It's kept as an empty component to prevent import errors elsewhere in the codebase
interface ThemeSwitcherProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = () => {
  // Return null to render nothing
  return null;
};

export default ThemeSwitcher;
