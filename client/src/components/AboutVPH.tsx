import useScrollAnimation from '@/hooks/useScrollAnimation';

const AboutVPH = () => {
  const titleRef = useScrollAnimation();
  const cardRef1 = useScrollAnimation();
  const cardRef2 = useScrollAnimation();
  const cardRef3 = useScrollAnimation();
  const cardRef4 = useScrollAnimation();
  const infoRef = useScrollAnimation();
  
  return (
    <section id="about-vph" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div ref={titleRef as React.RefObject<HTMLDivElement>} className="max-w-3xl mx-auto text-center mb-12 section-hidden">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-4">¿Qué es el VPH?</h2>
          <p className="text-neutral-600">Información clara y objetiva sobre el Virus del Papiloma Humano</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div ref={cardRef1 as React.RefObject<HTMLDivElement>} className="bg-neutral-100 rounded-xl p-6 shadow-md section-hidden">
            <div className="text-primary text-4xl mb-4">
              <i className="fas fa-virus"></i>
            </div>
            <h3 className="font-heading font-semibold text-xl mb-3">Infección</h3>
            <p className="text-neutral-700">El VPH se transmite por contacto directo durante relaciones sexuales. La mayoría de personas sexualmente activas contraerán al menos un tipo de VPH en su vida.</p>
          </div>

          <div ref={cardRef2 as React.RefObject<HTMLDivElement>} className="bg-neutral-100 rounded-xl p-6 shadow-md section-hidden">
            <div className="text-primary text-4xl mb-4">
              <i className="fas fa-hourglass-half"></i>
            </div>
            <h3 className="font-heading font-semibold text-xl mb-3">Persistencia</h3>
            <p className="text-neutral-700">Aunque la mayoría de infecciones se resuelven solas, algunas persisten. La persistencia del virus es un factor clave para el desarrollo de lesiones precancerosas.</p>
          </div>

          <div ref={cardRef3 as React.RefObject<HTMLDivElement>} className="bg-neutral-100 rounded-xl p-6 shadow-md section-hidden">
            <div className="text-primary text-4xl mb-4">
              <i className="fas fa-cell"></i>
            </div>
            <h3 className="font-heading font-semibold text-xl mb-3">Lesión</h3>
            <p className="text-neutral-700">Con el tiempo, la infección persistente puede causar cambios celulares anormales, conocidos como lesiones precancerosas, que pueden detectarse mediante pruebas como el Papanicolaou.</p>
          </div>

          <div ref={cardRef4 as React.RefObject<HTMLDivElement>} className="bg-neutral-100 rounded-xl p-6 shadow-md section-hidden">
            <div className="text-primary text-4xl mb-4">
              <i className="fas fa-disease"></i>
            </div>
            <h3 className="font-heading font-semibold text-xl mb-3">Cáncer</h3>
            <p className="text-neutral-700">Sin detección o tratamiento, las lesiones precancerosas pueden progresar a cáncer, principalmente cervicouterino, aunque también puede afectar otras zonas.</p>
          </div>
        </div>

        <div ref={infoRef as React.RefObject<HTMLDivElement>} className="bg-primary-light/10 rounded-xl p-8 section-hidden">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-heading font-semibold text-2xl text-primary mb-4">Lo que debes saber</h3>
            <ul className="space-y-3 text-neutral-700">
              <li className="flex items-start">
                <i className="fas fa-check text-secondary mt-1 mr-3"></i>
                <span>Existen más de 100 tipos de VPH, y al menos 14 pueden causar cáncer.</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-secondary mt-1 mr-3"></i>
                <span>El VPH es tan común que casi todas las personas sexualmente activas lo contraerán en algún momento de su vida.</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-secondary mt-1 mr-3"></i>
                <span>La mayoría de las infecciones por VPH son asintomáticas y se resuelven sin tratamiento.</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-secondary mt-1 mr-3"></i>
                <span>El cáncer cervicouterino es el cuarto tipo de cáncer más común en mujeres a nivel mundial.</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-secondary mt-1 mr-3"></i>
                <span>La vacunación contra el VPH y las pruebas de detección regulares han demostrado reducir significativamente el riesgo de cáncer.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutVPH;
