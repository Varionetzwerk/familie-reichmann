<script setup>
import { ref, computed, onUnmounted } from 'vue';
import { FAMILY, MEMBERS, RANKS } from '../../content/reichmann';
import AppIcon from '../AppIcon.vue';

const PLURAL = {
  SCHATTENKANZLER: 'Schattenkanzler',
  SCHATTENMINISTER: 'Schattenminister',
  SCHATTENMITGLIED: 'Schattenmitglieder',
  SCHATTENSCHERGE: 'Schattenschergen',
};

const groups = computed(() =>
  [...RANKS]
    .reverse()
    .map((rank) => ({ ...rank, members: MEMBERS.filter((m) => m.rank === rank.key) }))
    .filter((group) => group.members.length)
);

const initial = (name) => name.trim().charAt(0).toUpperCase();

const copied = ref(false);
const canCopy = typeof navigator !== 'undefined' && !!navigator.clipboard;
let copiedTimer = null;

async function copyContact() {
  await navigator.clipboard.writeText(FAMILY.contact);
  copied.value = true;
  clearTimeout(copiedTimer);
  copiedTimer = setTimeout(() => (copied.value = false), 2000);
}

onUnmounted(() => clearTimeout(copiedTimer));
</script>

<template>
  <section id="familie" class="section-block section-alt">
    <div class="container">
      <div class="section-head" v-reveal>
        <span class="eyebrow">Die Familie</span>
        <h2 class="section-title">Wer zur <span class="accent-text">Familie</span> gehört</h2>
        <p class="section-sub">
          {{ MEMBERS.length }} Mitglieder laut offizieller Familienvorstellung auf Modern Gaming.
        </p>
        <a :href="FAMILY.forumUrl" target="_blank" rel="noopener" class="forum-link">
          Familienvorstellung im Forum
          <AppIcon name="external" stroke="2" />
        </a>
      </div>

      <div v-for="group in groups" :key="group.key" class="group" v-reveal>
        <h3 class="group-title">
          <span :class="['group-dot', `group-dot--${group.color}`]"></span>
          {{ group.members.length === 1 ? group.title : PLURAL[group.key] }}
          <span class="group-count">{{ group.members.length }}</span>
        </h3>

        <!-- Kanzler: featured card with the application contact -->
        <div v-if="group.key === 'SCHATTENKANZLER'" class="leader-grid">
          <article v-for="m in group.members" :key="m.name" class="card leader">
            <span class="avatar avatar--gold avatar--lg" aria-hidden="true">{{ initial(m.name) }}</span>
            <div class="leader-info">
              <span class="leader-role">
                <AppIcon name="crown" stroke="2" /> Oberhaupt der Familie
              </span>
              <h4>{{ m.name }}</h4>
              <p>{{ group.text }}</p>
            </div>
            <div class="leader-contact">
              <span class="contact-label">Bewerbungen per Discord an</span>
              <button v-if="canCopy" type="button" class="contact" :title="copied ? 'Kopiert!' : 'Discord-Namen kopieren'" @click="copyContact">
                <span class="mono">{{ FAMILY.contact }}</span>
                <AppIcon :name="copied ? 'check' : 'copy'" stroke="2" />
              </button>
              <span v-else class="contact mono">{{ FAMILY.contact }}</span>
            </div>
          </article>
        </div>

        <div v-else :class="['member-grid', { 'member-grid--wide': group.members.length <= 2 }]">
          <article v-for="m in group.members" :key="m.name" class="card card-hover member">
            <span :class="['avatar', `avatar--${group.color}`]" aria-hidden="true">{{ initial(m.name) }}</span>
            <div class="member-info">
              <h4>{{ m.name }}</h4>
              <span class="member-rank">
                {{ group.title }}
                <span v-if="group.key === 'SCHATTENSCHERGE'" class="trial-tag">Probephase</span>
              </span>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.forum-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 1.25rem;
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--accent-light);
  transition: color 0.2s ease;
}

.forum-link:hover {
  color: #fff;
}

.forum-link svg {
  width: 16px;
  height: 16px;
}

.group {
  margin-bottom: 2.25rem;
}

.group:last-child {
  margin-bottom: 0;
}

.group-title {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.group-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.group-dot--gold {
  background: var(--gold);
}

.group-dot--accent {
  background: var(--accent);
}

.group-dot--indigo {
  background: #818cf8;
}

.group-dot--slate {
  background: #94a3b8;
}

.group-count {
  padding: 0.05rem 0.5rem;
  border-radius: 999px;
  background: var(--surface-2);
  font-size: 0.72rem;
  letter-spacing: 0;
  color: var(--text-soft);
}

/* Avatars */
.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  flex-shrink: 0;
  border-radius: 13px;
  font-size: 1.15rem;
  font-weight: 800;
}

.avatar--lg {
  width: 72px;
  height: 72px;
  border-radius: 20px;
  font-size: 1.9rem;
}

.avatar--gold {
  background: rgba(251, 191, 36, 0.12);
  border: 1px solid rgba(251, 191, 36, 0.35);
  color: var(--gold-light);
}

.avatar--accent {
  background: rgba(168, 85, 247, 0.12);
  color: var(--accent-light);
}

.avatar--indigo {
  background: rgba(129, 140, 248, 0.12);
  color: var(--indigo-light);
}

.avatar--slate {
  background: rgba(148, 163, 184, 0.1);
  color: #cbd5e1;
}

/* Leader */
.leader {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  border-color: rgba(251, 191, 36, 0.35);
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.07), var(--surface) 55%);
}

.leader-info {
  flex: 1;
  min-width: 220px;
}

.leader-role {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 0.3rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--gold);
}

.leader-role svg {
  width: 14px;
  height: 14px;
}

.leader h4 {
  font-size: 1.5rem;
  margin-bottom: 0.3rem;
}

.leader p {
  color: var(--text-muted);
  font-size: 0.95rem;
}

.leader-contact {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.contact-label {
  font-size: 0.75rem;
  color: var(--text-dim);
}

.contact {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.6rem 0.85rem;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(88, 101, 242, 0.35);
  background: rgba(88, 101, 242, 0.1);
  color: #c7cbfb;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.contact:hover {
  background: rgba(88, 101, 242, 0.18);
  border-color: rgba(88, 101, 242, 0.55);
}

.contact svg {
  width: 16px;
  height: 16px;
}

.mono {
  font-family: var(--font-mono);
}

/* Members */
.member-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
}

.member-grid--wide {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.member {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 1rem 1.1rem;
  background: rgba(26, 29, 39, 0.6);
}

.member-info {
  min-width: 0;
}

.member h4 {
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  overflow-wrap: anywhere;
}

.member-rank {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  font-size: 0.82rem;
  color: var(--text-dim);
}

.trial-tag {
  padding: 0.05rem 0.45rem;
  border-radius: 6px;
  background: rgba(148, 163, 184, 0.12);
  font-size: 0.7rem;
  font-weight: 600;
  color: #cbd5e1;
}

@media (max-width: 600px) {
  .leader {
    align-items: flex-start;
  }

  .leader-contact {
    width: 100%;
  }
}
</style>
