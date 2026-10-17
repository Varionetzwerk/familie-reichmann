<script setup>
import { ref, computed, watch, nextTick } from 'vue';
import { reports } from '../../content/reichmann';
import { focusedArticle } from '../../composables/articleFocus';
import AppIcon from '../AppIcon.vue';

const RESSORT_COLOR = {
  Familie: 'gold',
  Wirtschaft: 'green',
  Vermischtes: 'violet',
  Sport: 'orange',
  Polizeibericht: 'blue',
  Wetter: 'sky',
};

const sorted = [...reports].sort((a, b) => b.date.localeCompare(a.date));
const lead = sorted.find((r) => r.lead) ?? sorted[0];
const others = sorted.filter((r) => r !== lead);

function isoWeek(dateString) {
  const d = new Date(`${dateString}T12:00:00Z`);
  const day = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - day + 3);
  const firstThursday = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
  return 1 + Math.round(((d - firstThursday) / 86_400_000 - 3 + ((firstThursday.getUTCDay() + 6) % 7)) / 7);
}

const latest = sorted[0]?.date;
const formatDate = (value, month = 'short') =>
  new Date(`${value}T12:00:00`).toLocaleDateString('de-DE', { day: 'numeric', month, year: 'numeric' });
const readTime = (r) => {
  const words = [r.teaser, ...r.body].join(' ').split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} Min.`;
};

const expanded = ref(new Set());
const isOpen = (id) => expanded.value.has(id);

function toggle(id) {
  const next = new Set(expanded.value);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  expanded.value = next;
}

watch(focusedArticle, async (focus) => {
  if (!focus) return;
  expanded.value = new Set(expanded.value).add(focus.id);
  await nextTick();
  document.getElementById(`bericht-${focus.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

const issue = computed(() => (latest ? `KW ${isoWeek(latest)}` : ''));
</script>

<template>
  <section id="berichte" class="section-block">
    <div class="container">
      <div class="section-head" v-reveal>
        <span class="eyebrow">Aktuelle Berichte</span>
        <h2 class="section-title">Das <span class="accent-text">Schattenblatt</span></h2>
        <p class="section-sub">Die einzige Zeitung, die über die Familie berichten darf. Unabhängig. Meistens.</p>
      </div>

      <div class="masthead" v-reveal>
        <span>Ausgabe {{ issue }}</span>
        <span>{{ latest ? formatDate(latest, 'long') : '' }}</span>
        <span>Preis: eine Pizza</span>
      </div>

      <!-- Lead story -->
      <article :id="`bericht-${lead.id}`" class="report report--lead" v-reveal>
        <div class="report-top">
          <span :class="['ressort', `ressort--${RESSORT_COLOR[lead.ressort] ?? 'violet'}`]">{{ lead.ressort }}</span>
          <span class="lead-tag">Aufmacher</span>
        </div>
        <h3 class="report-title report-title--lead">{{ lead.title }}</h3>
        <p class="report-teaser">{{ lead.teaser }}</p>
        <Transition name="expand">
          <div v-if="isOpen(lead.id)" class="report-body">
            <p v-for="(para, i) in lead.body" :key="i">{{ para }}</p>
            <a v-if="lead.link" :href="lead.link.href" target="_blank" rel="noopener" class="report-link">
              {{ lead.link.label }} <AppIcon name="external" stroke="2" />
            </a>
          </div>
        </Transition>
        <div class="report-meta">
          <span>{{ formatDate(lead.date) }} · {{ readTime(lead) }} Lesezeit · Redaktion Schattenblatt</span>
          <button type="button" class="read-more" :aria-expanded="isOpen(lead.id)" @click="toggle(lead.id)">
            {{ isOpen(lead.id) ? 'Weniger anzeigen' : 'Weiterlesen' }}
            <AppIcon name="chevronDown" stroke="2" :class="{ flipped: isOpen(lead.id) }" />
          </button>
        </div>
      </article>

      <div class="report-grid">
        <article
          v-for="(r, i) in others"
          :id="`bericht-${r.id}`"
          :key="r.id"
          class="report card-hover"
          v-reveal="(i % 3) * 100"
        >
          <div class="report-top">
            <span :class="['ressort', `ressort--${RESSORT_COLOR[r.ressort] ?? 'violet'}`]">{{ r.ressort }}</span>
            <time :datetime="r.date">{{ formatDate(r.date) }}</time>
          </div>
          <h3 class="report-title">{{ r.title }}</h3>
          <p class="report-teaser">{{ r.teaser }}</p>
          <Transition name="expand">
            <div v-if="isOpen(r.id)" class="report-body">
              <p v-for="(para, j) in r.body" :key="j">{{ para }}</p>
              <a v-if="r.link" :href="r.link.href" target="_blank" rel="noopener" class="report-link">
                {{ r.link.label }} <AppIcon name="external" stroke="2" />
              </a>
            </div>
          </Transition>
          <div class="report-meta">
            <span>{{ readTime(r) }} Lesezeit</span>
            <button type="button" class="read-more" :aria-expanded="isOpen(r.id)" @click="toggle(r.id)">
              {{ isOpen(r.id) ? 'Weniger' : 'Weiterlesen' }}
              <AppIcon name="chevronDown" stroke="2" :class="{ flipped: isOpen(r.id) }" />
            </button>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.masthead {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem 2rem;
  margin: -1.5rem auto 2.5rem;
  padding: 0.7rem 1rem;
  max-width: 820px;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-dim);
}

