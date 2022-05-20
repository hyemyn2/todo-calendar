export const TodoModal = {
  data () {
    return {
      newTodoItem: ''
    }
  },
  computed: {
    isHaveTodo () {
      return this.modalTodo.length !== 0
    },
    isNotHaveTodo () {
      return this.modalTodo.length === 0
    }
  },
  methods: {
    offModalTodo () {
      this.SET_STATE_OFF_MODAL_TODO()
    },
    addTodo () {
      if (this.newTodoItem !== '') {
        this.ADD_NEW_TODO(this.newTodoItem)
        this.newTodoItem = ''
      }
    },
    checkTodo (todoItem, key, pageKey) {
      this.CHECK_TODO_ITEM({ todoItem, key, pageKey })
    },
    deleteTodo (todoItem, key, pageKey) {
      this.DELETE_TODO_ITEM({ todoItem, key, pageKey })
    },
    showModalPage (key) {
      this.SET_STATE_SHOW_MODAL_PAGE(key)
    },
    isModalShownPage (key) {
      return key === this.$store.state.fetchedModalPage
    }
  }
}
