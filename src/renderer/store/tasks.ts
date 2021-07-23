import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import { v4 as uuidv4 } from 'uuid'
import { state as rootState } from './index'

export interface Task {
  id: string
  name: string
  done: boolean
}

export interface TaskState {
  ids: string[]
  entities: { [key: string]: Task }
}

export const state = () => ({
  ids: [] as string[],
  entities: {} as { [key: string]: Task },
})

export type RootState = ReturnType<typeof rootState>

export const getters = getterTree(state, {
  getActiveTask: (state: TaskState, _, rootState: RootState) => state.entities[rootState.selectedTaskId],
  getTasks: (state: TaskState) => state.ids.map((id) => state.entities[id]),
})

export const mutations = mutationTree(state, {
  ADD_TASK(state, task: Task) {
    state.ids = [...state.ids, task.id]
    state.entities = { ...state.entities, [task.id]: task }
  },
  REMOVE_TASK(state, task: Task) {
    const newIds = state.ids.filter((id) => id !== task.id)
    const newEntities: { [key: string]: Task } = {}
    newIds.forEach((id) => (newEntities[id] = state.entities[id]))

    state.ids = newIds
    state.entities = newEntities
  },
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    addTask({ commit }, description: string) {
      const task: Task = { id: uuidv4(), name: description, done: false }
      commit('ADD_TASK', task)
    },
    removeTask({ commit }, task: Task) {
      const accessor = this.app.$accessor
      if (!accessor.getTaskRunning) {
        if (accessor.getSelectedTaskId === task.id) accessor.setSelectedTask('')
        commit('REMOVE_TASK', task)
      }
    },
  }
)
