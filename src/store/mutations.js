import {
  CHANGE_MAIN_CALENDAR,
  CHANGE_FETCHED_DATE,
  FIGURE_DATES_YEARLY,
  FIGURE_DATES_MONTHLY,
  FIGURE_DATES_WEEKLY,
  FIGURE_DATES_DAILY,
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

export default {
  [CHANGE_MAIN_CALENDAR] (state, payload) {
    let yearData = state.fetchedDate.getFullYear()
    let monthData = state.fetchedDate.getMonth()
    let dateData = state.fetchedDate.getDate()
    if (payload.type === 'showPrev') {
      if (state.selectedCalendarType === 'Monthly') {
        monthData = state.fetchedDate.getMonth() - 1
      } else if (state.selectedCalendarType === 'Weekly') {
        dateData = state.fetchedDate.getDate() - 7
      } else if (state.selectedCalendarType === 'Daily') {
        dateData = state.fetchedDate.getDate() - 1
      } else if (state.selectedCalendarType === 'Yearly') {
        yearData = state.fetchedDate.getFullYear() - 1
      }
    } else if (payload.type === 'showNext') {
      if (state.selectedCalendarType === 'Monthly') {
        monthData = state.fetchedDate.getMonth() + 1
      } else if (state.selectedCalendarType === 'Weekly') {
        dateData = state.fetchedDate.getDate() + 7
      } else if (state.selectedCalendarType === 'Daily') {
        dateData = state.fetchedDate.getDate() + 1
      } else if (state.selectedCalendarType === 'Yearly') {
        yearData = state.fetchedDate.getFullYear() + 1
      }
    } else if (payload.type === 'showToday') {
      yearData = state.todayDate.getFullYear()
      monthData = state.todayDate.getMonth()
      dateData = state.todayDate.getDate()
    }
    this.commit(CHANGE_FETCHED_DATE, new Date(yearData, monthData, dateData))
  },
  [CHANGE_FETCHED_DATE] (state, payload) {
    state.fetchedDate = payload
    if (state.selectedCalendarType === 'Monthly') {
      this.commit(FIGURE_DATES_MONTHLY, { newDate: payload })
      state.loadedDates = state.savedCalendarDates
    } else if (state.selectedCalendarType === 'Weekly') {
      this.commit(FIGURE_DATES_WEEKLY, { newDate: payload })
      state.loadedDates = state.savedCalendarDates
    } else if (state.selectedCalendarType === 'Daily') {
      this.commit(FIGURE_DATES_DAILY, { newDate: payload })
      state.loadedDates = state.savedCalendarDates
    } else if (state.selectedCalendarType === 'Yearly') {
      this.commit(FIGURE_DATES_YEARLY, { newDate: payload })
      state.loadedDates = state.savedYearlyCalendarDates
    }
  },
  [FIGURE_DATES_YEARLY] (state, payload) {
    const yearlyCalendarDates = []
    for (let i = 0; i < 12; i++) {
      const newPayload = new Date(payload.newDate.getFullYear(), i, payload.newDate.getDate())
      this.commit(FIGURE_DATES_MONTHLY, { newDate: newPayload })
      const eachMonthDates = state.savedCalendarDates
      yearlyCalendarDates.push(eachMonthDates)
    }
    state.savedYearlyCalendarDates = yearlyCalendarDates
  },
  [FIGURE_DATES_MONTHLY] (state, payload) {
    let calendarDates = []
    let shownPrevDates = []
    let shownNextDates = []
    let shownThisDates = []
    const thisMonthLast = new Date(payload.newDate.getFullYear(), payload.newDate.getMonth() + 1, 0)
    const thisMonthLastDate = thisMonthLast.getDate()
    const thisMonthLastDay = thisMonthLast.getDay()

    const prevMonthLast = new Date(payload.newDate.getFullYear(), payload.newDate.getMonth(), 0)
    const prevMonthLastDate = prevMonthLast.getDate()
    const prevMonthLastDay = prevMonthLast.getDay()

    const nextMonthLast = new Date(payload.newDate.getFullYear(), payload.newDate.getMonth() + 2, 0)

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
  },
  [FIGURE_DATES_WEEKLY] (state, payload) {
    const calendarDates = []
    for (let i = 0; i < 7; i++) {
      const theDay = new Date(payload.newDate.getFullYear(), payload.newDate.getMonth(), payload.newDate.getDate() - payload.newDate.getDay() + i)
      calendarDates.push([theDay.getFullYear(), theDay.getMonth() + 1, theDay.getDate()])
    }
    state.savedCalendarDates = calendarDates
  },
  [FIGURE_DATES_DAILY] (state, payload) {
    const calendarDates = [[payload.newDate.getFullYear(), payload.newDate.getMonth() + 1, payload.newDate.getDate()]]
    state.savedCalendarDates = calendarDates
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
    this.commit(FIGURE_DATES_MONTHLY, { newDate: fetchedNewDate })
    state.sideLoadedDates = state.savedCalendarDates
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
