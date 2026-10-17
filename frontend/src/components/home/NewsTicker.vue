<script setup>
import { tickerItems } from '../../content/reichmann';
</script>

<template>
  <section class="ticker" aria-label="Gerüchteküche">
    <span class="ticker-label">
      <span class="pulse-dot"></span>
      Eilmeldung
    </span>
    <div class="ticker-viewport">
      <div class="ticker-track">
        <ul class="ticker-group">
          <li v-for="item in tickerItems" :key="item">{{ item }}</li>
        </ul>
        <ul class="ticker-group" aria-hidden="true">
          <li v-for="item in tickerItems" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ticker {
  position: relative;
  display: flex;
  align-items: stretch;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  background: var(--surface-overlay);
  overflow: hidden;
}

.ticker-label {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-shrink: 0;
  padding: 0.85rem 1.25rem;
  background: #2a1218;
  border-right: 1px solid rgba(248, 113, 113, 0.3);
  color: #fca5a5;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.ticker-viewport {
  flex: 1;
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent);
}

.ticker-track {
  display: flex;
  width: max-content;
  animation: marquee 70s linear infinite;
}

.ticker:hover .ticker-track {
  animation-play-state: paused;
}

.ticker-group {
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
}

.ticker-group li {
  display: flex;
  align-items: center;
  padding: 0.85rem 0;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-soft);
  white-space: nowrap;
}

.ticker-group li::before {
  content: '+++';
  margin: 0 1.25rem;
  font-weight: 800;
  color: var(--accent-light);
}

@keyframes marquee {
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ticker-track {
    animation: none;
  }

  .ticker-viewport {
    overflow-x: auto;
  }
}

@media (max-width: 600px) {
  .ticker-label {
    padding: 0.85rem 0.9rem;
    font-size: 0.68rem;
  }
}
</style>
