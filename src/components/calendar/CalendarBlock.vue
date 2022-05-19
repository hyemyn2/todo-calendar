<template>
  <div class="box">
    <div class="block">
        <slot name="dayNumber"></slot>
        <slot name="dayBox"></slot>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
  .box {
    height: 100%;
    pointer-events: none;
  }
  .block {
    height: 100%;
    overflow: hidden;
  }
</style>
