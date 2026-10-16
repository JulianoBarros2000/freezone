# 🎵 FREEZONE — Plataforma de Distribuição Musical

**FREEZONE** é uma plataforma digital de distribuição musical criada para ajudar artistas independentes a gerir os seus lançamentos, organizar o seu catálogo musical, acompanhar o processo de distribuição e centralizar a gestão da sua actividade artística num único espaço.

O projecto pretende oferecer uma experiência moderna, intuitiva e profissional, aproximando os artistas das oportunidades do mercado musical digital.

> **A nossa visão:** dar aos artistas mais controlo sobre a sua música, a sua identidade e o seu percurso profissional.

---

## 📌 Sobre o Projecto

A FREEZONE está a ser desenvolvida como uma plataforma de gestão e distribuição musical com áreas distintas para artistas e administradores.

O artista deverá poder gerir o seu perfil, submeter músicas, acompanhar lançamentos, consultar informações financeiras e solicitar levantamentos. A administração terá ferramentas próprias para gerir contas, utilizadores, artistas, músicas, distribuidoras, operações e configurações da plataforma.

O projecto encontra-se em desenvolvimento. Algumas funcionalidades estão representadas através de interfaces demonstrativas e necessitam de integração com o backend para funcionarem com dados reais.

## 🎯 Objectivos

- Criar uma plataforma de distribuição musical moderna e acessível.
- Facilitar a gestão de artistas e respectivos catálogos musicais.
- Organizar o processo de submissão e acompanhamento de lançamentos.
- Disponibilizar dashboards específicos para artistas e administradores.
- Centralizar informações sobre distribuições e pedidos de levantamento.
- Preparar uma arquitectura escalável para futuras integrações com serviços de distribuição digital.
- Implementar mecanismos de segurança, controlo de acesso e auditoria.

## ✨ Principais Funcionalidades

### 🎤 Área do Artista

A área do artista está prevista para incluir:

- Criação e gestão do perfil artístico.
- Submissão e gestão de músicas.
- Registo de informações sobre álbuns, singles e EPs.
- Acompanhamento do estado dos lançamentos.
- Consulta do histórico de distribuição.
- Consulta de informações financeiras disponibilizadas pela plataforma.
- Solicitação e acompanhamento de levantamentos.
- Gestão de dados pessoais e informações de contacto.
- Alteração da palavra-passe e gestão de sessões activas.
- Consulta de notificações e actualizações da conta.

### 🛡️ Painel Administrativo

O painel administrativo foi concebido para centralizar a gestão operacional da FREEZONE.

Os módulos previstos ou representados na interface incluem:

- **Visão geral:** indicadores e resumo da actividade da plataforma.
- **Contas:** criação, consulta, edição, activação e suspensão de contas.
- **Utilizadores:** gestão de utilizadores internos, funções e permissões.
- **Artistas:** registo, edição, verificação e acompanhamento de perfis.
- **Músicas e lançamentos:** gestão de metadados, revisão e estados de aprovação.
- **Distribuidoras:** gestão de parceiros, contactos e informações de integração.
- **Entregas digitais:** acompanhamento dos estados de envio dos lançamentos.
- **Levantamentos:** consulta e gestão dos pedidos financeiros.
- **Configurações:** administração dos parâmetros da plataforma.
- **Relatórios:** preparação de dados para consulta e exportação.
- **Auditoria:** histórico das operações administrativas.
- **Notificações:** visualização de alertas e acontecimentos importantes.

**Nota:** os módulos e as operações que ainda utilizam dados demonstrativos não devem ser considerados integrações reais. A persistência definitiva, as permissões e as operações financeiras dependem da implementação e validação do backend.

## 🧰 Tecnologias

### Frontend

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- jQuery
- Bootstrap Icons
- Chart.js, quando necessário para gráficos

A interface privilegia uma apresentação responsiva, navegação intuitiva, componentes reutilizáveis e efeitos visuais adequados a uma plataforma musical profissional.

### Backend — planeado

- Node.js
- Express.js
- API REST
- MySQL ou MariaDB
- Validação de dados
- Autenticação e autorização por funções
- Registo de operações e tratamento de erros

Estas tecnologias constituem a base técnica prevista para a integração dos módulos do frontend. A sua presença no planeamento não significa que todos os serviços já estejam implementados.

## 🎨 Identidade Visual

A FREEZONE adopta uma direcção visual moderna, com uma interface escura e elementos roxos que reforçam a identidade digital da marca.

| Elemento | Cor |
|---|---|
| Fundo principal | `#121212` |
| Roxo principal | `#8A2BE2` |
| Roxo alternativo | `#6A0DAD` |
| Cartões e painéis | `#1E1E1E` |
| Texto principal | `#E0E0E0` |

A identidade visual foi pensada para proporcionar uma experiência consistente nos dashboards, formulários, tabelas e restantes componentes da plataforma.

