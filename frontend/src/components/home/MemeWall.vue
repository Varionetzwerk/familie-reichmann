<script setup>
import { ref, computed } from 'vue';
import { FAMILY, memes } from '../../content/reichmann';
import AppIcon from '../AppIcon.vue';
import MemeCard from './MemeCard.vue';

const CATEGORY_OF = {
  drake: 'classic',
  expectation: 'classic',
  brain: 'classic',
  buttons: 'classic',
  changemind: 'classic',
  tier: 'classic',
  starter: 'classic',
  image: 'classic',
  chat: 'posts',
  nobody: 'posts',
  pov: 'posts',
  achievement: 'special',
  wanted: 'special',
  quote: 'quotes',
};

const CATEGORIES = [
  { key: 'all', label: 'Alle' },
  { key: 'classic', label: 'Klassiker' },
  { key: 'posts', label: 'Chats & Posts' },
  { key: 'special', label: 'Erfolge & Plakate' },
  { key: 'quotes', label: 'Zitate' },
];

const numbered = memes.map((meme, index) => ({ meme, number: index + 1, category: CATEGORY_OF[meme.type] ?? 'classic' }));

// Same "meme of the day" for everyone on a given day.
const startOfYear = new Date(new Date().getFullYear(), 0, 0);
const dailyIndex = Math.floor((Date.now() - startOfYear) / 86_400_000) % memes.length;
const featuredIndex = ref(dailyIndex);
const featured = computed(() => numbered[featuredIndex.value]);

function rollFeatured() {
  let next = featuredIndex.value;
  while (memes.length > 1 && next === featuredIndex.value) {
    next = Math.floor(Math.random() * memes.length);
  }
  featuredIndex.value = next;
}

const category = ref('all');
const countIn = (key) => (key === 'all' ? numbered.length : numbered.filter((m) => m.category === key).length);
const visible = computed(() =>
  numbered.filter(
    (m) => m.number - 1 !== featuredIndex.value && (category.value === 'all' || m.category === category.value)
  )
);
</script>

<template>
  <section id="memes" class="section-block section-alt">
    <div class="container">
      <div class="section-head" v-reveal>
        <span class="eyebrow">Nur zum Schmunzeln</span>
        <h2 class="section-title">Die <span class="accent-text">Meme-Wand</span></h2>
        <p class="section-sub">Offiziell nicht von der Familie freigegeben. Inoffiziell hängt sie im Hauptquartier.</p>
      </div>

      <div class="featured" v-reveal>
        <div class="featured-bar">
          <span class="featured-label">
            <span class="pulse-dot"></span>
            {{ featuredIndex === dailyIndex ? 'Meme des Tages' : 'Zufallsfund' }}
          </span>
          <button type="button" class="btn btn-secondary btn-sm" @click="rollFeatured">
            <AppIcon name="arrowPath" stroke="2" /> Neues Meme
          </button>
        </div>
        <Transition name="swap" mode="out-in">
          <MemeCard :key="featured.number" :meme="featured.meme" :number="featured.number" class="featured-card" />
        </Transition>
      </div>

      <div class="filters" role="group" aria-label="Memes filtern" v-reveal>
        <button
          v-for="c in CATEGORIES"
          :key="c.key"
          type="button"
          :class="['filter', { 'is-active': category === c.key }]"
          :aria-pressed="category === c.key"
          @click="category = c.key"
        >
          {{ c.label }} <span class="filter-count">{{ countIn(c.key) }}</span>
        </button>
      </div>

      <div class="wall">
        <div v-for="(item, i) in visible" :key="item.number" class="wall-item" v-reveal="(i % 3) * 80">
          <MemeCard :meme="item.meme" :number="item.number" class="card-hover" />
        </div>
      </div>

      <p class="wall-note" v-reveal>
        Eigene Memes? Diskret beim Schattenkanzler einreichen — per Discord an <span class="mono">{{ FAMILY.contact }}</span>.
      </p>
    </div>
  </section>
</template>

<style scoped>
.featured {
  max-width: 600px;
  margin: 0 auto 3rem;
}

.featured-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.featured-label {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent-light);
}

.featured-card {
  border-color: rgba(168, 85, 247, 0.45) !important;
  box-shadow: 0 0 0 1px rgba(168, 85, 247, 0.15), 0 24px 60px -24px rgba(168, 85, 247, 0.35);
}

.filters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.75rem;
}

.filter {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-muted);
  font: 600 0.85rem var(--font);
  cursor: pointer;
  transition: color 0.15s ease, border-color 0.15s ease, background-color 0.15s ease;
}

.filter:hover {
  color: #fff;
}

.filter.is-active {
  border-color: rgba(168, 85, 247, 0.5);
  background: rgba(168, 85, 247, 0.12);
  color: var(--accent-light);
}

.filter-count {
  padding: 0 0.4rem;
  border-radius: 999px;
  background: var(--surface-2);
  font-size: 0.72rem;
  color: var(--text-soft);
}

.wall {
  columns: 3 300px;
  column-gap: 1.25rem;
}

.wall-item {
  break-inside: avoid;
  margin-bottom: 1.25rem;
}

.wall-note {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: var(--text-dim);
}

.mono {
  font-family: var(--font-mono);
  color: var(--text-soft);
}

.swap-enter-active,
.swap-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.swap-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.swap-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