.report {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--surface);
  scroll-margin-top: calc(var(--nav-h) + 24px);
}

.report--lead {
  margin-bottom: 1.25rem;
  padding: 2rem 2.25rem;
  border-color: rgba(168, 85, 247, 0.35);
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.09), var(--surface) 55%);
}

.report-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.9rem;
  font-size: 0.8rem;
  color: var(--text-dim);
}

.ressort {
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.ressort--gold {
  background: rgba(251, 191, 36, 0.12);
  color: var(--gold-light);
}

.ressort--green {
  background: rgba(52, 211, 153, 0.12);
  color: #6ee7b7;
}

.ressort--violet {
  background: rgba(168, 85, 247, 0.14);
  color: var(--accent-light);
}

.ressort--orange {
  background: rgba(249, 115, 22, 0.13);
  color: #fdba74;
}

.ressort--blue {
  background: rgba(59, 130, 246, 0.14);
  color: #93c5fd;
}

.ressort--sky {
  background: rgba(56, 189, 248, 0.12);
  color: #7dd3fc;
}

.lead-tag {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent-light);
}

.report-title {
  font-size: 1.15rem;
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 0.6rem;
}

.report-title--lead {
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  line-height: 1.15;
  letter-spacing: -0.03em;
  margin-bottom: 0.9rem;
  max-width: 820px;
}

.report-teaser {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.6;
}

.report--lead .report-teaser {
  max-width: 760px;
  font-size: 1.05rem;
  color: var(--text-soft);
}

.report-body {
  display: grid;
  gap: 0.75rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px dashed var(--border-strong);
}

.report-body p {
  color: var(--text-soft);
  font-size: 0.95rem;
  line-height: 1.65;
}

.report--lead .report-body {
  max-width: 760px;
}

.report-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  width: fit-content;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--accent-light);
}

.report-link svg {
  width: 14px;
  height: 14px;
}

.report-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: auto;
  padding-top: 1.1rem;
  font-size: 0.8rem;
  color: var(--text-dim);
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.35rem 0.1rem;
  border: none;
  background: none;
  color: var(--accent-light);
  font: 600 0.85rem var(--font);
  cursor: pointer;
}

.read-more:hover {
  color: #fff;
}

.read-more svg {
  width: 15px;
  height: 15px;
  transition: transform 0.2s ease;
}

.read-more svg.flipped {
  transform: rotate(180deg);
}

.report-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
  align-items: start;
}

.expand-enter-active,
.expand-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@media (max-width: 1000px) {
  .report-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .report-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .report--lead {
    padding: 1.5rem 1.25rem;
  }

  .masthead {
    gap: 0.4rem 1.25rem;
  }
}
</style>
