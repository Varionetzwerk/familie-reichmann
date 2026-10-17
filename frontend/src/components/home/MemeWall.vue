<script setup>
import { memes } from '../../content/reichmann';
import AppIcon from '../AppIcon.vue';
import CrestIcon from '../CrestIcon.vue';

const FORMAT_LABELS = {
  drake: 'Drake',
  nobody: 'Niemand:',
  brain: 'Expanding Brain',
  quote: 'Zitat',
  tier: 'Tier-Liste',
  pov: 'POV',
  starter: 'Starter Pack',
  image: 'Meme',
};

const TIER_CLASS = { S: 'tier-s', A: 'tier-a', B: 'tier-b', C: 'tier-c', D: 'tier-c', F: 'tier-f' };

// Prefix with the deploy base so images also load under the GitHub Pages sub-path.
const assetUrl = (src) => `${import.meta.env.BASE_URL}${src.replace(/^\//, '')}`;
</script>

<template>
  <section id="memes" class="section-block section-alt">
    <div class="container">
      <div class="section-head" v-reveal>
        <span class="eyebrow">Nur zum Schmunzeln</span>
        <h2 class="section-title">Die <span class="accent-text">Meme-Wand</span></h2>
        <p class="section-sub">Offiziell nicht von der Familie freigegeben. Inoffiziell hängt sie im Hauptquartier.</p>
      </div>

      <div class="wall">
        <article v-for="(meme, i) in memes" :key="i" class="meme card-hover" v-reveal="(i % 3) * 100">
          <header class="meme-head">
            <span class="meme-format">{{ FORMAT_LABELS[meme.type] }}</span>
            <span class="meme-no">#{{ String(i + 1).padStart(3, '0') }}</span>
          </header>

          <!-- Drake -->
          <div v-if="meme.type === 'drake'" class="drake">
            <div class="drake-row drake-row--no">
              <span class="drake-icon"><AppIcon name="thumbDown" /></span>
              <p>{{ meme.no }}</p>
            </div>
            <div class="drake-row drake-row--yes">
              <span class="drake-icon"><AppIcon name="thumbUp" /></span>
              <p>{{ meme.yes }}</p>
            </div>
          </div>

          <!-- Niemand: -->
          <div v-else-if="meme.type === 'nobody'" class="tweet">
            <div class="tweet-author">
              <CrestIcon class="tweet-avatar" />
              <div>
                <strong>Reichmann Leaks</strong>
                <span>@reichmann_intern</span>
              </div>
            </div>
            <p v-for="line in meme.setup" :key="line" class="tweet-setup">{{ line }}</p>
            <p class="tweet-who">{{ meme.who }}</p>
            <p class="tweet-quote">{{ meme.quote }}</p>
          </div>

          <!-- Expanding Brain -->
          <ol v-else-if="meme.type === 'brain'" class="brain">
            <li v-for="(step, s) in meme.steps" :key="step" :class="`brain-lvl-${s + 1}`">
              <p>{{ step }}</p>
              <span class="brain-icon"><AppIcon name="lightBulb" /></span>
            </li>
          </ol>

          <!-- Zitat -->
          <figure v-else-if="meme.type === 'quote'" class="quote">
            <svg class="quote-mark" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M9.5 6C6.5 6 4 8.6 4 11.8V18h6v-6H7c0-2 1.2-3.5 2.5-3.5V6Zm10 0c-3 0-5.5 2.6-5.5 5.8V18h6v-6h-3c0-2 1.2-3.5 2.5-3.5V6Z" />
            </svg>
            <blockquote>{{ meme.text }}</blockquote>
            <figcaption>— {{ meme.author }}</figcaption>
          </figure>

          <!-- Tier-Liste -->
          <ul v-else-if="meme.type === 'tier'" class="tiers">
            <li v-for="row in meme.tiers" :key="row.tier">
              <span :class="['tier-letter', TIER_CLASS[row.tier]]">{{ row.tier }}</span>
              <span class="tier-text">{{ row.text }}</span>
            </li>
          </ul>

          <!-- POV -->
          <div v-else-if="meme.type === 'pov'" class="pov">
            <p class="pov-setup"><span class="accent-text">POV:</span> {{ meme.setup }}</p>
            <p class="pov-punch">{{ meme.punch }}</p>
          </div>

          <!-- Starter Pack -->
          <div v-else-if="meme.type === 'starter'" class="starter">
            <p class="starter-title">Starter Pack: <span class="accent-text">{{ meme.title }}</span></p>
            <ul>
              <li v-for="item in meme.items" :key="item">{{ item }}</li>
            </ul>
          </div>

          <!-- Eigenes Bild -->
          <figure v-else-if="meme.type === 'image'" class="image-meme">
            <img :src="assetUrl(meme.src)" :alt="meme.caption || 'Meme'" loading="lazy" />
            <figcaption v-if="meme.caption">{{ meme.caption }}</figcaption>
          </figure>
        </article>
      </div>

      <p class="wall-note" v-reveal>Eigene Memes? Diskret beim Schattenkanzler einreichen.</p>
    </div>
  </section>
</template>

<style scoped>
.wall {
  columns: 3 300px;
  column-gap: 1.25rem;
}

.meme {
  break-inside: avoid;
  margin-bottom: 1.25rem;
  padding: 1.25rem;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--surface);
}

