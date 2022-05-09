<template>
  <div class="box">
    <section class="smallCalendar">
      <div class="dayName">
          <div class="day sun">
              <h1>sun</h1>
          </div>
          <div class="day mon">
              <h1>mon</h1>
          </div>
          <div class="day tue">
              <h1>tue</h1>
          </div>
          <div class="day wed">
              <h1>wed</h1>
          </div>
          <div class="day thu">
              <h1>thu</h1>
          </div>
          <div class="day fri">
              <h1>fri</h1>
          </div>
          <div class="day sat">
              <h1>sat</h1>
          </div>
      </div>
      <!-- <ul class="dayNumber">
        <li class="block"
          v-for="(day, index) in this.$store.state.sideLoadedDates" 
          v-bind:id="day" 
          v-bind:key="index"
          v-on:click="fetchMonthlyCalendar(day)">
          <calendar-block id="show-modal">
            <template v-if="day[0] === literalTodayDate[0] && day[1] === literalTodayDate[1] && day[2] === literalTodayDate[2]">
              <span slot="dayNumber" class="activeToday">{{ day[2] }}</span>
            </template>
            <template v-else>
              <span slot="dayNumber">{{ day[2] }}</span>
            </template>
          </calendar-block>
        </li>
      </ul> -->
      <ul class="dayNumber">
        <slot name="slotDayNumber"></slot>
      </ul>
    </section>
  </div>
</template>

<script>
// import CalendarBlock from './CalendarBlock.vue'
import { mapState, mapGetters } from 'vuex'
export default {
    components: {
        // CalendarBlock,
    },
    computed: {
        ...mapState(['fetchedDate', 'loadedDates', 'isFetched', 'selectedCalendarType', 'literalTodayDate']),
        ...mapGetters(['setYear', 'setMonth', 'setDay', 'todoData']),
    },

}
</script>

<style scoped>
/* .box {
  padding: 30px 0;
}
  .dayNumber {
    width: 280px;
    height: 300px;
    border: 1px solid rgba(233, 233, 233, 1);
    margin: auto;
  } */
  .smallCalendar {
    width: 100%;
  }
  .dayNumber {
      display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    list-style: none;
    /* margin: 15px 20px; */
    padding: 0;
    margin: 0;
  }
  .dayNumber li {
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
    font-size: 0.8rem;
    /* font-weight: bolder; */
    padding: 8px 0px;
    cursor: pointer;
      position: relative;

  }
    .others .toolBox .toolBoxContent span {

    }


    .others .toolBox .toolBoxContent li span.activeToday{
      /* color: white; */
      /* color: rgb(56, 152, 230,); */
      /* color: rgba(139, 192, 235, 1); */
      /* color: white; */
      font-weight: bolder;
    }

    .others .toolBox .toolBoxContent li span::before{
      display: inline-block;
      content: '';
      width: 23px;
      height: 23px;
      border-radius: 100%;
      /* background: rgba(139, 192, 235, 0.5); */
      position: absolute;
      left: 6px;
      top: 6px;
      z-index: -100;
    }

    /* .others .toolBox .toolBoxContent li span.activeToday::before{
      background: rgba(139, 192, 235, 0.85);
    } */

    .others .toolBox .toolBoxContent li:hover span::before{
      background: rgba(139, 192, 235, 0.3);
    }


    .others .toolBox .toolBoxContent li span.activeToday::before {
      background: rgba(139, 192, 235, 0.45);
      /* border: 2px solid rgba(139, 192, 235, 0.8); */
      color: white;
    }
  .dayName {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    }
  .day {
    display: inline-block;
    flex-grow: 1;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
    font-size: 0.2rem;
    text-transform: uppercase;
  }
  .day h1 {
    margin: 0 0 10px 0;
  }
</style>


