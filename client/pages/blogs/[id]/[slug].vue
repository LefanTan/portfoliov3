<script setup lang="ts">
import { DirectusTypes } from "~/directus";

const config = useRuntimeConfig();
const route = useRoute();

const { data } = await useFetch<{ data: DirectusTypes["blogs"] }>(
  "/items/blogs/" + route.params.id.toString(),
  {
    baseURL: config.public.cmsUrl,
    query: {
      fields: "*.*",
    },
  }
);

const blog = data.value?.data;

if (!blog) {
  await navigateTo("/404");
}

const blogSections = blog?.sections?.map(
  (sectionItem) => sectionItem as DirectusTypes["blog_sections"]
);

const firstImage = blogSections?.find(
  (sectionItem) => sectionItem.type === "image"
)?.imageFile;

useSeoMeta({
  title: blog?.title,
  ogTitle: blog?.title,
  twitterTitle: blog?.title,

  description: blog?.description,
  ogDescription: blog?.description,
  twitterDescription: blog?.description,
  twitterCard: "summary_large_image",

  twitterImage: () => `${config.public.cmsUrl}/assets/${firstImage}`,
  ogImage: () => `${config.public.cmsUrl}/assets/${firstImage}`,
});
</script>

<template>
  <main>
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
          <figure class="flex flex-col items-center gap-4 mb-4">
            <nuxt-img
              :src="`${config.public.cmsUrl}/assets/${section.imageFile}`"
              :alt="section.imageCaption ?? ''"
              sizes="lg:1000px sm:400px"
              class="border-item mx-auto mt-10 w-full max-w-3xl"
              preset="general"
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
  @apply text-4xl sm:text-5xl;
}

h2 {
  @apply mt-12 text-3xl sm:text-4xl;
}

.divider {
  @apply my-4;
}

.metadata {
  @apply border-b border-black flex justify-between py-4 sm:mt-4 text-black-200 font-normal;
}

:deep(.content) {
  @apply mt-4 font-normal pb-20;

  h3,
  h4 {
    @apply font-sans;
  }

  h3 {
    @apply text-xl mb-2;
  }

  blockquote {
    @apply pl-4 text-base bg-gray-100 p-3 relative;

    &::before {
      content: "";
      @apply absolute top-0 bottom-0 left-0 bg-primary w-1;
    }
  }

  li {
    @apply mb-2;

    &::marker {
      @apply inline-block mr-5;
    }
  }

  a {
    @apply relative font-medium;

    &:before {
      content: "";
      @apply h-0.5 w-full absolute bottom-0 left-0 bg-primary;
    }
  }
}
</style>
