<script setup lang="ts">
import FormCard from '~/components/common/molecules/FormCard.vue'
import CancelTopic from '~/components/student/project/molecules/CancelTopic.vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  partner: {
    type: Array,
    default: () => [],
  },
  numberStudent: {
    type: Number,
    default: 0,
  },
})

const { $api, $toast } = useNuxtApp()
const emit = defineEmits(['refetch', 'viewAll'])

const headers = [
  {
    title: 'STT',
    align: 'start',
    sortable: false,
    key: 'index',
    width: 50,
  },
  { title: 'Tên đề tài', key: 'ten', width: '20%', minWidth: 150 },
  { title: 'Mô tả', key: 'description', width: '35%', minWidth: 300 },
  { title: 'Yêu cầu', key: 'requirement', width: '20%', minWidth: 200 },
  { title: 'Kiến thức kỹ năng', key: 'knowledge', width: '15%', minWidth: 100 },
  { title: 'Giảng viên HD', key: 'gvhd', width: '10%', minWidth: 100 },
  { title: 'Số lượng', key: 'numberStudent', align: 'center' },
]
</script>

<template>
  <div class="d-flex py-2 bottom-border">
    <div class="text-lg">Đề tài đã đăng ký thành công</div>
    <v-spacer />
    <v-dialog min-width="400" width="40%">
      <template #activator="{ props: activatorProps }">
        <v-btn color="error" size="small" v-bind="activatorProps">Hủy đề tài</v-btn>
      </template>
      <template #default="{ isActive }">
        <cancel-topic :partner @cancel="isActive.value = false" @success="emit('refetch')" />
      </template>
    </v-dialog>
    <v-btn class="ml-2" color="primary" size="small" @click="emit('viewAll')">Xem tất cả đề tài</v-btn>
  </div>
  <v-data-table class="mt-2" :headers="headers" hide-default-footer :items="items">
    <template #item.index="{ index }">
      <span>{{ index + 1 }}</span>
    </template>
    <template #item.name="{ item }">
      <span v-html="item.name" />
    </template>
    <template #item.gvhd="{ item }">{{ item?.teacher?.hodem }} {{ item?.teacher?.ten }}</template>
    <template #item.numberStudent="{ item }">{{ numberStudent }}/{{ item?.numberStudent }}</template>
  </v-data-table>
</template>

<style scoped></style>
