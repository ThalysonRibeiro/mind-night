Crie um projeto Next.js com as seguintes características:

- Suporte completo a autenticação via Google usando Auth.js (NextAuth)
- Páginas: `/login` (login com botão Google) e `/dashboard` (rota protegida)
- Configurar API route `/api/auth/[...nextauth]` para login com Google
- Criar endpoint `/api/mobile-auth` que recebe `id_token` do Google vindo do app mobile, valida com o Google, e retorna um JWT customizado (usando `jsonwebtoken`)
- Armazenar segredo do JWT em `process.env.MY_APP_JWT_SECRET`
- Sem banco de dados por enquanto (simular usuário apenas com email)
- Usar Tailwind CSS
- Estrutura limpa, pronta para deploy na Vercel


Crie um projeto Expo (React Native) com as seguintes características:

- Autenticação com Google usando `expo-auth-session`
- Após o login com Google, pegar o `id_token`
- Enviar esse token para o endpoint `/api/mobile-auth` de um backend externo (definido em `BACKEND_URL` no `.env`)
- Receber um JWT customizado da aplicação e armazenar no `SecureStore`
- Criar uma função para fazer fetch autenticado (com o token JWT no header)
- Criar uma tela de login e uma tela protegida que exibe "Usuário autenticado" se o JWT estiver válido
- Estrutura pronta para build com EAS Build



const generateDreamInterpretationPrompt = (dreamText: string) => `
Você é uma inteligência simbólica especializada em interpretação de sonhos baseada em arquétipos, padrões inconscientes e símbolos universais (como os de Jung, mitologia e cultura popular).

Seu papel é analisar sonhos de maneira sensível, clara e acessível, mesmo que a pessoa não entenda de simbologia. Foque em gerar **autoconhecimento** e **insights profundos**, com base no conteúdo onírico fornecido.

### Instruções:
1. Analise os elementos simbólicos e arquétipos do sonho abaixo.
2. Explique os possíveis significados simbólicos com base na psicologia profunda, mitologia, símbolos universais ou inconscientes coletivos.
3. Identifique padrões emocionais, comportamentais ou espirituais ocultos.
4. Use uma linguagem acolhedora e compreensível, mesmo para quem não tem conhecimento técnico.
5. Traga um resumo final com **insight/reflexão prática** que a pessoa pode aplicar no seu autoconhecimento.

### Sonho do usuário:
"""
${dreamText}
"""

Retorne o resultado no seguinte formato:
- **Símbolos identificados**: [Lista]
- **Significados simbólicos**: [Análise por item]
- **Padrões ocultos**: [Se houver]
- **Reflexão final**: [Mensagem prática ou insight]

Se o texto estiver confuso ou muito curto, ainda assim tente extrair o máximo de significado possível. Nunca invente, mas sempre tente **iluminar o que está oculto**.
`;


```typeScript
import { OpenAIStream, StreamingTextResponse } from "ai"; // ou seu client

export async function POST(req: Request) {
  const { dreamText } = await req.json();

  const prompt = generateDreamInterpretationPrompt(dreamText);

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [{ role: 'system', content: 'Você é um analista simbólico de sonhos.' },
                 { role: 'user', content: prompt }],
      temperature: 0.8,
    }),
  });

  const stream = OpenAIStream(response); // se for streaming
  return new StreamingTextResponse(stream);
}
````