# Portfolio — Matteo Cigognini (TypeScript)

Porting in TypeScript del portfolio personale, con un restyling grafico completo (tema scuro, accenti arancioni).

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript (strict) · CSS Modules · FontAwesome · Markdown (remark/rehype)

## Avvio

```bash
npm install
npm run dev        # http://localhost:3000 → redirect automatico a /it o /en
npm run build      # build di produzione (include il type-check)
npm run typecheck  # solo controllo dei tipi
```

## Struttura

```
app/
  [lang]/                 # tutte le pagine sono localizzate (it / en)
    layout.tsx            # root layout: <html lang>, font, sfondo animato
    page.tsx              # home: hero, stack, lavori, progetti, ultimi articoli
    projects/page.tsx
    blog/page.tsx
    blog/post/[segmentName]/page.tsx
    dictionaries/         # it.json è la fonte di verità del tipo `Dictionary`
  components/             # Header, Footer, Section, Cards, Marquee, Reveal...
data/                     # lavori, progetti, tecnologie, social (tipizzati)
lib/                      # i18n, lettura post markdown
posts/                    # articoli del blog in Markdown con front-matter
types/                    # tipi condivisi
middleware.ts             # redirect alla lingua preferita del browser
```

## Aggiungere contenuti

- **Lavoro / progetto:** aggiungi una voce in `data/works.ts` o `data/projects.ts`, l'immagine in `public/images/...`
  e la descrizione in **entrambi** i dizionari (`items.<slug>.description`).
- **Articolo:** crea `posts/<slug>.md` con il front-matter (`title`, `description`, `image`, `category`, `author`, `tags`, `date`).
- **Testi:** modifica `app/[lang]/dictionaries/it.json`; `en.json` deve avere la stessa struttura,
  altrimenti TypeScript segnala l'errore in fase di build.
