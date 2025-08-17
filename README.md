# Bewear 🛍️👕

**Bewear** é uma plataforma de e-commerce moderna e intuitiva, especializada na venda de roupas e acessórios. Desenvolvida com tecnologias de ponta, oferece uma experiência de compra fluida e segura para os clientes.

---

## 🌟 Sobre o Projeto

O Bewear é uma loja virtual completa que oferece uma ampla variedade de produtos de vestuário, desde camisetas e calças até acessórios como mochilas e bonés. A plataforma foi projetada para proporcionar uma experiência de compra intuitiva, com sistema de carrinho avançado, sistema de pagamento e gestão completa de pedidos.

---

## ✨ Funcionalidades Principais

- **Catálogo de Produtos:**
  - Produtos organizados por categorias (Camisetas, Calças, Acessórios, etc.)
  - Variantes de produtos com diferentes cores e tamanhos
  - Sistema de busca e navegação intuitiva
- **Sistema de Carrinho:**
  - Adicionar/remover produtos
  - Gerenciar quantidades
  - Cálculo automático de preços
- **Sistema de Autenticação:**
  - Criação de conta e login seguros
  - Login social com Google (OAuth)
  - Gestão de perfil do usuário
- **Gestão de Endereços:**
  - Cadastro de múltiplos endereços de entrega
  - Validação de CEP e dados de endereço
- **Checkout e Pagamentos:**
  - Integração completa com Stripe
  - Múltiplas formas de pagamento
  - Processamento seguro de transações
- **Gestão de Pedidos:**
  - Acompanhamento do status dos pedidos
  - Histórico completo de compras
  - Notificações de confirmação
- **Interface Responsiva:**
  - Design moderno e adaptável
  - Experiência otimizada para mobile e desktop

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando um stack moderno e eficiente:

