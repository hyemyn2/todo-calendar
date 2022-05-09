https://ourcodeworld.com/articles/read/37/how-to-create-your-own-javascript-library
https://medium.muz.li/made-with-studio-11-804cad192561

<!-- Date 객체 생성 -->

var date1 = new Date(); // 현재 날짜 및 시간
var date2 = new Date(1991,11,25,3,50); // 1991년 12월 25일 3:50:00 (월 +1 주의)
var date3 = new Date('2014-6-4'); // 2002년 1월 1일 09:00:00
var date4 = new Date('2012-05-17 10:20:30'); // 2012년 5월 17일 10:20:30

<!-- store/index.js 이전 코드 -->
import Vue from 'vue'
import Vuex from 'vuex'

// import mutations from './mutations'
// import CHANGE_FETCHED_DATE from './mutation-type'

Vue.use(Vuex)

const storage = {
    fetchLocalStorage () {
        let getLocalStorage = {}
        if (localStorage.todos !== undefined) {
            getLocalStorage = JSON.parse(localStorage.getItem('todos'))
            // getLocalStorage = {
            //     '2022,4,1': [
            //         {
            //             text: '아침',
            //             completed: true
            //         },
            //         {
            //             text: '점심',
            //             completed: false
            //         },
            //     ],
            // }
        }
        return getLocalStorage
    },
    figureDatesYearly (store, payload) {   
        let yearlyCalendarDates = []     
        // console.log(payload)
        // Thu Apr 28 2022 15:26:39 GMT+0900 (한국 표준시)
        for(let i=0; i<12; i++) {
            const newPayload = new Date(payload.getFullYear(), i, payload.getDate())
            let eachMonthDates = storage.figureDatesMonthly(store, newPayload)
            yearlyCalendarDates.push(eachMonthDates)
        }
        return yearlyCalendarDates
    },
    figureDatesMonthly (store, payload) {
        let calendarDates = []
        let shownPrevDates = []
        let shownNextDates = []
        let shownThisDates = []
        // console.log(payload.getFullYear())
        const thisMonthLast = new Date(payload.getFullYear(), payload.getMonth()+1, 0)
        const thisMonthLastDate = thisMonthLast.getDate()
        const thisMonthLastDay = thisMonthLast.getDay()
        
        const prevMonthLast = new Date(payload.getFullYear(), payload.getMonth(), 0)
        const prevMonthLastDate = prevMonthLast.getDate()
        const prevMonthLastDay = prevMonthLast.getDay()
        
        const nextMonthLast = new Date(payload.getFullYear(), payload.getMonth()+2, 0)
        
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
        return calendarDates
    },
    figureDatesWeekly (store, payload) {
        let calendarDates = []
        for (let i=0; i<7; i++) {
            const theDay = new Date(payload.getFullYear(), payload.getMonth(), payload.getDate()-payload.getDay()+i)
            calendarDates.push([theDay.getFullYear(), theDay.getMonth()+1, theDay.getDate()])
        }
        return calendarDates
    },
    figureDatesDaily (store, payload) {
        let calendarDates = [[payload.getFullYear(), payload.getMonth()+1, payload.getDate()]]
        return calendarDates
    },
    divideDataArray (store) {
        let copyModalTodo = [...store.state.modalTodo]
        return [...Array(Math.ceil(store.state.modalTodo.length/8))].map(i => copyModalTodo.splice(i*8, 8))
    },
}

