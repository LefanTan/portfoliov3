<script setup lang="ts">
const testimonials = [
  {
    quote:
      "Lefan is one of the smartest most hard working engineers I’ve ever worked with. He’s product-minded, easy to collaborate with and I think he’d be a huge asset to any team he’s a part of.",
    person: "Chris Lee",
    title: "Lead Product Designer @ Ashby",
    imgUrl: "/assets/chris.jpeg",
  },
  {
    quote: "This guy codes for sure.",
    person: "Charles Chen",
    title: "CTO @ Turas",
    imgUrl: "/assets/chuck.jpeg",
  },
];

const projects = [
  {
    title: "Vento",
    description:
      "Screen Recorder Tool that allows users to rewind and fix their mistakes",
    imgUrl: "/assets/vento-demo.png",
  },
  {
    title: "TakeMe",
    description:
      "Link In bio built for Food Content Creators. Think of LinkTree but you can post food reviews and write blogs.",
    imgUrl: "/assets/takeme.png",
  },
  {
    title: "Popin",
    description:
      "Popin is a student event app aimed to bridge students together through events.",
    imgUrl: "/assets/popin.png",
  },
  {
    title: "Big2",
    description: "Online web game based around the popular card game - Big2",
    imgUrl: "/assets/big2.jpeg",
  },
];

const blogs = [
  {
    title: "How we built Vento from an Idea to Acquisition",
    description:
      "Building Popin has been an interesting experience, biscuits here and biscuits there...",
  },
  {
    title: "My experience building Popin",
    description:
      "Building Popin has been an interesting experience, biscuits here and biscuits there...",
  },
  {
    title: "Is it possible to learn React without JS/HTML knowledge?",
    description:
      "Building Popin has been an interesting experience, biscuits here and biscuits there...",
  },
];
</script>

<template>
  <main class="max-width pt-6 sm:pt-16">
    <h1 class="text-6xl sm:text-8xl mb-1">hey there, Lefan here</h1>
    <p class="text-xl sm:text-2xl">
      if there's one thing you need to know about me, is that i love building
      stuff and also have back pain.
      <span class="bg-primary">Scroll down</span> to learn more about me.
    </p>
    <section id="about">
      <h2 class="title">about me</h2>
      <div class="divider" />

      <div class="inline-block mt-8 text-lg font-normal">
        <nuxt-img
          src="/assets/hero-img.png"
          alt="profile image"
          format="webp"
          class="border-item object-contain bnw w-full sm:max-w-[20rem] inline float-left mr-8 mb-4"
        />
        <span>
          Hey there, it's Lefan here. I'm currently working as a
          <span class="bg-primary">Frontend Engineer</span> at Ownit.
          <br />While I do lean towards frontend, during these past months, I've
          found myself really enjoying the motion of building Full Stack
          applications that solves problems. All the way from laying out
          services architecture, designing data models, designing a sleek and
          functional product; it's a lot of fun. <br />
          <br />But during my free time, I like to play badminton, squash or
          walk around the neighbourhood, can't be sitting around all day!
        </span>
      </div>

      <div id="#testimonials" class="pt-8">
        <h3 class="text-4xl">testimonials</h3>
        <div class="divider" />
        <div class="flex flex-wrap gap-x-8 gap-y-10">
          <figure
            class="flex-1 flex flex-col min-w-[15rem]"
            v-for="testimony in testimonials"
          >
            <q class="italic font-normal mb-6">{{ testimony.quote }} </q>

            <div class="flex items-center gap-4 mt-auto">
              <nuxt-img
                :src="testimony.imgUrl"
                alt="profile image"
                class="border-item object-contain bnw"
                width="56px"
                height="56px"
                preset="general"
              />
              <p class="font-semibold">
                {{ testimony.person }} <br />
                <span class="font-medium"> {{ testimony.title }}</span>
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
          class="flex-1 flex flex-col gap-2 min-w-[20rem] group"
          to="/#projects"
        >
          <h4 class="font-sans font-medium text-3xl">{{ project.title }}</h4>
          <figcaption class="font-normal text-base line-clamp-2 mb-4">
            {{ project.description }}
          </figcaption>
          <nuxt-img
            :src="project.imgUrl"
            :alt="`${project.title} image`"
            class="border-item object-cover h-auto sm:h-60 w-full mx-auto bg-white"
            sizes="sm:100vw md:50vw lg:400px"
            preset="general"
          />
          <span class="text-xl ml-auto group-hover:bg-primary">
            read more
          </span>
        </nuxt-link>
      </div>
    </section>

    <section id="blogs">
      <div class="flex items-center justify-between">
        <h2 class="title">blogs</h2>
        <nuxt-link to="/projects" class="see-all"> see all </nuxt-link>
      </div>
      <div class="divider" />

      <ul class="flex flex-col gap-10 mt-8">
        <li v-for="blog in blogs">
          <nuxt-link to="/" class="group">
            <h4
              class="font-sans text-2xl font-medium group-hover:bg-primary w-fit"
            >
              {{ blog.title }}
            </h4>
            <div
              class="flex items-center justify-between text-black-200 font-normal"
            >
              <time class="italic">June 1, 2023</time>
              <span>5 min read</span>
            </div>
            <p class="mt-2 font-normal line-clamp-2">{{ blog.description }}</p>
          </nuxt-link>
        </li>
      </ul>
    </section>

    <section id="contact">
      <h2 class="title">contact me</h2>

      <div class="divider" />

      <form class="contact-form">
        <div class="wrapper">
          <input required type="text" name="name" placeholder="name" />
          <input required type="email" name="email" placeholder="email" />
        </div>
        <textarea
          required
          name="message"
          rows="5"
          placeholder="message"
        ></textarea>

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
    @apply outline-none bg-transparent border-b-2 border-black flex-1 pb-2 text-xl;

    &::placeholder {
      @apply text-black;
    }
  }

  textarea {
    @apply inline-block;
  }

  .submit {
    @apply bg-primary text-2xl ml-auto;
  }
}
</style>
