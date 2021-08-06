<template>
  <v-container class="ma-0">
    <v-row class="px-2">
      <v-col cols="8" class="d-flex align-center">
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">{{ taskItem.name }}</span>
          </template>
          <span>{{ taskItem.id }}</span>
        </v-tooltip>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="2" class="d-flex align-center">
        <start-stop-button :task="taskItem" @startStopButtonClicked="startStopButtonClicked"></start-stop-button>
      </v-col>
      <v-col cols="2" class="d-flex align-center">
        <duration-indicator ref="indicator" :task="taskItem" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Task } from '../store/tasks'

export default Vue.extend({
  props: {
    taskItem: {
      type: Object as () => Task,
      required: true,
    },
  },
  data() {
    return {
      refs: this.$refs as any,
    }
  },
  computed: {
    itemColor() {
      if (this.$accessor.getSelectedTaskId === this.taskItem.id) {
        return 'primary--text'
      } else {
        return ''
      }
    },
    itemStyle() {
      if (this.$accessor.getSelectedTaskId === this.taskItem.id) {
        return 'font-weight: bold'
      } else {
        return ''
      }
    },
  },
  methods: {
    activate(): void {
      this.$accessor.setSelectedTask(this.taskItem.id)
    },
    deleteTaskItem(): void {
      this.$accessor.tasks.removeTask(this.taskItem)
    },
    async startStopButtonClicked(): Promise<void> {
      if (this.$accessor.getTaskRunning) {
        if (this.$accessor.getSelectedTaskId === this.taskItem.id) {
          const duration = this.refs.indicator.stop()
          await this.$accessor.stopTask({ taskId: this.taskItem.id, duration })
        } else {
          this.refs.indicator.start()
          await this.$accessor.runTask(this.taskItem.id)
        }
      } else {
        this.refs.indicator.start()
        await this.$accessor.runTask(this.taskItem.id)
      }
    },
  },
})
</script>
