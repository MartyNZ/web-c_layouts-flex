// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },
  css: ["bootstrap/scss/bootstrap.scss"],
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { content: "width=device-width, initial-scale=1.0", name: "viewport" },
      ],
      script: [
        {
          src: "https://kit.fontawesome.com/10ce22d6ee.js",
          crossorigin: "anonymous",
        },
        {
          type: "text/javascript",
          hid: "swiper",
          body: true,
          src: "/assets/vendor/purecounter/purecounter_vanilla.js",
        },
        {
          type: "text/javascript",
          hid: "swiper",
          body: true,
          src: "/assets/vendor/swiper/swiper-bundle.min.js",
        },
        {
          type: "text/javascript",
          hid: "glightbox",
          body: true,
          src: "/assets/vendor/glightbox/js/glightbox.js",
        },
        {
          type: "text/javascript",
          hid: "aos",
          body: true,
          src: "/assets/vendor/aos/aos.js",
        },
        {
          type: "text/javascript",
          hid: "isotope",
          body: true,
          src: "/assets/vendor/isotope-layout/isotope.pkgd.min.js",
        },
        {
          type: "text/javascript",
          hid: "main",
          body: true,
          src: "/assets/js/main.js",
        },
      ],
      link: [
        { href: "assets/img/favicon.png", rel: "icon" },
        { href: "assets/img/apple-touch-icon.png", rel: "apple-touch-icon" },
        {
          href: "https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i",
          rel: "stylesheet",
        },
        {
          rel: "stylesheet",
          href: "/assets/vendor/swiper/swiper-bundle.min.css",
        },
        {
          rel: "stylesheet",
          href: "/assets/vendor/aos/aos.css",
        },
        {
          rel: "stylesheet",
          href: "/assets/vendor/bootstrap-icons/bootstrap-icons.css",
        },
        {
          rel: "stylesheet",
          href: "/assets/vendor/glightbox/css/glightbox.min.css",
        },
        {
          href: "/assets/vendor/bootstrap/css/bootstrap.min.css",
          rel: "stylesheet",
        },
        {
          href: "/assets/vendor/remixicon/remixicon.css",
          rel: "stylesheet",
        },
        {
          href: "/assets/css/style.css",
          rel: "stylesheet",
        },
      ],
    },
  },
});
