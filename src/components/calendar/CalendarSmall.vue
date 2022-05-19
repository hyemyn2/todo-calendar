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
      <ul class="dayNumber">
        <slot name="slotDayNumber"></slot>
      </ul>
    </section>
  </div>
</template>

<script>
</script>

<style scoped>
  .smallCalendar {
    width: 100%;
  }
  .dayNumber {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .dayNumber li {
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
    font-size: 0.8rem;
    padding: 8px 0px;
    cursor: pointer;
    position: relative;
  }
  .others .toolBox .toolBoxContent li span.activeToday{
    font-weight: bolder;
  }
    .others .toolBox .toolBoxContent li span::before{
      display: inline-block;
      content: '';
      width: 23px;
      height: 23px;
      border-radius: 100%;
      position: absolute;
      left: 6px;
      top: 6px;
      z-index: -100;
    }
    .others .toolBox .toolBoxContent li:hover span::before{
      background: rgba(139, 192, 235, 0.3);
    }
    .others .toolBox .toolBoxContent li span.activeToday::before {
      background: rgba(139, 192, 235, 0.45);
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
