<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { DISCORD_INVITE_URL } from './content/reichmann';
import CrestIcon from './components/CrestIcon.vue';
import DiscordIcon from './components/DiscordIcon.vue';
import AppFooter from './components/AppFooter.vue';

const router = useRouter();
const isScrolled = ref(false);
const showScrollTop = ref(false);
const menuOpen = ref(false);

const sectionLinks = [
  { label: 'Familie', to: { path: '/', hash: '#familie' } },
  { label: 'Ränge', to: { path: '/', hash: '#ranks' } },
  { label: 'Gebote', to: { path: '/', hash: '#gebote' } },
  { label: 'Berichte', to: { path: '/', hash: '#berichte' } },
  { label: 'Memes', to: { path: '/', hash: '#memes' } },
  { label: 'FAQ', to: { path: '/', hash: '#faq' } },
];

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiPos = 0;
let secretTimer = null;
const showSecret = ref(false);

function handleKeydown(event) {
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  if (key === KONAMI[konamiPos]) {
    konamiPos += 1;
  } else {
    konamiPos = key === KONAMI[0] ? 1 : 0;
  }
  if (konamiPos === KONAMI.length) {
    konamiPos = 0;
    showSecret.value = true;
    clearTimeout(secretTimer);
    secretTimer = setTimeout(() => (showSecret.value = false), 6000);
  }
}

function handleScroll() {
  isScrolled.value = window.scrollY > 8;
  showScrollTop.value = window.scrollY > 600;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('keydown', handleKeydown);
  clearTimeout(secretTimer);
});

watch(
  () => router.currentRoute.value.fullPath,
  () => {
    menuOpen.value = false;
  }
);
</script>

<template>
  <div class="app-shell">
    <header :class="['navbar', { 'is-scrolled': isScrolled }]">
      <div class="container navbar-inner">
        <RouterLink to="/" class="brand">
          <CrestIcon class="brand-crest" />
          <span>Familie <span class="brand-accent">Reichmann</span></span>
        </RouterLink>

        <nav class="nav-desktop" aria-label="Hauptnavigation">
          <RouterLink
            v-for="link in sectionLinks"
            :key="link.label"
            :to="link.to"
            class="nav-link"
            active-class=""
            exact-active-class=""
          >
            {{ link.label }}
          </RouterLink>
        </nav>

        <div class="nav-actions">
          <a :href="DISCORD_INVITE_URL" target="_blank" rel="noopener" class="btn btn-discord btn-sm">
            <DiscordIcon />
            Discord beitreten
          </a>
        </div>

        <button
          class="menu-toggle"
          :aria-label="menuOpen ? 'Menü schließen' : 'Menü öffnen'"
          :aria-expanded="menuOpen"
          @click="menuOpen = !menuOpen"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
            <path v-if="menuOpen" d="M6 18 18 6M6 6l12 12" />
            <path v-else d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
          </svg>
        </button>
      </div>

      <Transition name="menu">
        <div v-if="menuOpen" class="nav-mobile">
          <RouterLink to="/" class="nav-link" exact-active-class="is-active" active-class="">Start</RouterLink>
          <RouterLink
            v-for="link in sectionLinks"
            :key="link.label"
            :to="link.to"
            class="nav-link"
            active-class=""
            exact-active-class=""
          >
            {{ link.label }}
          </RouterLink>
          <div class="nav-mobile-footer">
            <a :href="DISCORD_INVITE_URL" target="_blank" rel="noopener" class="btn btn-discord btn-sm">
              <DiscordIcon />
              Discord beitreten
            </a>
          </div>
        </div>
      </Transition>
    </header>

    <main>
      <RouterView />
    </main>

    <AppFooter />

    <Transition name="secret">
      <div v-if="showSecret" class="secret-toast" role="status">
        <CrestIcon class="secret-crest" />
        <div>
          <strong>Geheimcode erkannt.</strong>
          <span>Willkommen im inneren Kreis. Wir haben dich erwartet.</span>
        </div>
      </div>
    </Transition>

    <Transition name="fade">
      <button v-if="showScrollTop" class="scroll-top" aria-label="Nach oben" @click="scrollToTop">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m4.5 15.75 7.5-7.5 7.5 7.5" />
        </svg>
      </button>
    </Transition>
  </div>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(15, 17, 23, 0.75);
  backdrop-filter: blur(16px) saturate(140%);
  -webkit-backdrop-filter: blur(16px) saturate(140%);
  border-bottom: 1px solid transparent;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.navbar.is-scrolled {
  background: rgba(15, 17, 23, 0.9);
  border-bottom-color: var(--border);
}

.navbar-inner {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  height: var(--nav-h);
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: #fff;
  flex-shrink: 0;
}

.brand-crest {
  width: 34px;
  height: 34px;
  filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.35));
  transition: transform 0.25s ease;
}

.brand:hover .brand-crest {
  transform: scale(1.08) rotate(-4deg);
}

.brand-accent {
  color: var(--accent-light);
}

.nav-desktop {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-left: auto;
}

.nav-link {
  padding: 0.5rem 0.8rem;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-muted);
  white-space: nowrap;
  transition: color 0.2s ease, background-color 0.2s ease;
}

.nav-link:hover {
  color: #fff;
  background: rgba(36, 40, 55, 0.5);
}

.nav-link.is-active {
  color: var(--accent-light);
  background: rgba(168, 85, 247, 0.1);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-left: 1rem;
  border-left: 1px solid var(--border);
}

.menu-toggle {
  display: none;
  margin-left: auto;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--text-soft);
  cursor: pointer;
}

.menu-toggle svg {
  width: 22px;
  height: 22px;
}

.nav-mobile {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.75rem 1.25rem 1.25rem;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.6);
}

.nav-mobile .nav-link {
  padding: 0.75rem 0.9rem;
  font-size: 1rem;
}

.nav-mobile-footer {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

.nav-mobile-footer .btn {
  flex: 1;
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.scroll-top {
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  z-index: 60;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text-soft);
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
}

.scroll-top:hover {
  transform: translateY(-3px);
  border-color: rgba(168, 85, 247, 0.4);
  color: var(--accent-light);
  box-shadow: var(--glow-accent);
}

.scroll-top svg {
  width: 20px;
  height: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.secret-toast {
  position: fixed;
  left: 50%;
  bottom: 1.5rem;
  z-index: 70;
  translate: -50% 0;
  display: flex;
  align-items: center;
  gap: 0.9rem;
  width: max-content;
  max-width: calc(100vw - 2rem);
  padding: 0.9rem 1.25rem 0.9rem 1rem;
  border-radius: var(--radius);
  border: 1px solid rgba(251, 191, 36, 0.4);
  background: var(--surface);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(251, 191, 36, 0.15);
}

.secret-crest {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
}

.secret-toast strong {
  display: block;
  color: var(--gold-light);
  font-size: 0.95rem;
}

.secret-toast span {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.secret-enter-active,
.secret-leave-active {
  transition: opacity 0.3s ease, transform 0.3s var(--ease-out);
}

.secret-enter-from,
.secret-leave-to {
  opacity: 0;
  transform: translateY(16px);
}

@media (max-width: 1024px) {
  .nav-desktop,
  .nav-actions {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }
}
</style>
