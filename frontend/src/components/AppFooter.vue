<script setup>
import { DISCORD_INVITE_URL } from '../content/reichmann';
import CrestIcon from './CrestIcon.vue';
import DiscordIcon from './DiscordIcon.vue';

const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <div class="container footer-grid">
      <div class="footer-about">
        <RouterLink to="/" class="footer-brand">
          <CrestIcon class="footer-crest" />
          <span>Familie <span class="accent-text">Reichmann</span></span>
        </RouterLink>
        <p>Die Schattendynastie auf unserem Garry's-Mod-Rollenspielserver. Loyal, diskret, einflussreich.</p>
        <a :href="DISCORD_INVITE_URL" target="_blank" rel="noopener" class="btn btn-discord btn-sm footer-discord">
          <DiscordIcon />
          Discord beitreten
        </a>
      </div>

      <nav class="footer-col" aria-label="Familie">
        <h4>Familie</h4>
        <RouterLink :to="{ path: '/', hash: '#gebote' }">Gebote</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#ranks' }">Rangordnung</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#chronik' }">Geheime Akte</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#faq' }">FAQ</RouterLink>
      </nav>

      <nav class="footer-col" aria-label="Unterhaltung">
        <h4>Zum Schmunzeln</h4>
        <RouterLink :to="{ path: '/', hash: '#memes' }">Meme-Wand</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#spielwiese' }">Familienausweis</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#spielwiese' }">Ausreden-Generator</RouterLink>
      </nav>
    </div>

    <div class="container footer-bottom">
      <span>&copy; {{ year }} Familie Reichmann</span>
      <span>Eine inoffizielle Garry's-Mod-Rollenspielseite. Du warst nie hier. Wir haben dich nie gesehen.</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  background: var(--surface-overlay);
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 2.5rem;
  padding-top: 3.5rem;
  padding-bottom: 3rem;
}

.footer-brand {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 800;
  font-size: 1.05rem;
  color: #fff;
  margin-bottom: 1rem;
}

.footer-crest {
  width: 30px;
  height: 30px;
}

.footer-about p {
  max-width: 340px;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.footer-discord {
  margin-top: 1.25rem;
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.footer-col h4 {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-dim);
  margin-bottom: 0.35rem;
}

.footer-col a {
  width: fit-content;
  font-size: 0.9rem;
  color: var(--text-muted);
  transition: color 0.2s ease;
}

.footer-col a:hover {
  color: var(--accent-light);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  border-top: 1px solid var(--border);
  font-size: 0.8rem;
  color: var(--text-dim);
}

@media (max-width: 720px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }

  .footer-about {
    grid-column: 1 / -1;
  }
}
</style>
