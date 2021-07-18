import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import { v4 as uuidv4 } from 'uuid'
import { state as rootState } from './index'

export interface TaskHistory {
  id: string
  taskId: string
  dateFrom: Date
  duration: number
  dateTo: Date
}

export interface TaskHistoryState {
  entities: { [key: string]: TaskHistory[] }
}

export const state = () => ({
  entities: {} as { [key: string]: TaskHistory[] },
})

export type RootState = ReturnType<typeof rootState>

export const getters = getterTree(state, {})

export const mutations = mutationTree(state, {
  ADD_TASK_HISTORY(state, history: TaskHistory) {
    let newEntity = state.entities[history.taskId]
    if (newEntity) {
      newEntity.push(history)
    } else {
      newEntity = [history]
    }
    state.entities = { ...state.entities, [history.taskId]: newEntity }
  },
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    async addTaskHistory({ commit }, payload: { taskId: string; dateFrom: Date; duration: number }) {
      const dateTo = new Date(Date.now())
      const secDuration = Math.round(payload.duration / 1000)
      const history: TaskHistory = {
        id: uuidv4(),
        taskId: payload.taskId,
        dateFrom: payload.dateFrom,
        duration: secDuration,
        dateTo: dateTo,
      }

      commit('ADD_TASK_HISTORY', history)
    },
  }
)
