# Familie Reichmann

Website der Familie Reichmann (Garry's-Mod-Rollenspiel): Lore, Gebote, Rangordnung, Meme-Wand,
Familienausweis- und Ausreden-Generator. Bewerbungen laufen über den Discord-Server.

Die Seite ist rein statisch (Vue 3 + Vite) und wird automatisch auf **GitHub Pages** veröffentlicht.

## Inhalte anpassen

| Was | Wo |
| --- | --- |
| Discord-Einladungslink | `frontend/src/content/reichmann.js` → `DISCORD_INVITE_URL` |
| Ticker, Gebote, Memes, Ausreden, Familienausweis | `frontend/src/content/reichmann.js` |
| Eigene Meme-Bilder | Bild nach `frontend/public/memes/` legen, in `memes` eintragen (`src: 'memes/datei.png'`) |
| Texte, Ränge, FAQ, geschwärzte Akte | `frontend/src/views/Home.vue` |

## Lokal ansehen

```bash
cd frontend
npm install
npm run dev
```

Danach läuft die Seite unter http://localhost:5173.

## Veröffentlichen

Jeder Push auf `main` baut die Seite über GitHub Actions (`.github/workflows/deploy.yml`) und stellt sie
auf GitHub Pages bereit. Den Stand siehst du im Repo unter **Actions**.

## Vollversion mit Backend

Die frühere Version mit Login, Bewerbungsformular, Verwaltung und Docker-Setup liegt lokal im
Git-Branch `fullstack` (`git switch fullstack`). Sie ist nicht auf GitHub hochgeladen.
