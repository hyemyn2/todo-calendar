<template>
  <div class="yearlyComponent">
      <div
        class="calendarBox"
        v-for="(month, key) in loadedDates"
        :key="key"
      >
        <div class="monthTitle">
          <p class="monthNumber">{{ key + 1 }}</p>
        </div>
        <calendar-small>
            <li
              slot="slotDayNumber"
              v-for="(day, index) in month"
              :id="day"
              :key="index"
              :class="{activeFetched: isYearlyFetchedDate(day, key)}"
              @click="fetchClickedDay"
              @dblclick="showModalTodo"
            >
            <calendar-block id="show-modal">
                  <span
                    class="yearlyDatesNumber"
                    slot="dayNumber"
                  >
                    {{ day[2] }}
                  </span>
            </calendar-block>
            </li>
        </calendar-small>
      </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import CalendarSmall from './CalendarSmall.vue'
import CalendarBlock from './CalendarBlock.vue'
import { utils } from '@/utils/index'
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
    ...mapState([
      'loadedDates',
      'fetchedDate',
      'selectedCalendarType'
    ]),
    ...mapGetters([
      'fetchedDateString'
    ])
  },
  methods: {
    ...mapMutations([
      'CHANGE_FETCHED_DATE',
      'CHANGE_LOADED_DATES',
      'SET_MODAL_DATA'
    ]),
    fetchClickedDay (event) {
      const dateString = event.target.id.split(',')
      const newFetchedDate = new Date(dateString[0], dateString[1] - 1, dateString[2])
      const fetchedDateYear = Number(dateString[0])
      this.CHANGE_FETCHED_DATE(newFetchedDate)
      if (fetchedDateYear !== this.loadedYear) {
        const newLoadedDates = utils().figureDatesByCalendarType[this.selectedCalendarType](newFetchedDate)
        this.CHANGE_LOADED_DATES(newLoadedDates)
        this.loadedYear = fetchedDateYear
      }
    },
    showModalTodo (event) {
      this.SET_MODAL_DATA(event)
    },
    isYearlyFetchedDate (day, key) {
      return (day[0] === this.fetchedDateString[0] && day[1] === this.fetchedDateString[1] && day[2] === this.fetchedDateString[2]) && (this.selectedCalendarType === 'yearly') && ((key + 1) === this.fetchedDateString[1])
    }
  },
  created () {
    this.loadedYear = this.fetchedDate.getFullYear()
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
        padding: 20px;
        /* box-shadow: inset 0px 0px 10px 10px rgba(0, 0, 0, 0.05); */
        border: 1px solid rgba(0, 0, 0, 0.1);
    }
    .yearlyComponent .calendarBox .monthTitle {
        display: flex;
        align-items: flex-end;
        padding-left: 12px;
        padding-top: 2px;
        padding-bottom: 2px;
        margin-bottom: 12px;
        /* background: rgba(0, 0, 0, 0.03); */
    }
    .yearlyComponent .calendarBox .monthTitle .monthNumber {
        margin: 0 10px 0 0;
        color: rgba(0, 0, 0, 0.5);
    }
        .yearlyComponent .calendarBox .monthTitle .monthName {
        margin: 0;
        color: rgba(0, 0, 0, 0.5);
        font-size: 0.85rem;
    }

    .yearlyComponent .calendarBox li {
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
