import { createVuetify } from 'vuetify'
import { VBtn } from 'vuetify/components'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    components: { VBtn },
  })
  nuxtApp.vueApp.use(vuetify)
})