import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const SITE_NAME = 'Familie Reichmann';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFound.vue'), meta: { title: 'Nicht gefunden' } },
];

const router = createRouter({
  // BASE_URL is the GitHub Pages sub-path (e.g. /familie-reichmann/) in production builds.
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, top: 90, behavior: 'smooth' };
    }
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} · ${SITE_NAME}` : SITE_NAME;
});

// After a redeploy, a tab with the old build requests page chunks that no longer exist.
// Reload once at the target URL to pick up the new build instead of silently doing nothing.
const CHUNK_ERROR = /dynamically imported module|Importing a module script failed|Failed to load module script/i;
const RELOAD_KEY = 'reichmann-chunk-reload';

router.onError((error, to) => {
  if (!CHUNK_ERROR.test(error?.message ?? '')) return;
  try {
    const lastReload = Number(sessionStorage.getItem(RELOAD_KEY) || 0);
    if (Date.now() - lastReload < 10_000) return;
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
  } catch {
    // Storage unavailable: reload anyway, the guard is only loop protection.
  }
  window.location.assign(router.resolve(to).href);
});

export default router;
