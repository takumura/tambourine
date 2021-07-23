import { getAccessorType, getterTree, mutationTree, actionTree } from 'typed-vuex'
import * as tasks from '~/store/tasks'
import * as taskHistories from '~/store/taskHistories'

export const state = () => ({
  version: 0 as number,
  selectedTaskId: '' as string,
  running: false as boolean,
  dateTaskStarted: null as Date | null,
})

export const getters = getterTree(state, {
  getSelectedTaskId: (state) => state.selectedTaskId,
  getTaskRunning: (state) => state.running,
})

export const mutations = mutationTree(state, {
  SET_SELECTED_TASK(state, taskId: string) {
    state.selectedTaskId = taskId
  },
  RUN_TASK(state, taskId: string) {
    state.running = true
    state.selectedTaskId = taskId
    state.dateTaskStarted = new Date(Date.now())
  },
  STOP_TASK(state) {
    state.running = false
    state.dateTaskStarted = null
  },
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    setSelectedTask({ commit }, taskId: string) {
      const accessor = this.app.$accessor
      if (!accessor.running) {
        commit('SET_SELECTED_TASK', taskId)
      }
    },
    runTask({ commit }, taskId: string) {
      commit('RUN_TASK', taskId)
    },
    stopTask({ commit }, payload: { taskId: string; duration: number }) {
      const accessor = this.app.$accessor
      accessor.taskHistories.addTaskHistory({
        taskId: payload.taskId,
        dateFrom: accessor.dateTaskStarted as Date,
        duration: payload.duration,
      })
      commit('STOP_TASK')
    },
  }
)

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
  modules: {
    tasks,
    taskHistories,
  },
})
