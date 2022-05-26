<template>
  <div class="boxSideBar">
    <div
      class="others"
      :class="{ active:booleanBurger }"
    >
      <section class="toolBox">
        <div class="toolBoxTitle">
          <h2>
            {{ setLiteralMonths }}
            {{ setSideYear }}
          </h2>
          <div class="arrows">
              <span
                class="arrowPrev"
                @click="showPage('prev')"
              >
                <i class="fa-solid fa-angle-left"></i>
              </span>
              <span
                class="arrowNext"
                @click="showPage('next')"
              >
                <i class="fa-solid fa-angle-right"></i>
              </span>
          </div>
        </div>
        <div class="toolBoxContent">
          <calendar-small>
              <li
                slot="slotDayNumber"
                class="block"
                v-for="(day, index) in sideLoadedDates"
                :id="day"
                :key="index"
                @click="fetchMonthlyCalendar(day)"
              >
                <calendar-block>
                  <template v-if="checkFetched(day)">
                    <span
                      class="dateSpan activeFetched"
                      slot="dayNumber"
                    >
                      {{ day[2] }}
                    </span>
                  </template>
                  <template v-else>
                    <span
                      class="dateSpan"
                      slot="dayNumber"
                    >
                      {{ day[2] }}
                    </span>
                  </template>
                </calendar-block>
              </li>
          </calendar-small>
        </div>
      </section>
      <template
        v-if="haveTodayTodo"
      >
        <section class="toolBox">
          <div class="toolBoxTitle">
            <h2>
              Today's todolist
            </h2>
          </div>
          <div class="toolBoxContent">
            <ul class="todayList">
              <li
                @click="sideCheckTodo(key)"
                :class="{checked:todoItem.completed}"
                class="todoItem"
                v-for="(todoItem, key) in todoDataArr"
                :key="key"
              >
                <p class="todoText">
                  {{ todoItem.text }}
                </p>
                <span>
                  <i class="fa-solid fa-check"></i>
                </span>
                <span class="square"></span>
              </li>
            </ul>
          </div>
        </section>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import CalendarBlock from '../calendar/CalendarBlock.vue'
import CalendarSmall from '../calendar/CalendarSmall.vue'
import { utils } from '@/utils/index'
export default {
  components: {
    CalendarSmall,
    CalendarBlock
  },
  data () {
    return {
      sideCalendarType: 'monthly'
    }
  },
  computed: {
    ...mapState([
      'fetchedDate',
      'booleanBurger',
      'sideLoadedDates',
      'sideFetchedDate',
      'todayDate',
      'literalMonths',
      'literalTodayDate',
      'todoData',
      'selectedCalendarType'
    ]),
    ...mapGetters([
      'setSideYear',
      'setSideMonth'
    ]),
    haveTodayTodo () {
      return this.todoData[`${this.literalTodayDate.join(',')}`] !== undefined
    },
    todoDataArr () {
      return this.todoData[`${this.literalTodayDate.join(',')}`]
    },
    setLiteralMonths () {
      return this.literalMonths[Number(this.setSideMonth) - 1]
    }
  },
  methods: {
    ...mapMutations([
      'CHANGE_FETCHED_DATE',
      'CHANGE_LOADED_DATES',
      'CHANGE_SIDE_FETCHED_DATE',
      'CHANGE_SIDE_LOADED_DATES'
    ]),
    showPage (btnType) {
      const newFetchedDate = this.figureNewDateByButtons(btnType)
      this.CHANGE_SIDE_FETCHED_DATE(newFetchedDate)
      const newLoadedDates = utils().figureDatesByCalendarType[this.sideCalendarType](newFetchedDate)
      this.CHANGE_SIDE_LOADED_DATES(newLoadedDates)
    },
    figureNewDateByButtons (btnType) {
      return new Date(this.sideFetchedDate.getFullYear(), this.sideFetchedDate.getMonth() + (btnType === 'prev' ? -1 : +1), this.sideFetchedDate.getDate())
    },
    fetchMonthlyCalendar (day) {
      const newFetchedDate = new Date(day[0], day[1] - 1, day[2])
      this.CHANGE_SIDE_FETCHED_DATE(newFetchedDate)
      this.CHANGE_FETCHED_DATE(newFetchedDate)
      const newLoadedDates = utils().figureDatesByCalendarType[this.selectedCalendarType](this.fetchedDate)
      this.CHANGE_LOADED_DATES(newLoadedDates)
    },
    sideCheckTodo (key) {
      this.todoData[`${this.literalTodayDate.join(',')}`][key].completed = !this.todoData[`${this.literalTodayDate.join(',')}`][key].completed
    },
    checkFetched (day) {
      return day[0] === this.fetchedDate.getFullYear() && day[1] === (this.fetchedDate.getMonth() + 1) && day[2] === this.fetchedDate.getDate()
    }
  },
  created () {
    this.CHANGE_SIDE_FETCHED_DATE(new Date())
    const newLoadedDates = utils().figureDatesByCalendarType[this.sideCalendarType](this.fetchedDate)
    this.CHANGE_SIDE_LOADED_DATES(newLoadedDates)
  }
}
</script>

