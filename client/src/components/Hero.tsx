import { Button } from '@/components/ui/button';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { smoothScrollTo } from '@/lib/utils';

const Hero = () => {
  const sectionRef = useScrollAnimation();
  
  return (
    <section id="intro" className="min-h-screen pt-24 md:pt-32 pb-16 flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={sectionRef as React.RefObject<HTMLDivElement>} className="section-hidden">
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-primary mb-6">
              Prevención del Virus del Papiloma Humano
            </h2>
            <p className="text-lg md:text-xl text-neutral-700 mb-8">
              Información clara, objetiva y empática sobre el VPH y cómo puedes protegerte a ti y a tus seres queridos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => smoothScrollTo('prevention')}
                className="cta-button bg-accent text-white font-heading font-semibold px-6 py-3 rounded-lg shadow-md text-center hover:bg-accent-dark transition-all"
              >
                Conoce cómo prevenirlo
              </Button>
              <Button 
                onClick={() => smoothScrollTo('resources')}
                variant="outline"
                className="cta-button bg-white text-primary border-2 border-primary font-heading font-semibold px-6 py-3 rounded-lg text-center hover:bg-primary-light hover:text-white transition-all"
              >
                Recursos disponibles
              </Button>
            </div>
          </div>
          <div ref={useScrollAnimation() as React.RefObject<HTMLDivElement>} className="section-hidden flex justify-center lg:justify-end">
            <div className="w-full max-w-md rounded-xl overflow-hidden shadow-custom hover-grow">
              <div className="bg-neutral-200 w-full aspect-[4/3] flex items-center justify-center">
                <i className="fas fa-image text-5xl text-neutral-400"></i>
                <span className="sr-only">Imagen sobre la prevención del VPH</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
