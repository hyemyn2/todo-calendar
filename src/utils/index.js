export function utils () {
  const figureDatesYearly = (newFetchedDate) => {
    const newLoadedDates = []
    const totalMonths = 12
    for (let i = 0; i < totalMonths; i++) {
      const eachMonthFetchedDate = new Date(newFetchedDate.getFullYear(), i, newFetchedDate.getDate())
      const eachMonthLoadedDates = figureDatesMonthly(eachMonthFetchedDate)
      newLoadedDates.push(eachMonthLoadedDates)
    }
    return newLoadedDates
  }
  const figureDatesMonthly = (newFetchedDate) => {
    let newLoadedDates = []
    let shownPrevDates = []
    let shownNextDates = []
    let shownThisDates = []

    const thisMonthLast = new Date(newFetchedDate.getFullYear(), newFetchedDate.getMonth() + 1, 0)
    const thisMonthLastDate = thisMonthLast.getDate()
    const thisMonthLastDay = thisMonthLast.getDay()

    const prevMonthLast = new Date(newFetchedDate.getFullYear(), newFetchedDate.getMonth(), 0)
    const prevMonthLastDate = prevMonthLast.getDate()
    const prevMonthLastDay = prevMonthLast.getDay()

    const nextMonthLast = new Date(newFetchedDate.getFullYear(), newFetchedDate.getMonth() + 2, 0)

    shownPrevDates = []
    const totalDaysAWeek = 7
    if (prevMonthLastDay !== totalDaysAWeek - 1) {
      let prevDay = prevMonthLastDate - prevMonthLastDay
      for (let i = 0; i < prevMonthLastDay + 1; i++) {
        shownPrevDates.push([prevMonthLast.getFullYear(), prevMonthLast.getMonth() + 1, prevDay])
        prevDay = ++prevDay
      }
    }

    if (thisMonthLastDay !== totalDaysAWeek - 1) {
      shownNextDates = [...Array(6 - thisMonthLastDay).keys()]
        .map(key => [nextMonthLast.getFullYear(), nextMonthLast.getMonth() + 1, key + 1])
    }

    shownThisDates = [...Array(thisMonthLastDate).keys()]
      .map(key => [thisMonthLast.getFullYear(), thisMonthLast.getMonth() + 1, key + 1])

    newLoadedDates = shownPrevDates.concat(shownThisDates, shownNextDates)
    return newLoadedDates
  }
  const figureDatesWeekly = (newFetchedDate) => {
    const newLoadedDates = []
    const totalDaysAWeek = 7
    for (let i = 0; i < totalDaysAWeek; i++) {
      const theDay = new Date(newFetchedDate.getFullYear(), newFetchedDate.getMonth(), newFetchedDate.getDate() - newFetchedDate.getDay() + i)
      newLoadedDates.push([theDay.getFullYear(), theDay.getMonth() + 1, theDay.getDate()])
    }
    return newLoadedDates
  }
  const figureDatesDaily = (newFetchedDate) => {
    const newLoadedDates = [[newFetchedDate.getFullYear(), newFetchedDate.getMonth() + 1, newFetchedDate.getDate()]]
    return newLoadedDates
  }
  const figureDatesByCalendarType = {
    monthly: figureDatesMonthly,
    yearly: figureDatesYearly,
    weekly: figureDatesWeekly,
    daily: figureDatesDaily
  }
  return {
    figureDatesYearly,
    figureDatesMonthly,
    figureDatesWeekly,
    figureDatesDaily,
    figureDatesByCalendarType
  }
}
