<template>
  <div
    class="boxCalendar"
  >
    <header-section></header-section>
    <table-tagname></table-tagname>
    <template
      v-if="isNotTypeYearly"
    >
      <calendar-list></calendar-list>
    </template>
    <template
      v-else-if="isTypeYearly"
    >
      <calendar-yearly></calendar-yearly>
    </template>
    <div>
      <common-modal
        v-if="showModal"
      >
        <div
          slot="header"
        >
          <span
            class="offBtn"
            @click="offModalTodo"
          >
            <i class="fa-solid fa-xmark"></i>
          </span>
        </div>
        <div
          class="modalBody"
          slot="body"
        >
          <div
            class="inputDiv"
          >
            <input
              class="inputTodo"
              type="text"
              maxlength="35"
              placeholder="일정 추가"
              v-model="newTodoItem"
              @keyup.enter="addTodo"
            >
            <span
              class="btnAdd"
              @click="addTodo"
            >
              <i
                class="fa-solid fa-plus"
              >
              </i>
            </span>
          </div>
          <template
            v-if="isHaveTodo"
          >
            <ul
              class="todoList"
              v-for="(todoPage, pageKey) in modalTodoDivided"
              :key="pageKey"
              :class="{activePage: isModalShownPage(pageKey)}"
            >
              <li
                class="todoItem"
                v-for="(todoItem, key) in todoPage"
                :key="key"
              >
                <span
                  @click="checkTodo(todoItem, key, pageKey)"
                >
                  <i
                    class="fa-solid fa-check"
                    :class="{checked:todoItem.completed}"
                  >
                  </i>
                </span>
                <p
                  class="todoText"
                >
                  {{ todoItem.text }}
                </p>
                <span
                  @click="deleteTodo(todoItem, key, pageKey)"
                >
                  <i
                    class="fa-solid fa-trash-can"
                  >
                  </i>
                </span>
              </li>
            </ul>
            <div
              class="pageBtn"
            >
              <span
                v-for="(todoPage, key) in modalTodoDivided"
                :key="key"
                @click="showModalPage(key)"
                :class="{activePage: isModalShownPage(key)}"
              >
                {{ key + 1 }}
              </span>
            </div>
          </template>
          <template
            v-else-if="isNotHaveTodo"
          >
            <div
              class="alertNone"
            >
              <p
                class="alertNoneText"
              >
                등록된 일정이 없습니다.
              </p>
            </div>
          </template>
        </div>
      </common-modal>
    </div>
  </div>
</template>

<script>
import HeaderSection from './CalendarTitle.vue'
import TableTagname from './TableTagname.vue'
import CalendarList from './CalendarList.vue'
import CalendarYearly from './CalendarYearly.vue'
import CommonModal from '../common/CommonModal.vue'
import { mapState, mapMutations } from 'vuex'
import { TodoModal } from '../../mixins/TodoModal'
import { TypeMixin } from '../../mixins/TypeMixin'
export default {
  mixins: [
    TodoModal,
    TypeMixin
  ],
  components: {
    HeaderSection,
    TableTagname,
    CalendarList,
    CalendarYearly,
    CommonModal
  },
  computed: {
    ...mapState([
      'showModal',
      'modalTodo',
      'modalTodoDivided',
      'selectedCalendarType'
    ])
  },
  methods: {
    ...mapMutations([
      'SET_STATE_OFF_MODAL_TODO',
      'ADD_NEW_TODO',
      'CHECK_TODO_ITEM',
      'DELETE_TODO_ITEM',
      'SET_STATE_SHOW_MODAL_PAGE'
    ])
  }
}
</script>
<style scoped>
.boxCalendar {
    width: 86%;
    border: 1px solid rgba(0, 0, 0, 0.15);
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.35);
}
.modalBody {
      display: flex;
      height: 100%;
      flex-direction: column;
    justify-content: space-between;
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
.todoList li span {
  padding: 5px;
  display: inline-block;
}
.todoList li span i {
  cursor: pointer;
}
.todoList li:hover span i{
  opacity: 1;
}
.todoList li span .fa-check {
  opacity: 0.4;
  color: rgba(0, 0, 0, 0.3);
}
.todoList li span .fa-check.checked {
  color: rgba(0, 0, 0, 0.85);
  opacity: 1;
}
.todoList li span .fa-trash-can {
  opacity: 0;
  color: rgba(0, 0, 0, 0.75);
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
.pageBtn span.activePage {
  text-decoration-line: underline;
}
</style>