.meme-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.meme-format {
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  background: rgba(168, 85, 247, 0.1);
  color: var(--accent-light);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.meme-no {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-dim);
}

/* Drake */
.drake {
  display: grid;
  border-radius: var(--radius-sm);
  overflow: hidden;
  border: 1px solid var(--border);
}

.drake-row {
  display: grid;
  grid-template-columns: 72px 1fr;
  align-items: stretch;
}

.drake-row + .drake-row {
  border-top: 1px solid var(--border);
}

.drake-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.drake-icon svg {
  width: 30px;
  height: 30px;
}

.drake-row--no .drake-icon {
  background: rgba(248, 113, 113, 0.1);
  color: var(--danger);
}

.drake-row--yes .drake-icon {
  background: rgba(168, 85, 247, 0.12);
  color: var(--accent-light);
}

.drake-row p {
  padding: 1.1rem 1rem;
  font-weight: 600;
  line-height: 1.45;
}

.drake-row--no p {
  color: var(--text-muted);
  text-decoration: line-through;
  text-decoration-color: rgba(248, 113, 113, 0.55);
}

.drake-row--yes p {
  color: #fff;
}

/* Tweet */
.tweet-author {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 1rem;
}

.tweet-avatar {
  width: 38px;
  height: 38px;
  padding: 4px;
  border-radius: 50%;
  background: var(--surface-2);
}

.tweet-author strong {
  display: block;
  font-size: 0.9rem;
  color: #fff;
}

.tweet-author span {
  font-size: 0.8rem;
  color: var(--text-dim);
}

.tweet-setup {
  color: var(--text-muted);
  margin-bottom: 0.35rem;
}

.tweet-who {
  margin-top: 0.85rem;
  font-weight: 600;
  color: var(--text-soft);
}

.tweet-quote {
  margin-top: 0.35rem;
  font-size: 1.15rem;
  font-weight: 700;
  color: #fff;
}

/* Expanding Brain */
.brain {
  display: grid;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.brain li {
  display: grid;
  grid-template-columns: 1fr 56px;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0.6rem 0.6rem 0.9rem;
  border-radius: var(--radius-sm);
  background: var(--surface-overlay);
  border: 1px solid var(--border);
}

.brain p {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--text-soft);
}

.brain-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  border-radius: 10px;
  background: var(--surface-2);
  color: var(--text-dim);
}

.brain-icon svg {
  width: 24px;
  height: 24px;
}

.brain-lvl-2 .brain-icon {
  color: var(--indigo-light);
  background: rgba(129, 140, 248, 0.12);
}

.brain-lvl-3 .brain-icon {
  color: var(--accent-light);
  background: rgba(168, 85, 247, 0.16);
  box-shadow: 0 0 16px rgba(168, 85, 247, 0.35);
}

.brain-lvl-4 {
  border-color: rgba(251, 191, 36, 0.35) !important;
}

.brain-lvl-4 p {
  color: #fff;
}

.brain-lvl-4 .brain-icon {
  color: #1a1030;
  background: var(--gold);
  box-shadow: 0 0 18px rgba(251, 191, 36, 0.6), 0 0 40px rgba(251, 191, 36, 0.25);
}

/* Quote */
.quote {
  margin: 0;
}

.quote-mark {
  width: 28px;
  height: 28px;
  margin-bottom: 0.75rem;
  color: rgba(168, 85, 247, 0.55);
}

.quote blockquote {
  margin: 0 0 0.85rem;
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.45;
  letter-spacing: -0.01em;
  color: #fff;
}

.quote figcaption {
  font-size: 0.85rem;
  color: var(--text-dim);
}

/* Tier-Liste */
.tiers {
  display: grid;
  gap: 0.4rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.tiers li {
  display: grid;
  grid-template-columns: 48px 1fr;
  align-items: stretch;
  border-radius: 10px;
  overflow: hidden;
  background: var(--surface-overlay);
  border: 1px solid var(--border);
}

.tier-letter {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 900;
}

.tier-s {
  background: var(--gold);
  color: #1a1030;
}

.tier-a {
  background: var(--accent-strong);
  color: #fff;
}

.tier-b {
  background: #6366f1;
  color: #fff;
}

.tier-c {
  background: var(--surface-2);
  color: var(--text-muted);
}

.tier-f {
  background: #7f1d1d;
  color: #fecaca;
}

.tier-text {
  padding: 0.7rem 0.9rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-soft);
}

/* POV */
.pov-setup {
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.45;
  color: #fff;
  margin-bottom: 1.5rem;
}

.pov-punch {
  padding: 1.25rem;
  border-radius: var(--radius-sm);
  border: 1px dashed var(--border-strong);
  text-align: center;
  font-style: italic;
  color: var(--text-muted);
}

/* Starter Pack */
.starter-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 0.9rem;
}

.starter ul {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.starter li {
  display: flex;
  align-items: center;
  min-height: 64px;
  padding: 0.6rem 0.75rem;
  border-radius: 10px;
  background: var(--surface-overlay);
  border: 1px solid var(--border);
  font-size: 0.85rem;
  font-weight: 600;
  line-height: 1.35;
  color: var(--text-soft);
}

/* Image */
.image-meme {
  margin: 0;
}

.image-meme img {
  display: block;
  width: 100%;
  border-radius: var(--radius-sm);
}

.image-meme figcaption {
  margin-top: 0.75rem;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.wall-note {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: var(--text-dim);
}
</style>
