<template>
  <div>
    <task-dialog :task-item="null"></task-dialog>
    <v-expansion-panels v-if="taskSelected">
      <v-expansion-panel>
        <v-expansion-panel-header>
          <active-task-item :task-item="activeTask" />
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list v-if="getTaskHistoryList.length > 0" dense>
            <v-list-item v-for="item in getTaskHistoryList" :key="item.id">
              <v-list-item-content class="px-2">
                <span>
                  {{ $dateFns.format(item.dateFrom, 'yyyy-MM-dd hh:mm') }} -
                  {{ $dateFns.format(item.dateTo, 'yyyy-MM-dd hh:mm') }} ({{ Math.round(item.duration / 60) }} min)
                </span>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <div v-if="getTaskHistoryList.length == 0">no work info</div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { TaskHistory } from '~/store/taskHistories'
import { Task } from '~/store/tasks'

export default Vue.extend({
  computed: {
    activeTask(): Task {
      return this.$accessor.tasks.getActiveTask
    },
    getTaskHistoryList(): TaskHistory[] {
      const taskId = this.$accessor.tasks.getActiveTask?.id
      const histories = this.$accessor.taskHistories.getTaskHistories(taskId)
      return histories
    },
    taskSelected(): string {
      return this.$accessor.selectedTaskId
    },
  },
})
</script>
