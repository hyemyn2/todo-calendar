<template>
  <div class="box">
    <div class="title">
        <div class="burger" v-on:click="this.toggleBurger">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span class="headerCalendar">{{ this.todoyDateDay }}</span>
        <p class="hdTitle" v-on:click="this.doReload">Calendar</p>
    </div>
    <ul class="navi">
      <router-link :to="`/`" class="routerLink">
        <li>Calendar</li>
      </router-link>
      <router-link :to="`/todo`" class="routerLink">
        <li>Todo List</li>
      </router-link>
      <!-- <li>Todo List</li> -->
    </ul>
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
    checkRouter () {
      // console.log(this.$router.currentRoute.path)
    },
    fetchToday () {
      const fetchedToday = new Date()
      this.$store.state.todayDate = fetchedToday
      this.$store.commit('changeFetchedDate', fetchedToday)
    },
    toggleBurger () {
      this.$store.state.booleanBurger = !this.$store.state.booleanBurger
    },
    doReload () {
      location.pathname = '/'
    }
  },
created () {
    this.fetchToday()
  },
}
</script>

<style scoped>
.box {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 5vh;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 30px;
    width: 190px;
    font-size: 1.2rem;
  }
.title .burger {
    display: inline-block;
    margin: 0 10px 0 20px;
    cursor: pointer;
  }
.title .burger span {
    display: block;
    width: 17px;
    height: 2px;
    background: rgba(0, 0, 0, 0.8);
  }
.title .burger span:nth-of-type(1) {
    transform: translateY(-3px);
  }
.title .burger span:nth-of-type(3) {
    transform: translateY(3px);
  }
  .title .headerCalendar {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-left: 7px solid rgba(139, 192, 235, 0.7);
    border-top: 7px solid rgba(139, 192, 235, 0.7);
    border-right: 7px solid rgba(139, 192, 235, 0.2);
    border-bottom: 7px solid rgba(139, 192, 235, 0.4);
    border-radius: 3px;
    margin: 0 5px 0 8px;
    font-size: 0.7rem;
    font-weight: 900;
    color: rgba(0, 0, 0, 1);
    text-align: center;
  }
.title .hdTitle {
    margin: 0 20px 0 0px;
        display: inline-block;
    font-weight: bolder;
  }

  .navi {
    list-style: none;
    display: flex;
    margin: 0 30px;
    padding: 0;
  }
  .navi li {
    cursor: pointer;
    width: 90px;
    text-align: center;
    font-size: 0.85rem;
    padding: 5px 0px;
    margin: 0 5px;
    /* border: 2px solid rgba(0, 0, 0, 0.15); */
    /* border-radius: 15px; */
    /* box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 5px; */
  }
  /* .navi li:hover {
    background: rgba(139, 192, 235, 0.3);
  } */
  .navi li.active {
    background: rgba(139, 192, 235, 0.7);
    /* border: 1px solid rgba(139, 192, 235, 1); */
    /* box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 5px inset; */
  } 
  /* .router-link-active {
    color: red;
  } */
  .routerLink {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.65);
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 10px;
    font-weight: bolder;
    margin: 0 5px;
    /* color: rgba(139, 192, 235, 1); */


  }
    .routerLink:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 5px;
    /* background: rgba(139, 192, 235, 0.5); */
  }
  /* router active */
  .router-link-exact-active {
    /* color: blue; */
    /* background: rgba(139, 192, 235, 1); */
    color: white;
    box-shadow: rgba(0, 0, 0, 0.85) 0px 0px 18px inset;
    background: rgba(0, 0, 0, 0.65);


  }
  .router-link-exact-active:hover {
    background: rgba(0, 0, 0, 0.65);
    box-shadow: rgba(0, 0, 0, 0.85) 0px 0px 18px inset;
  }
</style>