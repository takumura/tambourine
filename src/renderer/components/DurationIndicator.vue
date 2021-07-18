<template>
  <duration-time :duration="duration" />
</template>
<script lang="ts">
import Vue from 'vue'
import { Task } from '../store/tasks'
import DurationTime from './DurationTime.vue'

export default Vue.extend({
  components: {
    DurationTime,
  },
  props: {
    task: {
      type: Object as () => Task,
      required: true,
    },
  },
  data() {
    return { duration: 0 }
  },

  methods: {
    start(): void {
      const initialTime = window.performance.now()
      const frame = window.requestAnimationFrame
      const callback = (currentTime: number, previousTime: number) => {
        if (this.$accessor.getTaskRunning && this.$accessor.getSelectedTaskId === this.task.id) {
          this.duration = this.duration + (currentTime - previousTime)
          frame((timestamp) => callback(timestamp, currentTime))
        }
      }
      frame((timestamp) => callback(timestamp, initialTime))
    },
    stop(): number {
      const result = this.duration
      this.duration = 0
      return result
    },
  },
})
</script>
