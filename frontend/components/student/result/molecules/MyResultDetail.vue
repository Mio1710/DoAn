<script setup lang="ts">
import FormCard from '~/components/common/molecules/FormCard.vue'
import useGetMyResultTopicLOs from '~/composables/student/use-get-my-result-topic-lo'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const { items, isLoading, error, refetch } = useGetMyResultTopicLOs(null, { retry: 0 })
const headers = [
  {
    title: 'STT',
    align: 'center',
    sortable: false,
    value: 'index',
    width: 20,
  },
  { title: 'Tiêu chí đánh giá', value: 'main_criteria', width: '50%', minWidth: 500 },
  { title: 'Tiêu chí phụ', value: 'sub_criteria', width: '30%', minWidth: 100 },
  { title: 'Hệ số', value: 'cof', width: '7%', minWidth: 50 },
  { title: 'Điểm', value: 'score', width: '7%', minWidth: 50 },
]

const totalScore = computed(() => {
  return items.value.reduce((acc, item) => acc + item.score * item.cof, 0)
})
</script>

<template>
  <form-card
    can-cancel
    cancel-text="Đóng"
    hide-submit
    :title="`Điểm quá trình của sinh viên: ${item?.hodem} ${item?.ten}`"
  >
    <v-data-table class="elevation-1" :headers="headers" hide-default-footer hover :items="items" :items-per-page="100">
      <template #item.index="{ index }">
        {{ index + 1 }}
      </template>
    </v-data-table>

    <div class="text-center font-weight-bold text-error py-2">
      <span>Điểm tổng: {{ (totalScore / 10).toFixed(2) }}</span>
    </div>
  </form-card>
</template>
