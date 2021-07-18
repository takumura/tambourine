<template>
  <div>
    <v-text-field label="task" hint="Tam your next task" @keyup.enter="addTask"></v-text-field>
    <task-list></task-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
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
  },
  beforeDestroy() {
    this.unsubscribe()
  },
  methods: {
    addTask(e: Event): void {
      if (e.target instanceof HTMLInputElement) {
        this.$accessor.tasks.addTask(e.target.value)
        e.target.value = ''
      }
    },
  },
})
</script>

<style scoped>
.done {
  text-decoration: line-through;
}
</style>
