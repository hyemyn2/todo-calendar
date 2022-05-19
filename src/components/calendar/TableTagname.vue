<template>
  <div class="daynameList">
    <template v-if="isTypeWeeklyMonthly">
        <div class="dayname sun">
            <h1>sun</h1>
        </div>
        <div class="dayname mon">
            <h1>mon</h1>
        </div>
        <div class="dayname tue">
            <h1>tue</h1>
        </div>
        <div class="dayname wed">
            <h1>wed</h1>
        </div>
        <div class="dayname thu">
            <h1>thu</h1>
        </div>
        <div class="dayname fri">
            <h1>fri</h1>
        </div>
        <div class="dayname sat">
            <h1>sat</h1>
        </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { TypeMixin } from '../../mixins/TypeMixin'
export default {
  mixins: [
    TypeMixin
  ],
  computed: {
    ...mapState([
      'selectedCalendarType'
    ])
  }
}
</script>

<style scoped>
    .daynameList {
        width: auto;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    }
    .dayname {
        flex-grow: 1;
    }
    .dayname:nth-of-type(1) {
        border-left: none;
    }
    .dayname h1 {
        font-size: 0.7rem;
        font-weight: bolder;
        text-align: center;
        text-transform: capitalize;
        color: rgba(0, 0, 0, 0.5);
        margin: 10px 0 0 0;
    }
</style>
