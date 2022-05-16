export default {
        todayDate:{},
        literalTodayDate: [],
        fetchedDate: {},
        sideFetchedDate: {},
        pageInfo: {},
        loadedDates: [], // [[2011,01,01], [2011,01,01], [2011,01,01], [2011,01,01], ]
        sideLoadedDates: [], // [[2011,01,01], [2011,01,01], [2011,01,01], [2011,01,01], ]
        isFetched: false,
        showModal: false,
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
            0: 'Daily',
            1: 'Weekly',
            2: 'Monthly',
            3: 'Yearly',
        },
        savedCalendarDates: [],
        savedYearlyCalendarDates: [],
        selectedCalendarType: 'Monthly',
        allToggles: {
            toggleCalendarType: { excludeOffEvent: 'selectedValue', booleanValue: false},
        },
        totalMonths: ['1', '2', '3', '4', '5', '6', '7', '8','9','10','11','12'],
        theMonth: '',
        literalMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
}