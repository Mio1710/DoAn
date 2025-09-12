<script setup lang="ts"></script>

<template>
  <Form v-slot="scopeSlots">
    <slot v-bind="scopeSlots" />
  </Form>
</template>

<style scoped></style>
