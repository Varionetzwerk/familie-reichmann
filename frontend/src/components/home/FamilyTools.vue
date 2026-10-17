<script setup>
import { ref, computed, onUnmounted } from 'vue';
import { excuses, idCard } from '../../content/reichmann';
import AppIcon from '../AppIcon.vue';
import CrestIcon from '../CrestIcon.vue';

// --- Familienausweis: same name always yields the same card, "Neu würfeln" changes the salt.
const name = ref('');
const salt = ref(0);

function hash(text) {
  let h = 2166136261;
  for (const ch of text) {
    h ^= ch.codePointAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const card = computed(() => {
  const raw = name.value.trim();
  const display = raw ? raw.charAt(0).toUpperCase() + raw.slice(1) : 'Namenlos';
  const seed = `${raw.toLowerCase()}#${salt.value}`;
  const pick = (list, key) => list[hash(`${seed}:${key}`) % list.length];
  return {
    title: pick(idCard.titles, 'title'),
    name: display,
    epithet: pick(idCard.epithets, 'epithet'),
    specialty: pick(idCard.specialties, 'specialty'),
    danger: 40 + (hash(`${seed}:danger`) % 60),
    number: 1000 + (hash(`${seed}:number`) % 9000),
  };
});

// --- Ausreden
const excuseIndex = ref(Math.floor(Math.random() * excuses.length));
const copied = ref(false);
const canCopy = typeof navigator !== 'undefined' && !!navigator.clipboard;
let copiedTimer = null;

function nextExcuse() {
  let next = excuseIndex.value;
  while (excuses.length > 1 && next === excuseIndex.value) {
    next = Math.floor(Math.random() * excuses.length);
  }
  excuseIndex.value = next;
  copied.value = false;
}

async function copyExcuse() {
  await navigator.clipboard.writeText(excuses[excuseIndex.value]);
  copied.value = true;
  clearTimeout(copiedTimer);
  copiedTimer = setTimeout(() => (copied.value = false), 2000);
}

onUnmounted(() => clearTimeout(copiedTimer));
</script>

<template>
  <section id="spielwiese" class="section-block section-alt">
    <div class="container">
      <div class="section-head" v-reveal>
        <span class="eyebrow">Spielwiese</span>
        <h2 class="section-title">Für echte <span class="accent-text">Reichmanns</span></h2>
        <p class="section-sub">Hol dir deinen Familienausweis — und die passende Ausrede für das nächste Treffen.</p>
      </div>

      <div class="tools">
        <!-- Familienausweis -->
        <div class="tool card" v-reveal>
          <div class="tool-head">
            <span class="icon-box icon-box--sm icon-box--gold"><AppIcon name="identification" /></span>
            <div>
              <h3>Familienausweis</h3>
              <p>Wer wärst du in der Familie?</p>
            </div>
          </div>

          <div class="id-form">
            <input v-model="name" type="text" maxlength="20" placeholder="Dein Name" aria-label="Dein Name" />
            <button type="button" class="btn btn-secondary" @click="salt++">
              <AppIcon name="arrowPath" stroke="2" />
              Neu würfeln
            </button>
          </div>

          <div class="id-card" aria-live="polite">
            <CrestIcon class="id-watermark" />
            <div class="id-top">
              <CrestIcon class="id-crest" />
              <div>
                <span class="id-kicker">Familienausweis</span>
                <span class="id-family">Familie Reichmann</span>
              </div>
              <span class="id-number">Nr. RM-{{ card.number }}</span>
            </div>

            <div class="id-field">
              <span class="id-label">Name</span>
              <span class="id-name">{{ card.title }} {{ card.name }} <span class="accent-text">„{{ card.epithet }}“</span> Reichmann</span>
            </div>

            <div class="id-row">
              <div class="id-field">
                <span class="id-label">Spezialgebiet</span>
                <span class="id-value">{{ card.specialty }}</span>
              </div>
              <div class="id-field">
                <span class="id-label">Gefährlichkeit</span>
                <span class="id-danger">
                  <span class="id-danger-bar"><span :style="{ width: `${card.danger}%` }" /></span>
                  <span class="id-value">{{ card.danger }} %</span>
                </span>
              </div>
            </div>

            <p class="id-footer">Gültig bis auf Widerruf durch den Schattenkanzler</p>
          </div>
        </div>

        <!-- Ausreden -->
        <div class="tool card" v-reveal="120">
          <div class="tool-head">
            <span class="icon-box icon-box--sm icon-box--pink"><AppIcon name="chat" /></span>
            <div>
              <h3>Ausreden-Generator</h3>
              <p>Warum ich nicht beim Familientreffen war</p>
            </div>
          </div>

          <Transition name="swap" mode="out-in">
            <blockquote :key="excuseIndex" class="excuse">„{{ excuses[excuseIndex] }}“</blockquote>
          </Transition>

          <div class="excuse-actions">
            <button type="button" class="btn btn-primary" @click="nextExcuse">
              <AppIcon name="arrowPath" stroke="2" />
              Neue Ausrede
            </button>
            <button v-if="canCopy" type="button" class="btn btn-secondary" @click="copyExcuse">
              <AppIcon :name="copied ? 'check' : 'copy'" stroke="2" />
              {{ copied ? 'Kopiert!' : 'Kopieren' }}
            </button>
          </div>
          <p class="excuse-note">Erfolgsquote laut Familienrat: 0 %. Versuchen kann man's ja.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tools {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 1.25rem;
  align-items: start;
}

.tool {
  padding: 1.6rem;
}

.tool-head {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.4rem;
}

.tool-head h3 {
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.tool-head p {
  font-size: 0.85rem;
  color: var(--text-dim);
}

.id-form {
  display: flex;
  gap: 0.6rem;
  margin-bottom: 1.25rem;
}

/* ID card */
.id-card {
  position: relative;
  overflow: hidden;
  padding: 1.4rem 1.5rem 1.2rem;
  border-radius: var(--radius);
  border: 1px solid rgba(251, 191, 36, 0.35);
  background: linear-gradient(135deg, #221a35 0%, var(--surface-overlay) 55%, #1d1828 100%);
  box-shadow: 0 18px 40px -20px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.id-watermark {
  position: absolute;
  right: -30px;
  bottom: -40px;
  width: 200px;
  height: 200px;
  opacity: 0.06;
  pointer-events: none;
}

.id-top {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 1rem;
  margin-bottom: 1.1rem;
  border-bottom: 1px dashed rgba(251, 191, 36, 0.25);
}

.id-crest {
  width: 36px;
  height: 36px;
}

.id-kicker {
  display: block;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--gold);
}

.id-family {
  display: block;
  font-size: 0.95rem;
  font-weight: 800;
  color: #fff;
}

.id-number {
  margin-left: auto;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--text-muted);
  white-space: nowrap;
}

.id-family {
  white-space: nowrap;
}

.id-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.id-label {
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-dim);
}

.id-name {
  font-size: 1.3rem;
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: #fff;
  overflow-wrap: anywhere;
}

.id-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.id-value {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--text-soft);
}

