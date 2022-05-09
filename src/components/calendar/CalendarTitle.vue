<template>
  <div class="calendarHeader">
      <div class="tools" v-if="selectedCalendarType === 'Daily' || selectedCalendarType === 'Weekly' || selectedCalendarType === 'Monthly' || selectedCalendarType === 'Yearly'">
        <template v-if="selectedCalendarType === 'Yearly'">
          <p class="headerDate">{{ this.setYear }}</p>
        </template>
        <template v-else>
          <div class="headerDate">
            <p>{{ this.$store.state.literalMonths[this.setMonth-1] }}</p>
            <p>{{ this.setYear }}</p>
          </div>
        </template>
        <div class="arrows">
            <span class="arrowPrev" v-on:click="this.showPrevPage">
              <i class="fa-solid fa-angle-left"></i>
            </span>
            <span class="arrowNext" v-on:click="this.showNextPage">
              <i class="fa-solid fa-angle-right"></i>
            </span>
        </div>
        <button v-on:click="fetchToday">Today</button>
      </div>
      <div class="selectBox">
        <div class="selectedValue" v-on:click="this.showTypes">
          <p>{{ this.$store.state.selectedCalendarType }}</p>
          <span class="triangle"></span>
        </div>
        <ul v-bind:class="{active:this.$store.state.allToggles.toggleCalendarType.booleanValue}" v-on:click="this.selectType">
          <li data-num="0">Daily</li>
          <li data-num="1">Weekly</li>
          <li data-num="2">Monthly</li>
          <li data-num="3">Yearly</li>
        </ul>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['selectedCalendarType']),
    ...mapGetters(['setYear', 'setMonth', 'setDate', 'setDay', 'getPrevMonth', 'getNextMonth', 'getPrevWeek', 'getNextWeek', 'getPrevDate', 'getNextDate', 'todoyDateDay']),
  },
  methods: {
    fetchToday () {
      // const fetchedToday = new Date()
      // this.$store.state.todayDate = fetchedToday
      this.$store.commit('changeFetchedDate', this.$store.state.todayDate)
    },
    showPrevPage () {
      let yearData
      let monthData
      let dateData
      if (this.$store.state.selectedCalendarType === 'Monthly') {
        yearData = this.$store.state.fetchedDate.getFullYear()
        monthData = this.$store.state.fetchedDate.getMonth()-1
        dateData = this.$store.state.fetchedDate.getDate()
      } else if (this.$store.state.selectedCalendarType === 'Weekly') {
        yearData = this.$store.state.fetchedDate.getFullYear()
        monthData = this.$store.state.fetchedDate.getMonth()
        dateData = this.$store.state.fetchedDate.getDate()-7
      } else if (this.$store.state.selectedCalendarType === 'Daily') {
        yearData = this.$store.state.fetchedDate.getFullYear()
        monthData = this.$store.state.fetchedDate.getMonth()
        dateData = this.$store.state.fetchedDate.getDate()-1
      } else if (this.$store.state.selectedCalendarType === 'Yearly') {
        yearData = this.$store.state.fetchedDate.getFullYear()-1
        monthData = this.$store.state.fetchedDate.getMonth()
        dateData = this.$store.state.fetchedDate.getDate()
      }
      const fetchPrev = new Date (yearData, monthData, dateData)
      this.$store.commit('changeFetchedDate', fetchPrev)
    },
    showNextPage () {
      let yearData
      let monthData
      let dateData
      if (this.$store.state.selectedCalendarType === 'Monthly') {
        yearData = this.$store.state.fetchedDate.getFullYear()
        monthData = this.$store.state.fetchedDate.getMonth()+1
        dateData = this.$store.state.fetchedDate.getDate()
      } else if (this.$store.state.selectedCalendarType === 'Weekly') {
        yearData = this.$store.state.fetchedDate.getFullYear()
        monthData = this.$store.state.fetchedDate.getMonth()
        dateData = this.$store.state.fetchedDate.getDate()+7
      } else if (this.$store.state.selectedCalendarType === 'Daily') {
        yearData = this.$store.state.fetchedDate.getFullYear()
        monthData = this.$store.state.fetchedDate.getMonth()
        dateData = this.$store.state.fetchedDate.getDate()+1
      } else if (this.$store.state.selectedCalendarType === 'Yearly') {
        yearData = this.$store.state.fetchedDate.getFullYear()+1
        monthData = this.$store.state.fetchedDate.getMonth()
        dateData = this.$store.state.fetchedDate.getDate()
      }
      const fetchNext = new Date (yearData, monthData, dateData)
      this.$store.commit('changeFetchedDate', fetchNext)

    },
    toggleBurger () {
      this.$store.state.booleanBurger = !this.$store.state.booleanBurger
    },
    selectType (event) {
      this.$store.commit('selectCalendarType', event.target.dataset.num)
      if (this.selectedCalendarType === 'Daily' || this.selectedCalendarType === 'Weekly' || this.selectedCalendarType === 'Monthly' || this.selectedCalendarType === 'Yearly') {
        this.$store.commit('changeFetchedDate', this.$store.state.fetchedDate)
      }
    },
    showTypes () {
      this.$store.commit('showCalendarTypes')
    }
  },
  // created () {
  //   this.fetchToday()
  // },
}
</script>

