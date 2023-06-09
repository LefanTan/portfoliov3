<script setup lang="ts">
const props = defineProps({
  error: Object,
});

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <main class="flex flex-col items-center justify-center">
    <h1 class="text-6xl">{{ error?.statusCode }} error</h1>
    <button @click="handleError">go back</button>
  </main>
</template>
