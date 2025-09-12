<script setup lang="ts">
import { format } from 'date-fns'
import useGetCurrentSemesters from '~/composables/use-get-current-semesters'

definePageMeta({
  layout: 'auth',
})

const { items } = useGetCurrentSemesters()
</script>
<template>
  <v-card class="w-100 px-6 py-4">
    <div class="text-lg font-bold text-uppercase">Thông tin học kỳ hiện tại</div>
    <div class="h-full d-flex">
      <div v-if="items" class="d-flex flex-wrap h-1/2 ma-auto">
        <div class="w-1/2 md:w-full min-w-[500px]">
          <span class="font-weight-bold mr-2">Tên học kỳ:</span>
          <span>{{ items.ten }}</span>
        </div>
        <div class="w-1/2 min-w-[500px]">
          <span class="font-weight-bold mr-2">Ngày bắt đầu:</span>
          <!--          <span>{{ format(new Date(items.start_date), 'dd/MM/yyyy') }}</span>-->
          <span>{{ items.start_date }}</span>
        </div>
        <div class="w-1/2 min-w-[500px]">
          <span class="font-weight-bold mr-2">Ngày kết thúc:</span>
          <!--          <span>{{ format(new Date(items.end_date), 'dd/MM/yyyy') }}</span>-->
          <span>{{ items.end_date }}</span>
        </div>
        <div class="w-1/2 min-w-[500px]">
          <span class="font-weight-bold mr-2">Ngày mở đăng ký đề tài:</span>
          <!--          <span>{{ format(new Date(items.start_register_topic), 'dd/MM/yyyy') }}</span>-->
          <span>{{ items.start_register_topic }}</span>
        </div>
        <div class="w-1/2 min-w-[500px]">
          <span class="font-weight-bold mr-2">Ngày đóng đăng ký đề tài:</span>
          <!--          <span>{{ format(new Date(items.end_register_topic), 'dd/MM/yyyy') }}</span>-->
          <span>{{ items.end_register_topic }}</span>
        </div>
        <div class="w-1/2 min-w-[500px]">
          <span class="font-weight-bold mr-2">SV bắt đầu đăng ký đề tài:</span>
          <!--          <span>{{ format(new Date(items.start_publish_topic), 'dd/MM/yyyy') }}</span>-->
          <span>{{ items.start_publish_topic }}</span>
        </div>
        <div class="w-1/2 min-w-[500px]">
          <span class="font-weight-bold mr-2">SV kết thúc đăng ký đề tài:</span>
          <!--          <span>{{ format(new Date(items.end_publish_topic), 'dd/MM/yyyy') }}</span>-->
          <span>{{ items.end_publish_topic }}</span>
        </div>
        <div class="w-1/2 min-w-[500px]">
          <span class="font-weight-bold mr-2">SV bắt đầu đăng ký nhóm:</span>
          <!--          <span>{{ format(new Date(items.start_register_group), 'dd/MM/yyyy') }}</span>-->
          <span>{{ items.start_register_group }}</span>
        </div>
        <div class="w-1/2 min-w-[500px]">
          <span class="font-weight-bold mr-2">SV kết thúc đăng ký nhóm:</span>
          <!--          <span>{{ format(new Date(items.end_publish_topic), 'dd/MM/yyyy') }}</span>-->
          <span>{{ items.end_publish_topic }}</span>
        </div>
        <div class="w-1/2 min-w-[500px]">
          <span class="font-weight-bold mr-2">Bắt đầu phản biện:</span>
          <!--          <span>{{ format(new Date(items.start_defense), 'dd/MM/yyyy') }}</span>-->
          <span>{{ items.start_defense }}</span>
        </div>
        <div class="w-1/2 min-w-[500px]">
          <span class="font-weight-bold mr-2">Kết thúc phản biện:</span>
          <!--          <span>{{ format(new Date(items.end_defense), 'dd/MM/yyyy') }}</span>-->
          <span>{{ items.end_defense }}</span>
        </div>
        <div class="w-1/2 md:w-full min-w-[500px]">
          <span class="font-weight-bold mr-2">Thông báo kết quả:</span>
          <!--          <span>{{ format(new Date(items.public_result), 'dd/MM/yyyy') }}</span>-->
          <span>{{ items.public_result }}</span>
        </div>
      </div>
    </div>
  </v-card>
</template>
