export const ModalMixin = {
  data () {
    return {
      modalShownPage: 0
    }
  },
  methods: {
    offModalTodo () {
      this.setStatetOffModalTodo()
      this.modalShownPage = 0
    },
    showModalPage (key) {
      this.modalShownPage = key
    },
    isModalShownPage (key) {
      return key === this.modalShownPage
    }
  }
}
