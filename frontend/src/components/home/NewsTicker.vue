<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { tickerItems } from '../../content/reichmann';
import { openArticle } from '../../composables/articleFocus';

// Fresh order on every visit.
const items = [...tickerItems];
for (let i = items.length - 1; i > 0; i -= 1) {
  const j = Math.floor(Math.random() * (i + 1));
  [items[i], items[j]] = [items[j], items[i]];
}

const TAG_COLOR = {
  Eilmeldung: 'red',
  Familie: 'gold',
  Gerücht: 'violet',
  Sport: 'orange',
  Börse: 'green',
  Polizei: 'blue',
  Wetter: 'sky',
  Wissenschaft: 'indigo',
};

const duration = `${Math.max(60, items.length * 7)}s`;

const clock = ref('');
let clockTimer = null;

function updateClock() {
  clock.value = new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
}

onMounted(() => {
  updateClock();
  clockTimer = setInterval(updateClock, 15_000);
});

onUnmounted(() => clearInterval(clockTimer));
</script>

<template>
  <section class="ticker" aria-label="RNN – Reichmann News Network">
    <div class="ticker-label">
      <span class="ticker-brand">RNN</span>
      <span class="ticker-live">
        <span class="pulse-dot"></span>
        Live <span class="ticker-clock">{{ clock }}</span>
      </span>
    </div>
    <div class="ticker-viewport">
      <div class="ticker-track" :style="{ animationDuration: duration }">
        <ul v-for="copy in 2" :key="copy" class="ticker-group" :aria-hidden="copy === 2 ? 'true' : undefined">
          <li v-for="item in items" :key="item.text">
            <span :class="['ticker-tag', `ticker-tag--${TAG_COLOR[item.tag] ?? 'violet'}`]">{{ item.tag }}</span>
            <a
              v-if="item.article"
              :href="`#bericht-${item.article}`"
              :tabindex="copy === 2 ? -1 : undefined"
              class="ticker-link"
              @click.prevent="openArticle(item.article)"
            >
              {{ item.text }}
            </a>
            <span v-else>{{ item.text }}</span>
          </li>
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
  gap: 0.75rem;
  flex-shrink: 0;
  padding: 0 1.1rem;
  background: #2a1218;
  border-right: 1px solid rgba(248, 113, 113, 0.3);
}

.ticker-brand {
  padding: 0.15rem 0.45rem;
  border-radius: 6px;
  background: #dc2626;
  color: #fff;
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0.06em;
}

.ticker-live {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  color: #fca5a5;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.ticker-clock {
  font-family: var(--font-mono);
  font-weight: 600;
  letter-spacing: 0;
  color: #fecaca;
}

.ticker-viewport {
  flex: 1;
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 3%, #000 97%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 3%, #000 97%, transparent);
}

.ticker-track {
  display: flex;
  width: max-content;
  animation: marquee linear infinite;
}

.ticker:hover .ticker-track,
.ticker:focus-within .ticker-track {
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
  gap: 0.6rem;
  padding: 0.85rem 2rem 0.85rem 0;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-soft);
  white-space: nowrap;
}

.ticker-tag {
  padding: 0.12rem 0.5rem;
  border-radius: 6px;
  font-size: 0.66rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.ticker-tag--red {
  background: rgba(239, 68, 68, 0.15);
  color: #fca5a5;
}

.ticker-tag--gold {
  background: rgba(251, 191, 36, 0.12);
  color: var(--gold-light);
}

.ticker-tag--violet {
  background: rgba(168, 85, 247, 0.14);
  color: var(--accent-light);
}

.ticker-tag--orange {
  background: rgba(249, 115, 22, 0.13);
  color: #fdba74;
}

.ticker-tag--green {
  background: rgba(52, 211, 153, 0.12);
  color: #6ee7b7;
}

.ticker-tag--blue {
  background: rgba(59, 130, 246, 0.14);
  color: #93c5fd;
}

.ticker-tag--sky {
  background: rgba(56, 189, 248, 0.12);
  color: #7dd3fc;
}

.ticker-tag--indigo {
  background: rgba(129, 140, 248, 0.14);
  color: var(--indigo-light);
}

.ticker-link {
  border-bottom: 1px dashed rgba(209, 213, 219, 0.35);
  transition: color 0.15s ease, border-color 0.15s ease;
}

.ticker-link:hover,
.ticker-link:focus-visible {
  color: #fff;
  border-color: var(--accent-light);
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
    padding: 0 0.75rem;
  }

  .ticker-live {
    display: none;
  }
}
</style>
