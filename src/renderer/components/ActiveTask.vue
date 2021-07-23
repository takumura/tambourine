<template>
  <div v-if="taskSelected">
    <active-task-item :task-item="activeTask" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Task } from '~/store/tasks'

export default Vue.extend({
  computed: {
    taskSelected() {
      return this.$accessor.selectedTaskId
    },
    activeTask(): Task {
      return this.$accessor.tasks.getActiveTask
    },
  },
})
</script>