.id-danger {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.id-danger-bar {
  flex: 1;
  height: 6px;
  border-radius: 999px;
  background: var(--surface-2);
  overflow: hidden;
}

.id-danger-bar span {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--accent), #f472b6);
  transition: width 0.5s var(--ease-out);
}

.id-footer {
  padding-top: 0.85rem;
  border-top: 1px dashed rgba(251, 191, 36, 0.25);
  font-size: 0.75rem;
  font-style: italic;
  color: var(--text-dim);
}

/* Excuses */
.excuse {
  min-height: 140px;
  display: flex;
  align-items: center;
  margin: 0 0 1.25rem;
  padding: 1.4rem;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(236, 72, 153, 0.25);
  background: rgba(236, 72, 153, 0.05);
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.45;
  letter-spacing: -0.01em;
  color: #fff;
}

.excuse-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.excuse-note {
  margin-top: 1rem;
  font-size: 0.8rem;
  color: var(--text-dim);
}

.swap-enter-active,
.swap-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.swap-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.swap-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (max-width: 960px) {
  .tools {
    grid-template-columns: 1fr;
    max-width: 620px;
    margin: 0 auto;
  }
}

@media (max-width: 480px) {
  .id-form {
    flex-direction: column;
  }

  .id-row {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .id-card {
    padding: 1.2rem 1.1rem 1rem;
  }

  .id-family {
    font-size: 0.85rem;
  }

  .id-number {
    font-size: 0.68rem;
  }
}
</style>
