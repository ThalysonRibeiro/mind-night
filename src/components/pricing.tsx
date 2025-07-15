"use client"

import { Check, Crown, Star, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "Grátis",
      icon: <Star className="h-6 w-6 text-yellow-400" />,
      description: "Perfeito para começar sua jornada",
      features: [
        "Até 10 sonhos por mês",
        // "Análise básica de símbolos",
        // "Busca simples",
        "Suporte por email",
        "Backup básico"
      ],
      popular: false,
      buttonText: "Começar Grátis"
    },
    {
      name: "Normal",
      price: "R$ 19,90",
      priceUnit: "/mês",
      icon: <Zap className="h-6 w-6 text-purple-400" />,
      description: "Ideal para exploradores regulares",
      features: [
        "Sonhos ilimitados",
        "Análise de símbolos",
        // "Análise avançada de símbolos",
        "Busca inteligente",
        // "Relatórios mensais",
        "Backup na nuvem",
        "Suporte prioritário",
        "Exportação de dados"
      ],
      popular: true,
      buttonText: "Começar Teste Grátis"
    },
    {
      name: "Premium",
      price: "R$ 39,90",
      priceUnit: "/mês",
      icon: <Crown className="h-6 w-6 text-yellow-400" />,
      description: "Para exploradores profundos da mente",
      features: [
        "Tudo do plano Normal",
        "IA avançada para interpretação",
        "Análise de padrões profundos",
        // "Consultoria com especialistas",
        "Relatórios personalizados",
        // "API para desenvolvedores",
        "Acesso antecipado a novos recursos"
      ],
      popular: false,
      buttonText: "Começar Teste Grátis"
    }
  ];

  return (
    <section id="preços" className="w-full pt-20 pb-10 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="container mx-auto px-4 fade-section">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Escolha Seu
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-yellow-400">
              {' '}Plano{' '}
            </span>
            Ideal
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Desbloqueie todo o potencial dos seus sonhos com nossos planos flexíveis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative bg-slate-900/50 border-slate-700 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 ${plan.popular
                ? 'border-purple-500 shadow-lg shadow-purple-500/25'
                : 'hover:border-purple-500/50'
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-yellow-400 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Mais Popular
                  </div>
                </div>
              )}

              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  {plan.icon}
                </div>
                <CardTitle className="text-white text-2xl">{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-white">
                  {plan.price}
                  {plan.priceUnit && <span className="text-lg text-slate-400">{plan.priceUnit}</span>}
                </div>
                <p className="text-slate-300">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-6 flex flex-col justify-between h-full">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-slate-300">
                      <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full py-6 text-lg font-semibold transform hover:scale-105 transition-all duration-300 ${plan.popular
                    ? 'bg-gradient-to-tr from-purple-600 to-yellow-400 hover:from-purple-700 hover:to-yellow-500 text-white'
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-400 mb-4">
            Todos os planos incluem garantia de 30 dias
          </p>
          <p className="text-slate-300">
            Dúvidas? <a href="#" className="text-purple-400 hover:text-purple-300">Entre em contato</a>
          </p>
        </div>
      </div>
    </section>
  );
}