<template>
  <div class="yearlyComponent">
      <div class="calendarBox"
       @click="fetchClickedDay" @dblclick="showModalTodo"
       v-for="(month, key) in this.$store.state.loadedDates" v-bind:key="key">
          <div class="monthTitle">
              <!-- <span class="monthName">{{ literalMonths[Number(month-1)] }}</span> -->
              <p class="monthNumber">{{ key+1 }}</p>
          </div>
        <calendar-small>
            <li slot="slotDayNumber" 
            v-for="(day, index) in month" 
            v-bind:id="day" 
            v-bind:key="index"
            v-bind:class="{activeFetched: (day[0] === fetchedDateString[0] && day[1] === fetchedDateString[1] && day[2] === fetchedDateString[2]) && (selectedCalendarType === 'Yearly') && ((key+1) === fetchedDateString[1])}" 
            >
            <calendar-block id="show-modal">
                <template v-if="day[0] === literalTodayDate[0] && day[1] === literalTodayDate[1] && day[2] === literalTodayDate[2]">
                <span 
                slot="dayNumber" class="activeToday yearlyDatesNumber">{{ day[2] }}</span>
                </template>
                <template v-else>
                <span 
                class="yearlyDatesNumber"
                slot="dayNumber">{{ day[2] }}</span>
                </template>
            </calendar-block>
            </li>
        </calendar-small>
      </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import CalendarSmall from './CalendarSmall.vue'
import CalendarBlock from './CalendarBlock.vue'
export default {
    components: {
        CalendarSmall,
        CalendarBlock
    },
    data () {
        return {
            loadedYear: 0
        }
    },
    computed: {
    ...mapState(['totalMonths', 'literalMonths', 'literalTodayDate', 'sideLoadedDates', 'selectedCalendarType']),
    ...mapGetters(['fetchedDateString']),
  },
    methods: {
        fetchClickedDay (event) {
            const dateString = event.target.id.split(',')
            const dateConstructor = new Date(dateString[0], dateString[1]-1, dateString[2])
            this.$store.state.fetchedDate = dateConstructor
            if ( Number(dateString[0]) !== this.loadedYear) {
                this.$store.commit('changeFetchedDate', dateConstructor)
                this.loadedYear = Number(dateString[0])
            }
        },
        showModalTodo (event) {
            this.$store.commit('setModalData', event)
        },
    },
    created () {
        this.loadedYear = this.$store.state.fetchedDate.getFullYear()
        console.log(this.loadedYear)
    //   this.$store.commit('changeFetchedDate', this.$store.state.fetchedDate)
    }
}
</script>

<style scoped>
    .yearlyComponent {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        padding: 20px;
    }
    .yearlyComponent .calendarBox {
        width: 70%;
        margin: 40px auto;
    }
    .yearlyComponent .calendarBox .monthTitle {
        display: flex;
        /* justify-content: center; */
        align-items: flex-end;
        padding-left: 12px;
        padding-top: 2px;
        padding-bottom: 2px;
        margin-bottom: 12px;
        /* border-bottom: 1px solid rgba(0, 0, 0, 0.12); */
        background: rgba(0, 0, 0, 0.03);
    }
    .yearlyComponent .calendarBox .monthTitle .monthNumber {
        margin: 0 10px 0 0;
        color: rgba(0, 0, 0, 0.5);
        /* font-weight: bolder; */
    }
        .yearlyComponent .calendarBox .monthTitle .monthName {
        margin: 0;
        color: rgba(0, 0, 0, 0.5);
        /* font-weight: bolder; */
        /* font-size: 0.75rem; */
        font-size: 0.85rem;
    }

    .yearlyComponent .calendarBox li {
        /* margin-bottom: 5px; */
        padding: 5px 0;
    }
    .yearlyComponent .calendarBox li .box {
    border-radius: 100%;
    width: 22px;
    height: 22px;
    margin: auto;
    }
    .yearlyComponent .calendarBox li.activeFetched .box {
    background: rgba(139, 192, 235, 0.5);
    }
    .yearlyComponent .calendarBox li .box span {
        display: inline-block;
        margin-top: 2px;
    }
    
</style>