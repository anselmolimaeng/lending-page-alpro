# Site Alpro Engenharia e Construção

Site estático (HTML + CSS + JS puro, sem dependências). Pode ser hospedado em qualquer servidor.

## Estrutura

```
index.html, sobre.html, administracao-de-obras.html, reformas-alto-padrao.html,
orcamento.html, portfolio.html, contato.html   ← páginas finais (geradas)
assets/css/style.css   ← estilos e paleta (variáveis no topo)
assets/js/main.js      ← menu, animações, filtro do portfólio, formulários
assets/img/            ← logo, favicon e fotos das obras (assets/img/obras/)
src/partials/          ← head, header (menu) e footer, compartilhados
src/pages/             ← conteúdo de cada página
build.sh               ← monta as páginas finais a partir de src/
serve.ps1              ← servidor local para visualizar (http://localhost:8080)
```

**Edite sempre em `src/` e depois rode `bash build.sh`.** A 1ª linha de cada arquivo em
`src/pages/` é `id-da-página|Título|Descrição (SEO)`.

## Paleta (extraída da logomarca e do site atual)

| Cor | Hex | Uso |
|---|---|---|
| Navy | `#0f2241` | "Alpro" na logo — cor principal, fundos escuros |
| Azul | `#0067b0` | cubo da logo — links, ícones |
| Ciano | `#0ca3dd` | cubo da logo / destaque do site atual — botões, detalhes |
| Tinta | `#121111` | texto |

## Pendências (substituir antes de publicar)

- [ ] **Foto da equipe em obra** — `sobre.html` (seção "Nossa estrutura") e `index.html` (seção "Sobre a Alpro")
- [ ] **Mais obras no portfólio** — `src/pages/portfolio.html`: 4 blocos com `.ph` e `[Nome da obra]`
- [x] **E-mail** — `anselmo.lima@alpro.com.br` (confirmado). WhatsApp principal: (19) 99773-8131 (`WHATSAPP` em main.js)
- [ ] **Endereço** — usado o do site atual (R. Jaceru, 225 – SP); confirmar e incluir endereço em Campinas, se houver
- [ ] **WhatsApp** — formulários enviam para `(11) 93081-5891` (constante `WHATSAPP` em main.js)

### Trocar um placeholder por foto

Substitua `<div class="ph" ...></div>` por
`<img src="assets/img/obras/NOME.jpg" alt="Descrição da foto" loading="lazy">`.
Fotos em JPG, ~1600px no lado maior, até ~400 KB.

## Formulários

Não há backend: ao enviar, o formulário valida os campos e abre o WhatsApp da Alpro com a
mensagem preenchida (com opção de e-mail). Para receber por e-mail automaticamente, basta ligar
o `<form>` a um serviço como Formspree/Netlify Forms ou ao backend da hospedagem.

Links para `orcamento.html?servico=admin|reforma|outro` já abrem com o serviço pré-selecionado.
