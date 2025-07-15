"use client"

import { useEffect } from "react";
import { Button } from "./ui/button"

export function Hero() {

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting) {
          el.classList.add('show');
        } else {
          el.classList.remove('show');
        }
      });
    });

    const sections = document.querySelectorAll('.fade-section');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <section id="inicio" className="container mx-auto mt-20 px-4">
      <div className="relative container mx-auto px-4 pt-32 pb-20 fade-section">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight fade-in-tex">
              Desvende os
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-yellow-400">
                {' '}Mistérios{' '}
              </span>
              dos Seus Sonhos
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Registre, analise e descubra os significados simbólicos dos seus sonhos com nossa plataforma inteligente
            </p>
          </div>
          <div className="animate-fade-in-delayed space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Button
              size="lg"
              variant={"primary"}
              className="px-8 py-6 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
            >
              Começar Jornada Gratuita
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-6 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
            >
              Ver Demonstração
            </Button>
          </div>
          <div className="mt-16 animate-fade-in-delayed">
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-purple-600/20 to-yellow-400/20 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/30">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div className="transform hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl font-bold text-white mb-2">50k+</div>
                    <div className="text-slate-300">Sonhos Registrados</div>
                  </div>
                  <div className="transform hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl font-bold text-white mb-2">10k+</div>
                    <div className="text-slate-300">Usuários Ativos</div>
                  </div>
                  <div className="transform hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl font-bold text-white mb-2">95%</div>
                    <div className="text-slate-300">Satisfação</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}