<script setup lang="ts">
import { DirectusTypes } from "~/directus";

const config = useRuntimeConfig();

const description =
  "Side projects are such a great way to learn new things. Here are some of the projects I've worked on so far.";

const { data } = await useFetch<{ data: DirectusTypes["users"] }>(
  "/items/users/" + config.public.userId,
  {
    baseURL: config.public.cmsUrl,
    query: {
      fields: ["*", "projects.*"].join(","),
    },
  }
);

const projects = data.value?.data?.projects?.map((projectItem) => {
  const project = projectItem as DirectusTypes["projects"];

  return {
    ...project,
    heroImg: `${config.public.cmsUrl}/assets/${project.heroImg}`,
  };
});

useSeoMeta({
  title: "Lefan Tan's Projects",
  description,
});
</script>

<template>
  <main>
    <h1 class="text-6xl sm:text-8xl mb-1">Projects</h1>
    <p class="text-lg sm:text-2xl mt-4">
      {{ description }}
    </p>
    <div class="divider my-4" />
    <ul class="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
      <li class="flex min-w-[20rem]" v-for="project in projects">
        <project :project="project" />
      </li>
    </ul>
  </main>
</template>

<style lang="scss" scoped></style>
