<script setup>
import { MEMBERS, RANKS } from '../../content/reichmann';
import AppIcon from '../AppIcon.vue';
import CrestIcon from '../CrestIcon.vue';

defineProps({
  meme: { type: Object, required: true },
  number: { type: Number, required: true },
});

const FORMAT_LABELS = {
  chat: 'Discord',
  drake: 'Drake',
  nobody: 'Niemand:',
  brain: 'Expanding Brain',
  quote: 'Zitat',
  tier: 'Tier-Liste',
  pov: 'POV',
  starter: 'Starter Pack',
  buttons: 'Zwei Knöpfe',
  expectation: 'Erwartung vs. Realität',
  achievement: 'Erfolg',
  wanted: 'Gesucht',
  changemind: 'Change my mind',
  image: 'Meme',
};

const TIER_CLASS = { S: 'tier-s', A: 'tier-a', B: 'tier-b', C: 'tier-c', D: 'tier-c', F: 'tier-f' };

// Chat names are first names; colour them by the member's rank.
function authorColor(author) {
  const member = MEMBERS.find((m) => m.name.split(' ')[0] === author);
  return RANKS.find((r) => r.key === member?.rank)?.color ?? 'slate';
}

// Prefix with the deploy base so images also load under the GitHub Pages sub-path.
const assetUrl = (src) => `${import.meta.env.BASE_URL}${src.replace(/^\//, '')}`;
</script>

<template>
  <article class="meme">
    <header class="meme-head">
      <span class="meme-format">{{ FORMAT_LABELS[meme.type] }}</span>
      <span class="meme-no">#{{ String(number).padStart(3, '0') }}</span>
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

    <!-- Discord-Chat -->
    <div v-else-if="meme.type === 'chat'" class="chat">
      <div class="chat-channel"><span aria-hidden="true">#</span>{{ meme.channel }}</div>
      <ul class="chat-messages">
        <li v-for="(msg, m) in meme.messages" :key="m" :class="['chat-msg', { 'chat-msg--system': msg.system }]">
          <span v-if="msg.system" class="chat-system">{{ msg.text }}</span>
          <template v-else>
            <span :class="['chat-avatar', `chat-avatar--${authorColor(msg.author)}`]" aria-hidden="true">{{ msg.author.charAt(0) }}</span>
            <div class="chat-content">
              <span class="chat-line">
                <strong :class="`chat-name--${authorColor(msg.author)}`">{{ msg.author }}</strong>
                <time>Heute um {{ msg.time }}</time>
              </span>
              <p>{{ msg.text }}</p>
            </div>
          </template>
        </li>
      </ul>
    </div>

    <!-- Zwei Knöpfe -->
    <div v-else-if="meme.type === 'buttons'" class="buttons-meme">
      <div class="red-buttons">
        <span v-for="opt in meme.options" :key="opt" class="red-button">{{ opt }}</span>
      </div>
      <p class="buttons-caption"><span class="sweat">*schwitzt*</span> {{ meme.caption }}</p>
    </div>

    <!-- Erwartung vs. Realität -->
    <div v-else-if="meme.type === 'expectation'" class="expect">
      <div class="expect-panel expect-panel--a">
        <span class="expect-label">Erwartung</span>
        <p>{{ meme.expectation }}</p>
      </div>
      <div class="expect-panel expect-panel--b">
        <span class="expect-label">Realität</span>
        <p>{{ meme.reality }}</p>
      </div>
    </div>

    <!-- Erfolg freigeschaltet -->
    <div v-else-if="meme.type === 'achievement'" class="achievement">
      <span class="achievement-icon"><AppIcon name="trophy" stroke="1.8" /></span>
      <div class="achievement-text">
        <span class="achievement-kicker">Erfolg freigeschaltet</span>
        <strong>{{ meme.title }}</strong>
        <p>{{ meme.text }}</p>
      </div>
      <span class="achievement-points">+{{ meme.points }}</span>
    </div>

    <!-- Gesucht -->
    <div v-else-if="meme.type === 'wanted'" class="wanted">
      <span class="wanted-title">Gesucht</span>
      <div class="wanted-photo" aria-hidden="true">?</div>
      <p class="wanted-crime">{{ meme.crime }}</p>
      <dl>
        <dt>Zuletzt gesehen</dt>
        <dd>{{ meme.lastSeen }}</dd>
        <dt>Belohnung</dt>
        <dd>{{ meme.reward }}</dd>
      </dl>
    </div>

    <!-- Change my mind -->
    <div v-else-if="meme.type === 'changemind'" class="changemind">
      <div class="sign">
        <p>{{ meme.text }}</p>
        <span>Überzeug mich vom Gegenteil</span>
      </div>
      <p v-if="meme.note" class="changemind-note">{{ meme.note }}</p>
    </div>

    <!-- Eigenes Bild -->
    <figure v-else-if="meme.type === 'image'" class="image-meme">
      <img :src="assetUrl(meme.src)" :alt="meme.caption || 'Meme'" loading="lazy" />
      <figcaption v-if="meme.caption">{{ meme.caption }}</figcaption>
    </figure>
  </article>
</template>

