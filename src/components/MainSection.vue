<template>
  <div class="box">
          <router-view class="contentBox"></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['selectedCalendarType']),

  },
}
</script>

<style scoped>
  .calendarContent {
    background: rgba(255, 255, 255, 1);
  }
  .contentBox {
      margin: 4vh auto;
  }
</style>