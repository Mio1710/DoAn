import { defineRule, configure, Form, Field, ErrorMessage } from 'vee-validate'
import { all } from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import vi from '@vee-validate/i18n/dist/locale/vi.json'
import {format} from "date-fns";

export default defineNuxtPlugin((nuxtApp) => {
  Object.entries(all).forEach(([name, rule]) => {
    defineRule(name, rule)
  })

  defineRule('before', (value, target) => {
    if (!value || !target) {
      return true
    }
    const targetDate = new Date(target)
    const valueDate = new Date(value)

    if (valueDate.getTime() > targetDate.getTime()) {
      return `Giá trị phải nhỏ hơn ${format(targetDate, 'dd/MM/yyyy HH:mm')}`
    }
    return true
  })

  defineRule('after', (value, target) => {
    if (!value || !target) {
      return true
    }
    const targetDate = new Date(target)
    const valueDate = new Date(value)

    if (valueDate.getTime() < targetDate.getTime()) {
      return `Giá trị phải lớn hơn ${format(targetDate, 'dd/MM/yyyy HH:mm')}`
    }
    return true
  })

  nuxtApp.vueApp.component('VeeForm', Form)
  nuxtApp.vueApp.component('VeeField', Field)
  nuxtApp.vueApp.component('VeeErrorMessage', ErrorMessage)

  configure({
    // Generates an English message locale generator
    generateMessage: localize('vi', vi),
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
    validateOnModelUpdate: true,
  })
})
