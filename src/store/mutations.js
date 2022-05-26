import {
  CHANGE_FETCHED_DATE,
  CHANGE_LOADED_DATES,
  CHANGE_SIDE_FETCHED_DATE,
  CHANGE_SIDE_LOADED_DATES,
  ADD_NEW_TODO,
  CHECK_TODO_ITEM,
  DELETE_TODO_ITEM,
  SET_MODAL_DATA,
  FETCH_CALENDAR_TYPE,
  SHOW_CALENDAR_TYPES,
  SET_STATE_OFF_MODAL_TODO,
  SET_STATE_TOGGLE_BURGER,
  SET_STATE_SHOW_MODAL_PAGE
} from './mutation-types'

export default {
  [CHANGE_FETCHED_DATE] (state, payload) {
    state.fetchedDate = payload
  },
  [CHANGE_LOADED_DATES] (state, payload) {
    state.loadedDates = payload
  },
  [CHANGE_SIDE_FETCHED_DATE] (state, payload) {
    state.sideFetchedDate = payload
  },
  [CHANGE_SIDE_LOADED_DATES] (state, payload) {
    state.sideLoadedDates = payload
  },
  [ADD_NEW_TODO] (state, payload) {
    const newTodo = { text: payload, completed: false }
    state.modalTodo.push(newTodo)
    state.todoData[state.modalDate] = state.modalTodo
    localStorage.setItem('todos', JSON.stringify(state.todoData))
    let getLocalStorage = {}
    if (localStorage.todos !== undefined) {
      getLocalStorage = JSON.parse(localStorage.getItem('todos'))
    }
    state.todoData = getLocalStorage
    const copyModalTodo = [...state.modalTodo]
    const todoUnit = 8
    state.modalTodoDivided = [...Array(Math.ceil(state.modalTodo.length / todoUnit))].map(i => copyModalTodo.splice(i * todoUnit, todoUnit))
    state.fetchedModalPage = state.modalTodoDivided.length - 1
  },
  [CHECK_TODO_ITEM] (state, payload) {
    const todoUnit = 8
    const key = payload.pageKey * todoUnit + Number(payload.key)
    state.modalTodo[key].completed = !payload.todoItem.completed
    state.todoData[state.modalDate] = state.modalTodo
    localStorage.setItem('todos', JSON.stringify(state.todoData))
    let getLocalStorage = {}
    if (localStorage.todos !== undefined) {
      getLocalStorage = JSON.parse(localStorage.getItem('todos'))
    }
    state.todoData = getLocalStorage

    const copyModalTodo = [...state.modalTodo]
    state.modalTodoDivided = [...Array(Math.ceil(state.modalTodo.length / todoUnit))].map(i => copyModalTodo.splice(i * todoUnit, todoUnit))
  },
  [DELETE_TODO_ITEM] (state, payload) {
    const todoUnit = 8
    const pageLength = state.modalTodoDivided.length
    const key = payload.pageKey * todoUnit + Number(payload.key)
    state.modalTodo.splice(key, 1)
    state.todoData[state.modalDate] = state.modalTodo
    if (state.todoData[state.modalDate].length === 0) {
      delete state.todoData[state.modalDate]
    }
    localStorage.setItem('todos', JSON.stringify(state.todoData))
    let getLocalStorage = {}
    if (localStorage.todos !== undefined) {
      getLocalStorage = JSON.parse(localStorage.getItem('todos'))
    }
    state.todoData = getLocalStorage
    const copyModalTodo = [...state.modalTodo]
    state.modalTodoDivided = [...Array(Math.ceil(state.modalTodo.length / todoUnit))].map(i => copyModalTodo.splice(i * todoUnit, todoUnit))
    if ((state.fetchedModalPage !== state.modalTodoDivided.length - 1) && (state.modalTodoDivided[pageLength - 1] === undefined)) {
      state.fetchedModalPage--
    }
  },
  [SET_MODAL_DATA] (state, payload) {
    const todoUnit = 8
    state.showModal = true
    const clickedDate = payload.target.id
    state.modalDate = clickedDate
    if (Object.keys(state.todoData).includes(clickedDate) === true) {
      state.modalTodo = state.todoData[state.modalDate]
    } else {
      state.modalTodo = []
    }
    const copyModalTodo = [...state.modalTodo]
    state.modalTodoDivided = [...Array(Math.ceil(state.modalTodo.length / 8))].map(i => copyModalTodo.splice(i * todoUnit, todoUnit))
  },
  [FETCH_CALENDAR_TYPE] (state, payload) {
    if (payload) {
      state.selectedCalendarType = state.calendarType[payload]
      state.allToggles.toggleCalendarType.booleanValue = false
    }
  },
  [SHOW_CALENDAR_TYPES] (state) {
    state.allToggles.toggleCalendarType.booleanValue = !state.allToggles.toggleCalendarType.booleanValue
  },
  [SET_STATE_OFF_MODAL_TODO] (state) {
    state.showModal = false
    state.modalTodo = []
    state.fetchedModalPage = 0
  },
  [SET_STATE_TOGGLE_BURGER] (state) {
    state.booleanBurger = !state.booleanBurger
  },
  [SET_STATE_SHOW_MODAL_PAGE] (state, payload) {
    state.fetchedModalPage = payload
  }
}