<style scoped>
  .calendarHeader {
    background: rgba(255, 255, 255, 1);
    /* background: rgba(218, 220, 224, 1); */

    /* width: 100%; */
    padding: 12px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);

    /* border: none; */
    /* border-bottom: 1px solid rgba(0, 0, 0, 0.15); */
  }

  .calendarHeader .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 30px;
    width: 190px;
    font-size: 1.2rem;
  }
  .calendarHeader .title .burger {
    display: inline-block;
    margin: 0 10px 0 20px;
    cursor: pointer;
  }
  .calendarHeader .title .burger span {
    display: block;
    width: 17px;
    height: 2px;
    background: rgba(0, 0, 0, 0.8);
  }
  .calendarHeader .title .burger span:nth-of-type(1) {
    transform: translateY(-3px);
  }
  .calendarHeader .title .burger span:nth-of-type(3) {
    transform: translateY(3px);
  }
  /* .calendarHeader .title .headerCalendar {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-left: 7px solid rgba(0, 0, 0, 0.7);
    border-right: 7px solid rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    margin: 0 5px 0 0;
    font-size: 0.7rem;
    font-weight: 900;
    color: rgba(0, 0, 0, 1);
  } */
  .calendarHeader .title p {
    margin: 0 40px 0 0;
  }
  .calendarHeader .tools {
    flex: 1;
    display: flex;
    justify-content: left;
    align-items: center;
  }
  .calendarHeader .tools .headerDate{
    width: 160px;
    font-weight: bolder;
    font-size: 1.2rem;
    margin: 0 10px;
    display: flex;
    justify-content: space-between;
  }

  .calendarHeader .tools button {
    padding: 7px 25px;
    font-weight: bolder;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    background: rgba(255, 255, 255, 1);
    cursor: pointer;
    transition: .2s;
    margin: 0 15px;
  }
  .calendarHeader .tools button:hover {
    /* background: #f5f4f4; */
      background: rgba(139, 192, 235, 0.15);

  }
  .calendarHeader .selectBox {
    font-size: 0.8rem;
    /* margin: 0 50px; */
    position: relative;
    font-weight: bolder;
  }
  .calendarHeader .selectBox .selectedValue {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 7px 0;
    width: 90px;
    border: 1px solid rgba(218, 220, 224, 1);
    border-radius: 4px;
    background: rgba(255, 255, 255, 1);
    transition: .2s;
    cursor: pointer;
  }
  .calendarHeader .selectBox .selectedValue:hover {
    /* background: #f5f4f4; */
  }
  .calendarHeader .selectBox .selectedValue p {
    margin: 0;
    margin-left: 11px;
    pointer-events: none;
  }
  .calendarHeader .selectBox .triangle {
    display: inline-block;
    width: 0px;
    height: 0px;
    border: 4px solid transparent;
    border-top: 4px solid rgba(0, 0, 0, 0.45);
    margin-top: 8px;
    margin-right: 7px;
    pointer-events: none;
  }
  .calendarHeader .selectBox ul {
    background: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, .33);
    position: absolute;
    right: 0;
    bottom: -135px;
    z-index: 150;
    list-style: none;
    padding: 0;
    margin: 0;
    display: none;
    width: 120px;
  }
  .calendarHeader .selectBox ul.active {
    display: inline-block;
  }
  
  .calendarHeader .selectBox ul li {
    padding: 8px 15px;
  }
  .calendarHeader .selectBox ul li:hover {
    /* background: rgba(233, 233, 233, 1); */
    background: rgba(139, 192, 235, 0.7);

  }
  .calendarHeader .arrows {
    width: 65px;
    margin: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .calendarHeader .arrowPrev,
  .calendarHeader .arrowNext {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    /* padding-top: 3px; */
    text-align: center;
    font-size: 0.85rem;
    cursor: pointer;
    background: rgba(139, 192, 235, 0.25);

  }
  .calendarHeader .arrowPrev:hover,
  .calendarHeader .arrowNext:hover {
    background: #f5f4f4;
      background: rgba(139, 192, 235, 1);

  }
  .calendarHeader .arrows span i {
    margin-top: 9px;
  }
</style>