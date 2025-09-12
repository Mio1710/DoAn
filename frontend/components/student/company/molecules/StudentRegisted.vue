<script setup lang="ts">
const items = [
  {
    mssv: '20012011',
    hodem: 'Nguyễn Thị',
    ten: 'Lê',
    lop: 'DHHTTT16A',
    gvhd: 'Võ Ngọc Tấn Phước',
    nhom: '964',
  },
  {
    mssv: '20050981',
    hodem: 'Nguyễn Quang',
    ten: 'Tú',
    lop: 'DHHTTT16C',
    gvhd: 'Võ Ngọc Tấn Phước',
    nhom: '964',
  },
  {
    mssv: '200509811',
    hodem: 'Nguyễn Quang',
    ten: 'Tú fake',
    lop: 'DHHTTT16C',
    gvhd: 'Võ Ngọc Tấn Phước',
    nhom: '964',
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
  { title: 'MASV', key: 'mssv', width: '10%', minWidth: 100 },
  { title: 'HỌ ĐỆM', key: 'hodem', width: '15%', minWidth: 150 },
  { title: 'TÊN', key: 'ten', width: '5%', minWidth: 50 },
  { title: 'LỚP', key: 'lop', width: '15%', minWidth: 150 },
  { title: 'GVHD', key: 'gvhd', width: '20%', minWidth: 200 },
  { title: 'NHÓM', key: 'nhom', width: '10%', minWidth: 100 },
  { title: 'TẠO NHÓM', key: 'action', minWidth: 50, align: 'center' },
]

const parten = ref(null)
const chooseGroup = (item) => {
  parten.value = item.mssv
  console.log(item)
}
</script>

<template>
  <div>
    <div class="text-lg py-2">Danh sách sinh viên đăng ký cùng đề tài</div>
    <v-data-table class="mt-2" :headers="headers" hide-default-footer :items="items">
      <template #item.index="{ index }">
        <span>{{ index + 1 }}</span>
      </template>
      <template #item.action="{ item }">
        <v-radio-group v-model="parten">
          <v-radio v-if="parten == item.mssv" :value="item.mssv" @click="chooseGroup(item)" />
          <v-radio v-else :value="item.mssv" />
        </v-radio-group>
      </template>
    </v-data-table>
  </div>
</template>

<style scoped></style>
