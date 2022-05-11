<template>
  <div class="calendarList" @click="fetchClickedDay" @dblclick="showModalTodo" v-bind:class="[selectedCalendarType === 'Daily'? 'activeDaily':'', selectedCalendarType === 'Weekly'? 'activeWeekly':'', selectedCalendarType === 'Monthly'? 'activeMonthly':'']">
    <div class="calendarBlock" 
      v-for="(day, index) in this.loadedDates" 
      v-bind:id="day" 
      v-bind:key="index"
      v-bind:class="{activeFetched: (day[0] === fetchedDateString[0] && day[1] === fetchedDateString[1] && day[2] === fetchedDateString[2]) && (selectedCalendarType === 'Weekly' || selectedCalendarType === 'Monthly')}">
        <calendar-block class="componentBlock" id="show-modal" v-if="selectedCalendarType === 'Daily' || selectedCalendarType === 'Weekly' || selectedCalendarType === 'Monthly'">
          <template v-if="day[2] === 1 && (selectedCalendarType === 'Weekly' || selectedCalendarType === 'Monthly')">
            <h2 slot="dayNumber">{{ literalMonths[Number(day[1]-1)].slice(0,3) }} {{ day[2] }}</h2>
          </template>
          <template v-else>
            <h2 slot="dayNumber">{{ day[2] }}</h2>
          </template>
          <section slot="dayBox" v-if="selectedCalendarType === 'Monthly'">
            <template v-if="figureTodoLength(day)<=3">
              <ul>
                <li class="todoListText" v-for="(item, key) in renderTodo(day)" v-bind:key="key" v-bind:class="{checked:item.completed}">
                  <p>{{ item.text }}</p>
                </li>
              </ul>
            </template>
            <template v-if="figureTodoLength(day)>3">
              <ul>
                <li class="todoListText" v-for="(item, key) in renderTodo(day).slice(0,3)" v-bind:key="key" v-bind:class="{checked:item.completed}">
                  <p>{{ item.text }}</p>
                </li>
              </ul>
              <span class="moreSpan">+{{figureTodoLength(day)-3}} more</span>
            </template>
          </section>
          <section slot="dayBox" v-else-if="selectedCalendarType === 'Weekly' || selectedCalendarType === 'Daily'">
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
    ...mapState(['fetchedDate', 'loadedDates', 'isFetched', 'selectedCalendarType', 'literalMonths']),
    ...mapGetters(['setYear', 'setMonth', 'setDay', 'todoData', 'fetchedDateString']),
  },
  methods: {
    fetchClickedDay (event) {
      const dateString = event.target.id.split(',')
      const dateConstructor = new Date(dateString[0], dateString[1]-1, dateString[2])
      this.$store.commit('changeFetchedDate', dateConstructor)
    },
    showModalTodo (event) {
      this.$store.commit('setModalData', event)
    },
    renderTodo (day) {
      const renderDate = day.join(',')
      const renderDateArr = this.$store.state.todoData[`${renderDate}`]
      if ( renderDateArr !== undefined ) { return renderDateArr }
    },
    figureTodoLength (day) {
      const arr = this.renderTodo(day)
      if (arr !== undefined) {
        return arr.length
      }
    }
  },
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
    max-width: 100%;
    overflow: auto;
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
    overflow-x: auto;
    max-width: 100%;
    overflow: hidden;
  }
  section ul li p {
    max-width: 100%;

    overflow-x: auto;
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
    /* ------------------------------------ activeYearly ------------------------------------ */
    /* .calendarList.activeYearly {} */
    /* ------------------------------------ activeMonthly ------------------------------------ */
    /* .calendarList.activeMonthly {} */
    /* ------------------------------------ activeWeekly ------------------------------------ */
    /* .calendarList.activeWeekly {} */
  .calendarList.activeWeekly .calendarBlock{
    min-height: 77vh;
    height: auto;
  }
    /* ------------------------------------ activeDaily ------------------------------------ */
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
    padding-left: 10px;
    color: rgba(0, 0, 0, 0.85);
    margin: 20px 0 20px 10px ;
    text-align: left;
  }
  .calendarList.activeDaily .calendarBlock .todoListText p {
  }

  .activeFetched {
    /* background: rgb(0, 0, 0, 0.1); */
    box-shadow: 0px 0px 8px rgb(0, 0, 0, 0.1) inset;
  }

  .activeFetched h2 {
  }

</style>


