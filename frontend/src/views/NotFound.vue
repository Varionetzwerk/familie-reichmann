<template>
  <div class="not-found">
    <div class="bg-grid" aria-hidden="true"></div>
    <div class="glow glow-accent glow-pulse nf-glow" aria-hidden="true"></div>

    <div class="nf-inner" v-reveal>
      <span class="eyebrow">Akte nicht gefunden</span>
      <h1 class="nf-code">404</h1>
      <p class="nf-title">Diese Seite ist einkaufen gegangen.</p>
      <p class="nf-text">
        Sie kommt bestimmt bald wieder. Vielleicht. Bis dahin gilt: Du warst nie hier, und wir haben dich nie gesehen.
      </p>
      <RouterLink to="/" class="btn btn-primary btn-lg">Zurück zur Familie</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - var(--nav-h));
  padding: 4rem 1.25rem;
  text-align: center;
}

.nf-glow {
  top: 50%;
  left: 50%;
  width: 520px;
  height: 420px;
  translate: -50% -50%;
}

.nf-inner {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nf-code {
  font-size: clamp(6rem, 18vw, 10rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.05em;
  color: var(--accent-light);
  text-shadow: 0 0 60px rgba(168, 85, 247, 0.35);
  margin-bottom: 1.25rem;
}

.nf-title {
  font-size: clamp(1.3rem, 3vw, 1.75rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #fff;
  margin-bottom: 0.75rem;
}

.nf-text {
  max-width: 440px;
  color: var(--text-muted);
  font-size: 1.05rem;
  margin-bottom: 2.25rem;
}
</style>
