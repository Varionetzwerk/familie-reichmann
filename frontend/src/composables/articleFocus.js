import { ref } from 'vue';

// Lets the news ticker open a report in the Schattenblatt section.
export const focusedArticle = ref(null);

export function openArticle(id) {
  // A fresh object so clicking the same item twice still triggers the watcher.
  focusedArticle.value = { id };
}
