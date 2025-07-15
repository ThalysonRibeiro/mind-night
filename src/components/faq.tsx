"use client"

import { TRIAL_DAYS } from "@/utils/permissions/trial-limits";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export function FAQ() {
  const FAQ_ITEMS: FAQItem[] = [
    {
      id: "1",
      question: "Como funciona o teste grátis?",
      answer: `Você tem ${TRIAL_DAYS} dias para explorar todos os recursos do plano Premium, sem precisar cadastrar cartão de crédito. É o tempo ideal para experimentar a análise simbólica com IA, buscar padrões nos seus sonhos e entender o potencial da plataforma.`,
    },
    {
      id: "2",
      question: "Meus sonhos ficam privados?",
      answer: "Com certeza! Seus sonhos são criptografados de ponta a ponta e armazenados de forma segura. Só você tem acesso a eles — e pode excluir tudo a qualquer momento.",
    },
    {
      id: "3",
      question: "Como a IA interpreta os meus sonhos?",
      answer: "A IA analisa símbolos, arquétipos e padrões narrativos recorrentes nos seus relatos, cruzando com uma base simbólica avançada e estudos sobre o inconsciente para gerar interpretações profundas e personalizadas.",
    },
    {
      id: "4",
      question: "Preciso entender de simbologia para usar?",
      answer: "Não! A plataforma foi feita para todos. A IA explica os símbolos de forma clara e acessível, e você pode aprender aos poucos com os insights gerados automaticamente a cada novo sonho registrado.",
    },
    {
      id: "5",
      question: "Posso acessar meus sonhos em outros dispositivos?",
      answer: "Sim! Você pode acessar sua conta pelo celular, tablet ou computador, com sincronização automática dos seus registros e análises.",
    },
    {
      id: "6",
      question: "O que acontece quando o teste grátis acaba?",
      answer: "Você pode escolher continuar com o plano gratuito (com recursos limitados) ou assinar um dos planos pagos para manter o acesso completo à IA, análises avançadas e backup na nuvem.",
    },
    {
      id: "7",
      question: "Posso fazer backup dos meus sonhos?",
      answer: "Sim! Você pode exportar seus sonhos em PDF com todas as análises simbólicas geradas pela IA. Em breve, também será possível integrar com o Google Drive para manter tudo salvo automaticamente na nuvem.",
    },
    {
      id: "8",
      question: "O que está incluso no PDF de exportação?",
      answer: "O PDF inclui o texto original do seu sonho, os símbolos destacados pela IA, interpretações detalhadas e padrões identificados. Ideal para imprimir, compartilhar ou guardar como parte da sua jornada de autoconhecimento.",
    }

  ];

  return (
    <section id="faq" className="w-full pt-20 pb-10 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="container mx-auto px-4 fade-section">
        <div className="w-full max-w-4xl mx-auto text-center">
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            Perguntas frequentes
          </h2>
          <p className="text-slate-300 mb-6">
            Encontre respostas para perguntas comuns sobre nosso software de gerenciamento de clínicas de massoterapia.
          </p>
        </div>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          aria-label="Seção de perguntas frequentes"
        >
          {FAQ_ITEMS.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="border-yellow-400/50 py-2 px-4"
            >
              <AccordionTrigger
                aria-expanded="false"
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-400">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}