<style scoped>
.meme {
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

/* Discord chat */
.chat {
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: #313338;
  border: 1px solid #1e1f22;
}

.chat-channel {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.6rem 0.9rem;
  border-bottom: 1px solid #1e1f22;
  font-size: 0.85rem;
  font-weight: 700;
  color: #f2f3f5;
}

.chat-channel span {
  font-size: 1.1rem;
  color: #80848e;
}

.chat-messages {
  display: grid;
  gap: 0.75rem;
  margin: 0;
  padding: 0.9rem;
  list-style: none;
}

.chat-msg {
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 0.65rem;
  align-items: start;
}

.chat-msg--system {
  display: block;
  text-align: center;
}

.chat-system {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.25);
  font-size: 0.78rem;
  font-style: italic;
  color: #b5bac1;
}

.chat-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 0.85rem;
  font-weight: 800;
}

.chat-avatar--gold {
  background: rgba(251, 191, 36, 0.2);
  color: var(--gold-light);
}

.chat-avatar--accent {
  background: rgba(168, 85, 247, 0.22);
  color: var(--accent-light);
}

.chat-avatar--indigo {
  background: rgba(129, 140, 248, 0.22);
  color: var(--indigo-light);
}

.chat-avatar--slate {
  background: rgba(148, 163, 184, 0.2);
  color: #cbd5e1;
}

.chat-line {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.chat-line strong {
  font-size: 0.88rem;
}

.chat-name--gold {
  color: var(--gold-light);
}

.chat-name--accent {
  color: var(--accent-light);
}

.chat-name--indigo {
  color: var(--indigo-light);
}

.chat-name--slate {
  color: #cbd5e1;
}

.chat-line time {
  font-size: 0.68rem;
  color: #949ba4;
}

.chat-content p {
  font-size: 0.9rem;
  color: #dbdee1;
}

/* Two buttons */
.buttons-meme {
  text-align: center;
}

.red-buttons {
  display: flex;
  justify-content: center;
  gap: 0.9rem;
  margin: 0.5rem 0 1.25rem;
}

.red-button {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 150px;
  min-height: 72px;
  padding: 0.6rem 0.8rem;
  border-radius: 14px;
  background: #dc2626;
  box-shadow: 0 6px 0 #7f1d1d;
  font-size: 0.82rem;
  font-weight: 800;
  line-height: 1.3;
  color: #fff;
}

.red-button:first-child {
  rotate: -4deg;
}

.red-button:last-child {
  rotate: 3deg;
}

.buttons-caption {
  font-weight: 700;
  color: #fff;
}

.sweat {
  display: block;
  margin-bottom: 0.2rem;
  font-size: 0.78rem;
  font-style: italic;
  font-weight: 500;
  color: #7dd3fc;
}

/* Expectation vs reality */
.expect {
  display: grid;
  gap: 0.5rem;
}

.expect-panel {
  padding: 0.9rem 1rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
}

.expect-panel--a {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.14), rgba(15, 17, 23, 0.5));
}

.expect-panel--b {
  background: var(--surface-overlay);
}

.expect-label {
  display: block;
  margin-bottom: 0.3rem;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-dim);
}

.expect-panel--a .expect-label {
  color: var(--accent-light);
}

.expect-panel p {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-soft);
}

/* Achievement */
.achievement {
  display: grid;
  grid-template-columns: 52px 1fr auto;
  align-items: center;
  gap: 0.85rem;
  padding: 0.9rem 1rem;
  border-radius: 999px 18px 18px 999px;
  background: linear-gradient(90deg, #14532d, #166534 40%, #1a1d27);
  border: 1px solid rgba(52, 211, 153, 0.35);
}

.achievement-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #22c55e;
  color: #052e16;
}

.achievement-icon svg {
  width: 28px;
  height: 28px;
}

.achievement-kicker {
  display: block;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #86efac;
}

.achievement-text strong {
  display: block;
  font-size: 1.05rem;
  color: #fff;
}

.achievement-text p {
  font-size: 0.82rem;
  color: #d1fae5;
}

.achievement-points {
  font-size: 1.05rem;
  font-weight: 900;
  color: #86efac;
}

/* Wanted poster */
.wanted {
  padding: 1.25rem;
  border-radius: var(--radius-sm);
  border: 2px dashed rgba(251, 191, 36, 0.45);
  background: rgba(251, 191, 36, 0.05);
  text-align: center;
}

.wanted-title {
  display: block;
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold);
}

.wanted-photo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 96px;
  height: 96px;
  margin: 0.9rem auto;
  border-radius: 14px;
  background: var(--surface-overlay);
  border: 1px solid var(--border);
  font-size: 2.5rem;
  font-weight: 900;
  color: var(--text-dim);
}

.wanted-crime {
  margin-bottom: 0.9rem;
  font-size: 1.05rem;
  font-weight: 800;
  color: #fff;
}

.wanted dl {
  display: grid;
  gap: 0.15rem;
  margin: 0;
  font-size: 0.85rem;
}

.wanted dt {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-dim);
}

.wanted dd {
  margin: 0 0 0.5rem;
  color: var(--text-soft);
}

/* Change my mind */
.sign {
  padding: 1.5rem 1.25rem;
  border-radius: 10px;
  background: #f5f5f4;
  box-shadow: 0 8px 0 #57534e;
  text-align: center;
}

.sign p {
  font-size: 1.15rem;
  font-weight: 900;
  line-height: 1.3;
  color: #1c1917;
}

.sign span {
  display: block;
  margin-top: 0.4rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #57534e;
}

.changemind-note {
  margin-top: 1.25rem;
  font-size: 0.8rem;
  font-style: italic;
  text-align: center;
  color: var(--danger);
}
</style>
