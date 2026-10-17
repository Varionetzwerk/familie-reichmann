<script setup>
import { commandments } from '../../content/reichmann';
import AppIcon from '../AppIcon.vue';

const values = [
  { label: 'Loyalität', icon: 'shield' },
  { label: 'Diskretion', icon: 'eyeSlash' },
  { label: 'Einfluss', icon: 'crown' },
];
</script>

<template>
  <section id="gebote" class="section-block section-alt">
    <div class="glow glow-accent gebote-glow" aria-hidden="true"></div>
    <div class="container">
      <div class="section-head" v-reveal>
        <span class="eyebrow">Hausordnung</span>
        <h2 class="section-title">Die Gebote der <span class="accent-text">Familie</span></h2>
        <p class="section-sub">Drei Werte, sechs Gebote. Wer sie bricht, zahlt die nächste Pizza.</p>
        <ul class="values">
          <li v-for="v in values" :key="v.label">
            <AppIcon :name="v.icon" />
            {{ v.label }}
          </li>
        </ul>
      </div>

      <ol class="gebote">
        <li v-for="(c, i) in commandments" :key="c.title" class="gebot card-hover" v-reveal="(i % 2) * 100">
          <span class="gebot-num">{{ String(i + 1).padStart(2, '0') }}</span>
          <div>
            <h3>{{ c.title }}</h3>
            <p>{{ c.note }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.gebote-glow {
  top: 50%;
  left: 50%;
  width: 640px;
  height: 320px;
  translate: -50% -50%;
  opacity: 0.6;
}

.values {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin: 1.75rem 0 0;
  padding: 0;
  list-style: none;
}

.values li {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-soft);
}

.values svg {
  width: 16px;
  height: 16px;
  color: var(--accent-light);
}

.gebote {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.gebot {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  padding: 1.5rem 1.6rem;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: rgba(26, 29, 39, 0.6);
}

.gebot-num {
  flex-shrink: 0;
  min-width: 2.6rem;
  font-size: 2rem;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--accent-light);
}

.gebot h3 {
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 0.35rem;
}

.gebot p {
  color: var(--text-muted);
  font-size: 0.92rem;
}

@media (max-width: 800px) {
  .gebote {
    grid-template-columns: 1fr;
  }
}
</style>
