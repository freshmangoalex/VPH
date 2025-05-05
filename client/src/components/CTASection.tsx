import { Button } from '@/components/ui/button';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const CTASection = () => {
  const sectionRef = useScrollAnimation();
  
  return (
    <section className="py-16 bg-primary text-white relative">
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJ3aGl0ZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMzYgMzRoLTJWMTBoMnYyNHptLTExLjUtNy41djJoMTd2LTJoLTE3eiIvPjxwYXRoIGQ9Ik0zMCA2MGMyLjIgMCA0LTEuOCA0LTR2LTFoMTRhMiAyIDAgMCAwIDItMlYzMGEyIDIgMCAwIDAtMi0ySDMzdi0yaDE1YTIgMiAwIDAgMCAyLTJWNmEyIDIgMCAwIDAtMi0ySDE3YTIgMiAwIDAgMC0yIDJ2MTlhMiAyIDAgMCAwIDIgMmgxNXYySDExYTIgMiAwIDAgMC0yIDJ2MjNhMiAyIDAgMCAwIDIgMmgxNHYxYzAgMi4yIDEuOCA0IDQgNHoiIGZpbGwtb3BhY2l0eT0iLjUiLz48cGF0aCBkPSJNMzAgNTJjLTEuMSAwLTItLjktMi0ycy45LTIgMi0yIDIgLjkgMiAyLS45IDItMiAyem0xLTEwdi0zYTEgMSAwIDAgMC0xLTEgMSAxIDAgMCAwLTEgMXYzYTEgMSAwIDAgMCAxIDEgMSAxIDAgMCAwIDEtMXoiLz48L2c+PC9zdmc+')]"></div>
      <div className="container mx-auto px-4 relative">
        <div ref={sectionRef as React.RefObject<HTMLDivElement>} className="max-w-3xl mx-auto text-center section-hidden">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">Toma acción hoy mismo</h2>
          <p className="text-lg mb-8 text-white/90">La prevención del VPH es posible y está a tu alcance. Actúa ahora para proteger tu salud y la de tus seres queridos.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="cta-button bg-white text-primary font-heading font-semibold px-4 py-6 rounded-lg shadow-md text-center hover:bg-neutral-100 transition-all animate-pulse-slow">
              <i className="fas fa-syringe mb-2 text-xl block"></i>
              <span className="block">Esquema de vacunación</span>
            </Button>
            <Button className="cta-button bg-white text-primary font-heading font-semibold px-4 py-6 rounded-lg shadow-md text-center hover:bg-neutral-100 transition-all animate-pulse-slow">
              <i className="fas fa-clinic-medical mb-2 text-xl block"></i>
              <span className="block">Encuentra tu clínica</span>
            </Button>
            <Button className="cta-button bg-white text-primary font-heading font-semibold px-4 py-6 rounded-lg shadow-md text-center hover:bg-neutral-100 transition-all animate-pulse-slow">
              <i className="fas fa-comments mb-2 text-xl block"></i>
              <span className="block">Contáctanos</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
