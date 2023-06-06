// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon", "@nuxt/image-edge"],
  nitro: {
    prerender: {
      crawlLinks: true,
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {},
      },
    },
  },
  runtimeConfig: {
    public: {
      emailJS: "user_z7fnBEw9AAY4ybnnXG6f8",
    },
  },
  css: ["@/assets/styles/global.scss"],
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      title: "Lefan Tan - Software Engineer",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Hey there, my name is Lefan. I'm a software engineer currently based in Edmonton, Alberta but I'm working remotely for a Bay Area startup. I'm passionate about building products that help people and I'm always looking for new opportunities to learn and grow.",
        },
      ],
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "preload",
          as: "style",
          href: "https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Source+Serif+Pro:wght@300;400;600&display=swap",
          // "nulling" the onload handler once it is used helps some browsers avoid re-calling the handler upon switching the rel attribute.
          onload: "this.onload=null;this.rel='stylesheet'",
        },
      ],
    },
  },
  image: {
    presets: {
      general: {
        modifiers: {
          format: "webp",
          loading: "lazy",
          quality: 80,
          placeholder: true,
        },
      },
    },
  },
});
