<script setup lang="ts">
import AppForm from '~/components/common/molecules/AppForm.vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Dialog',
  },
  approval: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  isUpdate: {
    type: Boolean,
    default: false,
  },
  canDelete: {
    type: Boolean,
    default: false,
  },
  canCancel: {
    type: Boolean,
    default: false,
  },
  submitText: {
    type: String,
    default: 'Lưu',
  },
  createText: {
    type: String,
    default: 'Tạo',
  },
  updateText: {
    type: String,
    default: 'Chỉnh sửa',
  },
  deleteText: {
    type: String,
    default: 'Xóa',
  },
  cancelText: {
    type: String,
    default: 'Huỷ',
  },
  height: {
    type: String,
    default: null,
  },
  hideAction: {
    type: Boolean,
    default: false,
  },
  hideSubmit: {
    type: Boolean,
    default: false,
  },
  noHandleSubmit: {
    type: Boolean,
    default: false,
  },
  tableCheck: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['close', 'cancel', 'submit'])
const submit = () => {
  emit('submit')
}
</script>

<template>
  <v-card v-bind="$attrs">
    <app-form ref="formCard" v-slot="{ handleSubmit }">
      <v-card-title>
        <span class="text-h6">{{ title }}</span>
      </v-card-title>

      <v-divider />
      <v-card-text class="max-h-[calc(100vh_-_170px)] overflow-y-scroll custom-scroll">
        <slot />
      </v-card-text>

      <template v-if="!hideAction">
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn v-if="canCancel" class="px-2 mr-1" :disabled="loading" small variant="text" @click="$emit('cancel')">
            {{ cancelText }}
          </v-btn>
          <v-btn
            v-if="!hideSubmit && !noHandleSubmit"
            class="px-2"
            color="primary"
            :loading="loading"
            small
            variant="elevated"
            @click="handleSubmit(submit)"
          >
            <span v-if="submitText">{{ submitText }}</span>
            <span v-else>
              {{ isUpdate ? updateText : createText }}
            </span>
          </v-btn>
        </v-card-actions>
      </template>
    </app-form>
  </v-card>
</template>
