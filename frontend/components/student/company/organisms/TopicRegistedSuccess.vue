<script setup lang="ts">
import TopicRegisted from "~/components/student/company/molecules/TopicRegisted.vue";
import StudentRegisted from "~/components/student/company/molecules/StudentRegisted.vue";
import TopicRegister from "~/components/student/company/organisms/TopicRegister.vue";

const items = [
  {
    name: 'Nghiên cứu NestJS - VueJS, ứng dụng xây dựng website quản lý Khóa luận - Thực tập',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: '1',
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
  <TopicRegisted />
  <StudentRegisted class="mt-6"/>
</template>

<style scoped></style>
