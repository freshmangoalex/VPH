import { useState } from 'react';
import { Button } from '@/components/ui/button';
import useScrollAnimation from '@/hooks/useScrollAnimation';

type PreventionTabId = 'primary' | 'secondary' | 'tertiary';

const Prevention = () => {
  const [activeTab, setActiveTab] = useState<PreventionTabId>('primary');
  
  const titleRef = useScrollAnimation();
  const tabsRef = useScrollAnimation();
  const contentRef = useScrollAnimation();
  
  const handleTabClick = (tabId: PreventionTabId) => {
    setActiveTab(tabId);
  };
  
  return (
    <section id="prevention" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div ref={titleRef as React.RefObject<HTMLDivElement>} className="max-w-3xl mx-auto text-center mb-12 section-hidden">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-4">Prevención del VPH</h2>
          <p className="text-neutral-600">Existen tres niveles principales de prevención, cada uno con su importancia y aplicación</p>
        </div>

        {/* Prevention Tabs */}
        <div ref={tabsRef as React.RefObject<HTMLDivElement>} className="mb-8 section-hidden">
          <div className="flex flex-wrap justify-center border-b border-neutral-300">
            <button 
              onClick={() => handleTabClick('primary')} 
              className={`px-6 py-3 font-heading font-medium border-b-2 transition-colors ${activeTab === 'primary' ? 'text-primary border-primary' : 'text-neutral-500 border-transparent'}`}
            >
              Prevención Primaria
            </button>
            <button 
              onClick={() => handleTabClick('secondary')} 
              className={`px-6 py-3 font-heading font-medium border-b-2 transition-colors ${activeTab === 'secondary' ? 'text-primary border-primary' : 'text-neutral-500 border-transparent'}`}
            >
              Prevención Secundaria
            </button>
            <button 
              onClick={() => handleTabClick('tertiary')} 
              className={`px-6 py-3 font-heading font-medium border-b-2 transition-colors ${activeTab === 'tertiary' ? 'text-primary border-primary' : 'text-neutral-500 border-transparent'}`}
            >
              Prevención Terciaria
            </button>
          </div>
        </div>

        {/* Tab Content Panels */}
        <div ref={contentRef as React.RefObject<HTMLDivElement>} className="max-w-4xl mx-auto section-hidden">
          {/* Primary Prevention Panel */}
          <div className={`bg-neutral-50 rounded-xl p-6 md:p-8 ${activeTab === 'primary' ? '' : 'hidden'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-heading font-semibold text-xl text-primary mb-4">Vacunación</h3>
                <p className="text-neutral-700 mb-4">La vacuna contra el VPH es altamente efectiva para prevenir la infección por los tipos de VPH más comúnmente asociados con el cáncer.</p>
                
                <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
                  <h4 className="font-heading font-medium text-primary mb-2">Esquema de vacunación en México:</h4>
                  <ul className="space-y-2 text-neutral-700">
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-secondary mt-1 mr-2"></i>
                      <span>Niñas de 11 años: esquema de 2 dosis (0 y 6 meses)</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-secondary mt-1 mr-2"></i>
                      <span>Mujeres entre 11 y 16 años: esquema de 2 dosis</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-secondary mt-1 mr-2"></i>
                      <span>Personas mayores de 16 años: esquema de 3 dosis</span>
                    </li>
                  </ul>
                </div>
                
                <Button className="cta-button bg-accent text-white font-heading font-medium px-5 py-2 rounded-lg text-center hover:bg-accent-dark transition-all">
                  Consulta el esquema de vacunación completo
                </Button>
              </div>
              
              <div>
                <h3 className="font-heading font-semibold text-xl text-primary mb-4">Educación sexual integral</h3>
                <p className="text-neutral-700 mb-4">El conocimiento sobre el VPH y las prácticas sexuales más seguras es fundamental para la prevención.</p>
                
                <ul className="space-y-3 text-neutral-700 mb-6">
                  <li className="flex items-start">
                    <i className="fas fa-shield-virus text-secondary mt-1 mr-3"></i>
                    <span>Uso correcto y consistente del condón (reduce pero no elimina el riesgo)</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-shield-virus text-secondary mt-1 mr-3"></i>
                    <span>Comunicación abierta con parejas sexuales</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-shield-virus text-secondary mt-1 mr-3"></i>
                    <span>Retrasando el inicio de la actividad sexual</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-shield-virus text-secondary mt-1 mr-3"></i>
                    <span>Limitando el número de parejas sexuales</span>
                  </li>
                </ul>
                
                <div className="bg-neutral-200 w-full h-32 rounded-lg flex items-center justify-center">
                  <i className="fas fa-image text-3xl text-neutral-400"></i>
                  <span className="sr-only">Imagen sobre educación sexual</span>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Prevention Panel */}
          <div className={`bg-neutral-50 rounded-xl p-6 md:p-8 ${activeTab === 'secondary' ? '' : 'hidden'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-heading font-semibold text-xl text-primary mb-4">Prueba de Papanicolaou</h3>
                <p className="text-neutral-700 mb-4">El Papanicolaou es una prueba que detecta cambios precancerosos en las células del cuello uterino antes de que se conviertan en cáncer.</p>
                
                <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
                  <h4 className="font-heading font-medium text-primary mb-2">Recomendaciones:</h4>
                  <ul className="space-y-2 text-neutral-700">
                    <li className="flex items-start">
                      <i className="fas fa-calendar-check text-secondary mt-1 mr-2"></i>
                      <span>Mujeres entre 25 y 64 años: cada 3 años</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-calendar-check text-secondary mt-1 mr-2"></i>
                      <span>Si el resultado es anormal, seguir las recomendaciones médicas</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-calendar-check text-secondary mt-1 mr-2"></i>
                      <span>Grupos de alto riesgo: seguir esquema personalizado</span>
                    </li>
                  </ul>
                </div>
                
                <Button className="cta-button bg-accent text-white font-heading font-medium px-5 py-2 rounded-lg text-center hover:bg-accent-dark transition-all">
                  Encuentra dónde hacerte la prueba
                </Button>
              </div>
              
              <div>
                <h3 className="font-heading font-semibold text-xl text-primary mb-4">Prueba de VPH</h3>
                <p className="text-neutral-700 mb-4">La prueba de VPH detecta la presencia del virus directamente, identificando los tipos de alto riesgo antes de que causen cambios celulares.</p>
                
                <ul className="space-y-3 text-neutral-700 mb-6">
                  <li className="flex items-start">
                    <i className="fas fa-vial text-secondary mt-1 mr-3"></i>
                    <span>Mayor sensibilidad que el Papanicolaou solo</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-vial text-secondary mt-1 mr-3"></i>
                    <span>Recomendada para mujeres a partir de 30 años</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-vial text-secondary mt-1 mr-3"></i>
                    <span>Puede combinarse con el Papanicolaou (co-testing)</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-vial text-secondary mt-1 mr-3"></i>
                    <span>Intervalo de 5 años si ambas pruebas son negativas</span>
                  </li>
                </ul>
                
                <div className="bg-neutral-200 w-full h-32 rounded-lg flex items-center justify-center">
                  <i className="fas fa-image text-3xl text-neutral-400"></i>
                  <span className="sr-only">Imagen sobre pruebas de detección</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tertiary Prevention Panel */}
          <div className={`bg-neutral-50 rounded-xl p-6 md:p-8 ${activeTab === 'tertiary' ? '' : 'hidden'}`}>
            <h3 className="font-heading font-semibold text-xl text-primary mb-4">Tratamiento de lesiones precancerosas</h3>
            <p className="text-neutral-700 mb-6">Cuando se detectan lesiones precancerosas, existen varios tratamientos disponibles para prevenir su progresión a cáncer.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-heading font-medium text-primary mb-2">Tratamientos ablativos</h4>
                <ul className="space-y-2 text-neutral-700">
                  <li className="flex items-start">
                    <i className="fas fa-laser-pointer text-secondary mt-1 mr-2"></i>
                    <span>Crioterapia: destrucción por congelación</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-laser-pointer text-secondary mt-1 mr-2"></i>
                    <span>Terapia láser: destrucción por calor</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-laser-pointer text-secondary mt-1 mr-2"></i>
                    <span>Electrocirugía: eliminación con corriente eléctrica</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-heading font-medium text-primary mb-2">Tratamientos excisionales</h4>
                <ul className="space-y-2 text-neutral-700">
                  <li className="flex items-start">
                    <i className="fas fa-cut text-secondary mt-1 mr-2"></i>
                    <span>LEEP: escisión con asa electroquirúrgica</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-cut text-secondary mt-1 mr-2"></i>
                    <span>Conización: extirpación en forma de cono</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-cut text-secondary mt-1 mr-2"></i>
                    <span>Biopsia escisional: elimina toda el área afectada</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-primary-light/10 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <i className="fas fa-info-circle text-primary text-xl mt-1 mr-3"></i>
                <p className="text-neutral-700">El seguimiento después del tratamiento es fundamental. La mayoría de los tratamientos tienen una tasa de éxito superior al 90% y permiten conservar la fertilidad en mujeres que desean tener hijos en el futuro.</p>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button className="cta-button bg-accent text-white font-heading font-medium px-5 py-2 rounded-lg text-center hover:bg-accent-dark transition-all">
                Consulta opciones de tratamiento
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Prevention;
