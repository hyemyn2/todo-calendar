export function utils () {
  const figureDatesYearly = (variableDate) => {
    const calendarDates = []
    for (let i = 0; i < 12; i++) {
      const newPayload = new Date(variableDate.getFullYear(), i, variableDate.getDate())
      const eachMonthDates = figureDatesMonthly(newPayload)
      calendarDates.push(eachMonthDates)
    }
    return calendarDates
  }
  const figureDatesMonthly = (variableDate) => {
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
    return calendarDates
  }
  const figureDatesWeekly = (variableDate) => {
    const calendarDates = []
    for (let i = 0; i < 7; i++) {
      const theDay = new Date(variableDate.getFullYear(), variableDate.getMonth(), variableDate.getDate() - variableDate.getDay() + i)
      calendarDates.push([theDay.getFullYear(), theDay.getMonth() + 1, theDay.getDate()])
    }
    return calendarDates
  }
  const figureDatesDaily = (variableDate) => {
    const calendarDates = [[variableDate.getFullYear(), variableDate.getMonth() + 1, variableDate.getDate()]]
    return calendarDates
  }
  const figureDates = {
    Monthly: figureDatesMonthly,
    Yearly: figureDatesYearly,
    Weekly: figureDatesWeekly,
    Daily: figureDatesDaily
  }
  return {
    figureDatesYearly,
    figureDatesMonthly,
    figureDatesWeekly,
    figureDatesDaily,
    figureDates
  }
}