## 📁 Estrutura do Projecto

Uma organização de referência para o desenvolvimento pode seguir esta estrutura:

```text
freezone/
├── frontend/
│   ├── index.html
│   ├── assets/
│   │   ├── css/
│   │   ├── js/
│   │   ├── images/
│   │   └── icons/
│   ├── artist/
│   │   └── dashboard.html
│   └── admin/
│       ├── admin-dashboard.html
│       ├── admin-dashboard.css
│       └── admin-dashboard.js
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── middlewares/
│   │   ├── validators/
│   │   └── config/
│   ├── database/
│   ├── .env.example
│   └── package.json
├── docs/
└── README.md
```

Esta é uma estrutura de referência para organizar o projecto à medida que evolui. Nem todas as pastas e funcionalidades indicadas estão necessariamente implementadas na versão actual.

## ⚙️ Como Executar o Frontend

### 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

### 2. Entrar na pasta do projecto

```bash
cd freezone
```

### 3. Abrir a interface

Abre o ficheiro `index.html` no navegador ou utiliza a extensão **Live Server** do Visual Studio Code.

Para testar o painel administrativo, abre `frontend/admin/admin-dashboard.html`, ajustando o caminho à estrutura real dos ficheiros.

> O frontend utiliza recursos externos por CDN. Uma ligação à Internet poderá ser necessária para carregar algumas bibliotecas.

## 🗄️ Base de Dados e API

A arquitectura futura deverá utilizar uma base de dados relacional para organizar entidades como:

- Utilizadores e contas.
- Perfis de artistas.
- Músicas e lançamentos.
- Distribuidoras e entregas.
- Pedidos de levantamento.
- Configurações.
- Notificações.
- Registos de auditoria.

A API REST deverá validar os dados recebidos, verificar as permissões do utilizador, aplicar as regras de negócio e comunicar com a base de dados.

As operações críticas, incluindo alterações de permissões e decisões financeiras, devem ser processadas no servidor e devidamente registadas.

## 🔐 Segurança

A segurança será um componente essencial da FREEZONE. A implementação deverá contemplar:

- Autenticação de utilizadores.
- Autorização baseada em funções e permissões.
- Protecção das rotas administrativas no servidor.
- Validação dos dados enviados pelo frontend.
- Protecção das credenciais e variáveis de ambiente.
- Gestão segura de sessões e palavras-passe.
- Registo de acções administrativas.
- Protecção contra acessos não autorizados.
- Verificação dos pedidos antes de qualquer operação financeira.

**Importante:** esconder páginas ou botões com JavaScript não é suficiente para proteger uma área administrativa. A autorização deverá ser aplicada e verificada no backend.

## 🌐 Integração com Distribuidoras Musicais

A FREEZONE pretende preparar a integração com serviços de distribuição musical para permitir o encaminhamento de lançamentos às plataformas digitais.

A realização desta integração dependerá da disponibilidade de APIs, de contratos comerciais, das condições de acesso e dos requisitos técnicos de cada parceiro. Até essa implementação, os estados exibidos na interface não devem ser interpretados como prova de entrega real a plataformas externas.

## 🗺️ Etapas de Desenvolvimento

- [x] Definição inicial do conceito da plataforma.
- [x] Definição da identidade visual e direcção do frontend.
- [x] Criação de interfaces demonstrativas para dashboards.
- [x] Organização do painel administrativo em HTML, CSS e JavaScript separados.
- [ ] Consolidar e testar todas as páginas do frontend.
- [ ] Definir o modelo final da base de dados.
- [ ] Desenvolver a API REST.
- [ ] Implementar autenticação e permissões no servidor.
- [ ] Ligar os formulários e tabelas à base de dados.
- [ ] Implementar o fluxo real de submissão e revisão musical.
- [ ] Integrar distribuidoras autorizadas.
- [ ] Implementar e testar os fluxos financeiros.
- [ ] Realizar testes funcionais, de segurança e de responsividade.
- [ ] Preparar a publicação da plataforma em produção.

## 🤝 Contribuição

A estrutura, o código e a documentação devem manter uma organização consistente. Antes de adicionar novas funcionalidades, recomenda-se confirmar se o módulo já existe, reutilizar componentes quando apropriado e documentar alterações relevantes.

As contribuições devem respeitar os requisitos de segurança, a identidade visual e a separação de responsabilidades entre frontend, backend e base de dados.

## 📄 Licença

A licença de distribuição e utilização da FREEZONE deverá ser definida pelo responsável pelo projecto antes da publicação pública do código.

Até essa definição, não se deve presumir que o projecto está disponibilizado sob uma licença de código aberto.

---

**FREEZONE — A tua música. O teu percurso. O teu espaço.**

*Projecto em desenvolvimento.*

