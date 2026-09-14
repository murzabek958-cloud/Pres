import { Scroll } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function OverlayUI() {
  const uiRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.fade-in').forEach((el) => {
        gsap.fromTo(el, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1.5, 
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
            }
          }
        );
      });
    }, uiRef);
    return () => ctx.revert();
  }, []);

  return (
    <Scroll html style={{ width: '100%', height: '100%' }} ref={uiRef}>
      <section className="h-screen w-full flex flex-col items-center justify-center text-center px-4 pointer-events-none">
        <h1 className="text-5xl md:text-8xl font-serif text-white tracking-widest uppercase mb-4 drop-shadow-lg">
          Абай <span className="text-gold">Құнанбайұлы</span>
        </h1>
        <p className="text-xl md:text-3xl text-gray-300 font-sans tracking-wide">
          Ұлы ақын. Ойшыл. Ағартушы.
        </p>
        <p className="absolute bottom-10 text-sm text-gray-500 animate-pulse font-sans tracking-widest">
          ТӨМЕНГЕ ЖЫЛЖЫТЫҢЫЗ
        </p>
      </section>

      <section className="h-screen w-full flex items-center justify-start px-10 md:px-32 pointer-events-none">
        <div className="max-w-md fade-in">
          <h2 className="text-4xl text-gold font-serif mb-6">Өмір жолы</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Қазақ даласының жүрегінде дүниеге келіп, халқының рухани шамшырағына айналған тұлға.
          </p>
        </div>
      </section>

      <section className="h-screen w-full flex items-center justify-end px-10 md:px-32 pointer-events-none text-right">
        <div className="max-w-md fade-in">
          <h2 className="text-4xl text-gold font-serif mb-6">Философиясы</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            «Адам бол!» — бұл жай ғана сөз емес, бүкіл адамзатқа қойылған ұлы талап.
          </p>
        </div>
      </section>

      <section className="h-screen w-full flex items-start justify-center pt-32 pointer-events-none">
        <h2 className="text-5xl text-white font-serif drop-shadow-lg fade-in">Қара сөздер</h2>
      </section>

      <section className="h-screen w-full flex items-center justify-center text-center pointer-events-none">
        <div className="fade-in">
          <h2 className="text-4xl text-gold font-serif mb-4">Мұра</h2>
          <p className="text-gray-300 text-xl">
            Оның сөздері уақыт пен кеңістікті бағындырды.
          </p>
        </div>
      </section>

      <section className="h-screen w-full flex flex-col items-center justify-center text-center pointer-events-none">
        <h2 className="text-4xl md:text-6xl text-white font-serif mb-10 fade-in">
          Абайдың мұрасы — <br/>
          <span className="text-gold">білімде, ойда және адамдықта.</span>
        </h2>
        <button className="pointer-events-auto px-8 py-4 bg-transparent border border-gold text-gold hover:bg-gold hover:text-darkbg transition-colors duration-300 tracking-widest font-sans uppercase text-sm fade-in">
          Зерттеуді бастау
        </button>
      </section>
    </Scroll>
  );
}
