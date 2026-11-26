# Portfolio — Matteo Cigognini

Portfolio personale e blog, riscritto in **TypeScript** con un restyling grafico completo: tema scuro, accenti arancioni, animazioni leggere e sito bilingue (italiano / inglese).

🔗 **Online:** [matteocigognini.it](https://matteocigognini.it)

## Indice

- [Funzionalità](#funzionalità)
- [Stack](#stack)
- [Requisiti](#requisiti)
- [Avvio rapido](#avvio-rapido)
- [Script disponibili](#script-disponibili)
- [Struttura del progetto](#struttura-del-progetto)
- [Come funziona](#come-funziona)
  - [Lingue (i18n)](#lingue-i18n)
  - [Blog in Markdown](#blog-in-markdown)
  - [Dati tipizzati](#dati-tipizzati)
- [Aggiungere contenuti](#aggiungere-contenuti)
- [Convenzioni](#convenzioni)
- [Deploy](#deploy)

## Funzionalità

- **Home** con presentazione, stack tecnologico (in uso e in studio), lavori, progetti personali e ultimi articoli.
- **Pagina progetti** e **blog** con elenco articoli e pagina di dettaglio.
- **Due lingue** con URL dedicati (`/it/...`, `/en/...`), redirect automatico alla lingua del browser e selettore di lingua che mantiene la pagina corrente.
- **Articoli in Markdown** con front-matter, supporto GFM, evidenziazione del codice, tempo di lettura stimato e barra di avanzamento della lettura.
- **Generazione statica**: tutte le pagine (anche ogni articolo in ogni lingua) sono pre-renderizzate in fase di build.
- **SEO**: metadati e Open Graph per ogni pagina, `alternates` tra le lingue, metadati di tipo `article` per i post.
- **Animazioni** di comparsa allo scroll, card con effetto “spotlight” al passaggio del mouse, marquee infinito; il contenuto resta visibile anche senza JavaScript.

## Stack

| Ambito       | Tecnologie                                                            |
| ------------ | --------------------------------------------------------------------- |
| Framework    | [Next.js 15](https://nextjs.org) (App Router) · React 19              |
| Linguaggio   | TypeScript in modalità `strict`                                       |
| Stile        | CSS Modules + `globals.css` · font Mona Sans e JetBrains Mono         |
| Icone        | FontAwesome                                                           |
| Markdown     | gray-matter · remark (+ GFM) · rehype · highlight.js                  |

## Requisiti

- **Node.js** 18.18 o superiore (consigliato 20+)
- **npm**

## Avvio rapido

```bash
git clone https://github.com/MatteoCigognini/portfolio-ts.git
cd portfolio-ts
npm install
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000): verrai reindirizzato a `/it` o `/en` in base alla lingua del browser.

## Script disponibili

| Comando             | Descrizione                                                   |
| ------------------- | ------------------------------------------------------------- |
| `npm run dev`       | Server di sviluppo con hot reload                             |
| `npm run build`     | Build di produzione (include il controllo dei tipi)           |
| `npm run start`     | Avvia la build di produzione (dopo `npm run build`)           |
| `npm run typecheck` | Solo controllo dei tipi, senza build                          |

## Struttura del progetto

```
app/
  [lang]/                        # tutte le pagine sono localizzate (it / en)
    layout.tsx                   # root layout: <html lang>, font, sfondo, metadati di base
    page.tsx                     # home
    projects/page.tsx            # progetti personali
    blog/page.tsx                # elenco articoli
    blog/post/[segmentName]/     # dettaglio articolo
    dictionaries/                # testi dell'interfaccia: it.json, en.json
    dictionaries.ts              # caricamento dei dizionari e tipo `Dictionary`
  components/                    # Header, Footer, Section, Cards, Marquee, Reveal, Blog...
  layout.tsx, not-found.tsx      # layout minimo e pagina 404 fuori dalla lingua
  globals.css                    # variabili, reset e stili globali
data/                            # lavori, progetti, tecnologie, social, autori, categorie
lib/
  i18n.ts                        # lingue supportate e type guard `isLocale`
  getPageContext.ts              # valida la lingua e carica il dizionario per ogni pagina
  posts.ts                       # lettura e conversione degli articoli Markdown
utils/                           # formattazione di date e testi
posts/                           # articoli del blog (.md con front-matter)
public/images/                   # immagini di profilo, lavori, progetti, tecnologie, post
types/                           # tipi condivisi (Work, Project, PostMeta...)
middleware.ts                    # redirect alla lingua preferita del browser
```

Gli import usano l'alias `@/` che punta alla radice del progetto (es. `@/lib/posts`).

## Come funziona

### Lingue (i18n)

- Le lingue supportate sono definite in [`lib/i18n.ts`](lib/i18n.ts) (`LOCALES`, `DEFAULT_LOCALE`).
- [`middleware.ts`](middleware.ts) intercetta ogni URL senza prefisso di lingua e reindirizza in base all'header `Accept-Language` (es. `/projects` → `/it/projects`). File statici, `/_next` e `/api` sono esclusi.
- Ogni pagina chiama `getPageContext(params)`, che valida la lingua (404 se non supportata) e restituisce il dizionario.
- **`it.json` è la fonte di verità**: il tipo `Dictionary` è ricavato da questo file e `en.json` deve rispettarne la struttura (`satisfies Dictionary`). Una chiave mancante o in più fa fallire il type-check.

### Blog in Markdown

Gli articoli sono file in [`posts/`](posts/): l'id dell'articolo (e lo slug della URL) è il nome del file.
[`lib/posts.ts`](lib/posts.ts) li legge con gray-matter, li converte in HTML con remark/rehype e calcola il tempo di lettura (250 parole al minuto).
Gli URL assoluti di `matteocigognini.it` nel campo `image` vengono resi relativi, così le immagini vengono servite da `public/` anche in locale.

### Dati tipizzati

Lavori, progetti, tecnologie, social, autori e categorie sono array tipizzati in [`data/`](data/), con i tipi in [`types/index.ts`](types/index.ts).
Le **descrizioni** di lavori e progetti non stanno nei dati ma nei dizionari, perché sono tradotte.

## Aggiungere contenuti

### Un lavoro o un progetto

1. Aggiungi una voce in [`data/works.ts`](data/works.ts) o [`data/projects.ts`](data/projects.ts).
2. Se `showImage: true`, metti l'immagine in `public/images/works/` o `public/images/projects/`.
3. Aggiungi la descrizione in **entrambi** i dizionari, sotto `works.items.<slug>.description` o `projects.items.<slug>.description`.

### Un articolo

Crea `posts/<slug>.md`:

```markdown
---
title: "Titolo dell'articolo"
slug: "slug-articolo"
category: "web-development"   # uno degli slug in data/categories.ts
description: "Breve descrizione, usata anche per SEO e anteprime"
image: "/images/posts/slug-articolo/cover.webp"
author: "cigognini.matteo"    # nickname di un autore in data/authors.ts
tags: ["next.js", "typescript"]
date: "2025-02-16"            # formato YYYY-MM-DD, usato per l'ordinamento
---

Contenuto in Markdown...
```

L'articolo compare automaticamente nella home, nel blog e viene pre-renderizzato in tutte le lingue alla build successiva.

### Un testo dell'interfaccia

Modifica [`app/[lang]/dictionaries/it.json`](app/[lang]/dictionaries/it.json) e la stessa chiave in `en.json`. Con `npm run typecheck` verifichi che le due strutture coincidano.

### Una nuova lingua

1. Aggiungi il codice in `LOCALES` ([`lib/i18n.ts`](lib/i18n.ts)).
2. Crea il dizionario `app/[lang]/dictionaries/<codice>.json` e registralo in [`dictionaries.ts`](app/[lang]/dictionaries.ts).
3. Aggiungi il formato data in `INTL_LOCALES` ([`utils/dateUtils.ts`](utils/dateUtils.ts)) e la lingua in `alternates` del layout.

TypeScript segnala ogni punto in cui la nuova lingua manca.

## Convenzioni

- Ogni componente ha il proprio file `.module.css` nella stessa cartella.
- I componenti sono **Server Component** di default; solo quelli interattivi (header, barra di lettura, copia email, card spotlight, animazioni di comparsa) usano `'use client'`.
- I moduli che leggono dal disco (`lib/posts.ts`, `lib/getPageContext.ts`, `dictionaries.ts`) importano `server-only`, così non possono finire nel bundle del browser.
- Le funzioni di utilità sono documentate con JSDoc in italiano.

## Deploy

Il progetto è un'app Next.js standard: si può pubblicare su [Vercel](https://vercel.com) importando il repository, oppure su qualsiasi server Node con:

```bash
npm run build
npm run start
```
