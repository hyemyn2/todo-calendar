<template>
  <div class="calendarHeader">
      <div class="tools">
        <template
          v-if="isTypeYearly"
        >
          <p class="headerDate">
            {{ setMainYear }}
          </p>
        </template>
        <template v-else>
          <div class="headerDate">
            <p>
              {{ setLiteralMonths }}
            </p>
            <p>
              {{ setMainYear }}
            </p>
          </div>
        </template>
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
        <button
          @click="showToday"
        >
          today
        </button>
      </div>
      <div class="selectBox">
        <div
          class="selectedValue"
          @click="showTypes"
        >
          <p>
            {{ selectedCalendarType }}
          </p>
          <span class="triangle"></span>
        </div>
        <ul
          :class="{active:allToggles.toggleCalendarType.booleanValue}"
          @click="selectType"
        >
          <li data-num="0">
            daily
          </li>
          <li data-num="1">
            weekly
          </li>
          <li data-num="2">
            monthly
          </li>
          <li data-num="3">
            yearly
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { TypeMixin } from '@/mixins/TypeMixin'
import { utils } from '@/utils/index'
export default {
  mixins: [
    TypeMixin
  ],
  computed: {
    ...mapState([
      'selectedCalendarType',
      'literalMonths',
      'allToggles',
      'fetchedDate'
    ]),
    ...mapGetters([
      'setMainYear',
      'setMainMonth',
      'fetchedDateYear',
      'fetchedDateMonth',
      'fetchedDateDate'
    ]),
    setLiteralMonths () {
      return this.literalMonths[this.setMainMonth - 1]
    }
  },
  methods: {
    ...mapMutations([
      'CHANGE_FETCHED_DATE',
      'CHANGE_LOADED_DATES',
      'FETCH_CALENDAR_TYPE',
      'SHOW_CALENDAR_TYPES'
    ]),
    selectType (event) {
      const clickedCalendarType = event.target.dataset.num
      this.FETCH_CALENDAR_TYPE(clickedCalendarType)
      const newLoadedDates = utils().figureDatesByCalendarType[this.selectedCalendarType](this.fetchedDate)
      this.CHANGE_LOADED_DATES(newLoadedDates)
    },
    showTypes () {
      this.SHOW_CALENDAR_TYPES()
    },
    showToday () {
      const newFetchedDate = new Date()
      this.CHANGE_FETCHED_DATE(newFetchedDate)
      const newLoadedDates = utils().figureDatesByCalendarType[this.selectedCalendarType](newFetchedDate)
      this.CHANGE_LOADED_DATES(newLoadedDates)
    },
    figureNewDateByPrevNext (btnType) {
      if (this.selectedCalendarType === 'monthly') {
        return new Date(this.fetchedDateYear, this.fetchedDateMonth + (btnType === 'prev' ? -1 : +1), this.fetchedDateDate)
      } else if (this.selectedCalendarType === 'weekly') {
        return new Date(this.fetchedDateYear, this.fetchedDateMonth, this.fetchedDateDate + (btnType === 'prev' ? -7 : +7))
      } else if (this.selectedCalendarType === 'daily') {
        return new Date(this.fetchedDateYear, this.fetchedDateMonth, this.fetchedDateDate + (btnType === 'prev' ? -1 : +1))
      } else if (this.selectedCalendarType === 'yearly') {
        return new Date(this.fetchedDateYear + (btnType === 'prev' ? -1 : +1), this.fetchedDateMonth, this.fetchedDateDate)
      }
    },
    showPage (btnType) {
      const newFetchedDate = this.figureNewDateByPrevNext(btnType)
      this.CHANGE_FETCHED_DATE(newFetchedDate)
      const newLoadedDates = utils().figureDatesByCalendarType[this.selectedCalendarType](newFetchedDate)
      this.CHANGE_LOADED_DATES(newLoadedDates)
    }
  }
}
</script>

<style scoped>
  .calendarHeader {
    background: rgba(255, 255, 255, 1);
    padding: 12px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
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
    text-transform: capitalize;
  }
  .calendarHeader .tools button:hover {
      background: rgba(139, 192, 235, 0.15);
  }
  .calendarHeader .selectBox {
    font-size: 0.8rem;
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
  .calendarHeader .selectBox .selectedValue p {
    margin: 0;
    margin-left: 11px;
    pointer-events: none;
    text-transform: capitalize;
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
    text-transform: capitalize;
  }
  .calendarHeader .selectBox ul li:hover {
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
