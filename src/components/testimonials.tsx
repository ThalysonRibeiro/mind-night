"use client"

import { Quote, Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Marquee, MarqueeContent, MarqueeItem } from '@/components/ui/kibo-ui/marquee';

export function Testimonials() {
  const testimonials = [
    {
      name: "Maria Silva",
      role: "Psicóloga",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "O DreamJournal revolucionou minha prática. As análises simbólicas são surpreendentemente precisas e ajudam muito meus pacientes.",
      rating: 5
    },
    {
      name: "João Santos",
      role: "Escritor",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "Descobri padrões incríveis nos meus sonhos que me inspiraram em várias obras. A ferramenta é simplesmente fantástica!",
      rating: 5
    },
    {
      name: "Ana Costa",
      role: "Estudante",
      avatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "Como estudante, adoro a versão gratuita. Me ajudou a entender melhor meus sonhos e até mesmo reduzir a ansiedade.",
      rating: 5
    }
  ];

  return (
    <section id="testemunhos" className="py-20 w-full bg-slate-800/50">
      <div className="container mx-auto px-4 fade-section">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            O Que Nossos
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-yellow-400">
              {' '}Usuários{' '}
            </span>
            Dizem
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Histórias reais de transformação e descoberta através dos sonhos
          </p>
        </div>

        <Marquee>
          <MarqueeContent className="h-80 w-full">
            {testimonials.map((testimonial, index) => (
              <MarqueeItem className="w-100" key={index}>
                <Card
                  key={index}
                  className="bg-slate-900/50 border-slate-700 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 hover:border-purple-500/50"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Quote className="h-8 w-8 text-purple-400 mr-3" />
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>

                    <p className="text-slate-300 mb-6 leading-relaxed">
                      &ldquo;{testimonial.content}&ldquo;
                    </p>

                    <div className="flex gap-2 items-center">
                      <Avatar>
                        <AvatarImage src={testimonial.avatar} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-white font-semibold">{testimonial.name}</div>
                        <div className="text-slate-400 text-sm">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
      </div>
    </section>
  );
}