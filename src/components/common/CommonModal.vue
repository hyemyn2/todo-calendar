<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header"></slot>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
          <!-- <div class="modal-footer">
            <slot name="footer"></slot>
          </div> -->
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 400px;
  height: 570px;
  /* min-height: 500px;
  height: auto; */
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  background: rgba(139, 192, 235, 0.35);

  text-align: right;
  padding: 7px 10px;
}

.modal-header span {
  border-radius: 100%;
  display: inline-block;
  padding: 3px 8px;
}
.modal-header span:hover {
  background: rgba(0, 0, 0, .1);
}
.fa-xmark {
  margin-top: 2px;
}
.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
  flex: 1;
  padding: 10px 40px;
}

.modal-default-button {
  float: right;
  margin: 10px 15px;
  background: rgb(6, 126, 238);
  
  color: white;
  padding: 7px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}
.modal-default-button:hover {
  background: rgb(26, 139, 245);
}
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.fa-xmark {
  color: rgba(0,0,0,0.65);
  font-size: 1.05rem;
}
</style>