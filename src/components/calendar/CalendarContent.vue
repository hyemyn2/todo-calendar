<template>
  <div class="boxCalendar">
      <header-section></header-section>
      <table-tagname></table-tagname>
      <template v-if="selectedCalendarType === 'Daily' || selectedCalendarType === 'Weekly' || selectedCalendarType === 'Monthly'">
        <calendar-list></calendar-list>
      </template>
      <template v-else-if="selectedCalendarType === 'Yearly'">
        <calendar-yearly></calendar-yearly>
      </template>
      <!-- modal -->
      <div>
      <common-modal v-if="this.$store.state.showModal" @close="showModal = false">
        <div slot="header">
          <!-- <p>{{ this.$store.state.modalDate }}</p> -->
          <span class="offBtn" @click="this.offModalTodo">
            <i class="fa-solid fa-xmark"></i>
          </span>
        </div>
          <!-- todo input -->
        <div class="modalBody" slot="body">
            <div class="inputDiv">
              <input class="inputTodo" type="text" maxlength="35" placeholder="일정 추가" v-model="newTodoItem" v-on:keyup.enter="addTodo">
              <span class="btnAdd" v-on:click="addTodo">
                  <i class="fa-solid fa-plus"></i>
              </span>
            </div>
            <!-- todo list -->
          <template v-if="this.$store.state.modalTodo.length !== 0">
            <ul class="todoList" v-for="(todoPage, pageKey) in this.$store.state.modalTodoDivided" v-bind:key="pageKey" v-bind:class="{activePage: pageKey === modalShownPage}">
              <li class="todoItem" v-for="(todoItem, key) in todoPage" v-bind:key="key">
                  <span v-on:click="checkTodo(todoItem, key, pageKey)"><i class="fa-solid fa-check" v-bind:class="{checked:todoItem.completed}"></i></span>
                  <p class="todoText">{{ todoItem.text }}</p>
                  <span v-on:click="deleteTodo(todoItem, key, pageKey)"><i class="fa-solid fa-trash-can"></i></span>
              </li>
            </ul>
            <div class="pageBtn">
              <span v-for="(todoPage, key) in this.$store.state.modalTodoDivided" v-bind:key="key" v-on:click="showModalPage(key)" v-bind:class="{activePage: key === modalShownPage}">{{ key+1 }}</span>
            </div>
              <!-- <ul class="todoList">
                <li class="todoItem" v-for="(todoItem, key) in this.$store.state.modalTodo" v-bind:key="key">
                  <span v-on:click="checkTodo(todoItem, key)"><i class="fa-solid fa-check" v-bind:class="{checked:todoItem.completed}"></i></span>
                  <p class="todoText">{{ todoItem.text }}</p>
                  <span v-on:click="deleteTodo(todoItem, key)"><i class="fa-solid fa-trash-can"></i></span>
                </li>
              </ul> -->
          </template>
          <template v-else-if="this.$store.state.modalTodo.length === 0">
            <div class="alertNone">
              <p class="alertNoneText">등록된 일정이 없습니다.</p>
            </div>
          </template>
        </div>
      </common-modal>
    </div>
  </div>
</template>

<script>
import TableTagname from './TableTagname.vue'
import CalendarList from './CalendarList.vue'
import CommonModal from '../common/CommonModal.vue'
import { mapState, mapGetters } from 'vuex'
import HeaderSection from './CalendarTitle.vue'
import CalendarYearly from './CalendarYearly.vue'

export default {
  components: {
    TableTagname,
    CalendarList,
    CommonModal,
    CalendarYearly,
    HeaderSection
  },
  computed: {
    ...mapState(['fetchedDate', 'loadedDates', 'isFetched', 'selectedCalendarType']),
    ...mapGetters(['setYear', 'setMonth', 'setDay', 'todoData']),
  },
  data () {
    return {
        newTodoItem: '',
        modalShownPage: 0
    }
  },
  methods: {
    offModalTodo () {
      this.$store.state.showModal = false
      this.$store.state.modalTodo = []
      this.modalShownPage = 0
    },
    addTodo () {
      if ( this.newTodoItem !== '') {
        this.$store.commit('addNewTodo', this.newTodoItem)
          this.newTodoItem = ''
      }
    },
    checkTodo (todoItem, key, pageKey) {
      this.$store.commit('checkTodoItem', {todoItem, key, pageKey})
    },
    deleteTodo (todoItem, key, pageKey) {
      this.$store.commit('deleteTodoItem', {todoItem, key, pageKey})
    },
    showModalPage (key) {
      this.modalShownPage = key
    }
    // renderEightTodo () {
    //   console.log(this.$store.state.modalTodo)
    // }
  },
}
</script>

<style scoped>
  .boxCalendar {
      width: 86%;
      border: 1px solid rgba(0, 0, 0, 0.15);
      box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.35);
  }
    /* modal */
.modalBody {
      display: flex;
      height: 100%;
      flex-direction: column;
    justify-content: space-between;
    /* align-items: center; */
}
.modalBody .inputDiv {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.modalBody .inputDiv .btnAdd {
    background: rgba(0, 0, 0, 0.85);
    display: inline-block;
    padding: 7px;
    color: white;
    cursor: pointer;
}
.modalBody .inputDiv .btnAdd:hover {
    background: rgba(6, 126, 238, 1);
}
    .inputTodo {
      border: none;
      outline: none;
      padding: 0;
      width: 100%;
      font-size: 1rem;
      padding: 5px 0;
      color: rgba(0,0,0,0.65);
      border: 1px solid rgba(0, 0, 0, 0.1);
      padding: 6px 10px;
    }
    .todoList {
      flex: 1;
      margin: 15px 0 0 0;
      padding: 0;
      list-style: none;
    }
    .todoList li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    .todoList li:hover {
      background: rgba(198, 233, 253, 0.3)
    }
    .todoList li:hover span i{
      opacity: 1;
    }

    .todoList li span {
      padding: 5px;
      display: inline-block;
    }
    .todoList li span i {
      cursor: pointer;
    }
    .todoList li span .fa-check {
      opacity: 0.4;
    }
    .todoList li span .fa-trash-can {
      opacity: 0;
      color: rgba(0, 0, 0, 0.75);
    }
    .todoList li span .fa-check {
      color: rgba(0, 0, 0, 0.3);
    }
    /* .todoList li span .fa-check:hover, */
    .todoList li span .fa-check.checked {
      color: rgba(0, 0, 0, 0.85)

    }
    .todoList li span .fa-check.checked {
      opacity: 1;
    }
    .todoList li .todoText {
      width: 100%;
      flex: 1;
      padding: 0 0 0 5px;
      margin: 0;
      font-size: 00.85rem;
      word-break: break-all;
    }
    .alertNone{
      width: 100%;
      height: 100%;
      padding: 0;
      margin: 25px 0 0 0;
    }
    .alertNone .alertNoneText {
      width: 100%;
      text-align: center;
      color: rgba(0, 0, 0, 0.5);
      font-size: 0.8rem;
      margin-top: 180px;
    }

    .offBtn {
      cursor: pointer;
      padding: 3px;
    }

    .todoList {
      display: none;
    }
    .todoList.activePage {
      display: block;
    }

    .pageBtn {
      text-align: center;
      margin-top: 10px;
    }
    .pageBtn span {
      display: inline-block;
      padding: 8px;
      opacity: 1;
      font-size: 0.85rem;
      cursor: pointer;
      color: rgba(0, 0, 0, 0.65);
    }
    .pageBtn span:hover {
    }
    .pageBtn span.activePage {
      text-decoration-line: underline;
    }
    .pageBtn span.activePage:hover {
    }
</style>