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
