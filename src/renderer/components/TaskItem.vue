<template>
  <v-card class="mx-auto task-container" :color="itemColor" :style="itemStyle" @click="activate">
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
          <div>{{ totalMinutes() }}</div>
        </v-col>
        <v-col cols="1" class="d-flex align-center">
          <task-dialog :task-item="taskItem"></task-dialog>
        </v-col>
        <v-col cols="1" class="d-flex align-center">
          <v-icon color="red darken-2" @click="deleteTaskItem">mdi-trash-can</v-icon>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Task } from '../store/tasks'
import TaskDialog from './TaskDialog.vue'

export default Vue.extend({
  components: { TaskDialog },
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
        return 'font-weight: bold; background: accent;'
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
    totalMinutes() {
      return this.$accessor.taskHistories.getTotalMinutes(this.taskItem.id)
    },
  },
})
</script>

<style scoped>
.task-container {
  background: #1e1e1e;
}
</style>
