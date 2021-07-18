<template>
  <v-app dark>
    <v-main>
      <navigation-header />
      <navigation-sidebar />
      <v-container>
        <active-task></active-task>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>
