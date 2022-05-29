import Vue from 'vue'
import Vuex from 'vuex'
import { useAccessor } from 'typed-vuex'

import * as rootStore from '../renderer/store/index'
import * as tasks from '../renderer/store/tasks'

import vuetifyConfig from './vuetify-storybook'
import 'vuetify/dist/vuetify.min.css'
require('./vuetify-style.scss')

// setup Vuex with Typed Vuex
Vue.use(Vuex)
export const storePattern = {
  state: rootStore.state,
  getters: rootStore.getters,
  actions: rootStore.actions,
  mutations: rootStore.mutations,
  modules: {
    tasks: {
      namespaced: true,
      state: tasks.state,
      getters: tasks.getters,
      actions: tasks.actions,
      mutations: tasks.mutations,
    },
  },
}
const store = new Vuex.Store(storePattern)
export const accessor = useAccessor(store, storePattern)
Vue.prototype.$accessor = accessor

export default store

// Setup vuetify
// picking up required settings from
// https://github.com/storybookjs/storybook/issues/4256#issuecomment-687291955
export const parameters = {
  // actions: { argTypesRegex: '^on[A-Z].*' },
  // layout: 'centered',
  backgrounds: {
    default: 'dark',
  },
}

export const decorators = [
  () => ({
    vuetify: vuetifyConfig,
    template: `
        <v-app dark style="background-color: transparent;" class="storybook">
          <v-main>
            <v-container fluid>
              <story />
            </v-container>
          </v-main>
        </v-app>
      `,
  }),
]
