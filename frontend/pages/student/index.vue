<script setup lang="ts">
import TopicRegister from '~/components/student/project/organisms/TopicRegister.vue'
import TopicRegistedSuccess from '~/components/student/project/organisms/TopicRegistedSuccess.vue'
import useGetRegistedTopics from '~/composables/student/use-get-registed-topic'
import topicStatus from '~/plugins/filters/topic-status'
import UpdateTopic from '~/components/teacher/topic/molecules/UpdateTopic.vue'
import CreateTopic from '~/components/teacher/topic/molecules/CreateTopic.vue'

definePageMeta({
  layout: 'auth',
})

const { items, isLoading, refetch } = useGetRegistedTopics(null, { retry: 0 })
const viewAll = ref(false)
</script>

<template>
  <div class="d-flex flex-column flex-grow-1 h-full">
    <div class="text-lg font-bold text-uppercase">Đăng ký đề tài đồ án</div>
    <v-card class="pa-3 h-full" color="white" variant="flat">
      <div v-if="items.topic" class="h-full">
        <topic-register
          v-if="!items.topic.topic_id || viewAll"
          :topic-id="items.topic.topic_id"
          @view-all="viewAll = false"
        />
        <topic-registed-success v-else :items @refetch="refetch()" @view-all="viewAll = true" />
      </div>
    </v-card>
  </div>
</template>

<style scoped></style>
