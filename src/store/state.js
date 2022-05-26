export default {
  yearData: 0,
  MonthData: 0,
  DateData: 0,
  todayDate: {},
  literalTodayDate: [],
  fetchedDate: {},
  sideFetchedDate: {},
  loadedDates: [],
  sideLoadedDates: [],
  isFetched: false,
  showModal: false,
  fetchedModalPage: 0,
  modalDate: '',
  modalTodo: [],
  modalTodoDivided: [],
  todoData: (function () {
    let getLocalStorage = {}
    if (localStorage.todos !== undefined) {
      getLocalStorage = JSON.parse(localStorage.getItem('todos'))
    }
    return getLocalStorage
  })(),
  booleanBurger: false,
  calendarType: {
    0: 'daily',
    1: 'weekly',
    2: 'monthly',
    3: 'yearly'
  },
  selectedCalendarType: 'monthly',
  allToggles: {
    toggleCalendarType: {
      excludeOffEvent: 'selectedValue',
      booleanValue: false
    }
  },
  totalMonths: [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12'
  ],
  theMonth: '',
  literalMonths: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
}