<style scoped>
    .boxSideBar {
      background: rgba(255, 255, 255, 1);
      box-shadow: rgba(0, 0, 0, 0.35) 0px 0px 30px inset;
      display: block;
      min-height: 95vh;
      height: auto;
      overflow: hidden;
    }
    .others {
      padding-top: 4vh;
      transition: .3s .0s;
      transform: translateX(0%);
      opacity: 1;
    }
    .others.active {
      transition: .2s;
      transform: translateX(-400px);
      opacity: 0;
    }

    .others .toolBox {
    width: 280px;
    height: 240px;
    height: auto;
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.35);
    margin: auto;
    margin-bottom: 30px;
    padding: 20px 0;
    }
    .toolBoxContent .block .dateSpan {
      display: inline-block;
      border-radius: 100%;
    }
    .toolBoxContent .block:hover .dateSpan {
      color: rgba(0, 0, 0, 0.9)
    }
    .toolBoxContent .block .dateSpan.activeFetched {
      color: rgba(0, 0, 0, 0.9)
    }
    .others .toolBox .toolBoxTitle {
      margin: 0 20px 20px 20px;
      display: flex;
      justify-content: space-between;
    }
    .others .toolBox .toolBoxContent {
      margin: 0 20px;
    }
    .others .toolBox .toolBoxTitle h2 {
      margin: 0;
      font-size: 0.9rem;
    }
      .others .toolBox .toolBoxTitle .arrows {
    width: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .others .toolBox .toolBoxTitle .arrowPrev,
  .others .toolBox .toolBoxTitle .arrowNext {
    width: 22px;
    height: 22px;
    border-radius: 100%;
    text-align: center;
    font-size: 0.75rem;
    cursor: pointer;
    background: rgba(139, 192, 235, 0.15);

  }
  .others .toolBox .toolBoxTitle .arrowPrev:hover,
  .others .toolBox .toolBoxTitle .arrowNext:hover {
    background: #f5f4f4;
    background: rgba(139, 192, 235, 1);

  }
  .others .toolBox .toolBoxTitle .arrows span i {
    margin-top: 5px;
    font-weight: bolder;
  }

    .others .createBtn {
        cursor: pointer;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-radius: 5px;
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
        width: 130px;
        font-size: 0.8rem;
        margin: auto;
        padding: 12px 30px;
        transition: .2s;
        background: rgba(255, 255, 255, 1);
        border: 1.5px solid rgba(139, 192, 235, 1);
    }
    .others .createBtn p {
        font-size: 0.8rem;
    }
    .others .createBtn:hover {
        background: rgba(139, 192, 235, 1);
    }
    .others .createBtn:hover p {
        color: rgba(255, 255, 255, 1);
    }
    .others .createBtn:hover .fa-plus {
        color: rgba(255, 255, 255, 1);
    }
    .others .createBtn .fa-plus {
        font-size: 1.5rem;
        font-weight: 100;
        color: rgba(139, 192, 235, 1);
    }
    .others .createBtn p {
        padding: 0 20px;
        margin: 0;
        color: rgba(139, 192, 235, 1);
    }
    .todayList {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .todayList .todoItem {
      font-size: 0.8rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      cursor: pointer;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }
    .todayList .todoItem p {
      word-break: break-all;
      width: 90%;
    }
    .todayList .todoItem.checked p {
      color: rgba(0, 0, 0, 0.45);
    }
    .todayList .todoItem.checked:before {
      background: rgba(0, 0, 0, 0.35);
    }
    .todayList .todoItem span.square {
      display: inline-block;
      width: 10px;
      height: 10px;
      border: 1px solid rgba(0, 0, 0, 0.5);
    }
    .todayList .todoItem.checked span.square {
      display: none;
    }
    .todayList .todoItem span i {
      color: rgba(0, 0, 0, 0.5);
      display: none;
    }
    .todayList .todoItem.checked span i {
      display: inline-block;
    }
    .moreSpan {
      display: inline-block;
      width: 100%;
      text-align: right;
      font-size: 0.85rem;
      cursor: pointer;
      text-decoration-line: underline;
    }
</style>
