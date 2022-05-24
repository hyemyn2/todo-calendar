import {
  CHANGE_FETCHED_DATE,
  CHANGE_SIDE_CALENDAR,
  ADD_NEW_TODO,
  CHECK_TODO_ITEM,
  DELETE_TODO_ITEM,
  SET_MODAL_DATA,
  SELECT_CALENDAR_TYPE,
  SHOW_CALENDAR_TYPES,
  SET_STATE_OFF_MODAL_TODO,
  SET_STATE_TOGGLE_BURGER,
  SET_SIDE_FETCHED_DATE_TO_TODAY,
  SET_STATE_SHOW_MODAL_PAGE
} from './mutation-types'

const storage = {
  figureDatesYearly (state, variableDate) {
    const yearlyCalendarDates = []
    for (let i = 0; i < 12; i++) {
      const newPayload = new Date(variableDate.getFullYear(), i, variableDate.getDate())
      const eachMonthDates = this.figureDatesMonthly(state, newPayload)
      yearlyCalendarDates.push(eachMonthDates)
    }
    state.savedYearlyCalendarDates = yearlyCalendarDates
    return yearlyCalendarDates
  },
  figureDatesMonthly (state, variableDate) {
    let calendarDates = []
    let shownPrevDates = []
    let shownNextDates = []
    let shownThisDates = []
    const thisMonthLast = new Date(variableDate.getFullYear(), variableDate.getMonth() + 1, 0)
    const thisMonthLastDate = thisMonthLast.getDate()
    const thisMonthLastDay = thisMonthLast.getDay()

    const prevMonthLast = new Date(variableDate.getFullYear(), variableDate.getMonth(), 0)
    const prevMonthLastDate = prevMonthLast.getDate()
    const prevMonthLastDay = prevMonthLast.getDay()

    const nextMonthLast = new Date(variableDate.getFullYear(), variableDate.getMonth() + 2, 0)

    shownPrevDates = []
    if (prevMonthLastDay !== 6) {
      let prevDay = prevMonthLastDate - prevMonthLastDay
      for (let i = 0; i < prevMonthLastDay + 1; i++) {
        shownPrevDates.push([prevMonthLast.getFullYear(), prevMonthLast.getMonth() + 1, prevDay])
        prevDay = ++prevDay
      }
    }
    shownNextDates = []
    if (thisMonthLastDay !== 6) {
      shownNextDates = [...Array(6 - thisMonthLastDay).keys()].map(key => [nextMonthLast.getFullYear(), nextMonthLast.getMonth() + 1, key + 1])
    }
    shownThisDates = [...Array(thisMonthLastDate).keys()].map(key => [thisMonthLast.getFullYear(), thisMonthLast.getMonth() + 1, key + 1])
    calendarDates = shownPrevDates.concat(shownThisDates, shownNextDates)
    state.savedCalendarDates = calendarDates
    return calendarDates
  },
  figureDatesWeekly (state, variableDate) {
    const calendarDates = []
    for (let i = 0; i < 7; i++) {
      const theDay = new Date(variableDate.getFullYear(), variableDate.getMonth(), variableDate.getDate() - variableDate.getDay() + i)
      calendarDates.push([theDay.getFullYear(), theDay.getMonth() + 1, theDay.getDate()])
    }
    state.savedCalendarDates = calendarDates
    return calendarDates
  },
  figureDatesDaily (state, variableDate) {
    const calendarDates = [[variableDate.getFullYear(), variableDate.getMonth() + 1, variableDate.getDate()]]
    state.savedCalendarDates = calendarDates
    return calendarDates
  }
}

export default {
  [CHANGE_FETCHED_DATE] (state, payload) {
    state.fetchedDate = payload
    if (state.selectedCalendarType === 'Monthly') {
      state.loadedDates = storage.figureDatesMonthly(state, state.fetchedDate)
    } else if (state.selectedCalendarType === 'Weekly') {
      state.loadedDates = storage.figureDatesWeekly(state, state.fetchedDate)
    } else if (state.selectedCalendarType === 'Daily') {
      state.loadedDates = storage.figureDatesDaily(state, state.fetchedDate)
    } else if (state.selectedCalendarType === 'Yearly') {
      state.loadedDates = storage.figureDatesYearly(state, state.fetchedDate)
    }
  },
  [CHANGE_SIDE_CALENDAR] (state, payload) {
    let yearData, monthData, dateData
    if (payload.type === 'showPrev') {
      yearData = state.sideFetchedDate.getFullYear()
      monthData = state.sideFetchedDate.getMonth() - 1
      dateData = state.sideFetchedDate.getDate()
    } else if (payload.type === 'showNext') {
      yearData = state.sideFetchedDate.getFullYear()
      monthData = state.sideFetchedDate.getMonth() + 1
      dateData = state.sideFetchedDate.getDate()
    } else if (payload.type === 'showToday') {
      yearData = state.todayDate.getFullYear()
      monthData = state.todayDate.getMonth()
      dateData = state.todayDate.getDate()
    }
    const fetchedNewDate = new Date(yearData, monthData, dateData)
    state.sideFetchedDate = fetchedNewDate
    state.sideLoadedDates = storage.figureDatesMonthly(state, fetchedNewDate)
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
    state.modalTodoDivided = [...Array(Math.ceil(state.modalTodo.length / 8))].map(i => copyModalTodo.splice(i * 8, 8))
    state.fetchedModalPage = state.modalTodoDivided.length - 1
  },
  [CHECK_TODO_ITEM] (state, payload) {
    const key = payload.pageKey * 8 + Number(payload.key)
    state.modalTodo[key].completed = !payload.todoItem.completed
    state.todoData[state.modalDate] = state.modalTodo
    localStorage.setItem('todos', JSON.stringify(state.todoData))
    let getLocalStorage = {}
    if (localStorage.todos !== undefined) {
      getLocalStorage = JSON.parse(localStorage.getItem('todos'))
    }
    state.todoData = getLocalStorage

    const copyModalTodo = [...state.modalTodo]
    state.modalTodoDivided = [...Array(Math.ceil(state.modalTodo.length / 8))].map(i => copyModalTodo.splice(i * 8, 8))
  },
  [DELETE_TODO_ITEM] (state, payload) {
    const pageLength = state.modalTodoDivided.length
    const key = payload.pageKey * 8 + Number(payload.key)
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
    state.modalTodoDivided = [...Array(Math.ceil(state.modalTodo.length / 8))].map(i => copyModalTodo.splice(i * 8, 8))
    if ((state.fetchedModalPage !== state.modalTodoDivided.length - 1) && (state.modalTodoDivided[pageLength - 1] === undefined)) {
      state.fetchedModalPage--
    }
  },
  [SET_MODAL_DATA] (state, payload) {
    state.showModal = true
    const clickedDate = payload.target.id
    state.modalDate = clickedDate
    if (Object.keys(state.todoData).includes(clickedDate) === true) {
      state.modalTodo = state.todoData[state.modalDate]
    } else {
      state.modalTodo = []
    }
    const copyModalTodo = [...state.modalTodo]
    state.modalTodoDivided = [...Array(Math.ceil(state.modalTodo.length / 8))].map(i => copyModalTodo.splice(i * 8, 8))
  },
  [SELECT_CALENDAR_TYPE] (state, payload) {
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
  [SET_SIDE_FETCHED_DATE_TO_TODAY] (state) {
    state.sideFetchedDate = state.todayDate
  },
  [SET_STATE_SHOW_MODAL_PAGE] (state, payload) {
    state.fetchedModalPage = payload
  }
}
