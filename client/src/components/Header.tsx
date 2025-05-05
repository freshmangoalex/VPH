import { useState, useEffect } from 'react';
import { smoothScrollTo } from '@/lib/utils';

type HeaderProps = {
  scrollProgress: number;
};

const Header = ({ scrollProgress }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWindowSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    checkWindowSize();
    window.addEventListener('resize', checkWindowSize);
    
    return () => window.removeEventListener('resize', checkWindowSize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (id: string) => {
    smoothScrollTo(id);
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div 
        className="progress-bar" 
        style={{ width: `${scrollProgress}%` }}
      />
      <div className="container mx-auto px-4 py-2 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 py-2">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
            <i className="fas fa-shield-virus"></i>
          </div>
          <h1 className="font-heading font-bold text-xl md:text-2xl text-primary">VPH<span className="text-secondary">México</span></h1>
        </div>
        
        <nav className="w-full md:w-auto">
          <button 
            className="md:hidden w-full flex justify-end items-center py-2" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <i className="fas fa-bars text-neutral-700"></i>
          </button>
          <ul className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0 w-full text-center pb-3 md:pb-0`}>
            <li><a onClick={() => handleNavClick('intro')} className="block py-1 hover:text-primary transition-colors cursor-pointer">Inicio</a></li>
            <li><a onClick={() => handleNavClick('about-vph')} className="block py-1 hover:text-primary transition-colors cursor-pointer">Sobre VPH</a></li>
            <li><a onClick={() => handleNavClick('risk-factors')} className="block py-1 hover:text-primary transition-colors cursor-pointer">Factores de Riesgo</a></li>
            <li><a onClick={() => handleNavClick('prevention')} className="block py-1 hover:text-primary transition-colors cursor-pointer">Prevención</a></li>
            <li><a onClick={() => handleNavClick('resources')} className="block py-1 hover:text-primary transition-colors cursor-pointer">Recursos</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
