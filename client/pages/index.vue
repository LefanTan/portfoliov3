<script setup lang="ts">
import emailjs from "@emailjs/browser";
import { DirectusTypes } from "~/directus";

const config = useRuntimeConfig();
const client = useDirectus();

const user = await client.items("users").readOne(config.public.userId, {
  fields: ["*", "testimonials.*", "projects.*", "blogs.*"],
});

const testimonials = user?.testimonials?.map((testimonyItem) => {
  const testimony = testimonyItem as DirectusTypes["testimonials"];

  return {
    ...testimony,
    profileImage: `${config.public.cmsUrl}/assets/${testimony.profilePhoto}`,
  };
});

const projects = user?.projects?.map((projectItem) => {
  const project = projectItem as DirectusTypes["projects"];

  return {
    ...project,
    heroImg: `${config.public.cmsUrl}/assets/${project.heroImg}`,
  };
});

const blogs = user?.blogs?.map((blogItem) => {
  const blog = blogItem as DirectusTypes["blogs"];

  return {
    ...blog,
    url: `/blogs/${blog.id}`,
  };
});

function onInput(e: Event) {
  const inputEl = e.target as HTMLInputElement;
  inputEl.parentElement!.dataset.value = inputEl.value;
}

function onMessageSubmit(e: Event) {
  e.preventDefault();
  const formEl = e.target as HTMLFormElement;

  emailjs.sendForm(
    "service_s2du2od",
    "template_dqmuthk",
    formEl,
    config.public.emailJS
  );

  formEl.reset();
}
</script>

<template>
  <main class="max-width pt-6 md:pt-16">
    <h1 class="text-6xl sm:text-8xl mb-1">{{ user?.title }}</h1>
    <div class="text-xl sm:text-2xl" v-html="pMarked(user?.subtitle ?? '')" />
    <section id="about">
      <h2 class="title">about me</h2>
      <div class="divider" />

      <div class="inline-block mt-8 text-lg font-normal">
        <nuxt-img
          :src="`${$config.public.cmsUrl}/assets/${user?.heroImage}`"
          alt="profile image"
          format="webp"
          height="350px"
          width="350px"
          class="border-item object-contain bnw w-full sm:max-w-[20rem] inline float-left mr-8 mb-4"
        />
        <div v-html="pMarked(user?.about ?? '')"></div>
      </div>

      <div id="#testimonials" class="pt-8">
        <h3 class="text-4xl">testimonials</h3>
        <div class="divider" />
        <div class="flex flex-wrap gap-x-8 gap-y-10">
          <figure
            class="flex-1 flex flex-col min-w-[15rem]"
            v-for="testimony in testimonials"
          >
            <q
              class="italic font-normal mb-6 [&>p]:inline"
              v-html="pMarked(testimony.quote ?? '')"
            >
            </q>

            <div class="flex items-center gap-4 mt-auto">
              <nuxt-img
                :src="testimony.profileImage"
                alt="profile image"
                class="border-item object-contain bnw"
                width="56px"
                height="56px"
                preset="general"
              />
              <p class="font-semibold">
                {{ testimony.name }} <br />
                <span class="font-medium">
                  {{ testimony.position }} @ {{ testimony.company }}</span
                >
              </p>
            </div>
          </figure>
        </div>
      </div>
    </section>

    <section id="projects">
      <div class="flex items-center justify-between">
        <h2 class="title">projects</h2>
        <nuxt-link to="/projects" class="see-all"> see all </nuxt-link>
      </div>
      <div class="divider" />

      <div class="flex flex-wrap gap-8 mt-8">
        <nuxt-link
          v-for="project in projects"
          class="flex-1 flex flex-col gap-2 min-w-[20rem]"
          :class="{
            'group cursor-pointer': project.link,
            'cursor-default pointer-events-none': !project.link,
          }"
          :to="project.link ?? '/#projects'"
        >
          <h4 class="font-sans text-3xl">{{ project.name }}</h4>
          <figcaption class="font-normal text-base line-clamp-2 mb-4">
            {{ project.description }}
          </figcaption>
          <nuxt-img
            :src="project.heroImg"
            :alt="`${project.name} image`"
            class="border-item object-cover h-auto sm:h-60 w-full mx-auto bg-white"
            sizes="sm:100vw md:50vw lg:400px"
            preset="general"
          />
          <span
            v-if="project.link"
            class="text-xl ml-auto group-hover:bg-primary"
          >
            read more
          </span>
        </nuxt-link>
      </div>
    </section>

    <section id="blogs">
      <div class="flex items-center justify-between">
        <h2 class="title">blogs</h2>
        <nuxt-link to="/blogs" class="see-all"> see all </nuxt-link>
      </div>
      <div class="divider" />

      <ul class="flex flex-col gap-10 mt-8">
        <li v-for="blog in blogs">
          <nuxt-link :to="blog.url" class="group">
            <h4
              class="font-sans text-2xl font-medium group-hover:bg-primary w-fit"
            >
              {{ blog.title }}
            </h4>
            <div
              class="flex items-center justify-between text-black-200 font-normal"
            >
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
        </li>
      </ul>
    </section>

    <section id="contact">
      <h2 class="title">contact me</h2>

      <div class="divider" />

      <form class="contact-form" @submit="onMessageSubmit">
        <div class="wrapper">
          <input required type="text" name="name" placeholder="name" />
          <input required type="email" name="email" placeholder="email" />
        </div>
        <div class="textarea-wrapper">
          <textarea
            required
            name="message"
            rows="1"
            placeholder="message"
            @input="onInput"
          ></textarea>
        </div>

        <button type="submit" class="submit">send</button>
      </form>
    </section>
  </main>
</template>

<style scoped lang="scss">
section {
  @apply py-16;

  .title {
    @apply text-5xl sm:text-6xl font-semibold;
  }
}

.see-all {
  @apply text-2xl font-medium hover:bg-primary;
}

.divider {
  @apply my-4;
}

.contact-form {
  @apply flex flex-col gap-16 mt-16;

  .wrapper {
    @apply flex flex-wrap gap-8;
  }

  input,
  textarea {
    @apply outline-none bg-transparent border-b border-black flex-1 pb-2 text-xl;

    &::placeholder {
      @apply text-black;
    }
  }

  .textarea-wrapper {
    @apply relative inline-grid;

    textarea {
      @apply inline-block relative;
      grid-area: 1/1;
    }

    &::after {
      display: inline-block;
      content: attr(data-value) " ";
      visibility: hidden;
      white-space: pre-wrap;
      width: auto;
      grid-area: 1/1;
      padding-bottom: 1rem;
    }
  }

  .submit {
    @apply bg-primary text-2xl ml-auto;
  }
}
</style>
