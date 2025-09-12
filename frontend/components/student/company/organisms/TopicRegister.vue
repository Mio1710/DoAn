<script setup lang="ts">
const items = [
  {
    name: 'Nghiên cứu NestJS - VueJS, ứng dụng xây dựng website quản lý Khóa luận - Thực tập',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: '1',
  },
  {
    name: 'Nghiên cứu NestJS - VueJS, ứng <b> dụng xây dựng website </b> \n quản lý Khóa luận - Thực tập',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    iron: '0',
  },
  {
    name: 'Nghiên cứu NestJS - VueJS, ứng \n dụng xây dựng website quản lý Khóa luận - Thực tập',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    iron: '6',
  },
  {
    name: 'Nghiên cứu NestJS - VueJS, ứng \n\n <br> dụng xây dựng website quản lý Khóa luận - Thực tập',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    iron: '7',
  },
  {
    name: 'Nghiên cứu NestJS - VueJS, ứng \n dụng xây dựng website quản lý Khóa luận - Thực tập',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    iron: '16',
  },
  {
    name: 'Nghiên cứu NestJS - VueJS, ứng dụng \n xây dựng website quản lý Khóa luận - Thực tập',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    iron: '1',
  },
  {
    name: 'Nghiên cứu NestJS - VueJS, ứng dụng xây dựng website quản lý Khóa luận - Thực tập',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    iron: '2',
  },
  {
    name: 'Nghiên cứu NestJS - VueJS, ứng dụng xây dựng website quản lý Khóa luận - Thực tập',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    iron: '8',
  },
  {
    name: 'Nghiên cứu NestJS - VueJS, ứng dụng xây dựng website quản lý Khóa luận - Thực tập',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    iron: '45',
  },
  {
    name: 'Nghiên cứu NestJS - VueJS, ứng dụng xây dựng website quản lý Khóa luận - Thực tập',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    iron: '22',
  },
]
const headers = [
  {
    title: 'STT',
    align: 'start',
    sortable: false,
    key: 'index',
    width: 50,
  },
  { title: 'Tên đề tài', key: 'name', width: '15%', minWidth: 150 },
  { title: 'Loại', key: 'fat', width: '5%', minWidth: 50 },
  { title: 'Mô tả', key: 'carbs', width: '35%', minWidth: 300 },
  { title: 'Yêu cầu', key: 'protein', width: '20%', minWidth: 200 },
  { title: 'Kiến thức kỹ năng', key: 'iron', width: '15%', minWidth: 100 },
  { title: 'Giảng viên HD', key: '', width: '10%', minWidth: 100 },
]
</script>

<template>
  <v-data-table :headers="headers" :items="items" :items-per-page="5">
    <template #item.index="{ index }">
      <span>{{ index + 1 }}</span>
    </template>
    <template #item.name="{ item }">
      <span v-html="item.name" />
    </template>
  </v-data-table>
</template>

<style scoped></style>
