<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { ICONS } from '../icons';
import { DISCORD_INVITE_URL, redactedReveals } from '../content/reichmann';
import CrestIcon from '../components/CrestIcon.vue';
import DiscordIcon from '../components/DiscordIcon.vue';
import NewsTicker from '../components/home/NewsTicker.vue';
import CommandmentsSection from '../components/home/CommandmentsSection.vue';
import MemeWall from '../components/home/MemeWall.vue';
import FamilyTools from '../components/home/FamilyTools.vue';

const steps = [
  {
    title: 'Discord beitreten',
    text: 'Komm auf unseren Discord-Server. Dort trifft sich die Familie, dort läuft alles zusammen.',
    icon: ICONS.userPlus,
    color: 'accent',
  },
  {
    title: 'Bewerben',
    text: 'Stell dich vor: wer du bist und warum du zu den Reichmanns willst. Der Schattenkanzler liest jede Bewerbung persönlich.',
    icon: ICONS.chat,
    color: 'indigo',
  },
  {
    title: 'Aufsteigen',
    text: 'Einmal aufgenommen, geht es los — vom Schattenreich bis hoch zum Schattenkanzler.',
    icon: ICONS.trendingUp,
    color: 'gold',
  },
];

const ranks = [
  {
    key: 'SCHATTENREICH',
    title: 'Schattenreich',
    text: 'Dein Einstieg — aufgenommen in den inneren Kreis der Dynastie.',
    icon: ICONS.user,
    color: 'indigo',
  },
  {
    key: 'SCHATTENMINISTER',
    title: 'Schattenminister',
    text: 'Eigener Verantwortungsbereich innerhalb der Familie.',
    icon: ICONS.briefcase,
    color: 'accent',
  },
  {
    key: 'SCHATTENKANZLER',
    title: 'Schattenkanzler',
    text: 'Die Spitze — volle Kontrolle über Ränge und Richtung.',
    icon: ICONS.crown,
    color: 'gold',
  },
];

const faq = [
  { q: 'Wie werde ich Teil der Familie?', a: 'Tritt unserem Discord bei und bewirb dich dort. Der Schattenkanzler meldet sich bei dir.' },
  { q: 'Brauche ich Erfahrung mit Rollenspiel?', a: 'Nein. Jeder fängt als Schattenreich an — den Rest lernst du bei uns.' },
  {
    q: 'Was passiert, wenn ich abgelehnt werde?',
    a: 'Dann bekommst du im Discord Bescheid, woran es lag, und kannst es später nochmal versuchen. Wer nicht aufgibt, zeigt Loyalität.',
  },
  { q: 'Kostet die Mitgliedschaft etwas?', a: 'Nein, der Beitritt zur Familie ist komplett kostenlos.' },
  { q: 'Wie schnell steige ich im Rang auf?', a: 'Es gibt keine feste Wartezeit — Aktivität und Vertrauen entscheiden.' },
  {
    q: 'Was mache ich bei Fragen?',
    a: 'Frag im Discord oder wende dich an ein Mitglied mit höherem Rang — niemand lässt dich allein stehen.',
  },
];

const typingWords = ranks.map((r) => r.title);
const typedText = ref('');
let typingTimer = null;

function startTyping() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    typedText.value = typingWords[typingWords.length - 1];
    return;
  }
  let wordIndex = 0;
  let chars = 0;
  let deleting = false;
  const tick = () => {
    const word = typingWords[wordIndex];
    chars += deleting ? -1 : 1;
    typedText.value = word.slice(0, chars);
    let delay = deleting ? 45 : 85;
    if (!deleting && chars === word.length) {
      deleting = true;
      delay = 2200;
    } else if (deleting && chars === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % typingWords.length;
      delay = 350;
    }
    typingTimer = setTimeout(tick, delay);
  };
  tick();
}

