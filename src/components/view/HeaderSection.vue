<template>
  <div class="box">
    <div class="title">
        <div
          class="burger"
          @click="toggleBurger"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span class="headerCalendar">
          {{ setHeaderDate }}
        </span>
        <p
          class="hdTitle"
          @click="doReload"
        >
          Calendar
        </p>
    </div>
    <ul class="navi">
      <router-link
        :to="`/project/todo-calendar/`"
        class="routerLink"
      >
        <li>Calendar</li>
      </router-link>
      <router-link
        :to="`/project/todo-calendar/todo`"
        class="routerLink"
      >
        <li>
          Todo List
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState([
      'todoyDate',
      'booleanBurger'
    ]),
    ...mapGetters([
      'setHeaderDate'
    ])
  },
  methods: {
    ...mapMutations([
      'SET_STATE_TOGGLE_BURGER'
    ]),
    toggleBurger () {
      this.SET_STATE_TOGGLE_BURGER()
    },
    doReload () {
      location.pathname = '/project/todo-calendar/'
    }
  }
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
  }
  .navi li.active {
    background: rgba(139, 192, 235, 0.7);
  }
  .routerLink {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.65);
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 10px;
    font-weight: bolder;
    margin: 0 5px;

  }
    .routerLink:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 5px;
  }
  .router-link-exact-active {
    color: white;
    box-shadow: rgba(0, 0, 0, 0.85) 0px 0px 18px inset;
    background: rgba(0, 0, 0, 0.65);
  }
  .router-link-exact-active:hover {
    background: rgba(0, 0, 0, 0.65);
    box-shadow: rgba(0, 0, 0, 0.85) 0px 0px 18px inset;
  }
</style>
