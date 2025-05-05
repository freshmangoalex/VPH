import useScrollAnimation from '@/hooks/useScrollAnimation';

const RiskFactors = () => {
  const titleRef = useScrollAnimation();
  const cardRef1 = useScrollAnimation();
  const cardRef2 = useScrollAnimation();
  const infoRef = useScrollAnimation();
  
  return (
    <section id="risk-factors" className="py-16 bg-transparent">
      <div className="container mx-auto px-4">
        <div ref={titleRef as React.RefObject<HTMLDivElement>} className="max-w-3xl mx-auto text-center mb-12 section-hidden">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-4">Factores de Riesgo</h2>
          <p className="text-white">Conoce los factores que pueden aumentar el riesgo de infección persistente por VPH</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div ref={cardRef1 as React.RefObject<HTMLDivElement>} className="section-hidden">
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover-grow h-full">
              <div className="bg-neutral-200 w-full h-48 flex items-center justify-center">
                <i className="fas fa-image text-5xl text-neutral-400"></i>
                <span className="sr-only">Imagen sobre factores de riesgo</span>
              </div>
              <div className="p-6">
                <h3 className="font-heading font-semibold text-xl text-primary mb-4">Comportamientos</h3>
                <ul className="space-y-3 text-neutral-700">
                  <li className="flex items-start">
                    <i className="fas fa-circle text-xs text-primary mt-1.5 mr-3"></i>
                    <span>Inicio temprano de la actividad sexual</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-circle text-xs text-primary mt-1.5 mr-3"></i>
                    <span>Múltiples parejas sexuales (o pareja con múltiples contactos)</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-circle text-xs text-primary mt-1.5 mr-3"></i>
                    <span>No utilizar métodos de barrera como el condón</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-circle text-xs text-primary mt-1.5 mr-3"></i>
                    <span>No participar en programas de vacunación</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-circle text-xs text-primary mt-1.5 mr-3"></i>
                    <span>No realizar pruebas de detección periódicas</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div ref={cardRef2 as React.RefObject<HTMLDivElement>} className="section-hidden">
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover-grow h-full">
              <div className="bg-neutral-200 w-full h-48 flex items-center justify-center">
                <i className="fas fa-image text-5xl text-neutral-400"></i>
                <span className="sr-only">Imagen sobre factores de salud</span>
              </div>
              <div className="p-6">
                <h3 className="font-heading font-semibold text-xl text-primary mb-4">Factores biológicos y de salud</h3>
                <ul className="space-y-3 text-neutral-700">
                  <li className="flex items-start">
                    <i className="fas fa-circle text-xs text-primary mt-1.5 mr-3"></i>
                    <span>Sistema inmunológico debilitado (por ejemplo, personas con VIH)</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-circle text-xs text-primary mt-1.5 mr-3"></i>
                    <span>Uso prolongado de anticonceptivos orales (para algunos tipos de cáncer)</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-circle text-xs text-primary mt-1.5 mr-3"></i>
                    <span>Tabaquismo (aumenta el riesgo de persistencia viral)</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-circle text-xs text-primary mt-1.5 mr-3"></i>
                    <span>Coinfección con otras infecciones de transmisión sexual</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-circle text-xs text-primary mt-1.5 mr-3"></i>
                    <span>Alta paridad (muchos embarazos)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div ref={infoRef as React.RefObject<HTMLDivElement>} className="mt-12 bg-secondary-light/10 rounded-xl p-6 section-hidden">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="text-secondary text-5xl">
              <i className="fas fa-info-circle"></i>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-lg text-secondary mb-2">Importante recordar</h4>
              <p className="text-neutral-700">El VPH es extremadamente común y puede afectar a cualquier persona sexualmente activa, independientemente de su género o orientación sexual. La presencia de factores de riesgo no garantiza una infección, y su ausencia tampoco la descarta por completo. Lo más importante es tomar medidas preventivas y realizar pruebas de detección periódicas.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RiskFactors;
