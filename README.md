# Portfolio V3

Version 3 of my [portfolio site](https://lefantan.com)

### **Tech Stack**

Nuxt3 + Directus

In my previous portfolio [iteration](https://lefantan.github.io/portfoliov2-client/), I've built a React app along with a simple [CMS](https://github.com/LefanTan/portfoliov2-server). This is before I know that the backend I built is actually a headless CMS 😁. Through this CMS, I was able to edit details of my portfolio frontend without the need to re-deploy my React project.

Using this learning, I decided that I wanted to use a proper CMS this time, as well as using SSR/SSG for a faster First Contentful Paint(FCP) and SEO reasons.

### Directus

Directus is the headless CMS I was strongly recommended by the internet and a friend. When compared to Strapi, another popular headless CMS, a reddit User said

> Directus was in a league of its own… WAY more polished and intuitive. Really liked the UI and how it’s been setup.

I would love to build something more in-depth with Directus, since this project only necessitates basic relational schemas. Only complain I have is the _sometimes_ confusing doc.

### **Nuxt**

On V2, the React app had a horrible loading screen, slow TTI and FCP due to the nature of CSR. There's too much JS bloat needed to render this basic and mostly static page.

A transition to SSR/SSG will fix V2's slow rendering problem, but I ultimately settled with SSG because I don't want the overhead of another server. There's a pleasant simplicity with deploying and hosting a static site. A tradeoff of using SSG instead of SSR is that data changes on the CMS requires a re-deploy, which I automated using Directus' Flow feature.

The final decision of choosing a frontend framework with SSG support comes down to the following 3 - NextJS, Nuxt3 and Astro.

At this point of my (short) career, I've worked with plenty of NextJS and Astro projects; NextJS 13 had some really engineering decisions that I didn't like. On the other hand, I've found Vue to be a more pleasant framework to work with. I took a small leap to take the time and learn Nuxt3 so I can truly compare between the three. Here's what I learned:

### **Nuxt**

**Pros**

1. I liked Nuxt SSR logic better. Instead of using `getServerSideProps` or `RSC`, both SSR and CSR logic both lived in `<script />`. Nuxt will handle the graceful transfer of payload from server to client via their specifc composbles such as `useFetch`, `$fetch` or `useAsyncData`. Ex. If a network call has already been made on server, it will automatically be deduped on the client. Pretty standard stuff.

2. Auto Import is a timer saver. Define composables, helper utils or components under the right directory structure and they will be available to use almost anywhere\*.

3. Better SEO and Metadata API than Next13's hot mess.

4. Lots of nice features that when combined, make for a more pleasant DX experience.

5. Nitro Server is extremely lightweight, and are compatible with cloud functions (AWS Lambda, GC Functions). Read more:https://nitro.unjs.io/deploy/providers/firebase

**Cons**

1. Nuxt3 is still immature compare to Nuxt2, that uses Vue2.

_Disclaimer: I haven't used Nuxt long enough to dive into all of their features, there's more to uncover!_

## Deployment

The Directus instance is hosted on Google Cloud Run, connecting to a Supabase PostgreDB. Media is uploaded to GCS.
