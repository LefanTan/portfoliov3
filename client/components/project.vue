<script setup lang="ts">
import { DirectusTypes } from "~/directus";

defineProps<{
  project: DirectusTypes["projects"];
}>();
</script>

<template>
  <nuxt-link
    class="flex flex-col gap-2"
    :class="{
      'group cursor-pointer': project.link,
      'cursor-default pointer-events-none': !project.link,
    }"
    :to="project.link ?? '/#projects'"
  >
    <h4 class="font-sans text-3xl">{{ project.name }}</h4>
    <figcaption class="font-normal text-base line-clamp-2 sm:h-12 mb-4">
      {{ project.description }}
    </figcaption>
    <nuxt-img
      :src="project.heroImg as string"
      :alt="`${project.name} image`"
      class="border-item object-cover h-auto sm:h-60 w-full mx-auto bg-white"
      sizes="sm:100vw md:50vw lg:400px"
      preset="general"
    />
    <span v-if="project.link" class="text-xl ml-auto group-hover:bg-primary">
      learn more
    </span>
  </nuxt-link>
</template>

<style scoped></style>
