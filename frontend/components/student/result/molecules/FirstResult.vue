<script setup lang="ts">
const items = [ ]
const headers = [
  {
    title: 'STT',
    align: 'start',
    sortable: false,
    value: 'index',
    width: '2%',
    minWidth: 20,
  },
  { title: 'Nội dung', value: 'object', width: '70%', minWidth: 700 },
  { title: 'Loại', value: 'second', width: '10%', minWidth: 100 },
  { title: 'Trọng số', value: 'cof', width: '5%', minWidth: 50 },
  { title: 'Điểm', value: 'score', width: '5%', minWidth: 50 },
]
</script>

<template>
  <div>
    <p>
      <span>50% tiến độ</span>
      <span class="bg-blue-accent-2 ml-3">Trọng số 50%</span>
    </p>
    <v-data-table class="elevation-1" :headers="headers" hide-default-footer hover :items="items">
      <template #item.index="{ index }">
        {{ index + 1 }}
      </template>
    </v-data-table>
  </div>
</template>

<style scoped></style>
