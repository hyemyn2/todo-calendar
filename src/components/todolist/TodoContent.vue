<template>
  <div class="boxTodo">
      <div class="divLine">
        <div
          class="listBox"
          v-for="(date, key) in todoDates()"
          :key="key"
          :id="date"
          @dblclick="showModalTodo"
        >
          <template
            v-if="!checkAllCompleted(date)"
          >
            <section class="sectionBox">
                <div class="titleDate">
                    <p>
                      {{ setLiteralDate(date) }}
                    </p>
                    <span>
                      {{ setLiteralYearMonth(date) }}
                    </span>
                </div>
                <ul>
                    <li
                      v-for="(item, key) in todoItems(date)"
                      :key="key"
                      :class="{activeChecked:item.completed}"
                    >
                      {{ item.text }}
                    </li>
                </ul>
            </section>
          </template>
          <template
            v-if="checkAllCompleted(date)"
          >
              <section class="sectionBox sectionCompleted">
                  <div class="titleDate">
                      <p>
                        {{ setLiteralDate(date) }}
                      </p>
                      <span>{{ setLiteralYearMonth(date) }}</span>
                  </div>
                  <ul>
                      <li>Completed <i class="fa-solid fa-check"></i></li>
                  </ul>
              </section>
          </template>
        </div>
    </div>
    <div>
      <common-modal
        v-if="showModal"
      >
        <div slot="header">
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
            <div class="inputDiv">
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
                <i class="fa-solid fa-plus"></i>
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
                <p class="todoText">{{ todoItem.text }}</p>
                <span
                  @click="deleteTodo(todoItem, key, pageKey)"
                >
                  <i class="fa-solid fa-trash-can"></i>
                </span>
              </li>
            </ul>
            <div class="pageBtn">
              <span
                v-for="(todoPage, key) in modalTodoDivided"
                :key="key"
                @click="showModalPage(key)"
                :class="{activePage: isModalShownPage(key)}"
              >
                {{ key+1 }}
              </span>
            </div>
          </template>
          <template
            v-else-if="isNotHaveTodo"
          >
            <div class="alertNone">
              <p class="alertNoneText">
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
import CommonModal from '../common/CommonModal.vue'
import { ModalMixin } from '../../mixins/ModalMixin'
import { TodoMixin } from '../../mixins/TodoMixin'
import { mapMutations, mapState } from 'vuex'
export default {
  mixins: [
    ModalMixin,
    TodoMixin
  ],
  components: {
    CommonModal
  },
  computed: {
    ...mapState([
      'todoData',
      'showModal',
      'modalTodo',
      'modalTodoDivided',
      'literalMonths'
    ])
  },
  methods: {
    ...mapMutations([
      'addNewTodo',
      'checkTodoItem',
      'deleteTodoItem',
      'setModalData',
      'setStatetOffModalTodo'
    ]),
    todoDates () {
      const dateArr = Object.keys(this.todoData).sort()
      return dateArr
    },
    setLiteralDate (date) {
      const splitedDate = date.split(',')
      const returnDate = `${splitedDate[2]}`
      return returnDate
    },
    setLiteralYearMonth (date) {
      const splitedDate = date.split(',')
      const returnDate = `${this.literalMonths[Number(splitedDate[1] - 1)]} ${splitedDate[0]}`
      return returnDate
    },
    todoItems (date) {
      return this.todoData[date]
    },
    setType (type) {
      this.listType = type
    },
    showModalTodo (event) {
      this.setModalData(event)
    },
    checkAllCompleted (date) {
      const arr = this.todoItems(date).map(i => i.completed)
      if (arr.includes(false)) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style scoped>

.boxTodo {
    width: 80%;
    padding-top: 30px;
}
.boxTodo .divLine {
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.4);
}
.btnlistType {
    width: 100%;
    margin-bottom: 15px;
    text-align: right;
}
.btnlistType span {
    display: inline-block;
    padding: 5px;
}
.btnlistType span:hover i {
    color: rgba(44, 116, 138, 0.8)
}
.btnlistType span i.active {
    color: rgba(44, 116, 138, 0.8)
}
.divLine .listBox {
    cursor: pointer;
}
.divLine .listBox:hover {
        background: rgba(83, 104, 110, 0.5);
    }
.divLine section {
    pointer-events: none;
    display: flex;
    align-items: flex-start;
    padding: 20px 0;
    margin: 10px 0;
    width: 100%;
    margin: auto;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
}

.divLine section.sectionCompleted {
    background: rgba(189, 199, 202, 0.5);
}

.divLine section.sectionCompleted ul li {
    width: 100%;
    font-size: 1.2rem;
    text-align: center;
    color: rgba(83, 104, 110, 0.5);
    margin-top: 10px;
}
.divLine section.sectionCompleted ul li i {
    margin-right: 140px;
    margin-left: 5px;
    font-size: 1.2rem;
    color: rgba(83, 104, 110, 0.5);
}
.divLine section.sectionCompleted .titleDate {
    opacity: 0.5;
}

.sectionBox .titleDate {
    pointer-events: none;
    padding-left: 30px;
    width: 20%;
    font-weight: bolder;
    font-size: 0.8rem;
    color: rgba(0, 0, 0, 0.5);
}
.sectionBox .titleDate p {
    font-size: 1.4rem;
    font-weight: normal;
    pointer-events: none;
    margin: 0 0 0px 0;
}
.sectionBox .titleDate span {
    pointer-events: none;
    font-size: 0.6rem;
}

section ul {
    width: 80%;
    list-style: none;
    margin: 0;
    padding: 0;
}
.sectionBox ul li {
    width: 95%;
    font-size: 0.9rem;
    color: rgba(0, 0, 0, 0.7);
    margin-bottom: 10px;
}

.sectionBox ul .activeChecked {
    display: none;
}

.sectionBox ul li:last-child {
    margin-bottom: 0px;
}
.boxTodo .divBox {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-content: center;

}
.typeBox {
    width: 20%;
    height: 200px;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.4);

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
    .pageBtn span.activePage {
      text-decoration-line: underline;
    }
</style>
