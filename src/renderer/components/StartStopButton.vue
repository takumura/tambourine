<template>
  <v-btn small depressed :color="buttonColor" @click="runTask">
    {{ buttonMessage }}
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'
import { Task } from '~/store/tasks'

export default Vue.extend({
  props: {
    task: {
      type: Object as () => Task,
      required: true,
    },
  },
  computed: {
    buttonColor() {
      if (this.$accessor.getTaskRunning && this.$accessor.getSelectedTaskId === this.task.id) {
        return 'warning'
      } else {
        return 'primary'
      }
    },
    buttonMessage() {
      if (this.$accessor.getTaskRunning && this.$accessor.getSelectedTaskId === this.task.id) {
        return 'stop'
      } else {
        return 'start'
      }
    },
  },
  methods: {
    runTask() {
      this.$emit('startStopButtonClicked')
    },
  },
})
</script>
