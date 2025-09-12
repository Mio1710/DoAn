<script setup lang="ts">
import TopicRegisted from '~/components/student/project/molecules/TopicRegisted.vue'
import StudentRegisted from '~/components/student/project/molecules/StudentRegisted.vue'
import PartnerRegisted from '~/components/student/project/molecules/PartnerRegisted.vue'
const props = defineProps({
  items: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['refetch', 'viewAll'])
</script>

<template>
  <topic-registed
    :items="[items.topic.topic]"
    :number-student="items?.students.length"
    :partner="items.partner"
    @refetch="emit('refetch')"
    @view-all="emit('viewAll')"
  />
  <partner-registed
    v-if="items.partner?.length > 1"
    class="mt-6"
    :items="items.partner"
    :topic-id="items.topic.topic_id"
    @refetch="emit('refetch')"
  />
  <student-registed
    v-else
    class="mt-6"
    :items="items.students"
    :topic-id="items.topic.topic_id"
    @refetch="emit('refetch')"
  />
</template>

<style scoped></style>