onMounted(startTyping);
onUnmounted(() => clearTimeout(typingTimer));
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="hero">
      <div class="bg-grid" aria-hidden="true"></div>
      <div class="glow glow-accent glow-pulse hero-glow-a" aria-hidden="true"></div>
      <div class="glow glow-indigo glow-pulse hero-glow-b" aria-hidden="true"></div>

      <div class="container hero-grid">
        <div class="hero-copy">
          <span class="pulse-badge">
            <span class="pulse-dot"></span>
            Bewerbungen im Discord geöffnet
          </span>

          <h1 class="hero-title">
            Familie
            <span class="hero-title-accent">Reichmann</span>
          </h1>

          <p class="hero-typing" aria-hidden="true">
            Steig auf zum <span class="hero-typed">{{ typedText }}</span><span class="cursor"></span>
          </p>

          <p class="hero-lede">
            Die bekannteste Dynastie auf unserem Garry's-Mod-Rollenspielserver. Offiziell ein ganz normales
            Familienunternehmen. Inoffiziell: Fragen Sie lieber nicht.
          </p>

          <div class="hero-actions">
            <a :href="DISCORD_INVITE_URL" target="_blank" rel="noopener" class="btn btn-discord btn-lg">
              <DiscordIcon />
              Discord beitreten
            </a>
            <a href="#ranks" class="btn btn-secondary btn-lg">Ränge ansehen</a>
          </div>

          <div class="hero-chips">
            <a href="#ranks" class="chip">Hierarchie</a>
            <a href="#memes" class="chip">Meme-Wand</a>
            <a href="#spielwiese" class="chip">Familienausweis</a>
            <a href="#chronik" class="chip">Geheime Akte</a>
          </div>
        </div>

        <div class="hero-side">
          <CrestIcon class="hero-crest" />

          <div class="hero-card">
            <div class="hero-card-head">
              <span class="icon-box icon-box--sm icon-box--accent">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path :d="ICONS.identification" /></svg>
              </span>
              <div>
                <h3>Steckbrief der Familie</h3>
                <p>Auszug aus der Akte. Der Rest ist geschwärzt.</p>
              </div>
            </div>

            <dl class="dossier">
              <dt>Gegründet</dt>
              <dd><span class="redacted" tabindex="0" :data-reveal="redactedReveals[0]" aria-label="geschwärzt">00.00.0000</span></dd>
              <dt>Hauptquartier</dt>
              <dd><span class="redacted" tabindex="0" :data-reveal="redactedReveals[1]" aria-label="geschwärzt">Irgendwostadt</span></dd>
              <dt>Ränge</dt>
              <dd>Schattenreich · Minister · Kanzler</dd>
              <dt>Beitritt</dt>
              <dd class="gold-text">Kostenlos</dd>
              <dt>Bewerbung</dt>
              <dd>über Discord</dd>
            </dl>

            <a :href="DISCORD_INVITE_URL" target="_blank" rel="noopener" class="btn btn-discord btn-block">
              <DiscordIcon />
              Zum Discord der Familie
            </a>
          </div>
        </div>
      </div>

      <a href="#ablauf" class="scroll-cue" aria-label="Weiter nach unten">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path :d="ICONS.chevronDown" /></svg>
      </a>
    </section>

    <NewsTicker />

    <!-- Steps -->
    <section id="ablauf" class="section-block">
      <div class="container">
        <div class="section-head" v-reveal>
          <span class="eyebrow">Anleitung</span>
          <h2 class="section-title">In drei Schritten <span class="accent-text">dabei</span></h2>
          <p class="section-sub">Kein Bewerbungsmarathon: Discord beitreten, vorstellen, loslegen.</p>
        </div>

        <div class="grid-3">
          <div v-for="(step, i) in steps" :key="step.title" class="card card-hover step-card" v-reveal="i * 120">
            <div class="step-icon">
              <span :class="['icon-box', `icon-box--${step.color}`]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path :d="step.icon" /></svg>
              </span>
              <span class="step-num">{{ i + 1 }}</span>
            </div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <CommandmentsSection />

    <!-- Ranks -->
    <section id="ranks" class="section-block">
      <div class="container">
        <div class="section-head" v-reveal>
          <span class="eyebrow">Hierarchie</span>
          <h2 class="section-title">Die <span class="accent-text">Rangordnung</span></h2>
          <p class="section-sub">Jeder startet als Schattenreich. Von dort geht's nach oben.</p>
        </div>

        <div class="ranks">
          <div
            v-for="(rank, i) in ranks"
            :key="rank.key"
            :class="['card', 'card-hover', 'rank-card', `rank-card--${rank.key}`]"
            v-reveal="i * 120"
          >
            <div class="rank-card-top">
              <span class="rank-tier">Stufe {{ i + 1 }}</span>
            </div>
            <span :class="['icon-box', `icon-box--${rank.color}`]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path :d="rank.icon" /></svg>
            </span>
            <h3>{{ rank.title }}</h3>
            <p>{{ rank.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <MemeWall />

    <FamilyTools />

    <!-- FAQ -->
    <section id="faq" class="section-block section-alt">
      <div class="container faq-layout">
        <div class="faq-intro" v-reveal>
          <span class="eyebrow">Für Neulinge</span>
          <h2 class="section-title">Häufige <span class="accent-text">Fragen</span></h2>
          <p class="section-sub">
            Alles Wichtige vor deinem Beitritt. Noch etwas offen? Frag einfach ein Mitglied mit höherem Rang.
          </p>
        </div>

        <div class="faq-list" v-reveal="120">
          <details v-for="item in faq" :key="item.q" class="faq-item">
            <summary>
              {{ item.q }}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path :d="ICONS.chevronDown" /></svg>
            </summary>
            <p>{{ item.a }}</p>
          </details>
        </div>
      </div>
    </section>

    <!-- Chronik -->
    <section id="chronik" class="section-block">
      <div class="container">
        <div class="section-head" v-reveal>
          <span class="eyebrow">Ursprung</span>
          <h2 class="section-title">Die <span class="accent-text">Chronik</span></h2>
          <p class="section-sub">
            Was als kleine Gruppe auf einem Garry's-Mod-Rollenspielserver begann, wuchs zu einer der
            bekanntesten Dynastien der Stadt heran — nie laut, immer mit Einfluss.
          </p>
        </div>

        <div class="akte" v-reveal>
          <div class="akte-head">
            <span class="akte-id">Akte #RM-0001 · Gründung</span>
            <span class="akte-stamp">Streng geheim</span>
          </div>
          <p class="akte-text">
            Gegründet wurde die Familie am
            <span class="redacted" tabindex="0" :data-reveal="redactedReveals[0]" aria-label="geschwärzt">00.00.0000</span>
            in
            <span class="redacted" tabindex="0" :data-reveal="redactedReveals[1]" aria-label="geschwärzt">Irgendwostadt</span>.
            Der erste Schattenkanzler hieß
            <span class="redacted" tabindex="0" :data-reveal="redactedReveals[2]" aria-label="geschwärzt">Max Mustermann</span>,
            und was beim ersten Familientreffen wirklich passiert ist, weiß bis heute nur
            <span class="redacted" tabindex="0" :data-reveal="redactedReveals[3]" aria-label="geschwärzt">der Pizzabote</span>.
          </p>
          <p class="akte-hint">Geschwärzte Stellen sind nur für Schattenkanzler lesbar. Drüberfahren auf eigene Gefahr.</p>
        </div>

        <figure class="motto" v-reveal>
          <blockquote>„Throne sieht man. Das Schattenreich spürt man erst, wenn es zu spät ist.“</blockquote>
          <figcaption>Leitspruch der Familie</figcaption>
        </figure>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="cta">
      <div class="glow glow-accent glow-pulse cta-glow-a" aria-hidden="true"></div>
      <div class="glow glow-indigo glow-pulse cta-glow-b" aria-hidden="true"></div>
      <div class="container cta-inner" v-reveal>
        <span class="pulse-badge">
          <span class="pulse-dot"></span>
          Bewerbungen geöffnet
        </span>
        <h2 class="cta-title">Werde Teil der <span class="accent-text">Familie Reichmann</span></h2>
        <p class="section-sub">
          Bewerbungen laufen über unseren Discord. Ob du reinkommst, entscheidet der Schattenkanzler persönlich.
        </p>
        <div class="cta-actions">
          <a :href="DISCORD_INVITE_URL" target="_blank" rel="noopener" class="btn btn-discord btn-lg">
            <DiscordIcon />
            Discord beitreten
          </a>
          <a href="#gebote" class="btn btn-secondary btn-lg">Erst die Gebote lesen</a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ---------- Hero ---------- */

.hero {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  min-height: calc(100vh - var(--nav-h));
  padding: 4rem 0 6rem;
  background: linear-gradient(135deg, var(--bg), #12111d 50%, var(--bg));
}

.hero-glow-a {
  top: 6%;
  left: 2%;
  width: 500px;
  height: 500px;
}

.hero-glow-b {
  bottom: 8%;
  right: 4%;
  width: 450px;
  height: 450px;
  animation-delay: 1.5s;
}

.hero-grid {
  position: relative;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 4rem;
  align-items: center;
}

.hero-copy .pulse-badge {
  margin-bottom: 1.75rem;
}

.hero-title {
  font-size: clamp(3.2rem, 8vw, 5.75rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.04em;
  margin-bottom: 1.5rem;
}

.hero-title-accent {
  display: block;
  margin-top: 0.15rem;
  color: var(--accent-light);
  text-shadow: 0 0 40px rgba(168, 85, 247, 0.3);
}

.hero-typing {
  min-height: 2.2rem;
  font-size: clamp(1.15rem, 2.2vw, 1.5rem);
  color: var(--text-muted);
  margin-bottom: 1.5rem;
}

.hero-typed {
  color: #fff;
  font-weight: 600;
}

.cursor {
  display: inline-block;
  width: 2px;
  height: 1.1em;
  margin-left: 2px;
  vertical-align: -0.15em;
  background: var(--accent-light);
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.hero-lede {
  max-width: 520px;
  font-size: 1.1rem;
  color: var(--text-dim);
  line-height: 1.7;
  margin-bottom: 2.25rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.75rem;
}

.hero-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.chip {
  padding: 0.4rem 0.85rem;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: rgba(26, 29, 39, 0.4);
  font-size: 0.85rem;
  color: var(--text-muted);
  transition: color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.chip:hover {
  color: #fff;
  border-color: #4b5563;
  transform: scale(1.03);
}

.hero-side {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.hero-crest {
  width: 170px;
  height: 170px;
  filter: drop-shadow(0 0 50px rgba(168, 85, 247, 0.3));
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  50% {
    transform: translateY(-10px);
  }
}

.hero-card {
  width: 100%;
  max-width: 460px;
  padding: 1.5rem;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: rgba(26, 29, 39, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.hero-card-head {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.4rem;
}

.hero-card-head h3 {
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0;
}

.hero-card-head p {
  font-size: 0.78rem;
  color: var(--text-dim);
}

.dossier {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.75rem 1.25rem;
  margin: 0 0 1.5rem;
  padding: 1.1rem 1.2rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: rgba(15, 17, 23, 0.6);
  font-size: 0.92rem;
}

.dossier dt {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-dim);
  align-self: center;
}

.dossier dd {
  margin: 0;
  font-weight: 600;
  color: var(--text-soft);
}

.scroll-cue {
  position: absolute;
  bottom: 1.75rem;
  left: 50%;
  translate: -50% 0;
  color: #4b5563;
  transition: color 0.2s ease;
  animation: bounce-slow 2s ease-in-out infinite;
}

.scroll-cue:hover {
  color: var(--accent-light);
}

.scroll-cue svg {
  width: 28px;
  height: 28px;
}

@keyframes bounce-slow {
  50% {
    transform: translateY(-6px);
  }
}

/* ---------- Shared grids ---------- */

.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.card h3 {
  font-size: 1.2rem;
  margin-bottom: 0.6rem;
}

.card p {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.65;
}

/* ---------- Steps ---------- */

.step-card {
  text-align: center;
  padding: 2.25rem 1.75rem;
  background: rgba(26, 29, 39, 0.5);
}

.step-icon {
  position: relative;
  display: inline-flex;
  margin-bottom: 1.5rem;
}

.step-icon .icon-box {
  width: 68px;
  height: 68px;
}

.step-icon .icon-box svg {
  width: 32px;
  height: 32px;
}

.step-num {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--surface);
  border: 2px solid var(--border);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-muted);
}

.step-card p {
  max-width: 290px;
  margin: 0 auto;
}

/* ---------- Ranks ---------- */

.ranks {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.rank-card {
  position: relative;
  overflow: hidden;
  padding: 1.75rem;
  background: rgba(26, 29, 39, 0.5);
}

.rank-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.rank-tier {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-dim);
}

.rank-card .icon-box {
  margin-bottom: 1.25rem;
}

.rank-card--SCHATTENKANZLER {
  border-color: rgba(251, 191, 36, 0.3);
  background: linear-gradient(180deg, rgba(251, 191, 36, 0.06), rgba(26, 29, 39, 0.5) 60%);
}

.rank-card--SCHATTENKANZLER:hover {
  border-color: rgba(251, 191, 36, 0.5);
  box-shadow: 0 18px 40px -18px rgba(251, 191, 36, 0.25);
}

.rank-card--SCHATTENKANZLER .rank-tier {
  color: var(--gold);
}

/* ---------- FAQ ---------- */

.faq-layout {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 4rem;
  align-items: start;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.faq-item {
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: rgba(26, 29, 39, 0.5);
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.faq-item[open] {
  border-color: rgba(168, 85, 247, 0.35);
  background: var(--surface);
}

.faq-item summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.1rem 1.25rem;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  list-style: none;
}

.faq-item summary::-webkit-details-marker {
  display: none;
}

.faq-item summary svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  color: var(--text-dim);
  transition: transform 0.25s ease, color 0.25s ease;
}

.faq-item[open] summary svg {
  transform: rotate(180deg);
  color: var(--accent-light);
}

.faq-item p {
  padding: 0 1.25rem 1.2rem;
  color: var(--text-muted);
  font-size: 0.95rem;
}

/* ---------- Chronik ---------- */

.akte {
  position: relative;
  max-width: 820px;
  margin: 0 auto 2rem;
  padding: 1.75rem 2rem 1.5rem;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--surface);
}

.akte-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 1rem;
  margin-bottom: 1.25rem;
  border-bottom: 1px dashed var(--border-strong);
}

.akte-id {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.akte-stamp {
  padding: 0.3rem 0.75rem;
  border: 2px solid rgba(248, 113, 113, 0.65);
  border-radius: 6px;
  color: #fca5a5;
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  rotate: -6deg;
}

.akte-text {
  font-size: 1.15rem;
  line-height: 2;
  color: var(--text-soft);
}

.redacted {
  position: relative;
  display: inline-block;
  padding: 0 0.3em;
  border-radius: 4px;
  line-height: 1.35;
  color: transparent;
  background: repeating-linear-gradient(-45deg, #343a52 0 6px, #2b3044 6px 12px);
  cursor: help;
  user-select: none;
}

.redacted::after {
  content: attr(data-reveal);
  position: absolute;
  left: 50%;
  bottom: calc(100% + 8px);
  translate: -50% 4px;
  padding: 0.35rem 0.65rem;
  border-radius: 8px;
  border: 1px solid var(--border-strong);
  background: var(--surface-2);
  color: var(--accent-light);
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 1.3;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease, translate 0.15s ease;
}

.redacted:hover::after,
.redacted:focus-visible::after {
  opacity: 1;
  translate: -50% 0;
}

.akte-hint {
  margin-top: 1rem;
  font-size: 0.8rem;
  font-style: italic;
  color: var(--text-dim);
}

.motto {
  max-width: 820px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  text-align: center;
  border-radius: var(--radius);
  border: 1px solid rgba(168, 85, 247, 0.25);
  background: linear-gradient(180deg, rgba(168, 85, 247, 0.08), rgba(26, 29, 39, 0.4));
}

.motto blockquote {
  margin: 0 0 1rem;
  font-size: clamp(1.25rem, 2.6vw, 1.75rem);
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: -0.01em;
  color: #fff;
}

.motto figcaption {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent-light);
}

/* ---------- CTA ---------- */

.cta {
  position: relative;
  overflow: hidden;
  padding: 7rem 0;
  background: linear-gradient(0deg, rgba(168, 85, 247, 0.07), transparent 70%);
}

.cta-glow-a {
  bottom: -60px;
  left: 20%;
  width: 500px;
  height: 260px;
}

.cta-glow-b {
  bottom: -60px;
  right: 20%;
  width: 420px;
  height: 220px;
  animation-delay: 2s;
}

.cta-inner {
  position: relative;
  max-width: 820px;
  text-align: center;
}

.cta-inner .pulse-badge {
  margin-bottom: 2rem;
}

.cta-title {
  font-size: clamp(2.2rem, 5vw, 3.75rem);
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 1.25rem;
}

.cta-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2.5rem;
}

/* ---------- Responsive ---------- */

@media (max-width: 960px) {
  .hero {
    min-height: auto;
    padding: 3.5rem 0 5.5rem;
  }

  .hero-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }

  .hero-lede {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-actions,
  .hero-chips {
    justify-content: center;
  }

  .hero-crest {
    width: 120px;
    height: 120px;
  }

  .hero-card {
    text-align: left;
  }

  .grid-3,
  .ranks {
    grid-template-columns: 1fr;
    max-width: 520px;
    margin-left: auto;
    margin-right: auto;
  }

  .faq-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .faq-intro {
    text-align: center;
  }
}

@media (max-width: 600px) {
  .hero-actions .btn {
    width: 100%;
  }

  .akte {
    padding: 1.4rem 1.25rem;
  }

  .akte-text {
    font-size: 1.05rem;
  }

  .cta-actions .btn {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-crest,
  .scroll-cue,
  .cursor {
    animation: none;
  }
}
</style>
