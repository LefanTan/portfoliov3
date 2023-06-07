<script setup lang="ts">
const menuOpen = ref(false);

onMounted(() => {
  if (process.client) {
    const updateMentionOpacity = () => {
      const mentionEl = document.querySelector("#mention");
      if (!mentionEl) return;

      (mentionEl as HTMLElement).style.opacity = `${1 - window.scrollY / 100}`;
    };

    window.addEventListener("scroll", debounce(updateMentionOpacity, 100, 100));

    updateMentionOpacity();

    // Query all sections with ids only
    const sections = document.querySelectorAll("section[id]");

    const observer: IntersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Get the nav link that corresponds to the section
          const navLink = document.querySelector(
            `nav a[href="/#${entry.target.id}"]`
          );

          // Add highlights if the corresponding section is intersection
          if (entry.isIntersecting) {
            navLink?.classList.add("bg-primary");
          } else {
            navLink?.classList.remove("bg-primary");
          }
        });
      },
      {
        // This root margin creates a "line" that is 40% from the top and 60% from the bottom
        rootMargin: "-40% 0px -60% 0px",
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });
  }
});
</script>

<template>
  <header class="max-width sticky top-0 z-10">
    <nav class="flex items-center justify-between py-4">
      <nuxt-link
        to="/"
        id="mention"
        class="font-bold transition-all flex items-center text-2xl gap-1"
        ><Icon name="mdi:at" size="1.25rem" />lefan</nuxt-link
      >

      <ul
        class="flex items-center gap-4 border border-black px-4 py-2 rounded-sm bg-white"
      >
        <li>
          <button aria-label="menu" @click="menuOpen = true">
            <Icon name="solar:menu-dots-bold" size="1rem" class="-mt-0.5" />
          </button>
        </li>
        <li class="desktop-only">
          <nuxt-link to="/#about">about</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/#projects">projects</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/#blogs">blogs</nuxt-link>
        </li>
        <li class="desktop-only">
          <nuxt-link to="/#contact">contact</nuxt-link>
        </li>
      </ul>
    </nav>
  </header>

  <dialog :open="menuOpen" role="menu">
    <button aria-label="exit" class="exit-btn" @click="menuOpen = false">
      <Icon name="material-symbols:close" size="2rem" />
    </button>

    <ul class="max-width">
      <li>
        <nuxt-link to="/#about" @click="menuOpen = false">about</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/#projects" @click="menuOpen = false"
          >projects</nuxt-link
        >
      </li>
      <li>
        <nuxt-link to="/#blogs" @click="menuOpen = false">blogs</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/#contact" @click="menuOpen = false">contact</nuxt-link>
      </li>
    </ul>
  </dialog>

  <slot />

  <footer class="max-width py-5 pb-12">
    <div class="divider my-4" />

    <nuxt-link to="/" class="font-bold flex items-center text-2xl gap-1 my-6"
      ><Icon name="mdi:at" size="1.25rem" />lefan</nuxt-link
    >

    <nav>
      <ul>
        <li>
          <nuxt-link to="/">resume</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/">github</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/">linkedIn</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/">email</nuxt-link>
        </li>
      </ul>
    </nav>
  </footer>
</template>

<style scoped lang="scss">
footer {
  nav ul {
    @apply flex flex-wrap gap-4 sm:gap-8;

    a {
      @apply text-xl font-normal;
    }
  }
}

dialog {
  @apply fixed h-full inset-0 bg-black-500 text-white w-screen z-30 overflow-auto;

  .exit-btn {
    @apply absolute top-4 right-4;
  }

  ul {
    @apply flex flex-col gap-8 pt-2 sm:pt-8;
    li {
      @apply text-5xl font-semibold font-serif;
    }
  }
}
</style>
