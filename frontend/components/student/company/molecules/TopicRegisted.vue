<script setup lang="ts">
const items = [
  {
    name: 'Nghiên cứu NestJS - VueJS, ứng dụng xây dựng website quản lý Khóa luận - Thực tập',
    fat: 'Đại học (KLTN)',
    carbs: 'Nghiên cứu công nghệ mới và áp dụng xây dựng website xử lý học vụ.\t',
    protein: '- Lý thuyết: NestJS - VueJS; - Sản phẩm: Hệ thống website quản lý khóa luận - thực tập.',
    iron: '- Lập trình web - Tính tự học cao',
    gvhd: 'Võ Ngọc Tấn Phước\n' +
        'Bộ môn: IS',
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
  { title: 'Giảng viên HD', key: 'gvhd', width: '10%', minWidth: 100 },
]
</script>

<template>
  <div class="text-lg py-2">Đề tài đã đăng ký thành công</div>
  <v-data-table class="mt-2" :headers="headers" hide-default-footer :items="items">
    <template #item.index="{ index }">
      <span>{{ index + 1 }}</span>
    </template>
    <template #item.name="{ item }">
      <span v-html="item.name" />
    </template>
  </v-data-table>
</template>

<style scoped></style>