export const store = new Vuex.Store({
    state: {
        todayDate:{},
        literalTodayDate: [],
        fetchedDate: {},
        sideFetchedDate: {},
        // todolistData: {},
        pageInfo: {},
        loadedDates: [], // [[2011,01,01], [2011,01,01], [2011,01,01], [2011,01,01], ]
        sideLoadedDates: [], // [[2011,01,01], [2011,01,01], [2011,01,01], [2011,01,01], ]
        // yearlyLoadedDates:[],
        isFetched: false,
        showModal: false,
        modalDate: '',
        modalTodo: [],
        modalTodoDivided: [],
        todoData: storage.fetchLocalStorage(),
        booleanBurger: false,
        calendarType: {
            0: 'Daily',
            1: 'Weekly',
            2: 'Monthly',
            3: 'Yearly',
            // 4: 'Todolist',
        },
        selectedCalendarType: 'Monthly',
        allToggles: {
            toggleCalendarType: { excludeOffEvent: 'selectedValue', booleanValue: false},
            // toggleTodoModal: { excludeOffEvent: 'selectedValue', booleanValue: false},
        },
        totalMonths: ['1', '2', '3', '4', '5', '6', '7', '8','9','10','11','12'],
        theMonth: '',
        literalMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    },
    getters: {
        setYear (state) {
            return state.fetchedDate.getFullYear()
        },
        setMonth (state) {
            return Number(state.fetchedDate.getMonth()+1)
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
            return Number(state.sideFetchedDate.getMonth()+1)
        },
        setSideDate (state) {
            return state.sideFetchedDate.getDate()
        },
        setSideDay (state) {
            return state.sideFetchedDate.getDay()
        },
        todoData (state) {
            return state.todoData
        },
        todoyDateDay (state) {
            return state.todayDate.getDate()
        },
        fetchedDateString (state) {
            return [state.fetchedDate.getFullYear(), state.fetchedDate.getMonth()+1, state.fetchedDate.getDate()]
        }
    },
    mutations: { 
        // [CHANGE_FETCHED_DATE] (state, payload) {
        changeFetchedDate (state, payload) {
            state.fetchedDate = payload
            if (this.state.selectedCalendarType === 'Monthly') {
                state.loadedDates = storage.figureDatesMonthly(this, payload)
            } else if (this.state.selectedCalendarType === 'Weekly') {
                state.loadedDates = storage.figureDatesWeekly(this, payload)
            } else if (this.state.selectedCalendarType === 'Daily') {
                state.loadedDates = storage.figureDatesDaily(this, payload)
            } else if (this.state.selectedCalendarType === 'Yearly') {
                console.log(payload)
                state.loadedDates = storage.figureDatesYearly(this, payload)
            }
        },
        changeSideCalendar (state, payload) {
            state.sideFetchedDate = payload
            state.sideLoadedDates = storage.figureDatesMonthly(this, payload)
        },
        addNewTodo (state, payload) {
            const newTodo = {text: payload, completed: false}
            state.modalTodo.push(newTodo)
            state.todoData[state.modalDate] = state.modalTodo
            localStorage.setItem('todos', JSON.stringify(state.todoData))
            state.todoData = storage.fetchLocalStorage()
            state.modalTodoDivided = storage.divideDataArray(this)
        },
        checkTodoItem (state, payload) {
            const key = payload.pageKey*8+Number(payload.key)
            state.modalTodo[key].completed = !payload.todoItem.completed
            state.todoData[state.modalDate] = state.modalTodo
            localStorage.setItem('todos', JSON.stringify(state.todoData))
            state.todoData = storage.fetchLocalStorage()
            state.modalTodoDivided = storage.divideDataArray(this)
        },
        deleteTodoItem (state, payload) {
            const key = payload.pageKey*8+Number(payload.key)
            state.modalTodo.splice(key, 1)
            state.todoData[state.modalDate] = state.modalTodo
            if (state.todoData[state.modalDate].length === 0) {
                delete state.todoData[state.modalDate]
            }
            localStorage.setItem('todos', JSON.stringify(state.todoData))
            state.todoData = storage.fetchLocalStorage()
            state.modalTodoDivided = storage.divideDataArray(this)
        },
        setModalData (state, payload) {
            state.showModal = true
            const clickedDate = payload.target.id
            state.modalDate = clickedDate
            if (Object.keys(state.todoData).includes(clickedDate) === true) {
                state.modalTodo = state.todoData[state.modalDate] 
            } else {
                state.modalTodo = []
            }
            state.modalTodoDivided = storage.divideDataArray(this)
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
    }})


<!-- Calendar 보류 -->

        <template>
  <div class="calendarList" @click="showModalTodo">
    <div class="calendarBlock" v-for="(day, index) in this.loadedDates" v-bind:id="day" v-bind:key="index" >
      <calendar-block id="show-modal">
        <template v-if="day[2] === 1">
          <h2 slot="dayNumber">{{ day[1] }}월 {{ day[2] }}일</h2>
        </template>
        <template v-else>
          <h2 slot="dayNumber">{{ day[2] }}</h2>
        </template>
        <section slot="todoList">
            <ul>
              <li class="todoListText" v-for="(item, key) in renderTodo(day)" v-bind:key="key" v-bind:class="{checked:item.completed}">
                <p>{{ item.text }}</p>
              </li>
            </ul>
        </section>
      </calendar-block>
    </div>
  </div>
  
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import CalendarBlock from './CalendarBlock.vue'
export default {
  components: {
    CalendarBlock,
  },
  computed: {
    ...mapState(['setDate', 'loadedDates', 'isFetched']),
    ...mapGetters(['setYear', 'setMonth', 'setDay', 'todoData']),
  },
  methods: {
    showModalTodo (event) {
      this.$store.commit('setModalData', event)
    },
    renderBlocksData () {
      this.renderTodo()
    },
    renderTodo (day) {
      const renderDate = day.join(',')
      const renderDateArr = this.$store.state.todoData[`${renderDate}`]
      if ( renderDateArr !== undefined && renderDateArr[0]) {
        return renderDateArr
      }
      // this.$store.commit('renderCalendadrTodo', day)
    }
  },
  created () {
    this.renderBlocksData ()
  }
}
</script>

<style scoped>
  .calendarList {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;  
  }
  .calendarBlock {
    height: 150px;
    border-right: 1px solid rgba(0, 0, 0, 0.15);
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    overflow: hidden;
  }
  .column {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .column div {
    flex-grow: 1;
    height: 100%;
  }
  h2 {
    font-size: 0.7rem;
    color: #70757a;
    font-weight:bolder;
    text-align: center;
    margin: 3px auto;
    height: 20px;
    border-radius: 100%;
    background: none;
    padding: 4px 2px 0px 2px;
    text-align: center;
}
  h2:hover {
    background: #1a73e8;
    color: white;
  }
  section {
    padding: 10px;
    height: 100%;
  }
  section ul {
    list-style: none;
    margin: 0;
    padding: 0;
    /* height: 100%; */
    /* overflow: hidden; */
  }
  section ul li {
    position: relative;
    font-size: 0.8rem;
    margin-bottom: 5px;
    margin: 0 0 5px 0;
    padding: 0 15px 3px 15px;
    /* color: rgb(57, 77, 141); */
    color: rgba(0, 0, 0, 0.65);
    font-weight: bolder;
    background: rgb(233, 233, 233, 0.3);
    overflow: hidden;

  }
  section ul li p {
    margin: 0;
    width: 100%;
    /* margin: 0 5px; */
  }

  section ul li.checked {
    /* text-decoration-line: line-through;
    color: rgba(0, 0, 0, 0.4);
    background: rgb(233, 233, 233, 0.3); */
    display: none;
  }

  section ul li .todoListChecked {
    position: absolute;
    left: 0;
    top: 0;
    color: #2b8ec7;
  }
  /* section ul li:before {
    content: '';
    display: inline-block;
    width: 3px;
    height: 3px;
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-radius: 100%;
  } */
  .blackSpace {
    margin: auto;
    height: 15px;
    border: 1px solid rgba(0, 0, 0, 0.08);
  }
</style>


