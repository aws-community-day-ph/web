// https://nuxt.com/docs/api/configuration/nuxt-config
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
  ],
})
