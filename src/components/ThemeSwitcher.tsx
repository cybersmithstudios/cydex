
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Monitor } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ThemeSwitcherProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asDropdown?: boolean;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ 
  variant = 'ghost', 
  size = 'icon',
  asDropdown = false 
}) => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: 'light' as const, label: 'Light', icon: Sun },
    { value: 'dark' as const, label: 'Dark', icon: Moon },
    { value: 'system' as const, label: 'System', icon: Monitor },
  ];

  const currentTheme = themes.find(t => t.value === theme) || themes[2];
  const CurrentIcon = currentTheme.icon;

  if (asDropdown) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={variant} size={size} className="h-9 w-9">
            <CurrentIcon className="h-4 w-4" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {themes.map((themeOption) => {
            const Icon = themeOption.icon;
            return (
              <DropdownMenuItem
                key={themeOption.value}
                onClick={() => setTheme(themeOption.value)}
                className="cursor-pointer"
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{themeOption.label}</span>
                {theme === themeOption.value && (
                  <span className="ml-auto text-primary">✓</span>
                )}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Simple toggle between light and dark
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className="h-9 w-9"
      aria-label="Toggle theme"
    >
      <CurrentIcon className="h-4 w-4" />
    </Button>
  );
};

export default ThemeSwitcher;
