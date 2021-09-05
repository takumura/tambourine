<template>
  <v-dialog v-model="dialog" width="600px">
    <template #activator="{ on, attrs }">
      <v-btn icon :color="buttonColor" small v-bind="attrs" v-on="on">
        <v-icon>{{ icon }}</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar color="primary">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-form ref="form">
          <v-text-field v-model="taskName" label="task" hint="What's your next task?" clearable></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" text @click="saveTask">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { Task } from '~/store/tasks'

export default Vue.extend({
  props: {
    taskItem: {
      type: Object as () => Task,
      default: null,
    },
  },
  data() {
    return {
      dialog: false,
      taskName: this.taskItem?.name ?? '',
      refs: this.$refs as any,
    }
  },
  computed: {
    buttonColor(): string {
      return this.taskItem === null || this.taskItem === undefined ? 'primary' : ''
    },
    icon(): string {
      return this.taskItem === null || this.taskItem === undefined ? 'mdi-plus' : 'mdi-pencil'
    },
    title(): string {
      return this.taskItem === null || this.taskItem === undefined ? 'Create new Task' : 'Edit Task'
    },
  },
  methods: {
    addTask(): void {
      if (this.taskName) {
        this.$accessor.tasks.addTask(this.taskName)
      }
      this.closeDialog()
    },
    closeDialog(): void {
      this.taskName = ''
      this.dialog = false
    },
    editTask(): void {
      this.$accessor.tasks.editTask({ task: this.taskItem, description: this.taskName })
    },
    saveTask(): void {
      if (this.taskItem === null || this.taskItem === undefined) {
        this.addTask()
      } else {
        this.editTask()
      }
    },
  },
})
</script>

<style scoped>
.v-btn.v-size--small {
  padding: 0 !important;
  min-width: 28px;
}
</style>
