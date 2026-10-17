<script setup>
import { ICONS } from '../icons';

defineProps({
  name: { type: String, required: true },
  stroke: { type: [Number, String], default: 1.5 },
});
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="stroke"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path :d="ICONS[name]" />
  </svg>
</template>
