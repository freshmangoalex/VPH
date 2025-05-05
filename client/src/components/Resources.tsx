import useScrollAnimation from '@/hooks/useScrollAnimation';

const Resources = () => {
  const titleRef = useScrollAnimation();
  const resourcesRef = useScrollAnimation();
  
  return (
    <section id="resources" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div ref={titleRef as React.RefObject<HTMLDivElement>} className="max-w-3xl mx-auto text-center mb-12 section-hidden">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-4">Recursos disponibles</h2>
          <p className="text-neutral-600">Información y servicios que pueden ayudarte</p>
        </div>

        <div ref={resourcesRef as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 section-hidden">
          <div className="bg-neutral-50 rounded-xl p-6 shadow-md hover-grow">
            <div className="text-primary text-3xl mb-4">
              <i className="fas fa-hospital"></i>
            </div>
            <h3 className="font-heading font-semibold text-xl mb-3">Centros de salud</h3>
            <p className="text-neutral-700 mb-4">Encuentra los centros de salud de la Secretaría de Salud donde puedes recibir atención.</p>
            <a href="#" className="text-secondary font-medium hover:text-secondary-dark transition-colors">Buscar centro cercano <i className="fas fa-arrow-right ml-1"></i></a>
          </div>

          <div className="bg-neutral-50 rounded-xl p-6 shadow-md hover-grow">
            <div className="text-primary text-3xl mb-4">
              <i className="fas fa-book-medical"></i>
            </div>
            <h3 className="font-heading font-semibold text-xl mb-3">Materiales educativos</h3>
            <p className="text-neutral-700 mb-4">Descarga folletos, guías y materiales informativos sobre el VPH y su prevención.</p>
            <a href="#" className="text-secondary font-medium hover:text-secondary-dark transition-colors">Ver materiales <i className="fas fa-arrow-right ml-1"></i></a>
          </div>

          <div className="bg-neutral-50 rounded-xl p-6 shadow-md hover-grow">
            <div className="text-primary text-3xl mb-4">
              <i className="fas fa-phone-alt"></i>
            </div>
            <h3 className="font-heading font-semibold text-xl mb-3">Líneas de ayuda</h3>
            <p className="text-neutral-700 mb-4">Comunícate con especialistas que pueden resolver tus dudas sobre el VPH.</p>
            <a href="#" className="text-secondary font-medium hover:text-secondary-dark transition-colors">Ver números de contacto <i className="fas fa-arrow-right ml-1"></i></a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;
