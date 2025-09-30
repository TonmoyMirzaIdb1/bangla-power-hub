import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, User, Sun, Moon, Globe } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { signOut, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: t('nav.about'), href: "#about" },
    { name: t('nav.generation'), href: "#generation" },
    { name: t('nav.distribution'), href: "#distribution" },
    { name: t('nav.renewable'), href: "#renewable" },
    { name: t('nav.contact'), href: "#contact" },
  ];

  const isAuthPage = location.pathname === '/auth';

  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">BPDB</h1>
              <p className="text-xs text-muted-foreground">Power for Bangladesh</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Theme Toggle, Language Switcher, User Info */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>

            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover">
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  English {language === 'en' && '✓'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('bn')}>
                  বাংলা {language === 'bn' && '✓'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {user ? (
              <>
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-primary" />
                  <span className="text-foreground">{user.email}</span>
                </div>
                <Button variant="hero" size="sm" onClick={signOut} className="flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  {t('nav.signOut')}
                </Button>
              </>
            ) : !isAuthPage && (
              <Button variant="hero" size="sm" onClick={() => navigate('/auth')}>
                {t('nav.login')}
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            {/* Mobile Theme and Language */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <span className="text-sm font-medium">Settings</span>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                  {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Globe className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-popover">
                    <DropdownMenuItem onClick={() => setLanguage('en')}>
                      English {language === 'en' && '✓'}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLanguage('bn')}>
                      বাংলা {language === 'bn' && '✓'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {user && (
              <div className="flex items-center gap-2 px-4 py-3 text-sm border-b border-border">
                <User className="w-4 h-4 text-primary" />
                <span className="text-foreground">{user.email}</span>
              </div>
            )}
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-4 py-3 text-foreground hover:text-primary hover:bg-accent transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            {user ? (
              <div className="px-4 py-3 border-t border-border">
                <Button variant="hero" size="sm" onClick={signOut} className="w-full flex items-center justify-center gap-2">
                  <LogOut className="w-4 h-4" />
                  {t('nav.signOut')}
                </Button>
              </div>
            ) : !isAuthPage && (
              <div className="px-4 py-3 border-t border-border">
                <Button variant="hero" size="sm" onClick={() => navigate('/auth')} className="w-full">
                  {t('nav.login')}
                </Button>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;