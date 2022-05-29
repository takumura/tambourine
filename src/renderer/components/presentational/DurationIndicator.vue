<template>
  <duration :duration="durationValue" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  components: {
    Duration: () => import('./Duration.vue'),
  },
  props: {
    duration: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return { durationValue: this.duration, callbackId: 0, running: false }
  },
  methods: {
    step(currentTime: number, previousTime: number): void {
      if (this.running) {
        this.durationValue = this.durationValue + (currentTime - previousTime)
        this.callbackId = window.requestAnimationFrame((timestamp) => this.step(timestamp, currentTime))
      }
    },
    start(): void {
      this.running = true
      const initialTime = window.performance.now()
      window.requestAnimationFrame((timestamp) => this.step(timestamp, initialTime))
    },
    stop(): number {
      this.running = false
      this.durationValue = 0
      return this.callbackId
    },
  },
})
</script>
