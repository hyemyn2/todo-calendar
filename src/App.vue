<template>
  <div id="app" v-on:click="this.togglesOff">
    <header-section class="headerSection"></header-section>
    <side-section class="sideSection" v-bind:class="{active:this.$store.state.booleanBurger}"></side-section>
    <main-section class="mainSection" v-bind:class="{active:this.$store.state.booleanBurger}"></main-section>
  </div>
</template>

<script>
import HeaderSection from './components/HeaderSection.vue'
import SideSection from './components/SideSection.vue'
import MainSection from './components/MainSection.vue'
export default {
  name: 'App',
  components: {
    HeaderSection,
    MainSection,
    SideSection,
  },
  methods: {
    fetchToday () {
      const fetchedToday = new Date()
      this.$store.state.todayDate = fetchedToday
      this.$store.state.literalTodayDate = [fetchedToday.getFullYear(), fetchedToday.getMonth()+1, fetchedToday.getDate()]
    },
    togglesOff (event) {
      if (event.target.className !== this.$store.state.allToggles.toggleCalendarType.excludeOffEvent) {
        this.$store.state.allToggles.toggleCalendarType.booleanValue = false
      }
    }
  },
  created () {
    this.fetchToday()
  },
}
</script>

<style>
  body {
    height: 100%;
    margin: 0;
}
  #app {
    position: relative;
    display: flex;
    flex-wrap: wrap;
  }
  .headerSection {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1000;
    background: rgba(255, 255, 255, 1);
    width: 100%;
  }
  .sideSection,
  .mainSection {
    transition: 0.5s;
    margin-top: 7vh;
  }
  .sideSection {
    width: 330px;
  }

  .mainSection {
    overflow: hidden;
    flex: 1;
  }
  .sideSection.active {
    width: 0%;
  }

  @media (max-width: 2600px) {
    .mainSection {
      width: 330px;
    }
    .mainSection.active {
      width: 330px;
    }
  }
  @media (max-width: 600px) {
    .mainSection {
      width: 330px;
    }
    .mainSection.active {
      width: 330px;
    }
  }

</style>
