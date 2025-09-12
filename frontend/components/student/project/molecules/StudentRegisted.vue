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
  { title: 'TÊN', key: 'ten', width: '15%', minWidth: 100 },
  { title: 'LỚP', key: 'lop', width: '20%', minWidth: 150 },
  { title: 'NHÓM', key: 'nhom', width: '10%', minWidth: 100 },
  { title: 'TẠO NHÓM', key: 'action', minWidth: 50, align: 'center' },
]

const parten = ref(null)
const auth = useAuth()
const { $api, $toast } = useNuxtApp()
const emit = defineEmits(['refetch'])
const chooseGroup = (item) => {
  parten.value = item.id
}

const createGroup = () => {
  $api.studentTopic
    .createGroup({ partner_id: parten.value, topic_id: props.topicId })
    .then(() => {
      emit('refetch')
      $toast.success('Tạo nhóm thành công')
    })
    .finally(() => emit('refetch'))
}
</script>

<template>
  <div>
    <div class="d-flex py-2 bottom-border">
      <div class="text-lg">Danh sách sinh viên đăng ký cùng đề tài {{ parten }}</div>
      <v-spacer />
      <v-btn color="success" :disabled="!parten" size="small" @click="createGroup">Tạo</v-btn>
    </div>
    <v-data-table class="mt-2" :headers="headers" hide-default-footer :items="items">
      <template #item.index="{ index }">
        <span>{{ index + 1 }}</span>
      </template>
      <template #item.nhom="{ item }">
        <span>{{ item.studentTopic[0]?.group_id }}</span>
      </template>
      <template #item.action="{ item }">
        <v-radio
          v-if="!item.nhom && auth.data?.value.id != item.id && !item.studentTopic[0]?.group_id"
          v-model="parten"
          :false-value="!parten"
          :value="item.id"
          @click="chooseGroup(item)"
        />
        <div v-else />
      </template>
    </v-data-table>
  </div>
</template>

<style scoped></style>
