<template>
    <div>
        <!-- <button id="show-modal" @click="this.showModalTodo">button</button>
        <common-modal v-if="this.$store.state.showModal" @close="showModal = false">
            <div slot="header">
            <span class="offBtn" @click="this.offModalTodo">
                <i class="fa-solid fa-xmark"></i>
            </span>
            </div>
            <div class="modalBody" slot="body">
                <div>
                    <input class="inputTodo" type="text" placeholder="일정 추가" @keyup.enter="addTodo" v-model="newTodoItem">
                    <span v-on:click="addTodo">
                        <i class="fa-solid fa-plus"></i>
                    </span>
                </div>
                <ul class="todolist">
                    <li>html</li>
                    <li>css</li>
                    <li>javascript</li>
                    <li>vue</li>
                </ul>
            </div>
            <div class="modalFooter" slot="footer">
            <button class="modal-default-button" @click="this.offModalTodo">
                저장
            </button>
            </div>
        </common-modal> -->
    </div>
</template>

<script>
// import CommonModal from './common/CommonModal.vue'
export default {
    // data () {
    //     return {
    //         showModal: false,
    //         newTodoItem: ''
    //     }
    // },
    // components: {
    //     CommonModal
    // },
    // created () {
    //     // testDate () {
    //     //     return new Date('2011-01-01')

    //     // var date1 = new Date(); // 현재 날짜 및 시간
    //     // var date2 = new Date(1991,11,25,3,50); // 1991년 12월 25일 3:50:00 (월 +1 주의)
    //     // var date3 = new Date('2014-6-4'); // 2002년 1월 1일 09:00:00
    //     // var date4 = new Date('2012-05-17 10:20:30'); // 2012년 5월 17일 10:20:30

    //     // },
    //     // console.log(this.$store.state.todoData['2011,01,02'])
    //     // console.log(this.$store.state.todoData['2021,03,01'])
    //     // console.log(this.$store.state.todoData['2024,12,12'])
    // },
    // methods: {
    //     showModalTodo () {
    //         this.$store.state.showModal = true
    //     },
    //     offModalTodo () {
    //         this.$store.state.showModal = false
    //     },
    //     addTodo () {
    //         if ( this.newTodoItem !== '') {
    //             this.$store.commit('addNewTodo', this.newTodoItem)
    //             this.newTodoItem = ''
    //         }
    //     },
    // },
}
</script>

<style scoped>
/* .modalBody div {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.modalBody div span {
    background: rgb(0, 0, 0);
    display: inline-block;
    padding: 7px;
    color: white;
    cursor: pointer;
}
.modalBody div span:hover {
    background: rgb(6, 126, 238);

} */
</style>