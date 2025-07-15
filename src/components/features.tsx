"use client"

import { BookOpen, Brain, Search, Shield, Smartphone, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function Features() {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-purple-400" />,
      title: "Diário Inteligente",
      description: "Registre seus sonhos com interface intuitiva e recursos de busca avançados"
    },
    {
      icon: <Brain className="h-8 w-8 text-yellow-400" />,
      title: "Análise Simbólica",
      description: "IA avançada analisa símbolos e padrões para revelar significados ocultos"
    },
    {
      icon: <Search className="h-8 w-8 text-blue-400" />,
      title: "Busca Inteligente",
      description: "Encontre conexões entre sonhos e identifique padrões recorrentes"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-green-400" />,
      title: "Insights Pessoais",
      description: "Relatórios detalhados sobre seus padrões de sonhos e evolução"
    },
    {
      icon: <Shield className="h-8 w-8 text-red-400" />,
      title: "Privacidade Total",
      description: "Seus sonhos são privados e protegidos com criptografia de ponta"
    },
    {
      icon: <Smartphone className="h-8 w-8 text-indigo-400" />,
      title: "Multiplataforma",
      description: "Acesse seus sonhos em qualquer dispositivo, a qualquer hora"
    }
  ];


  return (
    <section id="recursos">
      <div className="container mx-auto px-4 fade-section">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Recursos Poderosos para
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-yellow-400">
              {' '}Explorar{' '}
            </span>
            Seus Sonhos
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Descubra ferramentas avançadas que transformarão sua jornada de autoconhecimento
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-slate-900/50 border-slate-700 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 hover:border-yellow-500"
            >
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 text-center leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}