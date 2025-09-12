import '@mdi/font/css/materialdesignicons.css'
import { VDateInput } from 'vuetify/labs/VDateInput'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import '@/assets/scss/style.scss'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    defaults: {
      VCard: {
        rounded: 'md',
      },
      VAutocomplete: {
        variant: 'outlined',
        density: 'compact',
        color: 'primary',
        clearable: true,
        hideDetails: 'auto',
      },
      VCombobox: {
        variant: 'outlined',
        density: 'compact',
        color: 'primary',
        clearable: true,
        hideDetails: 'auto',
      },
      VTextField: {
        variant: 'outlined',
        density: 'compact',
        color: 'primary',
        clearable: false,
        hideDetails: 'auto',
        type: 'text',
      },
      VTextarea: {
        variant: 'outlined',
        density: 'compact',
        color: 'primary',
        hideDetails: 'auto',
      },
      VSelect: {
        variant: 'outlined',
        density: 'compact',
        color: 'primary',
        hideDetails: 'auto',
      },
      VListItem: {
        minHeight: '40px',
      },
      VTooltip: {
        location: 'top',
      },
      VDialog: {
        persistent: true,
      },
      VFileInput: {
        density: 'compact',
      },
      VTable: {
        fixHeader: true,
        noDataText: 'Không có dữ liệu',
      },
    },
    components: {
      VDateInput,
    },
  })
  app.vueApp.use(vuetify)
})
