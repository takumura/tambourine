<template>
  <div>
    <task-list></task-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import config from '~/nuxt.config'
import TaskList from '~/components/TaskList.vue'
import { accessorType } from '~/store'

export default Vue.extend({
  components: {
    TaskList,
  },
  data() {
    return {
      unsubscribe() {},
    }
  },
  async fetch() {
    if (window.api) {
      const state: typeof accessorType = await window.api.getInitialState()
      if (state) {
        this.$store.replaceState(state)
      }
    }
  },
  mounted() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (
        mutation.type === 'tasks/ADD_TASK' ||
        mutation.type === 'tasks/REMOVE_TASK' ||
        mutation.type === 'taskHistories/ADD_TASK_HISTORY'
      ) {
        if (window.api) window.api.syncStore(state)
      }
    })

    if (config.dev) {
      const state = {
        version: 0,
        selectedTaskId: null,
        running: false,
        dateTaskStarted: null,
        taskHistories: {
          entities: {
            '7cad4e74-0ea2-45a6-aa02-fd053f806575': [
              {
                id: 'c81fca23-1d70-4203-95a0-ca3b13d44e02',
                taskId: '7cad4e74-0ea2-45a6-aa02-fd053f806575',
                dateFrom: '2021-07-18T13:38:20.812Z',
                duration: 30,
                dateTo: '2021-07-18T13:38:51.281Z',
              },
            ],
          },
        },
        tasks: {
          ids: [
            '7cad4e74-0ea2-45a6-aa02-fd053f806575',
            '74e4b073-4343-4257-acc1-99eeae694e2a',
            '492f87fc-3d16-4440-8829-ccd773b21c04',
          ],
          entities: {
            '7cad4e74-0ea2-45a6-aa02-fd053f806575': {
              id: '7cad4e74-0ea2-45a6-aa02-fd053f806575',
              name: 'task1',
              done: false,
            },
            '74e4b073-4343-4257-acc1-99eeae694e2a': {
              id: '74e4b073-4343-4257-acc1-99eeae694e2a',
              name: 'task2',
              done: false,
            },
            '492f87fc-3d16-4440-8829-ccd773b21c04': {
              id: '492f87fc-3d16-4440-8829-ccd773b21c04',
              name: 'task3',
              done: false,
            },
          },
        },
      }
      this.$store.replaceState(state)
    }
  },
  beforeDestroy() {
    this.unsubscribe()
  },
})
</script>

<style scoped>
.done {
  text-decoration: line-through;
}
</style>
