<template>
  <v-navigation-drawer :v-model="true" :mini-variant="true" :clipped="true" fixed permanent app>
    <v-list>
      <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
        <v-list-item-action>
          <v-tooltip right>
            <template #activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on">{{ item.icon }}</v-icon>
            </template>
            <span>{{ item.title }}</span>
          </v-tooltip>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-application-cog',
          title: 'Settings',
          to: '/inspire',
        },
      ],
    }
  },
})
</script>
