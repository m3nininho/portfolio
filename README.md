# Portfólio

Aplicação full stack que publica meu portfólio de projetos e inclui um painel administrativo próprio para gerenciar o conteúdo. Pelo painel é possível cadastrar e editar projetos, enviar imagens, definir destaques, controlar a publicação e a ordem de exibição, sem alterar código.

## Funcionalidades

- Página pública com a listagem dos projetos publicados, ordenados e com destaque configurável
- Painel administrativo protegido por autenticação e autorização
- Cadastro e edição de projetos com título, categoria, descrição, tecnologias, links de repositório e demonstração, ícone e imagem
- Upload de imagens com limpeza automática do arquivo anterior na substituição
- Controle de publicação, destaque e ordenação
- Configurações de perfil, senha e aparência (tema claro e escuro)
- Recuperação de senha

## Stack

| Camada       | Tecnologias                                            |
| ------------ | ------------------------------------------------------ |
| Back-end     | PHP 8.4, Laravel 13, Laravel Fortify                   |
| Front-end    | React 19, TypeScript, Inertia.js 3, Tailwind CSS 4     |
| Componentes  | Radix UI, Lucide                                       |
| Rotas tipadas| Laravel Wayfinder                                      |
| Build        | Vite                                                   |
| Qualidade    | Pest, PHPStan (Larastan), Laravel Pint                 |
| Banco        | SQLite em desenvolvimento, PostgreSQL em produção      |
| CI           | GitHub Actions                                         |

## Arquitetura

- `app/Http/Controllers/PortfolioController.php` renderiza a página pública com os projetos publicados.
- `app/Http/Controllers/ProjectController.php` concentra o CRUD do painel.
- `app/Http/Requests/SaveProjectRequest.php` valida os dados e verifica a permissão do usuário.
- O acesso ao painel é controlado pelo gate `manage-projects`, definido em `AppServiceProvider`, que libera apenas usuários marcados com `is_portfolio_admin`.
- As páginas React ficam em `resources/js/pages` e consomem as rotas do Laravel por meio das funções geradas pelo Wayfinder.

## Requisitos

- PHP 8.3 ou superior
- Composer 2
- Node.js 22 e npm

## Instalação

Clone o repositório e execute o script de configuração:

```bash
git clone https://github.com/m3nininho/portfolio.git
cd portfolio
composer setup
```

O comando `composer setup` instala as dependências PHP e JavaScript, cria o arquivo `.env` a partir de `.env.example`, gera a chave da aplicação, executa as migrations e faz o build do front-end.

Em seguida, crie o link público para os arquivos enviados pelo painel:

```bash
php artisan storage:link
```

Para popular o banco com projetos de exemplo:

```bash
php artisan db:seed --class=ProjectSeeder
```

## Desenvolvimento

```bash
composer dev
```

Inicia em paralelo o servidor da aplicação, o worker da fila e o Vite com hot reload. A aplicação fica disponível em `http://localhost:8000`.

## Acesso ao painel

O cadastro público de usuários não está habilitado. Para acessar o painel, crie uma conta e conceda a permissão de administrador:

```bash
php artisan db:seed
```

```bash
php artisan portfolio:admin test@example.com
```

O seeder padrão cria o usuário `test@example.com` com a senha `password`. O comando `portfolio:admin` aceita o e-mail de qualquer conta existente e apenas libera o acesso, sem alterar a senha.

Depois de autenticado, o painel fica disponível em `/dashboard`.

## Scripts

### Composer

| Comando                  | Descrição                                                        |
| ------------------------ | ---------------------------------------------------------------- |
| `composer setup`         | Configuração inicial completa do projeto                         |
| `composer dev`           | Servidor, fila e Vite em paralelo                                |
| `composer test`          | Verificação de estilo, análise estática e suíte de testes        |
| `composer lint`          | Formata o código PHP com Pint                                    |
| `composer lint:check`    | Verifica a formatação sem alterar arquivos                       |
| `composer types:check`   | Análise estática com PHPStan                                     |
| `composer ci:check`      | Todas as verificações de front-end e back-end executadas no CI   |

### npm

| Comando                | Descrição                                     |
| ---------------------- | --------------------------------------------- |
| `npm run dev`          | Servidor de desenvolvimento do Vite           |
| `npm run build`        | Build de produção                             |
| `npm run build:ssr`    | Build de produção com renderização no servidor|
| `npm run check`        | Lint e formatação do front-end                |
| `npm run check:fix`    | Corrige automaticamente os problemas apontados|
| `npm run types:check`  | Verificação de tipos com TypeScript           |

## Testes

```bash
php artisan test
```

Para executar um arquivo específico:

```bash
php artisan test tests/Feature/ProjectManagementTest.php
```

Os testes cobrem autenticação, configurações de conta e o gerenciamento de projetos, incluindo as regras de autorização do painel.

## Integração contínua

O workflow `.github/workflows/tests.yml` é executado a cada push na branch `main` e em pull requests. Ele prepara o ambiente com PHP 8.4 e Node.js 22, executa `composer setup` e em seguida `composer ci:check`.

## Deploy

O arquivo `Dockerfile.vercel` gera uma imagem de produção baseada em PHP 8.4 com suporte a PostgreSQL. A imagem instala as dependências sem pacotes de desenvolvimento, faz o build dos assets e inicia a aplicação na porta definida pela variável `PORT`.

Variáveis de ambiente necessárias em produção:

```dotenv
APP_ENV=production
APP_DEBUG=false
APP_KEY=
APP_URL=

DB_CONNECTION=pgsql
DB_HOST=
DB_PORT=5432
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=

SESSION_DRIVER=database
```

Após o primeiro deploy, execute as migrations e conceda acesso de administrador à sua conta:

```bash
php artisan migrate --force
```

```bash
php artisan portfolio:admin seu-email@dominio.com
```

## Licença

Distribuído sob a licença MIT.
