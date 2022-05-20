<template>
  <div class="yearlyComponent">
      <div
        class="calendarBox"
        @click="fetchClickedDay"
        @dblclick="showModalTodo"
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
      'SET_MODAL_DATA'
    ]),
    fetchClickedDay (event) {
      const dateString = event.target.id.split(',')
      const dateConstructor = new Date(dateString[0], dateString[1] - 1, dateString[2])
      this.$store.state.fetchedDate = dateConstructor
      if (Number(dateString[0]) !== this.loadedYear) {
        this.CHANGE_FETCHED_DATE(dateConstructor)
        this.loadedYear = Number(dateString[0])
      }
    },
    showModalTodo (event) {
      this.seSET_MODAL_DATAtModalData(event)
    },
    isYearlyFetchedDate (day, key) {
      return (day[0] === this.fetchedDateString[0] && day[1] === this.fetchedDateString[1] && day[2] === this.fetchedDateString[2]) && (this.selectedCalendarType === 'Yearly') && ((key + 1) === this.fetchedDateString[1])
    }
  },
  created () {
    this.loadedYear = this.$store.state.fetchedDate.getFullYear()
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
        align-items: flex-end;
        padding-left: 12px;
        padding-top: 2px;
        padding-bottom: 2px;
        margin-bottom: 12px;
        background: rgba(0, 0, 0, 0.03);
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
