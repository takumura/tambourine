<template>
  <v-container>
    <v-subheader>ToDo Now</v-subheader>
    <v-list v-if="getTaskList.length > 0" dense>
      <v-list-item v-for="item in getTaskList" :key="item.name">
        <v-list-item-content class="px-2">
          <task-item :task-item="item" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    getTaskList() {
      return this.$accessor.tasks.getTasks
    },
  },
})
</script>
