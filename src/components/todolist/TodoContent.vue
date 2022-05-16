<template>
  <div class="boxTodo">
      <!-- <div class="btnlistType">
        <span>
          <i class="fa-solid fa-list" v-on:click="setType('line')" v-bind:class="{active:this.listType === 'line'}"></i>
        </span>
        <span>
          <i class="fa-solid fa-table-cells-large" v-on:click="setType('box')" v-bind:class="{active:this.listType === 'box'}"></i>
        </span>
      </div> -->
      <div class="divLine">
        <div class="listBox" v-for="(date, key) in this.todoDates()" v-bind:key="key" v-bind:id="date" @dblclick="showModalTodo">
            <template v-if="!checkAllCompleted(date)">
                <section class="sectionBox">
                    <div class="titleDate">
                        <p>{{ literalDate(date) }}</p>
                        <span>{{ literalYearMonth(date) }}</span>
                    </div>
                    <ul>
                        <li v-for="(item, key) in todoItems(date)" v-bind:key="key" v-bind:class="{activeChecked:item.completed}">
                            {{ item.text }}
                        </li>
                    </ul>
                </section>
            </template>
            <template v-if="checkAllCompleted(date)">
                <section class="sectionBox sectionCompleted">
                    <div class="titleDate">
                        <p>{{ literalDate(date) }}</p>
                        <span>{{ literalYearMonth(date) }}</span>
                    </div>
                    <ul>
                        <li>Completed <i class="fa-solid fa-check"></i></li>
                    </ul>
                </section>
            </template>
        </div>
    </div>
      <!-- <template v-if="this.listType === 'box'">
        <div class="divBox">
            <section class="typeBox" v-for="(date, key) in this.todoDates()" v-bind:key="key">
                <div class="titleDate">
                    <span>{{ literalYearMonth(date) }}</span>
                    <p>{{ literalDate(date) }}</p>
                </div>
            </section>
        </div>
      </template> -->
    <!-- <section class="sectionBox" v-for="(date, key) in this.todoDates()" v-bind:key="key" @click="showList">
        <div class="titleDate">
            <p>{{ literalDate(date) }}</p>
            <span><i class="fa-solid fa-chevron-down"></i></span>
        </div>
        <ul>
            <li v-for="(item, key) in todoItems(date)" v-bind:key="key">
                {{ item.text }}
            </li>
        </ul>
    </section> -->

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
import CommonModal from '../common/CommonModal.vue'
import { mapState, mapGetters } from 'vuex'
export default {
    components: {
        CommonModal
    },
    computed: {
        ...mapState(['fetchedDate', 'loadedDates', 'isFetched', 'selectedCalendarType']),
        ...mapGetters(['setYear', 'setMonth', 'setDay', 'todoData']),
    },
    data () {
        return {
            // toggleSeeAll: false
            newTodoItem: '',
            modalShownPage: 0,
            // listType: 'line'
        }
    },
    methods: {
        todoDates () {
            const dateArr = Object.keys(this.$store.state.todoData).sort()
            return dateArr
        },
        literalDate (date) {
            const splitedDate = date.split(',')
            const returnDate = `${splitedDate[2]}`
            // const returnDate = `${splitedDate[0]} ${splitedDate[1]} ${splitedDate[2]}`
            return returnDate 
        },
        literalYearMonth (date) {
            const splitedDate = date.split(',')
            const returnDate = `${this.$store.state.literalMonths[Number(splitedDate[1]-1)]} ${splitedDate[0]}`
            return returnDate 
        },
        todoItems (date) {
            return this.$store.state.todoData[date]
        },
        setType (type) {
            this.listType = type
        },
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
        },
        showModalTodo (event) {
            this.$store.commit('setModalData', event)
        },
        checkAllCompleted (date) {
            const arr = this.todoItems(date).map(i => i.completed)
            console.log(arr)
            if ( arr.includes(false)) {
                // console.log('have false')
                return false
            } else {
                return true
            }
        }
    },
    created () {
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
/* ------------------------- btnlistType ------------------------- */
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
/* ------------------------- line ------------------------- */
.divLine .listBox {
    cursor: pointer;
}
.divLine .listBox:hover {
        background: rgba(83, 104, 110, 0.5);
    }
.divLine section {
    pointer-events: none;
    display: flex;
    /* justify-content: space-between; */
    align-items: flex-start;
    padding: 20px 0;
    margin: 10px 0;
    width: 100%;
    margin: auto;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
}

.divLine section.sectionCompleted {
    background: rgba(189, 199, 202, 0.5);
    /* opacity: 0.4; */
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
    /* padding: 15px 15px 15px 30px; */
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
    /* margin: 10px auto; */
    /* padding: 5px 0px; */
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
/* ------------------------- box ------------------------- */
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