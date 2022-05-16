export default { 
    changeFetchedDate (state, payload) {
        state.fetchedDate = payload
        if (this.state.selectedCalendarType === 'Monthly') {
            this.commit('figureDatesMonthly', { newDate: payload })
            state.loadedDates = state.savedCalendarDates
        } else if (this.state.selectedCalendarType === 'Weekly') {
            this.commit('figureDatesWeekly', { newDate: payload })
            state.loadedDates = state.savedCalendarDates
        } else if (this.state.selectedCalendarType === 'Daily') {
            this.commit('figureDatesDaily', { newDate: payload })
            state.loadedDates = state.savedCalendarDates
        } else if (this.state.selectedCalendarType === 'Yearly') {
            this.commit('figureDatesYearly', { newDate: payload })
            state.loadedDates = state.savedYearlyCalendarDates
        }
    },
    figureDatesYearly (state, payload) {   
        let yearlyCalendarDates = []     
        for(let i=0; i<12; i++) {
            const newPayload = new Date(payload.newDate.getFullYear(), i, payload.newDate.getDate())
            this.commit('figureDatesMonthly', { newDate: newPayload })
            let eachMonthDates = state.savedCalendarDates
            yearlyCalendarDates.push(eachMonthDates)
        }
        state.savedYearlyCalendarDates = yearlyCalendarDates
    },
    figureDatesMonthly (state, payload) {
        let calendarDates = []
        let shownPrevDates = []
        let shownNextDates = []
        let shownThisDates = []
        const thisMonthLast = new Date(payload.newDate.getFullYear(), payload.newDate.getMonth()+1, 0)
        const thisMonthLastDate = thisMonthLast.getDate()
        const thisMonthLastDay = thisMonthLast.getDay()
        
        const prevMonthLast = new Date(payload.newDate.getFullYear(), payload.newDate.getMonth(), 0)
        const prevMonthLastDate = prevMonthLast.getDate()
        const prevMonthLastDay = prevMonthLast.getDay()
        
        const nextMonthLast = new Date(payload.newDate.getFullYear(), payload.newDate.getMonth()+2, 0)
        
        shownPrevDates = []
        if( prevMonthLastDay !== 6 ) {
            let prevDay = prevMonthLastDate-prevMonthLastDay
            for( let i=0; i<prevMonthLastDay+1; i++) {
                shownPrevDates.push([prevMonthLast.getFullYear(), prevMonthLast.getMonth()+1, prevDay])
                prevDay = ++prevDay
            }
        }
        shownNextDates = []
        if( thisMonthLastDay !== 6 ) {
            shownNextDates = [...Array(6-thisMonthLastDay).keys()].map(key => [nextMonthLast.getFullYear(), nextMonthLast.getMonth()+1, key+1])
        }
        shownThisDates = [...Array(thisMonthLastDate).keys()].map(key => [thisMonthLast.getFullYear(), thisMonthLast.getMonth()+1, key+1])
        calendarDates = shownPrevDates.concat(shownThisDates, shownNextDates)
        state.savedCalendarDates = calendarDates
    },
    figureDatesWeekly (state, payload) {
        let calendarDates = []
        for (let i=0; i<7; i++) {
            const theDay = new Date(payload.newDate.getFullYear(), payload.newDate.getMonth(), payload.newDate.getDate()-payload.newDate.getDay()+i)
            calendarDates.push([theDay.getFullYear(), theDay.getMonth()+1, theDay.getDate()])
        }
        state.savedCalendarDates = calendarDates
    },
    figureDatesDaily (state, payload) {
        let calendarDates = [[payload.newDate.getFullYear(), payload.newDate.getMonth()+1, payload.newDate.getDate()]]
        state.savedCalendarDates = calendarDates
    },
    changeSideCalendar (state, payload) {
        state.sideFetchedDate = payload
        this.commit('figureDatesMonthly', { newDate: payload })
        state.sideLoadedDates = state.savedCalendarDates
    },
    addNewTodo (state, payload) {
        const newTodo = {text: payload, completed: false}
        state.modalTodo.push(newTodo)
        state.todoData[state.modalDate] = state.modalTodo
        localStorage.setItem('todos', JSON.stringify(state.todoData))

        // save in localstorage
        let getLocalStorage = {}
        if (localStorage.todos !== undefined) {
            getLocalStorage = JSON.parse(localStorage.getItem('todos'))
        }
        state.todoData = getLocalStorage

        let copyModalTodo = [...state.modalTodo]
        state.modalTodoDivided = [...Array(Math.ceil(state.modalTodo.length/8))].map(i => copyModalTodo.splice(i*8, 8))
    },
    checkTodoItem (state, payload) {
        const key = payload.pageKey*8+Number(payload.key)
        state.modalTodo[key].completed = !payload.todoItem.completed
        state.todoData[state.modalDate] = state.modalTodo
        localStorage.setItem('todos', JSON.stringify(state.todoData))

        // save in localstorage
        let getLocalStorage = {}
        if (localStorage.todos !== undefined) {
            getLocalStorage = JSON.parse(localStorage.getItem('todos'))
        }
        state.todoData = getLocalStorage

        let copyModalTodo = [...state.modalTodo]
        state.modalTodoDivided = [...Array(Math.ceil(state.modalTodo.length/8))].map(i => copyModalTodo.splice(i*8, 8))
    },
    deleteTodoItem (state, payload) {
        const key = payload.pageKey*8+Number(payload.key)
        state.modalTodo.splice(key, 1)
        state.todoData[state.modalDate] = state.modalTodo
        if (state.todoData[state.modalDate].length === 0) {
            delete state.todoData[state.modalDate]
        }
        localStorage.setItem('todos', JSON.stringify(state.todoData))

        // save in localstorage
        let getLocalStorage = {}
        if (localStorage.todos !== undefined) {
            getLocalStorage = JSON.parse(localStorage.getItem('todos'))
        }
        state.todoData = getLocalStorage
        
        let copyModalTodo = [...state.modalTodo]
        state.modalTodoDivided = [...Array(Math.ceil(state.modalTodo.length/8))].map(i => copyModalTodo.splice(i*8, 8))
    },
    setModalData (state, payload) {
        console.log(payload.target)
        console.log(payload.target.id)
        state.showModal = true
        const clickedDate = payload.target.id
        state.modalDate = clickedDate
        if (Object.keys(state.todoData).includes(clickedDate) === true) {
            state.modalTodo = state.todoData[state.modalDate] 
        } else {
            state.modalTodo = []
        }

        let copyModalTodo = [...state.modalTodo]
        state.modalTodoDivided = [...Array(Math.ceil(state.modalTodo.length/8))].map(i => copyModalTodo.splice(i*8, 8))
    },        
    selectCalendarType (state, payload) {
        if (payload) {
            state.selectedCalendarType = state.calendarType[payload]
            state.allToggles.toggleCalendarType.booleanValue = false
        }
    },
    showCalendarTypes (state) {
        state.allToggles.toggleCalendarType.booleanValue = !state.allToggles.toggleCalendarType.booleanValue
    },
}