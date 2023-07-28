// https://nuxt.com/docs/api/configuration/nuxt-config
// import packageJSON from './package.json';
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': {},
      "postcss-nested": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: [
    '@/assets/css/main.css',
    "vue3-toastify/dist/index.css",
  ],
  runtimeConfig: {
    public: {
      // app_version: packageJSON.version,
      photobooth_api_url: process.env.PHOTOBOOTH_API_URL,
    
    }
  },
  components: [
    {
      path: "~/components", // will get any components nested in let's say /components/test too
      pathPrefix: false,
    },
  ],
})
