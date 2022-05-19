export default {
  setYear (state) {
    return state.fetchedDate.getFullYear()
  },
  setMonth (state) {
    return Number(state.fetchedDate.getMonth() + 1)
  },
  setDate (state) {
    return state.fetchedDate.getDate()
  },
  setDay (state) {
    return state.fetchedDate.getDay()
  },
  setSideYear (state) {
    return state.sideFetchedDate.getFullYear()
  },
  setSideMonth (state) {
    return Number(state.sideFetchedDate.getMonth() + 1)
  },
  setSideDate (state) {
    return state.sideFetchedDate.getDate()
  },
  setSideDay (state) {
    return state.sideFetchedDate.getDay()
  },
  todoyDateDay (state) {
    return state.todayDate.getDate()
  },
  fetchedDateString (state) {
    return [state.fetchedDate.getFullYear(), state.fetchedDate.getMonth() + 1, state.fetchedDate.getDate()]
  }
}
