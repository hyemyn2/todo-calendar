<template>
  <div
    class="calendarList"
    @click="fetchClickedDay"
    @dblclick="showModalTodo"
    :class="[isActiveDaily, isActiveWeekly, isActiveMonthly]"
  >
    <div
      class="calendarBlock"
      v-for="(day, index) in loadedDates"
      :id="day"
      :key="index"
      :class="{activeFetched: isWeeklyMonthlyFetchedDate(day)}"
    >
      <calendar-block
        class="componentBlock"
        id="show-modal"
      >
        <template v-if="isWeeklyMonthlyFirstDate(day)">
          <h2 slot="dayNumber">
            {{ setLiteralMonths(day) }} {{ day[2] }}
          </h2>
        </template>
        <template v-else>
          <h2 slot="dayNumber">
            {{ day[2] }}
          </h2>
        </template>
        <section
          slot="dayBox"
          v-if="isTypeMonthly"
        >
          <template
            v-if="isNotTodoLengthMoreThree(day)"
          >
            <ul>
              <li
                class="todoListText"
                v-for="(item, key) in renderTodo(day)"
                :key="key"
                :class="{checked:item.completed}"
              >
                <p>
                  {{ item.text }}
                </p>
              </li>
            </ul>
          </template>
          <template
            v-if="isTodoLengthMoreThree(day)"
          >
            <ul>
              <li
                class="todoListText"
                v-for="(item, key) in renderThreeTodoArr(day)"
                :key="key"
                :class="{checked:item.completed}"
              >
                <p>
                  {{ item.text }}
                </p>
              </li>
            </ul>
            <span
              class="moreSpan"
            >
              +{{ setMoreTodoLength(day) }} more
            </span>
          </template>
        </section>
        <section
          slot="dayBox"
          v-else-if="isTypeDailyWeekly"
        >
          <ul>
            <li
              class="todoListText"
              v-for="(item, key) in renderTodo(day)"
              :key="key"
              :class="{checked:item.completed}"
            >
              <p>
                {{ item.text }}
              </p>
            </li>
          </ul>
        </section>
      </calendar-block>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import CalendarBlock from './CalendarBlock.vue'
import { TypeMixin } from '../../mixins/TypeMixin'
import { utils } from '@/utils/index'
export default {
  mixins: [
    TypeMixin
  ],
  components: {
    CalendarBlock
  },
  computed: {
    ...mapState([
      'todoData',
      'fetchedDate',
      'loadedDates',
      'selectedCalendarType',
      'literalMonths',
      'todoData'
    ]),
    ...mapGetters([
      'fetchedDateString'
    ]),
    isActiveDaily () {
      return this.selectedCalendarType === 'daily' ? 'activeDaily' : ''
    },
    isActiveWeekly () {
      return this.selectedCalendarType === 'weekly' ? 'activeWeekly' : ''
    },
    isActiveMonthly () {
      return this.selectedCalendarType === 'monthly' ? 'activeMonthly' : ''
    }
  },
  methods: {
    ...mapMutations([
      'CHANGE_FETCHED_DATE',
      'CHANGE_LOADED_DATES',
      'CHANGE_LOADED_DATES',
      'SET_MODAL_DATA'
    ]),
    fetchClickedDay (event) {
      const dateString = event.target.id.split(',')
      const newFetchedDate = new Date(dateString[0], dateString[1] - 1, dateString[2])
      this.CHANGE_FETCHED_DATE(newFetchedDate)
      const newLoadedDates = utils().figureDatesByCalendarType[this.selectedCalendarType](newFetchedDate)
      this.CHANGE_LOADED_DATES(newLoadedDates)
    },
    showModalTodo (event) {
      this.SET_MODAL_DATA(event)
    },
    renderTodo (day) {
      const renderDateArr = this.todoData[day.join(',')]
      if (renderDateArr) {
        return renderDateArr
      }
    },
    figureTodoLength (day) {
      const arr = this.renderTodo(day)
      if (arr) {
        return arr.length
      }
    },
    setMoreTodoLength (day) {
      return this.figureTodoLength(day) - 3
    },
    isWeeklyMonthlyFetchedDate (day) {
      return (day[0] === this.fetchedDateString[0] && day[1] === this.fetchedDateString[1] && day[2] === this.fetchedDateString[2]) && (this.selectedCalendarType === 'weekly' || this.selectedCalendarType === 'monthly')
    },
    isWeeklyMonthlyFirstDate (day) {
      return day[2] === 1 && (this.selectedCalendarType === 'weekly' || this.selectedCalendarType === 'monthly')
    },
    setLiteralMonths (day) {
      return this.literalMonths[Number(day[1] - 1)].slice(0, 3)
    },
    renderThreeTodoArr (day) {
      return this.renderTodo(day).slice(0, 3)
    },
    isNotTodoLengthMoreThree (day) {
      return this.figureTodoLength(day) <= 3
    },
    isTodoLengthMoreThree (day) {
      return this.figureTodoLength(day) > 3
    }
  }
}
</script>

<style scoped>
  .calendarList {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  }
  .calendarBlock {
    width: 100%;
    height: 130px;
    border-right: 1px solid rgba(0, 0, 0, 0.15);
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  }
  .calendarBlock:nth-of-type(7n) {
    border-right: none;
  }
  .calendarBlock:hover {
    background: rgba(139, 192, 235, 0.3);
    cursor: pointer;
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
    color: black;
    font-weight: bold;
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
    padding: 0px 5px;
  }
  section ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  section ul li {
    position: relative;
    font-size: 0.8rem;
    margin-bottom: 5px;
    margin: 0 0 5px 0;
    padding: 2px 15px 2px 15px;
    font-weight: bolder;
    background: rgba(139, 192, 235, 0.65);
    color: rgba(0, 0, 0, 1);
    border-radius: 5px;
    overflow: hidden;
  }
  section ul li p {
    margin: 0;
    width: auto;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  section ul li.checked {
    opacity: 0.45;
  }

  section ul li .todoListChecked {
    position: absolute;
    left: 0;
    top: 0;
    color: #2b8ec7;
  }
  .blackSpace {
    margin: auto;
    height: 15px;
    border: 1px solid rgba(0, 0, 0, 0.08);
  }
  .moreSpan {
    display: inline-block;
    width: 100%;
    font-size: 0.7rem;
    text-align: right;
    color: rgba(0, 0, 0, 0.5);
    font-weight: bolder;
  }
  .calendarList.activeWeekly .calendarBlock{
    min-height: 77vh;
    height: auto;
  }
    .calendarList.activeDaily {
    grid-template-columns: 1fr;
    }
  .calendarList.activeDaily .calendarBlock {
    min-height: 77vh;
    height: auto;
  }
  .calendarList.activeDaily .calendarBlock .componentBlock div div div div {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .calendarList.activeDaily .calendarBlock:hover {
      background: none;
  }
  .calendarList.activeDaily .calendarBlock h2 {
    font-size: 1.2rem;
    color: rgba(0, 0, 0, 0.85);
    margin: 20px 0 20px 10px ;
    text-align: left;
  }
  .calendarBlock.activeFetched {
    background: rgb(226, 242, 255, 0.5);
  }
</style>
