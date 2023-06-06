<script setup lang="ts">
const blog = {
  title: "How we built Vento from an Idea to Acquisition",
  description:
    "Building Popin has been an interesting experience, biscuits here and biscuits there...",
  content: [
    {
      type: "text",
      data: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage.",
    },
    {
      type: "title",
      data: "why build vento?",
    },
    {
      type: "text",
      data: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage.",
    },
    {
      type: "image",
      data: "/assets/vento-demo.png",
      caption: "Vento Demo",
    },
    {
      type: "title",
      data: "conclusion",
    },
    {
      type: "text",
      data: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.",
    },
  ],
};

useServerSeoMeta({
  title: blog.title,
  description: blog.description,
});
</script>

<template>
  <main class="max-width pt-6 sm:pt-16">
    <h1>{{ blog.title }}</h1>

    <div class="metadata">
      <time>Jun 1, 2023</time>

      <div>5 min read</div>
    </div>

    <div class="content">
      <div v-for="item in blog.content">
        <div v-if="item.type === 'text'">
          <p>{{ item.data }}</p>
        </div>

        <div v-if="item.type === 'title'">
          <h2>{{ item.data }}</h2>
          <div class="divider" />
        </div>

        <div v-if="item.type === 'image'">
          <figure class="flex flex-col items-center gap-4">
            <nuxt-img
              :src="item.data"
              :alt="item.caption"
              sizes="lg:1000px sm:400px"
              class="border-item mx-auto mt-10 max-w-3xl"
            />
            <figcaption class="text-base text-black-200">
              {{ item.caption }}
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
