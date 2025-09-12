<script setup lang="ts">
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  topicId: {
    type: Number,
    required: true,
  },
})

const headers = [
  {
    title: 'STT',
    align: 'start',
    sortable: false,
    key: 'index',
    width: 50,
  },
  { title: 'MASV', key: 'maso', width: '20%', minWidth: 150 },
  { title: 'HỌ ĐỆM', key: 'hodem', width: '25%', minWidth: 200 },
  { title: 'TÊN', key: 'ten' },
  { title: 'LỚP', key: 'lop', width: '20%', minWidth: 150 },
]

const parten = ref(null)
const auth = useAuth()
const { $api, $toast } = useNuxtApp()
const emit = defineEmits(['refetch'])

const cancelGroup = () => {
  $api.studentTopic.cancelGroup().then(() => {
    emit('refetch')
    $toast.success('Tạo nhóm thành công')
  })
}
</script>

<template>
  <div>
    <div class="d-flex py-2 bottom-border">
      <div class="text-lg">Danh sách sinh viên nhóm {{ parten }}</div>
      <v-spacer />
      <v-btn color="error" size="small" @click="cancelGroup">Hủy nhóm</v-btn>
    </div>
    <v-data-table class="mt-2" :headers="headers" hide-default-footer :items="items">
      <template #item.index="{ index }">
        <span>{{ index + 1 }}</span>
      </template>
    </v-data-table>
  </div>
</template>

<style scoped></style>
