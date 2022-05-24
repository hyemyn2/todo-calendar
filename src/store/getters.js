export default {
  fetchedDateYear (state) {
    return state.fetchedDate.getFullYear()
  },
  fetchedDateMonth (state) {
    return state.fetchedDate.getMonth()
  },
  fetchedDateDate (state) {
    return state.fetchedDate.getDate()
  },
  todayDateYear (state) {
    return state.todayDate.getFullYear()
  },
  todayDateMonth (state) {
    return state.todayDate.getMonth()
  },
  todayDateDate (state) {
    return state.todayDate.getDate()
  },
  setMainYear (state) {
    return state.fetchedDate.getFullYear()
  },
  setMainMonth (state) {
    return Number(state.fetchedDate.getMonth() + 1)
  },
  setSideYear (state) {
    return state.sideFetchedDate.getFullYear()
  },
  setSideMonth (state) {
    return Number(state.sideFetchedDate.getMonth() + 1)
  },
  setHeaderDate (state) {
    return state.todayDate.getDate()
  },
  fetchedDateString (state) {
    return [state.fetchedDate.getFullYear(), state.fetchedDate.getMonth() + 1, state.fetchedDate.getDate()]
  }
}
