export default {
  data () {
    return {
    }
  },
  methods: {
    handleChangeCurrent (currentPage) {
      this.requestData.currPage = currentPage
      this.handleChange()
    }
  }
}