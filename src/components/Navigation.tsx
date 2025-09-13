import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Calendar, Info, Home, Building2, Navigation as NavigationIcon } from 'lucide-react';
import { LanguageSelector } from '@/components/LanguageSelector';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Map', href: '/map', icon: MapPin },
  { name: 'Monasteries', href: '/monasteries', icon: Building2 },
  { name: 'Nearby', href: '/nearby', icon: NavigationIcon },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'About', href: '/about', icon: Info },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border w-full" style={{ margin: 0, padding: 0 }}>
      {/* Prayer flag strip */}
      <div className="prayer-flag-strip h-1 w-full" />
      
      <div className="w-full px-4" style={{ margin: 0 }}>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex flex-col">
            <h1 className="text-xl font-bold text-primary font-serif">Monastery360</h1>
            <p className="text-xs text-muted-foreground">Crafted by Team Horizon</p>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Language Switcher */}
          <div className="hidden md:flex items-center space-x-2">
            <LanguageSelector />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-2 py-1 text-sm font-medium transition-colors hover:text-primary",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <div className="pt-2 border-t border-border">
                <LanguageSelector />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}