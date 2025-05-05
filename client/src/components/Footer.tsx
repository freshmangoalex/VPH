import { smoothScrollTo } from '@/lib/utils';

const Footer = () => {
  const handleNavClick = (id: string) => {
    smoothScrollTo(id);
  };
  
  return (
    <footer className="bg-neutral-800 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <i className="fas fa-shield-virus text-sm"></i>
              </div>
              <h3 className="font-heading font-bold text-lg">VPH<span className="text-secondary">México</span></h3>
            </div>
            <p className="text-neutral-400 text-sm">Iniciativa dedicada a la prevención del Virus del Papiloma Humano en México, a través de la educación, concientización y acceso a recursos de salud.</p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2 text-neutral-400">
              <li><a onClick={() => handleNavClick('intro')} className="hover:text-white transition-colors cursor-pointer">Inicio</a></li>
              <li><a onClick={() => handleNavClick('about-vph')} className="hover:text-white transition-colors cursor-pointer">Sobre el VPH</a></li>
              <li><a onClick={() => handleNavClick('risk-factors')} className="hover:text-white transition-colors cursor-pointer">Factores de riesgo</a></li>
              <li><a onClick={() => handleNavClick('prevention')} className="hover:text-white transition-colors cursor-pointer">Prevención</a></li>
              <li><a onClick={() => handleNavClick('resources')} className="hover:text-white transition-colors cursor-pointer">Recursos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Fuentes oficiales</h4>
            <ul className="space-y-2 text-neutral-400">
              <li><a href="https://www.gob.mx/salud" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Secretaría de Salud</a></li>
              <li><a href="https://www.imss.gob.mx/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">IMSS</a></li>
              <li><a href="https://www.who.int/es" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Organización Mundial de la Salud</a></li>
              <li><a href="https://www.paho.org/es" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Organización Panamericana de la Salud</a></li>
              <li><a href="https://www.incan.salud.gob.mx/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instituto Nacional de Cancerología</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-700 pt-6 text-center text-neutral-500 text-sm">
          <p>© {new Date().getFullYear()} Campaña VPH México. Todos los derechos reservados.</p>
          <p className="mt-2">Este sitio ofrece información educativa y no reemplaza la consulta médica profesional.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