- **Frontend:**
  - [Next.js](https://nextjs.org/) (v15.4.1) - Framework React para produção.
  - [React](https://react.dev/) (v19.1.0) - Biblioteca para construção de interfaces de usuário.
  - [Tailwind CSS](https://tailwindcss.com/) (v4) - Framework CSS utility-first.
  - [Radix UI](https://www.radix-ui.com/) - Primitivas de UI acessíveis e não estilizadas.
  - [Lucide React](https://lucide.dev/) - Ícones SVG.
  - [Shadcn/ui](https://ui.shadcn.com/) - Componentes de UI baseados em Radix.
  - [TanStack Query (React Query)](https://tanstack.com/query/latest) - Gerenciamento de estado de servidor e data fetching.
  - [React Hook Form](https://react-hook-form.com/) - Gerenciamento de formulários.
  - [Zod](https://zod.dev/) - Validação de esquemas.
  - [Sonner](https://sonner.emilkowal.ski/) - Notificações toast.
  - `next-themes` - Gerenciamento de temas (dark/light mode).
  - `react-number-format` - Formatação de números em formulários.
- **Backend & Base de Dados:**
  - [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
  - [Drizzle ORM](https://orm.drizzle.team/) - ORM TypeScript.
  - [PostgreSQL](https://www.postgresql.org/) - Banco de dados relacional.
  - [Better Auth](https://github.com/LukyVj/better-auth) - Biblioteca de autenticação.
- **Pagamentos:**
  - [Stripe](https://stripe.com/) - Plataforma de pagamentos online.
- **Ferramentas de Desenvolvimento:**
  - [TypeScript](https://www.typescriptlang.org/)
  - [ESLint](https://eslint.org/)
  - [Prettier](https://prettier.io/)
  - `drizzle-kit` - Ferramenta para migrações com Drizzle.

---

## 🚀 Começando

Siga estas instruções para configurar e rodar o projeto em seu ambiente local.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS recomendada, ex: v20 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/) ou [pnpm](https://pnpm.io/)
- Uma instância de banco de dados [PostgreSQL](https://www.postgresql.org/download/) rodando.
- [Git](https://git-scm.com/)

### Instalação

1.  **Clone o repositório:**

    ```bash
    git clone git@github.com:Gildaciolopes/Bewear.git
    cd Bewear
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    # ou
    # yarn install
    # ou
    # pnpm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    - Copie o arquivo `.env.example` para um novo arquivo chamado `.env`:
      ```bash
      cp .env.example .env
      ```
    - Preencha as variáveis no arquivo `.env` com suas respectivas chaves e URLs. Veja a seção [Variáveis de Ambiente](#variáveis-de-ambiente) para mais detalhes.

4.  **Configure o Banco de Dados (Drizzle ORM):**
    - Certifique-se que sua string de conexão `DATABASE_URL` no arquivo `.env` está correta e apontando para seu banco de dados PostgreSQL.
    - Execute as migrações do Drizzle para criar o schema no seu banco de dados:
      ```bash
      npx drizzle-kit generate # Para gerar os arquivos de migração (se necessário ao modificar o schema)
      npx drizzle-kit migrate  # Para aplicar as migrações ao banco de dados
      ```
      _**Nota:** Verifique a documentação do Drizzle para os comandos exatos de geração e aplicação de migrações (`push` para desenvolvimento rápido ou `generate` + `migrate` para produção). Você pode precisar de `drizzle-kit studio` para visualizar seu schema._
      _Para um setup inicial, você pode precisar de um comando como `npx drizzle-kit push`._

5.  **Rode o servidor de desenvolvimento:**
    ```bash
    npm run dev
    # ou
    # yarn dev
    # ou
    # pnpm dev
    ```
    Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

---

## ⚙️ Variáveis de Ambiente

As seguintes variáveis de ambiente precisam ser configuradas no seu arquivo `.env` para o correto funcionamento da aplicação:

```env
# URL da sua base de dados PostgreSQL
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# Segredos para a autenticação com Better Auth
BETTER_AUTH_SECRET="[SEU_SEGREDO_COMPLEXO_PARA_BETTER_AUTH]"

# Credenciais do Google OAuth para login social
GOOGLE_CLIENT_ID="[SEU_GOOGLE_CLIENT_ID]"
GOOGLE_CLIENT_SECRET="[SEU_GOOGLE_CLIENT_SECRET]"

# Chaves do Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="[SUA_CHAVE_PUBLICAVEL_STRIPE]"
STRIPE_SECRET_KEY="[SUA_CHAVE_SECRETA_STRIPE]"
STRIPE_WEBHOOK_SECRET="[SEU_WEBHOOK]" # Use `npm run stripe:listen:dev` para obter um durante o desenvolvimento

# URL pública da sua aplicação
NEXT_PUBLIC_APP_URL="http://localhost:3000" # Ou a URL de produção
```

**Importante:** Nunca exponha suas chaves secretas e credenciais em repositórios públicos. O arquivo `.env` deve ser incluído no seu `.gitignore`.

---

## 📖 Uso

Após a instalação e configuração completa:

1.  Acesse a aplicação no seu navegador (normalmente `http://localhost:3000`).
2.  Crie uma conta ou faça login (inclusive com Google).
3.  Navegue pelo catálogo de produtos organizados por categorias.
4.  Adicione produtos ao carrinho de compras.
5.  Gerencie seu carrinho (quantidades, remoção de itens).
6.  Configure endereços de entrega.
7.  Finalize a compra através do checkout seguro com Stripe.
8.  Acompanhe seus pedidos na seção "Meus Pedidos".

Para testar a integração com Stripe em desenvolvimento, você pode usar o comando:

```bash
npm run stripe:listen:dev
```

Isso irá encaminhar os webhooks do Stripe para sua aplicação local.

---

## 🤝 Contribuindo

Contribuições são o que fazem a comunidade open source um lugar incrível para aprender, inspirar e criar. Qualquer contribuição que você fizer será **muito bem-vinda**.

Se você tem alguma sugestão para melhorar este projeto, por favor, faça um fork do repositório e crie um pull request. Você também pode simplesmente abrir uma issue com a tag "enhancement".
Não se esqueça de dar uma estrela ao projeto! Obrigado novamente! ⭐

1.  Faça um Fork do projeto (`https://github.com/Gildaciolopes/Bewear/fork`)
2.  Crie sua Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Adicione suas mudanças (`git add .`)
4.  Comite suas mudanças (`git commit -m 'Add some AmazingFeature'`)
5.  Faça o Push para a Branch (`git push origin feature/AmazingFeature`)
6.  Abra um Pull Request

As Pull Requests serão revisadas e, se alinhadas com os objetivos do projeto, poderão ser incorporadas.

---

## 📞 Contato

Gildácio Lopes - contato.gildaciolopes@gmail.com

Deploy do projeto: https://bewear-six.vercel.app
