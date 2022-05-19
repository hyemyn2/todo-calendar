export const TodoMixin = {
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
    addTodo () {
      if (this.newTodoItem !== '') {
        this.addNewTodo(this.newTodoItem)
        this.newTodoItem = ''
      }
    },
    checkTodo (todoItem, key, pageKey) {
      this.checkTodoItem({ todoItem, key, pageKey })
    },
    deleteTodo (todoItem, key, pageKey) {
      this.deleteTodoItem({ todoItem, key, pageKey })
    }
  }
}
