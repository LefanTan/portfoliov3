<script setup lang="ts">
import { DirectusTypes } from "~/directus";

defineProps<{
  blog: DirectusTypes["blogs"];
  url: string;
}>();
</script>

<template>
  <nuxt-link :to="url" class="group">
    <h4 class="font-sans text-2xl font-medium group-hover:bg-primary w-fit">
      {{ blog.title }}
    </h4>
    <div class="flex items-center justify-between text-black-200 font-normal">
      <time class="italic">{{
        formatUtcDate(blog.date_updated ?? blog.date_created!)
      }}</time>
      <span v-if="blog.sections"
        >{{
          calculateBlogReadTime(
            blog.sections as DirectusTypes["blog_sections"][]
          )
        }}
        min read</span
      >
    </div>
    <p class="mt-2 font-normal line-clamp-2">{{ blog.description }}</p>
  </nuxt-link>
</template>

<style scoped></style>
