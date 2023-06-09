<script setup lang="ts">
import { DirectusTypes } from "~/directus";

const config = useRuntimeConfig();

const description =
  "Here's all the blogs/articles I've written so far. Nothing serious, mostly just me rambling about things I'm interested in.";

const { data } = await useFetch<{ data: DirectusTypes["users"] }>(
  "/items/users/" + config.public.userId,
  {
    baseURL: config.public.cmsUrl,
    query: {
      fields: ["*", "blogs.*"].join(","),
    },
  }
);

const blogs = data.value?.data?.blogs?.map((blogItem) => {
  const blog = blogItem as DirectusTypes["blogs"];

  return {
    ...blog,
    url: `/blogs/${blog.id}/${convertToSlug(blog.title ?? "default-slug")}`,
  };
});

useSeoMeta({
  title: "Lefan Tan's Blogs",
  description,
});
</script>

<template>
  <main>
    <h1 class="text-6xl sm:text-8xl mb-1">Blogs</h1>
    <p class="text-lg sm:text-2xl mt-4">
      {{ description }}
    </p>
    <div class="divider my-4" />
    <ul class="flex flex-col gap-10 mt-12">
      <li v-for="blog in blogs?.slice(0, 5)">
        <blog :blog="blog" :url="blog.url" />
      </li>
    </ul>
  </main>
</template>
