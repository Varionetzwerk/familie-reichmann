// Usage: v-reveal or v-reveal="delayMs" for staggered grids.
export default {
  mounted(el, binding) {
    el.classList.add('reveal');

    const delay = Number(binding.value) || 0;
    if (delay) el.style.transitionDelay = `${delay}ms`;

    const reveal = () => {
      el.classList.add('reveal-visible');
      observer.disconnect();
      clearTimeout(fallback);
      // Drop the stagger delay afterwards so hover transitions react immediately.
      if (delay) setTimeout(() => (el.style.transitionDelay = ''), delay + 800);
    };

    // Safety net: guarantee visibility even if the observer never fires.
    const fallback = setTimeout(reveal, 1200 + delay);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) reveal();
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
  },
};
