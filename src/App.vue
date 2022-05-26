<template>
  <div id="app" @click="togglesOff">
    <header-section
      class="headerSection"
    >
    </header-section>
    <side-section
      class="sideSection"
      :class="{active:booleanBurger}"
    >
    </side-section>
    <main-section
      class="mainSection"
      :class="{active:booleanBurger}"
    >
    </main-section>
  </div>
</template>

<script>
import HeaderSection from './components/view/HeaderSection.vue'
import SideSection from './components/view/SideSection.vue'
import MainSection from './components/view/MainSection.vue'
import { mapState, mapMutations } from 'vuex'
import { utils } from '@/utils/index'

export default {
  name: 'App',
  components: {
    HeaderSection,
    MainSection,
    SideSection
  },
  computed: {
    ...mapState([
      'allToggles',
      'literalTodayDate',
      'booleanBurger',
      'todayDate',
      'fetchedDate',
      'selectedCalendarType'
    ])
  },
  methods: {
    ...mapMutations([
      'CHANGE_FETCHED_DATE',
      'CHANGE_LOADED_DATES'
    ]),
    fetchToday () {
      const fetchedToday = new Date()
      this.$store.state.todayDate = fetchedToday
      this.$store.state.literalTodayDate = [fetchedToday.getFullYear(), fetchedToday.getMonth() + 1, fetchedToday.getDate()]
      this.CHANGE_FETCHED_DATE(this.$store.state.todayDate)
      this.CHANGE_LOADED_DATES(utils().figureDatesByCalendarType[this.selectedCalendarType](this.fetchedDate))
    },
    togglesOff (event) {
      if (event.target.className !== this.allToggles.toggleCalendarType.excludeOffEvent) {
        this.allToggles.toggleCalendarType.booleanValue = false
      }
    }
  },
  created () {
    this.fetchToday()
  }
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
