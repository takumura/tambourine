<template>
  <v-app-bar :clipped-left="true" fixed app>
    <v-toolbar-title v-text="title" />
    <v-spacer />
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      title: 'Tambourine',
    }
  },
})
</script>
