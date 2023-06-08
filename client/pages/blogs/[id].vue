<script setup lang="ts">
import { DirectusTypes } from "~/directus";

const client = useDirectus();
const config = useRuntimeConfig();
const route = useRoute();

const blog = await client
  .items("blogs")
  .readOne(route.params.id.toString(), {
    fields: ["*.*"],
  })
  .catch(async () => {
    await navigateTo("/404");
  });

if (!blog) {
  await navigateTo("/404");
}

const blogSections = blog?.sections?.map(
  (sectionItem) => sectionItem as DirectusTypes["blog_sections"]
);

useServerSeoMeta({
  title: blog?.title,
  description: blog?.description,
});
</script>

<template>
  <main class="max-width pt-6 sm:pt-16">
    <h1>{{ blog?.title }}</h1>

    <div class="metadata">
      <time>{{
        formatUtcDate(blog?.date_updated ?? blog?.date_created!)
      }}</time>

      <div v-if="blogSections">
        {{ calculateBlogReadTime(blogSections) }} min read
      </div>
    </div>

    <div class="content">
      <div v-for="section in blogSections">
        <div
          v-if="section.type === 'text' && section.textContent"
          v-html="pMarked(section.textContent)"
        ></div>

        <div v-if="section.type === 'title'">
          <h2>{{ section.textContent }}</h2>
          <div class="divider" />
        </div>

        <div v-if="section.type === 'image'">
          <figure class="flex flex-col items-center gap-4">
            <nuxt-img
              :src="`${config.public.cmsUrl}/assets/${section.imageFile}`"
              :alt="section.imageCaption ?? ''"
              sizes="lg:1000px sm:400px"
              class="border-item mx-auto mt-10 w-full max-w-3xl"
            />
            <figcaption class="text-base text-black-200">
              {{ section.imageCaption }}
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
h1 {
  @apply text-3xl sm:text-5xl;
}

h2 {
  @apply mt-12 text-2xl sm:text-4xl;
}

:deep(h3) {
  @apply font-sans;
}

.divider {
  @apply my-4;
}

.metadata {
  @apply border-b border-black flex justify-between py-4 sm:mt-4 text-black-200 font-normal;
}

.content {
  @apply mt-4 font-normal pb-20;
}
</style>
